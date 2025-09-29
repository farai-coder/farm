import React, { useState } from 'react';
import { Calendar, BarChart3, TrendingUp } from 'lucide-react';

export const WeatherHistory = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('2023');

    // Mock weather data
    const temperatureData = [
        { date: 'Jan', high: 42, low: 28, avg: 35 },
        { date: 'Feb', high: 46, low: 31, avg: 38 },
        { date: 'Mar', high: 55, low: 38, avg: 46 },
        { date: 'Apr', high: 66, low: 47, avg: 56 },
        { date: 'May', high: 75, low: 56, avg: 65 },
        { date: 'Jun', high: 83, low: 65, avg: 74 },
        { date: 'Jul', high: 88, low: 70, avg: 79 },
        { date: 'Aug', high: 86, low: 68, avg: 77 },
        { date: 'Sep', high: 79, low: 61, avg: 70 },
        { date: 'Oct', high: 68, low: 50, avg: 59 },
        { date: 'Nov', high: 54, low: 39, avg: 46 },
        { date: 'Dec', high: 44, low: 30, avg: 37 }
    ];

    const precipitationData = [
        { date: 'Jan', precipitation: 2.1 },
        { date: 'Feb', precipitation: 1.8 },
        { date: 'Mar', precipitation: 2.9 },
        { date: 'Apr', precipitation: 3.2 },
        { date: 'May', precipitation: 4.1 },
        { date: 'Jun', precipitation: 3.8 },
        { date: 'Jul', precipitation: 2.6 },
        { date: 'Aug', precipitation: 2.9 },
        { date: 'Sep', precipitation: 3.1 },
        { date: 'Oct', precipitation: 2.7 },
        { date: 'Nov', precipitation: 2.3 },
        { date: 'Dec', precipitation: 2.0 }
    ];

    // Daily temperature data (simplified for the line chart)
    const dailyTempData = Array.from({ length: 365 }, (_, i) => ({
        day: i + 1,
        temp: 45 + Math.sin(i / 58) * 25 + Math.random() * 10 - 5
    }));

    // Historical temperature comparison (multiple years)
    const historicalData = Array.from({ length: 12 }, (_, month) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
        temp2021: 35 + month * 4 + Math.random() * 8 - 4,
        temp2022: 38 + month * 4 + Math.random() * 8 - 4,
        temp2023: 40 + month * 4 + Math.random() * 8 - 4
    }));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Weather History</h1>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-2 gap-6">

                    {/* Annual Daily Temperature Chart (Top Left) */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 uppercase">Annual Daily Temperature (°F)</h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">Chart View</span>
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Line Chart */}
                        <div className="h-48 relative">
                            <svg className="w-full h-full" viewBox="0 0 400 180">
                                {/* Grid lines */}
                                {[0, 1, 2, 3, 4].map(i => (
                                    <line key={i} x1="40" y1={40 + i * 25} x2="380" y2={40 + i * 25} stroke="#f3f4f6" strokeWidth="1" />
                                ))}

                                {/* Y-axis labels */}
                                {[80, 60, 40, 20, 0].map((temp, i) => (
                                    <text key={i} x="30" y={48 + i * 25} fontSize="10" fill="#6b7280" textAnchor="end">{temp}</text>
                                ))}

                                {/* Temperature line */}
                                <polyline
                                    fill="none"
                                    stroke="#374151"
                                    strokeWidth="2"
                                    points={dailyTempData.slice(0, 50).map((d, i) =>
                                        `${40 + i * 6.8},${140 - (d.temp - 20) * 2}`
                                    ).join(' ')}
                                />

                                {/* X-axis months */}
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                                    <text key={i} x={60 + i * 26} y="170" fontSize="9" fill="#6b7280" textAnchor="middle">{month}</text>
                                ))}
                            </svg>
                        </div>
                    </div>

                    {/* Historic Temperature (°F) Chart (Top Right) */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 uppercase">Historic Temperature (°F)</h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">Bar Chart</span>
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Stacked Bar Chart */}
                        <div className="h-48">
                            <div className="flex items-end justify-between h-40 space-x-1">
                                {historicalData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="flex flex-col justify-end h-32 w-full max-w-8 space-y-1">
                                            <div
                                                className="bg-blue-400 w-full"
                                                style={{ height: `${(data.temp2023 / 80) * 80}px` }}
                                            ></div>
                                            <div
                                                className="bg-blue-500 w-full"
                                                style={{ height: `${(data.temp2022 / 80) * 80}px` }}
                                            ></div>
                                            <div
                                                className="bg-blue-600 w-full"
                                                style={{ height: `${(data.temp2021 / 80) * 80}px` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Y-axis labels */}
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>0</span>
                                <span>20</span>
                                <span>40</span>
                                <span>60</span>
                                <span>80</span>
                            </div>
                        </div>
                    </div>

                    {/* HDD Precipitation (IN) Chart (Bottom Left) */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 uppercase">HDD Precipitation (IN)</h3>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-teal-500 rounded"></div>
                                    <span className="text-xs text-gray-500">2023</span>
                                </div>
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="h-48">
                            <div className="flex items-end justify-between h-40 space-x-2">
                                {precipitationData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="flex flex-col justify-end h-32 w-full max-w-6">
                                            <div
                                                className="bg-teal-500 w-full rounded-t"
                                                style={{ height: `${(data.precipitation / 5) * 120}px` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-bottom-left">
                                            {data.date}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Y-axis values */}
                            <div className="absolute left-2 top-2 text-xs text-gray-500">
                                <div>4.0</div>
                                <div className="mt-4">3.0</div>
                                <div className="mt-4">2.0</div>
                                <div className="mt-4">1.0</div>
                                <div className="mt-4">0.0</div>
                            </div>
                        </div>
                    </div>

                    {/* Historic Precipitation (IN) Chart (Bottom Right) */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 uppercase">Historic Precipitation (IN)</h3>
                            <div className="flex items-center space-x-2">
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Grouped Bar Chart */}
                        <div className="h-48">
                            <div className="flex items-end justify-between h-40 space-x-1">
                                {precipitationData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="flex justify-center items-end h-32 space-x-px">
                                            <div
                                                className="bg-blue-400 w-2"
                                                style={{ height: `${(data.precipitation * 0.9 / 5) * 120}px` }}
                                            ></div>
                                            <div
                                                className="bg-blue-500 w-2"
                                                style={{ height: `${(data.precipitation / 5) * 120}px` }}
                                            ></div>
                                            <div
                                                className="bg-blue-600 w-2"
                                                style={{ height: `${(data.precipitation * 1.1 / 5) * 120}px` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-bottom-left">
                                            {data.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Notice */}
                <div className="mt-6 text-center">
                    <div className="inline-block bg-gray-600 text-white text-xs px-3 py-1 rounded">
                        Weather data provided courtesy of Weather Underground
                    </div>
                </div>
            </div>
        </div>
    );
};
