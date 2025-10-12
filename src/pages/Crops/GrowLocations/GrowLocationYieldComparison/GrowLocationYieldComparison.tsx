import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChevronDown, X, Plus } from 'lucide-react';

export const GrowLocationYieldComparison = () => {
    const [selectedCrop, setSelectedCrop] = useState('Tomatoes');
    const [timeRange, setTimeRange] = useState('Last 6 Months');
    const [selectedFields, setSelectedFields] = useState(['Northwest Field A', 'South Field B']);
    const [showFieldSelector, setShowFieldSelector] = useState(false);

    // Available fields for selection
    const availableFields = [
        { id: 1, name: 'Northwest Field A', size: '2.5 Acres', crop: 'Tomatoes' },
        { id: 2, name: 'South Field B', size: '3.2 Acres', crop: 'Tomatoes' },
        { id: 3, name: 'East Greenhouse', size: '1.8 Acres', crop: 'Lettuce' },
        { id: 4, name: 'West Field C', size: '4.1 Acres', crop: 'Carrots' },
        { id: 5, name: 'Central Plot D', size: '2.8 Acres', crop: 'Peppers' },
    ];

    // Sample yield data for different fields
    const yieldData = [
        {
            period: 'Jan 2024',
            northwest: 1420,
            south: 1280,
            east: 980,
            west: 1560,
            central: 1120
        },
        {
            period: 'Feb 2024',
            northwest: 1680,
            south: 1450,
            east: 1050,
            west: 1720,
            central: 1280
        },
        {
            period: 'Mar 2024',
            northwest: 1220,
            south: 1320,
            east: 920,
            west: 1480,
            central: 1180
        },
        {
            period: 'Apr 2024',
            northwest: 1470,
            south: 1380,
            east: 1100,
            west: 1620,
            central: 1350
        },
        {
            period: 'May 2024',
            northwest: 1720,
            south: 1520,
            east: 1250,
            west: 1780,
            central: 1420
        },
        {
            period: 'Jun 2024',
            northwest: 1950,
            south: 1680,
            east: 1380,
            west: 1920,
            central: 1580
        },
    ];

    // Field colors for charts
    const fieldColors = {
        northwest: '#10b981', // green
        south: '#3b82f6',     // blue
        east: '#8b5cf6',      // purple
        west: '#f59e0b',      // amber
        central: '#ef4444'    // red
    };

    // Field display names
    const fieldNames = {
        northwest: 'Northwest Field A',
        south: 'South Field B',
        east: 'East Greenhouse',
        west: 'West Field C',
        central: 'Central Plot D'
    };

    // Filter data based on selected fields
    const getFilteredData = () => {
        return yieldData.map(item => {
            const filteredItem: any = { period: item.period };
            selectedFields.forEach(field => {
                const fieldKey = getFieldKey(field);
                if (fieldKey && item[fieldKey] !== undefined) {
                    filteredItem[fieldKey] = item[fieldKey];
                }
            });
            return filteredItem;
        });
    };

    const getFieldKey = (fieldName: string) => {
        const mapping: { [key: string]: string } = {
            'Northwest Field A': 'northwest',
            'South Field B': 'south',
            'East Greenhouse': 'east',
            'West Field C': 'west',
            'Central Plot D': 'central'
        };
        return mapping[fieldName];
    };

    const getFieldColor = (fieldName: string) => {
        const key = getFieldKey(fieldName);
        return fieldColors[key as keyof typeof fieldColors] || '#6b7280';
    };

    const toggleFieldSelection = (fieldName: string) => {
        setSelectedFields(prev => {
            if (prev.includes(fieldName)) {
                return prev.filter(f => f !== fieldName);
            } else {
                return [...prev, fieldName];
            }
        });
    };

    const removeField = (fieldName: string) => {
        setSelectedFields(prev => prev.filter(f => f !== fieldName));
    };

    const addAllFields = () => {
        setSelectedFields(availableFields.map(field => field.name));
    };

    const clearAllFields = () => {
        setSelectedFields([]);
    };

    // Sample comparison data for the table
    const comparisonData = availableFields
        .filter(field => selectedFields.includes(field.name))
        .map(field => {
            const fieldKey = getFieldKey(field.name);
            const fieldData = yieldData.reduce((acc, month) => {
                return acc + (month[fieldKey as keyof typeof month] as number);
            }, 0);

            return {
                id: field.id,
                field: field.name,
                size: field.size,
                crop: field.crop,
                color: getFieldColor(field.name),
                jan: `${yieldData[0][fieldKey as keyof typeof yieldData[0]]} lbs`,
                feb: `${yieldData[1][fieldKey as keyof typeof yieldData[1]]} lbs`,
                mar: `${yieldData[2][fieldKey as keyof typeof yieldData[2]]} lbs`,
                apr: `${yieldData[3][fieldKey as keyof typeof yieldData[3]]} lbs`,
                may: `${yieldData[4][fieldKey as keyof typeof yieldData[4]]} lbs`,
                jun: `${yieldData[5][fieldKey as keyof typeof yieldData[5]]} lbs`,
                total: `${fieldData.toLocaleString()} lbs`,
                avg: `${Math.round(fieldData / yieldData.length).toLocaleString()} lbs`,
                yieldPerAcre: `${Math.round(fieldData / parseFloat(field.size))} lbs/acre`
            };
        });

    const periods = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm flex items-center" style={{ color: entry.color }}>
                            <span
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: entry.color }}
                            ></span>
                            {entry.name}: {entry.value} lbs
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Field Yield Comparison</h1>
                        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                            <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                                Export Report
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Field Selector */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Compare Fields:</span>
                            <div className="relative">
                                <button
                                    onClick={() => setShowFieldSelector(!showFieldSelector)}
                                    className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <span>
                                        {selectedFields.length === 0
                                            ? 'Select fields...'
                                            : `${selectedFields.length} field${selectedFields.length !== 1 ? 's' : ''} selected`
                                        }
                                    </span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </button>

                                {showFieldSelector && (
                                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        <div className="p-3 border-b border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-700">Select Fields</span>
                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={addAllFields}
                                                        className="text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        All
                                                    </button>
                                                    <span className="text-gray-300">|</span>
                                                    <button
                                                        onClick={clearAllFields}
                                                        className="text-xs text-red-600 hover:text-red-800"
                                                    >
                                                        None
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                                {availableFields.map(field => (
                                                    <label key={field.id} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFields.includes(field.name)}
                                                            onChange={() => toggleFieldSelection(field.name)}
                                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                        />
                                                        <span className="text-sm text-gray-700">{field.name}</span>
                                                        <span className="text-xs text-gray-500">({field.size})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-2 bg-gray-50 border-t border-gray-200">
                                            <button
                                                onClick={() => setShowFieldSelector(false)}
                                                className="w-full text-center text-sm text-gray-600 hover:text-gray-800 py-1"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Crop:</span>
                            <div className="relative">
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="Tomatoes">Tomatoes</option>
                                    <option value="Lettuce">Lettuce</option>
                                    <option value="Peppers">Peppers</option>
                                    <option value="Carrots">Carrots</option>
                                    <option value="All Crops">All Crops</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Time Range:</span>
                            <div className="relative">
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="Last 3 Months">Last 3 Months</option>
                                    <option value="Last 6 Months">Last 6 Months</option>
                                    <option value="Last Year">Last Year</option>
                                    <option value="Year to Date">Year to Date</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Selected Fields Display */}
                    {selectedFields.length > 0 && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                {selectedFields.map(field => (
                                    <div
                                        key={field}
                                        className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1"
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: getFieldColor(field) }}
                                        ></span>
                                        <span className="text-sm text-blue-800">{field}</span>
                                        <button
                                            onClick={() => removeField(field)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {selectedFields.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Fields Selected</h3>
                        <p className="text-gray-500 mb-4">Select fields from the dropdown above to compare their yields.</p>
                        <button
                            onClick={() => setShowFieldSelector(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                            Select Fields to Compare
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Yield</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {comparisonData.reduce((acc, field) => {
                                                const total = parseInt(field.total.replace(/[^0-9]/g, ''));
                                                return acc + total;
                                            }, 0).toLocaleString()} lbs
                                        </p>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Across {selectedFields.length} fields</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Average Yield per Field</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {Math.round(comparisonData.reduce((acc, field) => {
                                                const avg = parseInt(field.avg.replace(/[^0-9]/g, ''));
                                                return acc + avg;
                                            }, 0) / comparisonData.length).toLocaleString()} lbs
                                        </p>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Monthly average</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Highest Performing</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {comparisonData.reduce((max, field) => {
                                                const total = parseInt(field.total.replace(/[^0-9]/g, ''));
                                                const maxTotal = parseInt(max.total.replace(/[^0-9]/g, ''));
                                                return total > maxTotal ? field : max;
                                            }).field}
                                        </p>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">By total yield</p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">FIELD YIELD COMPARISON</h3>
                                <p className="text-xs text-gray-500">Comparing selected fields over time</p>
                            </div>

                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={getFilteredData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="period"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#666' }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#666' }}
                                            domain={[0, 2500]}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        {selectedFields.map(field => {
                                            const fieldKey = getFieldKey(field);
                                            return (
                                                <Line
                                                    key={fieldKey}
                                                    name={field}
                                                    type="monotone"
                                                    dataKey={fieldKey}
                                                    stroke={getFieldColor(field)}
                                                    strokeWidth={3}
                                                    dot={{ fill: getFieldColor(field), strokeWidth: 2, r: 4 }}
                                                    activeDot={{ r: 6, stroke: getFieldColor(field), strokeWidth: 2 }}
                                                />
                                            );
                                        })}
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
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                                Field
                                            </th>
                                            {periods.map(period => (
                                                <th key={period} className="px-3 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                                    {period}
                                                </th>
                                            ))}
                                            <th className="px-3 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                                Total
                                            </th>
                                            <th className="px-3 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                                Average
                                            </th>
                                            <th className="px-3 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Yield/Acre
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {comparisonData.map((field) => (
                                            <tr key={field.id} className="hover:bg-gray-50">
                                                <td className="px-4 sm:px-6 py-4 border-r border-gray-200">
                                                    <div className="flex items-center space-x-3">
                                                        <div
                                                            className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                                                            style={{ backgroundColor: field.color, borderColor: field.color }}
                                                        ></div>
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="text-sm font-medium text-gray-900 truncate">
                                                                {field.field}
                                                            </span>
                                                            <span className="text-xs text-gray-500 truncate">
                                                                {field.size} • {field.crop}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.jan}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.feb}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.mar}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.apr}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.may}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.jun}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm font-semibold text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.total}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm font-semibold text-gray-900 border-r border-gray-200">
                                                    <span className="whitespace-nowrap">{field.avg}</span>
                                                </td>
                                                <td className="px-3 sm:px-4 py-4 text-center text-sm font-semibold text-gray-900">
                                                    <span className="whitespace-nowrap">{field.yieldPerAcre}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};