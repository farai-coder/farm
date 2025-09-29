import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';

export const ClimateGauges = () => {
    const [selectedGauge, setSelectedGauge] = useState(null);

    // Mock gauge data
    const gauges = [
        {
            id: 1,
            name: "Weather Station - Field A",
            location: "Northwest Field A",
            status: "Online",
            lastReading: "2 hours ago"
        },
        {
            id: 2,
            name: "Weather Station - Field B",
            location: "Northwest Field B",
            status: "Online",
            lastReading: "1 hour ago"
        },
        {
            id: 3,
            name: "Weather Station - Field C",
            location: "Northwest Field C",
            status: "Online",
            lastReading: "30 min ago"
        },
        {
            id: 4,
            name: "Displaying all 3 records",
            location: "",
            status: "",
            lastReading: "",
            isFooter: true
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Gauges</h1>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Add Gauge Button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Add Gauge</span>
                        </button>
                    </div>
                </div>

                {/* Gauges Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                        <div className="col-span-4">NAME</div>
                        <div className="col-span-3">LOCATION</div>
                        <div className="col-span-2">STATUS</div>
                        <div className="col-span-2">LAST READING</div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Gauge Rows */}
                    <div className="divide-y divide-gray-200">
                        {gauges.map((gauge) => (
                            <div key={gauge.id}>
                                {!gauge.isFooter ? (
                                    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                                        <div className="col-span-4">
                                            <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {gauge.name}
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {gauge.location}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {gauge.status}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {gauge.lastReading}
                                            </span>
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                                        <div className="text-sm text-gray-600">
                                            {gauge.name}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};