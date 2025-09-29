import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, MoreVertical, ToggleLeft, ToggleRight } from 'lucide-react';

// Google Maps API types
interface GoogleMap {
    setCenter: (center: google.maps.LatLng | google.maps.LatLngLiteral) => void;
    setZoom: (zoom: number) => void;
    setMapTypeId: (mapTypeId: string) => void;
}

export const FarmMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [showMapLabels, setShowMapLabels] = useState(true);
    const [selectedAreaType, setSelectedAreaType] = useState('field');
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
    const [rectangles, setRectangles] = useState<google.maps.Rectangle[]>([]);

    // Mock farm locations data
    const farmLocations = [
        // { id: 1, name: 'North Field A', type: 'field', lat: -17.8292, lng: 31.0522, acres: 5.2 },
        // { id: 2, name: 'South Pasture', type: 'pasture', lat: -17.8312, lng: 31.0532, acres: 3.8 },
        // { id: 3, name: 'Equipment Shed', type: 'building', lat: -17.8285, lng: 31.0515, acres: 0.1 },
        // { id: 4, name: 'Water Tank', type: 'infrastructure', lat: -17.8298, lng: 31.0545, acres: 0.05 },
    ];

    const areaTypes = [
        { id: 'field', label: 'Field', color: '#10B981' },
        { id: 'pasture', label: 'Pasture', color: '#84CC16' },
        { id: 'building', label: 'Building', color: '#EF4444' },
        { id: 'infrastructure', label: 'Infrastructure', color: '#3B82F6' },
        { id: 'water', label: 'Water Source', color: '#06B6D4' },
        { id: 'road', label: 'Road/Path', color: '#6B7280' },
    ];

    // Initialize map when component mounts
    useEffect(() => {
        const initializeMap = () => {
            if (mapRef.current && !mapInstance && window.google) {
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: -17.8292, lng: 31.0522 },
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.SATELLITE,
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true,
                });

                // Add markers for farm locations
                farmLocations.forEach(location => {
                    const type = areaTypes.find(t => t.id === location.type);
                    new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map,
                        title: location.name,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: type?.color || '#10B981',
                            fillOpacity: 1,
                            strokeColor: '#FFFFFF',
                            strokeWeight: 2,
                        },
                    });
                });

                setMapInstance(map);
            }
        };

        // Check if Google Maps API is already loaded
        if (window.google && window.google.maps) {
            initializeMap();
        } else {
            // Load Google Maps API
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAtNURh8Jda8VTuThQwJuuhKM0I7dPpsl4&libraries=drawing&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.initMap = initializeMap;
        }

        return () => {
            // Clean up
            if (drawingManager) {
                drawingManager.setMap(null);
            }
        };
    }, []);

    // Handle drawing mode changes
    useEffect(() => {
        if (mapInstance && window.google) {
            if (isDrawingMode) {
                // Initialize drawing manager
                const manager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
                    drawingControl: false,
                    rectangleOptions: {
                        fillColor: areaTypes.find(t => t.id === selectedAreaType)?.color || '#10B981',
                        fillOpacity: 0.3,
                        strokeWeight: 2,
                        strokeColor: '#FFFFFF',
                        editable: true,
                        draggable: true,
                    },
                });

                manager.setMap(mapInstance);
                setDrawingManager(manager);

                // Add event listener for rectangle completion
                google.maps.event.addListener(manager, 'rectanglecomplete', (rectangle: google.maps.Rectangle) => {
                    setRectangles(prev => [...prev, rectangle]);

                    // Add event listener for rectangle click to edit/delete
                    rectangle.addListener('click', () => {
                        // You could implement edit/delete functionality here
                        console.log('Rectangle clicked');
                    });
                });
            } else if (drawingManager) {
                // Disable drawing mode
                drawingManager.setDrawingMode(null);
                drawingManager.setMap(null);
                setDrawingManager(null);
            }
        }
    }, [isDrawingMode, mapInstance, selectedAreaType]);

    // Update rectangle styles when area type changes
    useEffect(() => {
        if (isDrawingMode && drawingManager && window.google) {
            const color = areaTypes.find(t => t.id === selectedAreaType)?.color || '#10B981';
            drawingManager.setOptions({
                rectangleOptions: {
                    fillColor: color,
                    fillOpacity: 0.3,
                    strokeWeight: 2,
                    strokeColor: '#FFFFFF',
                    editable: true,
                    draggable: true,
                },
            });
        }
    }, [selectedAreaType, isDrawingMode, drawingManager]);

    const handleAddPlace = () => {
        setIsDrawingMode(!isDrawingMode);
    };

    const handleTypeChange = (type: string) => {
        setSelectedAreaType(type);
        setIsTypeDropdownOpen(false);
    };

    return (
        <div className="h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-semibold text-gray-800">Farm Map</h1>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Map Labels Toggle */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Show Map Labels</span>
                        <button
                            onClick={() => setShowMapLabels(!showMapLabels)}
                            className="focus:outline-none"
                        >
                            {showMapLabels ? (
                                <ToggleRight className="w-8 h-5 text-green-600" />
                            ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {/* Type Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <span>Type</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {isTypeDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                    {areaTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => handleTypeChange(type.id)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${selectedAreaType === type.id ? 'bg-gray-100' : ''
                                                }`}
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: type.color }}
                                            ></div>
                                            <span>{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Print Button */}
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                    </button>

                    {/* More Options */}
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Map Controls */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    {/* Add Place Button */}
                    <button
                        onClick={handleAddPlace}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDrawingMode
                            ? 'bg-green-700 text-white'
                            : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isDrawingMode ? 'Stop Drawing' : 'Add Place to Map'}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* More Options */}
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>

                {/* Instructions */}
                {isDrawingMode && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-blue-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>Drag on the map to draw a rectangle. The area will be filled with a light color.</span>
                    </div>
                )}
            </div>

            {/* Map Container */}
            <div className="relative flex-1" style={{ height: 'calc(100vh - 280px)' }}>
                <div
                    ref={mapRef}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
};