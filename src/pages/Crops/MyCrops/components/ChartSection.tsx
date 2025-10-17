import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../../types/planting';

interface ChartSectionProps {
    expectedPoundsData: ChartData[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ expectedPoundsData }) => {
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [yieldUnit, setYieldUnit] = useState<string>('lbs');

    // Mock locations data
    const locations = [
        { value: 'all', label: 'All Locations' },
        { value: 'southeast', label: 'Southeast Field A' },
        { value: 'northeast', label: 'Northeast Field B' },
        { value: 'west', label: 'West Field C' }
    ];

    const units = [
        { value: 'lbs', label: 'Pounds (lbs)' },
        { value: 'kg', label: 'Kilograms (kg)' },
        { value: 'tons', label: 'Tons' }
    ];

    // Green theme color scheme
    const colors = {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#047857',
        background: '#f0fdf4',
        grid: '#dcfce7',
        text: '#166534'
    };

    // Convert units function
    const convertValue = (value: number, unit: string): number => {
        switch (unit) {
            case 'kg':
                return value * 0.453592;
            case 'tons':
                return value * 0.000453592;
            default:
                return value;
        }
    };

    const getUnitSymbol = (unit: string): string => {
        switch (unit) {
            case 'kg':
                return 'kg';
            case 'lbs':
                return 'lbs';
            case 'tons':
                return 't';
            default:
                return 'lbs';
        }
    };

    // Generate enhanced data with unit conversion and accumulated values
    const enhancedData = useMemo(() => {
        return expectedPoundsData.map(item => {
            const totalValue = item.northwest + item.northwestB + item.northwestC;
            return {
                ...item,
                total: convertValue(totalValue, yieldUnit)
            };
        });
    }, [expectedPoundsData, yieldUnit]);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="text-sm text-gray-600">{entry.name}:</span>
                            </div>
                            <span className="text-sm font-semibold" style={{ color: entry.color }}>
                                {entry.value.toFixed(1)} {getUnitSymbol(yieldUnit)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">3 Locations Planted</h2>
                <p className="text-sm text-gray-600 mb-2 sm:mb-4">Planned Jan. 01, 2022 - Jan. 12, 2022</p>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">EXPECTED YIELD PER WEEK</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Plantings Forecast</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-auto">
                        {/* Location Filter */}
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                Location
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm bg-white"
                            >
                                {locations.map(location => (
                                    <option key={location.value} value={location.value}>
                                        {location.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Units Filter */}
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                Units
                            </label>
                            <select
                                value={yieldUnit}
                                onChange={(e) => setYieldUnit(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm bg-white"
                            >
                                {units.map(unit => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Active Filters Display */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        Location: {locations.find(l => l.value === selectedLocation)?.label}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        Units: {getUnitSymbol(yieldUnit).toUpperCase()}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        Period: Jan 01, 2022 - Jan 12, 2022
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Weekly Yield Projection</h3>
                        <p className="text-sm text-gray-600">Total expected yield per week from all locations</p>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border">
                        Unit: {getUnitSymbol(yieldUnit)}
                    </div>
                </div>

                <div className="h-48 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={enhancedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: colors.text, fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: colors.text, fontSize: 12 }}
                                tickFormatter={(value) => `${value}${getUnitSymbol(yieldUnit)}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke={colors.primary}
                                strokeWidth={3}
                                dot={{
                                    fill: colors.primary,
                                    strokeWidth: 1,
                                    r: 3,
                                    stroke: colors.primary
                                }}
                                activeDot={{
                                    r: 5,
                                    fill: colors.primary,
                                    stroke: colors.primary,
                                    strokeWidth: 2
                                }}
                                name="Total Yield"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-600"></div>
                            <span>Total Yield (All Locations)</span>
                        </div>
                    </div>
                    <div className="text-gray-500">
                        {locations.find(l => l.value === selectedLocation)?.label}
                    </div>
                </div>
            </div>
        </div>
    );
};