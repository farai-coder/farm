import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Settings } from 'lucide-react';

export const LocationMap = () => {
    const [zoomLevel, setZoomLevel] = useState(100);

    // Legend items matching the image
    const legendItems = [
        { color: '#8b5cf6', label: 'Property Boundary' },
        { color: '#10b981', label: 'Field' },
        { color: '#ef4444', label: 'Bed' },
        { color: '#dc2626', label: 'Building' },
        { color: '#f59e0b', label: 'Animal Enclosure' },
        { color: '#ec4899', label: 'Grazing Enclosure' },
        { color: '#3b82f6', label: 'Irrigation' },
        { color: '#84cc16', label: 'Buffer Zone' }
    ];

    // Mock field zones data
    const fieldZones = [
        { id: 'northwest-a', name: 'Northwest Field A', color: '#10b981', x: 25, y: 15, width: 20, height: 15 },
        { id: 'northwest-b', name: 'Northwest Field B', color: '#10b981', x: 50, y: 15, width: 18, height: 15 },
        { id: 'southwest-a', name: 'Southwest Field A', color: '#10b981', x: 25, y: 45, width: 20, height: 12 },
        { id: 'southwest-c', name: 'Southwest Field C', color: '#10b981', x: 50, y: 45, width: 18, height: 12 },
        { id: 'central', name: 'Central Field', color: '#10b981', x: 35, y: 30, width: 25, height: 10 }
    ];

    const beds = [
        { id: 'bed-1', x: 28, y: 18, width: 3, height: 8 },
        { id: 'bed-2', x: 32, y: 18, width: 3, height: 8 },
        { id: 'bed-3', x: 36, y: 18, width: 3, height: 8 },
        { id: 'bed-4', x: 40, y: 18, width: 3, height: 8 },
        { id: 'bed-5', x: 53, y: 18, width: 3, height: 8 },
        { id: 'bed-6', x: 57, y: 18, width: 3, height: 8 },
        { id: 'bed-7', x: 61, y: 18, width: 3, height: 8 }
    ];

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 25, 50));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Location Map</h1>
                    </div>

                    {/* Map Controls */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                            title="Zoom Out"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-sm text-gray-600 px-2">{zoomLevel}%</span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                            title="Zoom In"
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                            <Maximize2 size={16} />
                        </button>
                        <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                        {legendItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div
                                    className="w-4 h-4 rounded border border-gray-300"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-xs text-gray-600">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Container */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative">
                        {/* Satellite/Aerial View Background */}
                        <div
                            className="relative bg-gradient-to-br from-green-100 via-green-50 to-amber-50 overflow-hidden"
                            style={{
                                height: '600px',
                                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(120, 53, 15, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
                `
                            }}
                        >
                            {/* Property Boundary */}
                            <div
                                className="absolute border-4 border-purple-500 rounded-lg"
                                style={{
                                    left: '10%',
                                    top: '5%',
                                    width: '80%',
                                    height: '85%'
                                }}
                            ></div>

                            {/* Fields */}
                            {fieldZones.map((field) => (
                                <div
                                    key={field.id}
                                    className="absolute border-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{
                                        left: `${field.x}%`,
                                        top: `${field.y}%`,
                                        width: `${field.width}%`,
                                        height: `${field.height}%`,
                                        borderColor: field.color,
                                        backgroundColor: `${field.color}20`
                                    }}
                                    title={field.name}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-medium text-gray-700 bg-white bg-opacity-75 px-2 py-1 rounded">
                                            {field.name}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Crop Beds */}
                            {beds.map((bed) => (
                                <div
                                    key={bed.id}
                                    className="absolute border border-red-500 bg-red-100 bg-opacity-50 cursor-pointer hover:bg-opacity-70 transition-all"
                                    style={{
                                        left: `${bed.x}%`,
                                        top: `${bed.y}%`,
                                        width: `${bed.width}%`,
                                        height: `${bed.height}%`
                                    }}
                                ></div>
                            ))}

                            {/* Buildings */}
                            <div
                                className="absolute bg-red-600 border border-red-700 cursor-pointer hover:opacity-80"
                                style={{
                                    left: '75%',
                                    top: '70%',
                                    width: '8%',
                                    height: '6%'
                                }}
                                title="Delivery/Community Barn"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-white font-medium">Barn</span>
                                </div>
                            </div>

                            <div
                                className="absolute bg-red-600 border border-red-700 cursor-pointer hover:opacity-80"
                                style={{
                                    left: '70%',
                                    top: '78%',
                                    width: '6%',
                                    height: '4%'
                                }}
                                title="Storage Building"
                            ></div>

                            {/* Irrigation Lines */}
                            <div
                                className="absolute bg-blue-500"
                                style={{
                                    left: '20%',
                                    top: '35%',
                                    width: '60%',
                                    height: '2px'
                                }}
                            ></div>
                            <div
                                className="absolute bg-blue-500"
                                style={{
                                    left: '48%',
                                    top: '15%',
                                    width: '2px',
                                    height: '50%'
                                }}
                            ></div>

                            {/* Animal Enclosures */}
                            <div
                                className="absolute border-2 border-yellow-500 bg-yellow-100 bg-opacity-30"
                                style={{
                                    left: '75%',
                                    top: '15%',
                                    width: '15%',
                                    height: '12%'
                                }}
                                title="Chicken Coop Area"
                            ></div>

                            {/* Buffer Zones */}
                            <div
                                className="absolute border border-lime-400 bg-lime-100 bg-opacity-20"
                                style={{
                                    left: '12%',
                                    top: '7%',
                                    width: '76%',
                                    height: '3%'
                                }}
                                title="North Buffer Zone"
                            ></div>

                            {/* Zoom Overlay */}
                            <div
                                className="absolute inset-0 transition-transform duration-300"
                                style={{
                                    transform: `scale(${zoomLevel / 100})`,
                                    transformOrigin: 'center center'
                                }}
                            ></div>

                            {/* Zoom Controls (bottom right) */}
                            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200">
                                <button
                                    onClick={handleZoomIn}
                                    className="block p-2 hover:bg-gray-50 border-b border-gray-200"
                                >
                                    <ZoomIn size={18} />
                                </button>
                                <button
                                    onClick={handleZoomOut}
                                    className="block p-2 hover:bg-gray-50"
                                >
                                    <ZoomOut size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Information */}
                <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                            <span className="font-medium">Total Area:</span> 25.7 acres
                        </div>
                        <div>
                            <span className="font-medium">Fields:</span> 5 active fields
                        </div>
                        <div>
                            <span className="font-medium">Last Updated:</span> September 21, 2025
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
