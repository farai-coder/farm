// LocationMap.tsx
import React, { useState, useEffect, useRef } from 'react';
import { MapArea, AREA_TYPES } from './type';
import {
    calculatePolygonArea,
    calculatePolygonCenter,
    getPolygonCoordinates,
    saveMapsToStorage,
    formatArea
} from './mapUtils';
import { HeaderControls } from './HeaderControls';
import { DrawingControls } from './DrawingControls';
import { Legend } from './Legend';
import { MapContainer } from './MapContainer';
import { MapModal } from './MapModal';

export const GrowLocationMap = () => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [selectedAreaType, setSelectedAreaType] = useState('field');
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [drawnMaps, setDrawnMaps] = useState<MapArea[]>([]);
    const [showMapModal, setShowMapModal] = useState(false);
    const [editingMap, setEditingMap] = useState<MapArea | null>(null);
    const [mapName, setMapName] = useState('');
    const [isNewMap, setIsNewMap] = useState(false);

    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);

    // Add this ref to track the current selectedAreaType
    const selectedAreaTypeRef = useRef(selectedAreaType);

    // Update the ref whenever selectedAreaType changes
    useEffect(() => {
        selectedAreaTypeRef.current = selectedAreaType;
    }, [selectedAreaType]);

    // Close settings when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSettingsOpen) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSettingsOpen]);

    // Handle edit map
    const handleEditMap = (mapId: string) => {
        console.log('🔵 Edit map called:', mapId);
        const mapData = drawnMaps.find(m => m.id === mapId);
        if (mapData) {
            console.log('✅ Found map in drawnMaps:', mapData);
            setEditingMap(mapData);
            setMapName(mapData.name);
            setIsNewMap(false);
            setShowMapModal(true);
        } else {
            console.log('❌ Map not found with ID:', mapId);
            console.log('Available maps:', drawnMaps.map(m => m.id));
        }
    };

    // Initialize map when component mounts
    useEffect(() => {
        const initializeMap = () => {
            if (mapRef.current && !mapInstance && window.google) {
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: -17.8292, lng: 31.0522 },
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.SATELLITE,
                    disableDefaultUI: true,
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                });

                setMapInstance(map);
                initializeDrawingManager(map);
                loadSavedMaps(map);
            }
        };

        const initializeDrawingManager = (map: google.maps.Map) => {
            if (!window.google) return;

            const selectedType = AREA_TYPES.find(t => t.id === selectedAreaTypeRef.current);
            const manager = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: false,
                polygonOptions: {
                    fillColor: selectedType?.lightColor || '#10b98180',
                    fillOpacity: 0.5,
                    strokeWeight: 3,
                    strokeColor: selectedType?.color || '#10b981',
                    editable: false,
                    draggable: false,
                    clickable: true,
                },
            });

            manager.setMap(map);
            setDrawingManager(manager);

            google.maps.event.addListener(manager, 'polygoncomplete', (polygon: google.maps.Polygon) => {
                handlePolygonComplete(polygon);
            });

            return manager;
        };

        const handlePolygonComplete = (polygon: google.maps.Polygon) => {
            const area = calculatePolygonArea(polygon);
            const coordinates = getPolygonCoordinates(polygon);

            const path = polygon.getPath();
            const pathArray: google.maps.LatLng[] = [];
            for (let i = 0; i < path.getLength(); i++) {
                pathArray.push(path.getAt(i));
            }
            const center = calculatePolygonCenter(pathArray);

            const currentSelectedAreaType = selectedAreaTypeRef.current;
            const selectedType = AREA_TYPES.find(t => t.id === currentSelectedAreaType);

            const mapData: MapArea = {
                polygon: polygon,
                type: currentSelectedAreaType,
                area: area,
                color: selectedType?.color || '#10b981',
                lightColor: selectedType?.lightColor || '#10b98180',
                id: `map-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                coordinates: coordinates,
                center: center,
                name: '',
            };

            addPolygonListeners(polygon, mapData.id);

            const marker = createMapMarker(mapData, mapInstance!);
            mapData.marker = marker;

            setEditingMap(mapData);
            setMapName('');
            setIsNewMap(true);
            setShowMapModal(true);
        };

        const createMapMarker = (mapData: MapArea, map: google.maps.Map) => {
            const markerIcon = {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" 
                  fill="${mapData.color}" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="9" r="3" fill="#ffffff"/>
          </svg>
        `)}`,
                scaledSize: new google.maps.Size(24, 24),
                anchor: new google.maps.Point(12, 24),
            };

            const marker = new google.maps.Marker({
                position: mapData.center,
                map: map,
                title: mapData.name || 'Unnamed Map',
                icon: markerIcon,
            });

            marker.addListener('click', () => {
                console.log('📍 Marker clicked:', mapData.id);
                handleEditMap(mapData.id);
            });

            return marker;
        };

        const addPolygonListeners = (polygon: google.maps.Polygon, mapId: string) => {
            console.log('🎯 Adding click listener to polygon:', mapId);
            polygon.addListener('click', (event: google.maps.PolyMouseEvent) => {
                console.log('🟢 POLYGON CLICKED! ID:', mapId);
                if (window.handleEditMap) {
                    window.handleEditMap(mapId);
                }
            });
        };

        const loadSavedMaps = (map: google.maps.Map) => {
            try {
                const saved = localStorage.getItem('farmMaps');
                if (saved) {
                    const mapsData = JSON.parse(saved);
                    const loadedMaps = mapsData.map((data: any) => {
                        const selectedType = AREA_TYPES.find(t => t.id === data.type);

                        const polygon = new google.maps.Polygon({
                            paths: data.coordinates,
                            fillColor: data.lightColor || selectedType?.lightColor || '#10b98180',
                            fillOpacity: 0.5,
                            strokeWeight: 3,
                            strokeColor: data.color || selectedType?.color || '#10b981',
                            editable: false,
                            draggable: false,
                            map: map,
                            clickable: true,
                        });

                        console.log('🔄 Creating polygon with ID:', data.id);
                        addPolygonListeners(polygon, data.id);

                        const marker = createMapMarker({
                            ...data,
                            polygon: polygon
                        }, map);

                        return {
                            polygon: polygon,
                            marker: marker,
                            type: data.type,
                            area: data.area,
                            color: data.color,
                            lightColor: data.lightColor,
                            id: data.id,
                            coordinates: data.coordinates,
                            center: data.center,
                            name: data.name,
                        };
                    });

                    console.log('📁 Loaded maps:', loadedMaps.length);
                    setDrawnMaps(loadedMaps);
                }
            } catch (error) {
                console.error('Error loading saved maps:', error);
            }
        };

        if (window.google && window.google.maps) {
            initializeMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAtNURh8Jda8VTuThQwJuuhKM0I7dPpsl4&libraries=drawing,geometry&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.initMap = initializeMap;
        }

        return () => {
            if (drawingManager) {
                drawingManager.setMap(null);
            }
        };
    }, []);

    // Expose handleEditMap to window for Google Maps callbacks
    useEffect(() => {
        window.handleEditMap = handleEditMap;

        return () => {
            delete window.handleEditMap;
        };
    }, [drawnMaps]);

    // Save maps to localStorage whenever drawnMaps changes
    useEffect(() => {
        if (drawnMaps.length > 0) {
            saveMapsToStorage(drawnMaps);
        }
    }, [drawnMaps]);

    // Save map details from modal
    const handleSaveMapDetails = () => {
        if (editingMap && mapName.trim()) {
            const updatedMapData = {
                ...editingMap,
                name: mapName.trim(),
                color: editingMap.color,
                lightColor: editingMap.lightColor,
            };

            if (isNewMap) {
                setDrawnMaps(prev => [...prev, updatedMapData]);
            } else {
                setDrawnMaps(prev => prev.map(m =>
                    m.id === editingMap.id ? updatedMapData : m
                ));
            }

            if (updatedMapData.marker) {
                updatedMapData.marker.setTitle(mapName.trim());
            }

            setShowMapModal(false);
            setEditingMap(null);
            setIsDrawingMode(false);
            setIsNewMap(false);
        }
    };

    // Delete individual map
    const deleteMap = (mapId: string) => {
        const mapToDelete = drawnMaps.find(m => m.id === mapId);
        if (mapToDelete) {
            if (mapToDelete.marker) {
                mapToDelete.marker.setMap(null);
            }
            if (mapToDelete.polygon) {
                mapToDelete.polygon.setMap(null);
            }

            const updated = drawnMaps.filter(m => m.id !== mapId);
            setDrawnMaps(updated);
            saveMapsToStorage(updated);

            setShowMapModal(false);
            setEditingMap(null);
        }
    };

    // Handle modal cancel
    const handleCancel = () => {
        if (isNewMap && editingMap) {
            if (editingMap.marker) {
                editingMap.marker.setMap(null);
            }
            if (editingMap.polygon) {
                editingMap.polygon.setMap(null);
            }
        }
        setShowMapModal(false);
        setEditingMap(null);
        setIsNewMap(false);
    };

    // Handle drawing mode changes
    useEffect(() => {
        if (drawingManager && window.google) {
            if (isDrawingMode) {
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
            } else {
                drawingManager.setDrawingMode(null);
            }
        }
    }, [isDrawingMode, drawingManager]);

    // Update polygon styles when area type changes
    useEffect(() => {
        if (drawingManager && window.google) {
            const selectedType = AREA_TYPES.find(t => t.id === selectedAreaType);

            drawingManager.setOptions({
                polygonOptions: {
                    fillColor: selectedType?.lightColor || '#10b98180',
                    fillOpacity: 0.5,
                    strokeWeight: 3,
                    strokeColor: selectedType?.color || '#10b981',
                    editable: false,
                    draggable: false,
                    clickable: true,
                },
            });
        }
    }, [selectedAreaType, drawingManager]);

    const handleAddPlace = () => {
        setIsDrawingMode(!isDrawingMode);
    };

    const handleTypeChange = (type: string) => {
        setSelectedAreaType(type);
        setIsTypeDropdownOpen(false);
    };

    const handleFullscreen = () => {
        if (mapRef.current) {
            if (!document.fullscreenElement) {
                mapRef.current.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSaveData = () => {
        const exportData = {
            maps: drawnMaps.map(map => ({
                name: map.name,
                type: map.type,
                area: map.area,
                color: map.color,
                coordinates: map.coordinates,
                center: map.center,
                areaFormatted: formatArea(map.area),
            })),
            totalArea: formatArea(totalArea),
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `farm-maps-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 25, 200));
        if (mapInstance) {
            mapInstance.setZoom(mapInstance.getZoom() + 1);
        }
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 25, 50));
        if (mapInstance) {
            mapInstance.setZoom(mapInstance.getZoom() - 1);
        }
    };

    const handleClearAll = () => {
        if (confirm('Clear all maps?')) {
            drawnMaps.forEach(m => {
                if (m.marker) m.marker.setMap(null);
                if (m.polygon) m.polygon.setMap(null);
            });
            setDrawnMaps([]);
            localStorage.removeItem('farmMaps');
            setIsSettingsOpen(false);
        }
    };

    // Calculate total area of all drawn maps
    const totalArea = drawnMaps.reduce((sum, map) => sum + map.area, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <HeaderControls
                    zoomLevel={zoomLevel}
                    totalArea={totalArea}
                    isSettingsOpen={isSettingsOpen}
                    setIsSettingsOpen={setIsSettingsOpen}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onFullscreen={handleFullscreen}
                    onPrint={handlePrint}
                    onSaveData={handleSaveData}
                    onClearAll={handleClearAll}
                />

                <DrawingControls
                    isDrawingMode={isDrawingMode}
                    selectedAreaType={selectedAreaType}
                    isTypeDropdownOpen={isTypeDropdownOpen}
                    setIsTypeDropdownOpen={setIsTypeDropdownOpen}
                    onAddPlace={handleAddPlace}
                    onTypeChange={handleTypeChange}
                />

                <Legend />

                <MapContainer
                    mapRef={mapRef}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                />

                <MapModal
                    showMapModal={showMapModal}
                    editingMap={editingMap}
                    isNewMap={isNewMap}
                    mapName={mapName}
                    setMapName={setMapName}
                    onSave={handleSaveMapDetails}
                    onCancel={handleCancel}
                    onDelete={deleteMap}
                />
            </div>
        </div>
    );
};