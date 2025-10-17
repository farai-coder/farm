import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    locations: string[];
    plantingsByLocation: {
        location: string;
        plantings: number;
    }[];
}

interface PlantingsChartProps {
    chartData: ChartData;
}

export const HistoryPlantingChart: React.FC<PlantingsChartProps> = ({ chartData }) => {
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [yieldUnit, setYieldUnit] = useState<string>('lbs');
    const [selectedYear, setSelectedYear] = useState<string>('2025');

    // Future plantings data
    const futurePlantingsData = [
        { week: 'Oct 27', date: '2025-10-27', value: 40 },
        { week: 'Nov 10', date: '2025-11-10', value: 85 },
        { week: 'Nov 24', date: '2025-11-24', value: 130 },
        { week: 'Dec 8', date: '2025-12-08', value: 175 },
        { week: 'Dec 22', date: '2025-12-22', value: 220 },
        { week: 'Jan 5', date: '2026-01-05', value: 260 },
        { week: 'Jan 19', date: '2026-01-19', value: 285 },
        { week: 'Feb 2', date: '2026-02-02', value: 300 }
    ];

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

    // Years data
    const years = [
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' }
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

    // Generate enhanced future plantings data
    const enhancedPlantingsData = useMemo(() => {
        return futurePlantingsData.map(item => ({
            ...item,
            convertedValue: convertValue(item.value, yieldUnit)
        }));
    }, [yieldUnit]);

    // Calculate metrics for summary cards
    const totalExpected = enhancedPlantingsData.reduce((sum, item) => sum + item.convertedValue, 0);
    const peakYield = Math.max(...enhancedPlantingsData.map(item => item.convertedValue));
    const growthPercentage = ((enhancedPlantingsData[enhancedPlantingsData.length - 1].convertedValue - enhancedPlantingsData[0].convertedValue) / enhancedPlantingsData[0].convertedValue) * 100;

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
            {/* Filters Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Future Plantings Forecast</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-auto">
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

                        {/* Year Filter */}
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                Year
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm bg-white"
                            >
                                {years.map(year => (
                                    <option key={year.value} value={year.value}>
                                        {year.label}
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
                        Year: {selectedYear}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        Units: {getUnitSymbol(yieldUnit).toUpperCase()}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        Period: Oct 27, 2025 - Feb 2, 2026
                    </div>
                </div>
            </div>

            {/* Future Plantings Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Weekly Yield Projection</h3>
                        <p className="text-sm text-gray-600">Expected pounds per week from future plantings</p>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border">
                        Unit: {getUnitSymbol(yieldUnit)}
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={enhancedPlantingsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                            <XAxis
                                dataKey="week"
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
                                dataKey="convertedValue"
                                stroke={colors.primary}
                                strokeWidth={3}
                                dot={{
                                    fill: colors.primary,
                                    strokeWidth: 1,
                                    r: 2, // Very small dots
                                    stroke: colors.primary
                                }}
                                activeDot={{
                                    r: 4, // Slightly larger on hover
                                    fill: colors.primary,
                                    stroke: colors.primary,
                                    strokeWidth: 2
                                }}
                                name="Expected Yield"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-600"></div>
                            <span>Expected Yield</span>
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