import React from 'react';
import { Trash2 } from 'lucide-react';

interface PlantingsHeaderProps {
    onEditPlant: () => void;
    onNewPlanting: () => void;
    onNewHarvest: () => void;
}

export const PlantingsHeader: React.FC<PlantingsHeaderProps> = ({
    onEditPlant,
    onNewPlanting,
    onNewHarvest
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    🌶️
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Peppers (Hot), Thai Dragon</h1>
                    <p className="text-sm text-gray-600">Capsicum annuum, Hot</p>
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">PERTH</span>
                </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 self-end sm:self-auto">
                <button
                    onClick={onEditPlant}
                    className="bg-gray-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base"
                >
                    Edit Plant
                </button>
                <button
                    onClick={onNewPlanting}
                    className="bg-green-600 hover:bg-gray-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base"
                >
                    New Planting
                </button>
                <button
                    onClick={onNewHarvest}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base"
                >
                    New Harvest
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </button>
            </div>
        </div>
    );
};