import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

export const YieldComparison = () => {
    const [selectedType, setSelectedType] = useState('Tomatoes');

    // Sample yield data for the chart
    const yieldData = [
        { week: 'Week 1', roma: 142, sanMarzano: 327 },
        { week: 'Week 2', roma: 168, sanMarzano: 261 },
        { week: 'Week 3', roma: 122, sanMarzano: 243 },
        { week: 'Week 4', roma: 147, sanMarzano: 112 },
        { week: 'Week 5', roma: 172, sanMarzano: 456 },
    ];

    // Sample variety data for the table
    const varietyData = [
        {
            id: 1,
            variety: 'Tomatoes, Roma',
            code: 'Tom-Rom',
            color: '#ef4444', // red
            week1: '142.00 Pounds',
            week2: '168.00 Pounds',
            week3: '122.00 Pounds',
            week4: '147.00 Pounds',
            week5: '172.00 Pounds'
        },
        {
            id: 2,
            variety: 'Tomatoes, San Marzano',
            code: 'T-SM',
            color: '#f97316', // orange
            week1: '327.00 Pounds',
            week2: '261.00 Pounds',
            week3: '243.00 Pounds',
            week4: '112.00 Pounds',
            week5: '456.00 Pounds'
        }
    ];

    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Plant Variety Yield Comparison</h1>

                    {/* Type Selector */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Type:</span>
                        <div className="relative">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="Tomatoes">Tomatoes</option>
                                <option value="Peppers">Peppers</option>
                                <option value="Lettuce">Lettuce</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">VARIETY YIELD BY WEEK</h3>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={yieldData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="week"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#666' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#666' }}
                                    domain={[0, 500]}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="roma"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="sanMarzano"
                                    stroke="#f97316"
                                    strokeWidth={2}
                                    dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        Variety
                                    </th>
                                    {weeks.map(week => (
                                        <th key={week} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                                            {week}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {varietyData.map((variety) => (
                                    <tr key={variety.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border-r border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-4 h-4 rounded-full border-2"
                                                    style={{ backgroundColor: variety.color, borderColor: variety.color }}
                                                ></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                        {variety.variety}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{variety.code}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                            {variety.week1}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                            {variety.week2}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                            {variety.week3}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                            {variety.week4}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-900">
                                            {variety.week5}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
