import React, { useState } from 'react';
import { Plus, Search, Filter, ChevronDown, MoreHorizontal } from 'lucide-react';

export const WeatherLogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGauge, setSelectedGauge] = useState('Game - Precipitation - 1');
    const [showFilters, setShowFilters] = useState(false);

    // Mock weather log data
    const weatherLogs = [
        {
            id: 1,
            date: 'May. 11, 2023',
            precip: 1.7,
            tempHigh: 68.1,
            tempLow: 61.1,
            humidity: 80.9,
            moisture: null,
            windSpeed: 1603.0,
            co2: 2290.0,
            lightLevel: null,
            gauge: 'Weather Station Field A'
        },
        {
            id: 2,
            date: 'Jul. 28, 2023',
            precip: 0.2,
            tempHigh: 76.9,
            tempLow: 56.8,
            humidity: 92.0,
            moisture: null,
            windSpeed: 800.0,
            co2: 4299.0,
            lightLevel: null,
            gauge: 'Weather Station Field B'
        }
    ];

    // Generate mock chart data with proper values
    const generateChartData = (points = 12) => {
        return Array.from({ length: points }, (_, i) => ({
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
            value: Math.random() * 100 + 50
        }));
    };

    const precipitationData = generateChartData();
    const temperatureData = generateChartData();
    const humidityData = generateChartData();
    const windSpeedData = generateChartData();

    const ChartComponent = ({ title, data, color = "#374151" }) => {
        const maxValue = Math.max(...data.map(d => d.value));
        
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-600 uppercase mb-4">{title}</h3>
                <div className="h-32 flex items-end justify-between space-x-1">
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                                className="w-full bg-gray-200 rounded-t transition-all duration-300 hover:opacity-80"
                                style={{ 
                                    height: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: color,
                                    minHeight: '2px'
                                }}
                            />
                            <span className="text-xs text-gray-500 mt-1">{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Climate</h1>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Add Climate Log Button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Add Climate Log</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Gauge Selector */}
                        <div className="relative">
                            <select
                                value={selectedGauge}
                                onChange={(e) => setSelectedGauge(e.target.value)}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                                <option>Game - Precipitation - 1</option>
                                <option>Weather Station Field A</option>
                                <option>Weather Station Field B</option>
                                <option>Weather Station Field C</option>
                            </select>
                        </div>

                        {/* Filters */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>

                        {/* Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 pl-4 py-2 w-48 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <ChartComponent
                        title="Average Daily Precipitation (IN)"
                        data={precipitationData}
                        color="#10b981"
                    />
                    <ChartComponent
                        title="Temperature (°F)"
                        data={temperatureData}
                        color="#ef4444"
                    />
                    <ChartComponent
                        title="Average Daily Low (°F)"
                        data={humidityData}
                        color="#3b82f6"
                    />
                    <ChartComponent
                        title="Average Daily High (°F)"
                        data={windSpeedData}
                        color="#f59e0b"
                    />
                </div>

                {/* Weather Logs Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
                        <div className="col-span-1">Date</div>
                        <div className="col-span-1">Precip (IN)</div>
                        <div className="col-span-1">Temp (°F)</div>
                        <div className="col-span-1">Soil Temp (°F)</div>
                        <div className="col-span-1">Humidity (%)</div>
                        <div className="col-span-1">Moisture (IN)</div>
                        <div className="col-span-1">Wind Speed (MPH)</div>
                        <div className="col-span-1">CO2 (Ppm)</div>
                        <div className="col-span-1">Light Level (Lux)</div>
                        <div className="col-span-2">Gauge</div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-gray-200">
                        {weatherLogs.map((log) => (
                            <div key={log.id} className="grid grid-cols-12 gap-2 px-6 py-3 hover:bg-gray-50 transition-colors duration-150 text-sm">
                                <div className="col-span-1 text-gray-900">{log.date}</div>
                                <div className="col-span-1 text-gray-900">{log.precip}</div>
                                <div className="col-span-1 text-gray-900">{log.tempHigh}</div>
                                <div className="col-span-1 text-gray-900">{log.tempLow}</div>
                                <div className="col-span-1 text-gray-900">{log.humidity}</div>
                                <div className="col-span-1 text-gray-500">-</div>
                                <div className="col-span-1 text-gray-900">{log.windSpeed.toFixed(1)}</div>
                                <div className="col-span-1 text-gray-900">{log.co2.toFixed(1)}</div>
                                <div className="col-span-1 text-gray-500">-</div>
                                <div className="col-span-2">
                                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm">
                                        {log.gauge}
                                    </span>
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};