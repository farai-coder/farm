import React from 'react';

interface CropHeaderProps {
    onAddPlanting: () => void;
    onHarvest: () => void;
}

export const CropHeader: React.FC<CropHeaderProps> = ({ onAddPlanting, onHarvest }) => {
    return (
        <div className="text-white px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-gray-400 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white font-bold text-sm md:text-base">
                    77
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-semibold">767, 767</h1>
                    <p className="text-xs md:text-sm opacity-90">tyt</p>
                </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
                <button
                    onClick={onAddPlanting}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base font-medium"
                >
                    Add Planting
                </button>
                <button
                    onClick={onHarvest}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base font-medium"
                >
                    Harvest
                </button>
                <button className="text-white hover:text-gray-200">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};