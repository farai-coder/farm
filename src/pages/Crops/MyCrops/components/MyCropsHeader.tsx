import React from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

interface MyCropsHeaderProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewCropType: () => void;
    onAddPlanting: () => void;
    showTabs?: boolean;
}

export const MyCropsHeader: React.FC<MyCropsHeaderProps> = ({
    searchTerm,
    onSearchChange,
    onNewCropType,
    onAddPlanting,
    showTabs = false
}) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">My Crops</h1>
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                        onClick={onNewCropType}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none text-center"
                    >
                        New Crop Type
                    </button>
                    <button
                        onClick={onAddPlanting}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none text-center"
                    >
                        Add Planting
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                {showTabs && (
                    <div className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto pb-2">
                        <button className="pb-2 text-sm font-medium text-green-600 border-b-2 border-green-600 whitespace-nowrap">All Types</button>
                        <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Currently Planted</button>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Crops"
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full"
                        />
                    </div>
                    <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filter</span>
                    </button>
                </div>
            </div>
        </>
    );
};