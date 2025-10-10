import React from 'react';

interface EmptyPlantingHistoryProps {
    onAddPlanting: () => void;
}

export const EmptyPlantingHistory: React.FC<EmptyPlantingHistoryProps> = ({ onAddPlanting }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-12 text-center">
            <div className="text-gray-400 mb-3 md:mb-4">
                <svg className="w-8 h-8 md:w-12 md:h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-2">No Planting History</h3>
            <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">Start by adding your first planting to see history here.</p>
            <button
                onClick={onAddPlanting}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base font-medium"
            >
                Add First Planting
            </button>
        </div>
    );
};