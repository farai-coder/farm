import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BarChart3, FileText, TrendingUp, Calendar, DollarSign, Beaker, Droplet, MapPin, Plus, Download, Eye, Settings, Filter } from 'lucide-react';

export const CropReports = () => {
    const [selectedReport, setSelectedReport] = useState('overview');

    // Pie chart data for note categories
    const noteCategoryData = [
        { name: 'Fertilize', value: 28.57, color: '#10b981' },
        { name: 'Transplant', value: 14.29, color: '#3b82f6' },
        { name: 'Spraying', value: 14.29, color: '#8b5cf6' },
        { name: 'Harvest', value: 14.29, color: '#f59e0b' },
        { name: 'Insects', value: 14.29, color: '#ef4444' },
        { name: 'Weeding', value: 14.29, color: '#ec4899' }
    ];

    // Date planted data
    const datePlantedData = [
        { name: 'Dec 01, 2021', value: 50, color: '#10b981' },
        { name: 'Nov 01, 2021', value: 25, color: '#3b82f6' },
        { name: 'Apr 01, 2022', value: 25, color: '#f59e0b' }
    ];

    // Sample notes/reports data
    const reportsData = [
        {
            description: 'Weeded bed this afternoon',
            date: 'Jan. 19, 2022',
            category: 'Weeding'
        },
        {
            description: 'Saw mites developing - remedy applied',
            date: 'Feb. 09, 2022',
            category: 'Insects'
        },
        {
            description: 'Harvested Dragon peppers totaled at 79% Scrville units',
            date: 'Feb. 08, 2022',
            category: 'Harvest'
        },
        {
            description: 'Transplanted peppers are rooted better than last 6 months seedlings - possibly root inoculant treatment',
            date: 'Jan. 13, 2022',
            category: 'Transplant'
        },
        {
            description: 'Mildew showing on peppers in row 8 - adding treatment for fungus',
            date: 'Feb. 09, 2022',
            category: 'Spraying'
        },
        {
            description: 'Roma tomatoes showing signs of low nitrogen',
            date: 'Feb. 09, 2022',
            category: 'Fertilize'
        },
        {
            description: 'Roma tomatoes green and healthy again',
            date: 'Feb. 23, 2022',
            category: 'Fertilize'
        },
        {
            description: 'Developing all tomatoes',
            date: 'Feb. 23, 2022',
            category: 'Harvest'
        }
    ];

    const reportTypes = [
        { id: 'overview', label: 'Farm Overview', icon: <BarChart3 size={16} /> },
        { id: 'financial', label: 'Financial Reports', icon: <DollarSign size={16} /> },
        { id: 'harvest', label: 'Harvest Reports', icon: <TrendingUp size={16} /> },
        { id: 'treatments', label: 'Treatment Reports', icon: <Droplet size={16} /> },
        { id: 'planning', label: 'Planning Reports', icon: <Calendar size={16} /> }
    ];

    const CustomTooltip = ({ active, payload }: { active: boolean; payload: { name: string; value: number }[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
                    <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
                        <p className="text-gray-600 mt-1">
                            Comprehensive farm reporting and analytics dashboard
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-gray-700 p-2 border border-gray-300 rounded-md">
                            <Filter size={16} />
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                            <Plus size={16} />
                            <span>New Report</span>
                        </button>
                    </div>
                </div>

                {/* Report Type Selector */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center space-x-1">
                        {reportTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedReport(type.id)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${selectedReport === type.id
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {type.icon}
                                <span>{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Note Category Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">NOTE CATEGORY</h3>
                        <div className="flex items-center">
                            <div className="w-48 h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={noteCategoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {noteCategoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="ml-6 space-y-2">
                                {noteCategoryData.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Date Planted Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">DATE PLANTED</h3>
                        <div className="flex items-center">
                            <div className="w-48 h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={datePlantedData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {datePlantedData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} active={datePlantedData.length > 0} payload={[]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="ml-6 space-y-2">
                                {datePlantedData.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reports Data Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Note Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Note Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Note Category
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reportsData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {item.date}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.category === 'Weeding' ? 'bg-pink-100 text-pink-800' :
                                                    item.category === 'Insects' ? 'bg-red-100 text-red-800' :
                                                        item.category === 'Harvest' ? 'bg-yellow-100 text-yellow-800' :
                                                            item.category === 'Transplant' ? 'bg-blue-100 text-blue-800' :
                                                                item.category === 'Spraying' ? 'bg-purple-100 text-purple-800' :
                                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {item.category}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Report Actions */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 8 of 15 total entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
