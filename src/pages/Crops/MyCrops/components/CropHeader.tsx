import React from 'react';

interface CropHeaderProps {
    cropIcon: string; // emoji or initials
    cropName: string;
    cropVariety?: string;
    onAddPlanting: () => void;
    onHarvest: () => void;
}

export const CropHeader: React.FC<CropHeaderProps> = ({
    cropIcon,
    cropName,
    cropVariety,
    onAddPlanting,
    onHarvest,
}) => {
    return (
        <div className="text-gray-900 px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    {cropIcon}
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-semibold">{cropName}</h1>
                    {cropVariety && (
                        <p className="text-sm text-gray-600">{cropVariety}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={onAddPlanting}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm font-medium"
                >
                    Add Planting
                </button>
                <button
                    onClick={onHarvest}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-medium"
                >
                    Harvest
                </button>
            </div>
        </div>
    );
};
