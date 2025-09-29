import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, MoreVertical, ToggleLeft, ToggleRight, Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

// Weather and vegetation data types
interface WeatherStation {
    id: number;
    name: string;
    lat: number;
    lng: number;
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
    lastUpdated: string;
}

interface VegetationZone {
    id: number;
    name: string;
    lat: number;
    lng: number;
    ndvi: number; // Normalized Difference Vegetation Index (0-1)
    health: 'poor' | 'fair' | 'good' | 'excellent';
    area: number; // in acres
}

export const WeatherMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const [showVegetation, setShowVegetation] = useState(true);
    const [showWeatherStations, setShowWeatherStations] = useState(true);
    const [selectedLayer, setSelectedLayer] = useState<'temperature' | 'precipitation' | 'ndvi'>('temperature');
    const [isLayerDropdownOpen, setIsLayerDropdownOpen] = useState(false);
    const [weatherStations, setWeatherStations] = useState<WeatherStation[]>([]);
    const [vegetationZones, setVegetationZones] = useState<VegetationZone[]>([]);

    // Mock weather station data
    const mockWeatherStations: WeatherStation[] = [
        {
            id: 1,
            name: 'North Station',
            lat: -17.8292,
            lng: 31.0522,
            temperature: 22.5,
            humidity: 65,
            precipitation: 0.0,
            windSpeed: 12,
            condition: 'sunny',
            lastUpdated: '2024-01-20T10:30:00Z'
        },
        {
            id: 2,
            name: 'South Station',
            lat: -17.8350,
            lng: 31.0480,
            temperature: 21.8,
            humidity: 70,
            precipitation: 2.5,
            windSpeed: 8,
            condition: 'rainy',
            lastUpdated: '2024-01-20T10:25:00Z'
        },
        {
            id: 3,
            name: 'East Station',
            lat: -17.8270,
            lng: 31.0580,
            temperature: 23.1,
            humidity: 60,
            precipitation: 0.0,
            windSpeed: 15,
            condition: 'cloudy',
            lastUpdated: '2024-01-20T10:28:00Z'
        }
    ];

    // Mock vegetation zones data
    const mockVegetationZones: VegetationZone[] = [
        {
            id: 1,
            name: 'North Field',
            lat: -17.8300,
            lng: 31.0530,
            ndvi: 0.78,
            health: 'excellent',
            area: 5.2
        },
        {
            id: 2,
            name: 'South Pasture',
            lat: -17.8330,
            lng: 31.0500,
            ndvi: 0.45,
            health: 'fair',
            area: 3.8
        },
        {
            id: 3,
            name: 'East Cropland',
            lat: -17.8260,
            lng: 31.0560,
            ndvi: 0.92,
            health: 'excellent',
            area: 8.1
        }
    ];

    const layerTypes = [
        { id: 'temperature', label: 'Temperature', icon: Sun, color: '#EF4444' },
        { id: 'precipitation', label: 'Precipitation', icon: CloudRain, color: '#3B82F6' },
        { id: 'ndvi', label: 'Vegetation Index', icon: Cloud, color: '#10B981' },
    ];

    // Get condition icon
    const getConditionIcon = (condition: string) => {
        switch (condition) {
            case 'sunny': return Sun;
            case 'cloudy': return Cloud;
            case 'rainy': return CloudRain;
            case 'snowy': return CloudSnow;
            default: return Cloud;
        }
    };

    // Get color based on NDVI value
    const getVegetationColor = (ndvi: number) => {
        if (ndvi >= 0.7) return '#059669'; // Excellent - dark green
        if (ndvi >= 0.5) return '#10B981'; // Good - green
        if (ndvi >= 0.3) return '#F59E0B'; // Fair - yellow
        return '#EF4444'; // Poor - red
    };

    // Get color based on temperature
    const getTemperatureColor = (temp: number) => {
        if (temp >= 30) return '#DC2626'; // Hot - red
        if (temp >= 20) return '#EA580C'; // Warm - orange
        if (temp >= 10) return '#2563EB'; // Cool - blue
        return '#1E40AF'; // Cold - dark blue
    };

    // Get color based on precipitation
    const getPrecipitationColor = (precip: number) => {
        if (precip >= 10) return '#1E40AF'; // Heavy - dark blue
        if (precip >= 5) return '#3B82F6'; // Moderate - blue
        if (precip >= 1) return '#60A5FA'; // Light - light blue
        return '#DBEAFE'; // None - very light blue
    };

    // Initialize map when component mounts
    useEffect(() => {
        const initializeMap = () => {
            if (mapRef.current && !mapInstance && window.google) {
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: -17.8292, lng: 31.0522 },
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.SATELLITE,
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true,
                });

                setMapInstance(map);
                setWeatherStations(mockWeatherStations);
                setVegetationZones(mockVegetationZones);
            }
        };

        if (window.google && window.google.maps) {
            initializeMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAtNURh8Jda8VTuThQwJuuhKM0I7dPpsl4&callback=initWeatherMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.initWeatherMap = initializeMap;
        }

        return () => {
            // Cleanup
        };
    }, []);

    // Update markers when data or visibility changes
    useEffect(() => {
        if (!mapInstance || !window.google) return;

        // Clear existing markers
        const clearMarkers = () => {
            // In a real implementation, you'd track markers and remove them
            // For now, we'll rely on React to handle the re-rendering
        };

        // Add weather station markers
        if (showWeatherStations) {
            weatherStations.forEach(station => {
                const ConditionIcon = getConditionIcon(station.condition);
                const color = getTemperatureColor(station.temperature);

                const marker = new google.maps.Marker({
                    position: { lat: station.lat, lng: station.lng },
                    map: mapInstance,
                    title: `${station.name} - ${station.temperature}°C`,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 12,
                        fillColor: color,
                        fillOpacity: 0.8,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 2,
                    },
                });

                // Add info window
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div class="p-2 min-w-48">
                            <h3 class="font-semibold text-lg">${station.name}</h3>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-2xl font-bold" style="color: ${color}">${station.temperature}°C</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
                                <div>Humidity: ${station.humidity}%</div>
                                <div>Precip: ${station.precipitation}mm</div>
                                <div>Wind: ${station.windSpeed} km/h</div>
                                <div>Condition: ${station.condition}</div>
                            </div>
                            <div class="text-xs text-gray-500 mt-2">Updated: ${new Date(station.lastUpdated).toLocaleTimeString()}</div>
                        </div>
                    `,
                });

                marker.addListener('click', () => {
                    infoWindow.open(mapInstance, marker);
                });
            });
        }

        // Add vegetation zone markers
        if (showVegetation) {
            vegetationZones.forEach(zone => {
                const color = getVegetationColor(zone.ndvi);

                const marker = new google.maps.Marker({
                    position: { lat: zone.lat, lng: zone.lng },
                    map: mapInstance,
                    title: `${zone.name} - NDVI: ${zone.ndvi}`,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: color,
                        fillOpacity: 0.7,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 2,
                    },
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div class="p-2 min-w-48">
                            <h3 class="font-semibold text-lg">${zone.name}</h3>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-xl font-bold" style="color: ${color}">NDVI: ${zone.ndvi.toFixed(2)}</span>
                                <span class="px-2 py-1 text-xs rounded-full text-white" style="background-color: ${color}">
                                    ${zone.health}
                                </span>
                            </div>
                            <div class="text-sm mt-2">
                                Area: ${zone.area} acres<br/>
                                Health: ${zone.health.toUpperCase()}
                            </div>
                            <div class="mt-2">
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="h-2 rounded-full" style="width: ${zone.ndvi * 100}%; background-color: ${color}"></div>
                                </div>
                                <div class="text-xs text-gray-500 mt-1">Vegetation Index</div>
                            </div>
                        </div>
                    `,
                });

                marker.addListener('click', () => {
                    infoWindow.open(mapInstance, marker);
                });
            });
        }

        return clearMarkers;
    }, [mapInstance, showWeatherStations, showVegetation, weatherStations, vegetationZones, selectedLayer]);

    const handleLayerChange = (layer: 'temperature' | 'precipitation' | 'ndvi') => {
        setSelectedLayer(layer);
        setIsLayerDropdownOpen(false);
    };

    const getCurrentLayerIcon = () => {
        const layer = layerTypes.find(l => l.id === selectedLayer);
        return layer ? layer.icon : Sun;
    };

    const CurrentLayerIcon = getCurrentLayerIcon();

    return (
        <div className="h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-semibold text-gray-800">Weather & Vegetation Map</h1>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Vegetation Toggle */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Show Vegetation</span>
                        <button
                            onClick={() => setShowVegetation(!showVegetation)}
                            className="focus:outline-none"
                        >
                            {showVegetation ? (
                                <ToggleRight className="w-8 h-5 text-green-600" />
                            ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {/* Weather Stations Toggle */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Weather Stations</span>
                        <button
                            onClick={() => setShowWeatherStations(!showWeatherStations)}
                            className="focus:outline-none"
                        >
                            {showWeatherStations ? (
                                <ToggleRight className="w-8 h-5 text-blue-600" />
                            ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {/* Layer Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLayerDropdownOpen(!isLayerDropdownOpen)}
                            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <CurrentLayerIcon className="w-4 h-4" />
                            <span>{
                                layerTypes.find(l => l.id === selectedLayer)?.label || 'Temperature'
                            }</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {isLayerDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                    {layerTypes.map((layer) => {
                                        const LayerIcon = layer.icon;
                                        return (
                                            <button
                                                key={layer.id}
                                                onClick={() => handleLayerChange(layer.id as any)}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${selectedLayer === layer.id ? 'bg-gray-100' : ''
                                                    }`}
                                            >
                                                <LayerIcon className="w-4 h-4" style={{ color: layer.color }} />
                                                <span>{layer.label}</span>
                                            </button>
                                        );
                                    })}
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Legend */}
                        <div className="flex items-center space-x-4">
                            {showWeatherStations && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">Temperature Legend:</span>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-[#DC2626] rounded-full"></div>
                                        <span className="text-xs">Hot (30°C+)</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-[#EA580C] rounded-full"></div>
                                        <span className="text-xs">Warm (20-29°C)</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-[#2563EB] rounded-full"></div>
                                        <span className="text-xs">Cool (10-19°C)</span>
                                    </div>
                                </div>
                            )}

                            {showVegetation && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">Vegetation Legend:</span>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-[#059669] rounded-full"></div>
                                        <span className="text-xs">Excellent (0.7+)</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                                        <span className="text-xs">Good (0.5-0.69)</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                                        <span className="text-xs">Fair (0.3-0.49)</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Cloud className="w-4 h-4" />
                        <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative flex-1" style={{ height: 'calc(100vh - 280px)' }}>
                <div
                    ref={mapRef}
                    className="w-full h-full"
                />

                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64">
                    <h3 className="font-semibold text-lg mb-3">Map Data</h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Weather Stations</span>
                            <span className="text-sm text-gray-600">{weatherStations.length} active</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Vegetation Zones</span>
                            <span className="text-sm text-gray-600">{vegetationZones.length} monitored</span>
                        </div>

                        <div className="pt-2 border-t">
                            <div className="flex items-center justify-between text-sm">
                                <span>Current Layer:</span>
                                <span className="font-medium" style={{ color: layerTypes.find(l => l.id === selectedLayer)?.color }}>
                                    {layerTypes.find(l => l.id === selectedLayer)?.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};