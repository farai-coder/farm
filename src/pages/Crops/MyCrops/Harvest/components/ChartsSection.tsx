import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    location: string;
    value: number;
}

interface WeeklyYieldData {
    week: string;
    yield: number;
    location?: string;
}

interface ChartsSectionProps {
    harvestChartData: ChartData[];
    weeklyYieldData: WeeklyYieldData[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
    harvestChartData,
    weeklyYieldData
}) => {
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('2024');
    const [dateRange, setDateRange] = useState<string>('last-30-days');
    const [yieldUnit, setYieldUnit] = useState<string>('kg');

    // Mock locations and years data
    const locations = [
        { value: 'all', label: 'All Locations' },
        { value: 'north', label: 'North Field' },
        { value: 'south', label: 'South Field' },
        { value: 'east', label: 'East Field' },
        { value: 'west', label: 'West Field' }
    ];

    const years = ['2022', '2023', '2024', '2025'];
    const dateRanges = [
        { value: 'last-7-days', label: 'Last 7 Days' },
        { value: 'last-30-days', label: 'Last 30 Days' },
        { value: 'last-90-days', label: 'Last 90 Days' },
        { value: 'year-to-date', label: 'Year to Date' }
    ];

    const units = [
        { value: 'kg', label: 'Kilograms (kg)' },
        { value: 'lb', label: 'Pounds (lb)' },
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
            case 'lb':
                return value * 2.20462;
            case 'tons':
                return value / 1000;
            default:
                return value;
        }
    };

    const getUnitSymbol = (unit: string): string => {
        switch (unit) {
            case 'kg':
                return 'kg';
            case 'lb':
                return 'lb';
            case 'tons':
                return 't';
            default:
                return 'kg';
        }
    };

    // Generate meaningful harvest data for line chart
    const generateHarvestData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(month => ({
            month,
            harvest: convertValue(Math.floor(Math.random() * 1000) + 500, yieldUnit),
            target: convertValue(800, yieldUnit)
        }));
    };

    // Generate enhanced weekly yield data with multiple locations
    const generateWeeklyYieldData = () => {
        const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
        const locationsData = {
            north: weeks.map(week => ({ week, yield: Math.floor(Math.random() * 400) + 200 })),
            south: weeks.map(week => ({ week, yield: Math.floor(Math.random() * 450) + 180 })),
            east: weeks.map(week => ({ week, yield: Math.floor(Math.random() * 380) + 220 })),
            west: weeks.map(week => ({ week, yield: Math.floor(Math.random() * 420) + 190 }))
        };

        if (selectedLocation === 'all') {
            return weeks.map((week, index) => ({
                week,
                average: (locationsData.north[index].yield + locationsData.south[index].yield +
                    locationsData.east[index].yield + locationsData.west[index].yield) / 4,
                north: locationsData.north[index].yield,
                south: locationsData.south[index].yield,
                east: locationsData.east[index].yield,
                west: locationsData.west[index].yield
            }));
        } else {
            return locationsData[selectedLocation as keyof typeof locationsData].map(item => ({
                ...item,
                yield: convertValue(item.yield, yieldUnit)
            }));
        }
    };

    const harvestData = useMemo(() => generateHarvestData(), [yieldUnit]);
    const weeklyYieldDataEnhanced = useMemo(() => generateWeeklyYieldData(), [selectedLocation, yieldUnit]);

    // Calculate metrics for summary cards
    const totalHarvest = harvestData.reduce((sum, item) => sum + item.harvest, 0);
    const avgWeeklyYield = weeklyYieldDataEnhanced.reduce((sum, item) => sum + (item.average || item.yield), 0) / weeklyYieldDataEnhanced.length || 0;
    const performancePercentage = ((harvestData.reduce((sum, item) => sum + item.harvest, 0) / harvestData.reduce((sum, item) => sum + item.target, 0)) * 100);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {entry.name}: {entry.value.toFixed(1)} {getUnitSymbol(yieldUnit)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Key Metrics Summary - Moved to top */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Harvest Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-green-700 mb-2">Total Harvest</p>
                            <p className="text-3xl font-bold text-green-900">
                                {totalHarvest.toLocaleString()}<span className="text-lg text-green-600 ml-1">{getUnitSymbol(yieldUnit)}</span>
                            </p>
                            <p className="text-xs text-green-600 mt-2">Cumulative production</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Average Weekly Yield Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-green-700 mb-2">Avg Weekly Yield</p>
                            <p className="text-3xl font-bold text-green-900">
                                {avgWeeklyYield.toFixed(0)}<span className="text-lg text-green-600 ml-1">{getUnitSymbol(yieldUnit)}</span>
                            </p>
                            <p className="text-xs text-green-600 mt-2">Weekly average</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Performance vs Target Card */}
                <div className={`bg-gradient-to-br rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border ${performancePercentage >= 100
                        ? 'from-emerald-50 to-green-50 border-emerald-200'
                        : performancePercentage >= 80
                            ? 'from-amber-50 to-orange-50 border-amber-200'
                            : 'from-red-50 to-rose-50 border-red-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold mb-2" style={{
                                color: performancePercentage >= 100 ? '#047857' :
                                    performancePercentage >= 80 ? '#b45309' : '#dc2626'
                            }}>
                                Performance vs Target
                            </p>
                            <p className="text-3xl font-bold" style={{
                                color: performancePercentage >= 100 ? '#065f46' :
                                    performancePercentage >= 80 ? '#92400e' : '#991b1b'
                            }}>
                                {performancePercentage.toFixed(1)}%
                            </p>
                            <p className="text-xs mt-2" style={{
                                color: performancePercentage >= 100 ? '#059669' :
                                    performancePercentage >= 80 ? '#d97706' : '#e11d48'
                            }}>
                                {performancePercentage >= 100 ? 'Target achieved' :
                                    performancePercentage >= 80 ? 'Close to target' : 'Below target'}
                            </p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${performancePercentage >= 100
                                ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                                : performancePercentage >= 80
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                                    : 'bg-gradient-to-br from-red-500 to-rose-600'
                            }`}>
                            {performancePercentage >= 100 ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : performancePercentage >= 80 ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Chart Filters</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
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
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                                Date Range
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm bg-white"
                            >
                                {dateRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
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
                        Range: {dateRanges.find(r => r.value === dateRange)?.label}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        Units: {getUnitSymbol(yieldUnit).toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Charts Grid - Both as Line Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Harvest Line Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Monthly Harvest Trend</h3>
                            <p className="text-sm text-gray-600">Harvest progression throughout {selectedYear}</p>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border">
                            Unit: {getUnitSymbol(yieldUnit)}
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={harvestData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                                <XAxis
                                    dataKey="month"
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
                                    dataKey="harvest"
                                    stroke={colors.primary}
                                    strokeWidth={3}
                                    dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: colors.primary }}
                                    name="Actual Harvest"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke={colors.accent}
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: colors.accent, strokeWidth: 2, r: 3 }}
                                    name="Target"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                <span>Actual Harvest</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5 bg-green-800 border-b border-dashed border-green-800"></div>
                                <span>Target</span>
                            </div>
                        </div>
                        <div className="text-gray-500">
                            {selectedLocation !== 'all' ? locations.find(l => l.value === selectedLocation)?.label : 'All Locations'}
                        </div>
                    </div>
                </div>

                {/* Weekly Yield Trend Line Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Weekly Yield Trend</h3>
                            <p className="text-sm text-gray-600">Yield progression since planting</p>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border">
                            Unit: {getUnitSymbol(yieldUnit)}
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyYieldDataEnhanced}>
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
                                {selectedLocation === 'all' ? (
                                    <>
                                        <Line
                                            type="monotone"
                                            dataKey="average"
                                            stroke={colors.primary}
                                            strokeWidth={3}
                                            dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, fill: colors.primary }}
                                            name="Average Yield"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="north"
                                            stroke="#86efac"
                                            strokeWidth={2}
                                            strokeDasharray="3 3"
                                            dot={false}
                                            name="North Field"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="south"
                                            stroke="#bbf7d0"
                                            strokeWidth={2}
                                            strokeDasharray="3 3"
                                            dot={false}
                                            name="South Field"
                                        />
                                    </>
                                ) : (
                                    <Line
                                        type="monotone"
                                        dataKey="yield"
                                        stroke={colors.secondary}
                                        strokeWidth={3}
                                        dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: colors.secondary }}
                                        name={`${locations.find(l => l.value === selectedLocation)?.label} Yield`}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                        <div>
                            {selectedLocation === 'all'
                                ? 'Showing average across all locations'
                                : `Showing data for ${locations.find(l => l.value === selectedLocation)?.label}`
                            }
                        </div>
                        <div className="text-gray-500">
                            {dateRanges.find(r => r.value === dateRange)?.label}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};