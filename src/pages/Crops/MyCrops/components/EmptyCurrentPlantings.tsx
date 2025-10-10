import React from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

interface EmptyCurrentPlantingsProps {
    onNewPlanting: () => void;
    onAddCropType: () => void;
}

export const EmptyCurrentPlantings: React.FC<EmptyCurrentPlantingsProps> = ({
    onNewPlanting,
    onAddCropType
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Page Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">My Current Plantings</h1>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                            onClick={onNewPlanting}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                        >
                            New Planting
                        </button>
                        <button
                            onClick={onAddCropType}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                        >
                            Add Crop Type
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Plantings"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <button className="sm:ml-4 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filter</span>
                    </button>
                </div>
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4 sm:px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 text-center">No current plantings yet?</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md text-sm sm:text-base">
                        Start by creating your first planting to track your crops and harvest schedule.
                    </p>
                    <button
                        onClick={onNewPlanting}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                    >
                        Create First Planting
                    </button>
                </div>
            </div>
        </div>
    );
};