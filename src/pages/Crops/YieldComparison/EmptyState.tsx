import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CropTypeSelect } from './CropType';
import { Upload, Download, Printer, FileDown, MoreVertical } from 'lucide-react';

interface EmptyStateProps {
    onNewCropType: () => void;
    onAddPlanting: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewCropType, onAddPlanting }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { icon: Upload, label: 'Import', action: 'import' },
        { icon: Download, label: 'Export', action: 'export' },
        { icon: Printer, label: 'Print', action: 'print' },
        { icon: FileDown, label: 'Download', action: 'download' }
    ];

    const handleMenuAction = (action: string) => {
        console.log(`Menu action: ${action}`);
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Plant Variety Yield Comparison</h1>
                    <div className="flex items-center space-x-3">
                        {/* <button
                            onClick={onNewCropType}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            New Crop Type
                        </button>
                        <button
                            onClick={onAddPlanting}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Add Planting
                        </button> */}
                        <div className="relative">
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                    {menuItems.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <button
                                                key={item.action}
                                                onClick={() => handleMenuAction(item.action)}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            >
                                                <IconComponent className="w-4 h-4 mr-3 text-green-600" />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Type Selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Type:</span>
                    <div className="relative">
                        <CropTypeSelect
                            selectedType={'Tomatoes'}
                            onTypeChange={() => { }}
                            required={true}
                        />
                    </div>
                </div>
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center w-full max-w-2xl">
                    <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">No yield data found</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md">
                        No yield data available to display. Add crop types and planting data to see yield comparisons.
                    </p>
                    <button
                        onClick={onNewCropType}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-base font-medium transition-colors"
                    >
                        Add your first crop type
                    </button>
                </div>
            </div>
        </div>
    );
};

export const YieldComparison = () => {
    const [selectedType, setSelectedType] = useState('Tomatoes');
    const [hasData, setHasData] = useState(false); // Set to false to test empty state

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

    // Handler functions for empty state buttons
    const handleNewCropType = () => {
        console.log('Add new crop type clicked');
        // Add your logic here
    };

    const handleAddPlanting = () => {
        console.log('Add planting clicked');
        // Add your logic here
    };

    // If no data, show empty state
    if (!hasData) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <EmptyState
                        onNewCropType={handleNewCropType}
                        onAddPlanting={handleAddPlanting}
                    />
                </div>
            </div>
        );
    }

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
                            <CropTypeSelect
                                selectedType={selectedType}
                                onTypeChange={setSelectedType}
                                required={true}
                            />
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