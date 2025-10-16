import React from 'react';
import { Calendar, Search } from 'lucide-react';

interface DateRange {
    from: string;
    to: string;
}

interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    dateRange: DateRange;
    onDateRangeChange: (range: DateRange) => void;
    onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    onSearchChange,
    dateRange,
    onDateRangeChange,
    onClearFilters
}) => {
    const hasActiveFilters = searchTerm || dateRange.from || dateRange.to;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search crops, locations, varieties..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="text-gray-400 w-4 h-4" />
                        <span className="text-sm text-gray-600 whitespace-nowrap">From:</span>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">To:</span>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
};
