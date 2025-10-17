import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Sprout, Trash2 } from 'lucide-react';
import cropVarieties from '../../crop_varieties.json';

interface PlantingsHeaderProps {
    onEditPlant: () => void;
    onNewPlanting: () => void;
    onNewHarvest: () => void;
    onBulkPlant: () => void;
    onCalculatePlanting: () => void;
}

export const PlantingsHeader: React.FC<PlantingsHeaderProps> = ({
    onEditPlant,
    onNewPlanting,
    onNewHarvest,
    onBulkPlant,
    onCalculatePlanting
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get the first crop variety as an example
    const firstCategory = Object.keys(cropVarieties)[0] as keyof typeof cropVarieties;
    const firstCrop = cropVarieties[firstCategory][0];

    const handleCalculatePlanting = () => {
        console.log('Calculate Planting clicked');
        onCalculatePlanting();
        setIsModalOpen(false);
    };

    const handleBulkPlant = () => {
        console.log('Bulk Plant clicked');
        onBulkPlant();
        setIsModalOpen(false);
    };

    const handleDeleteCropType = () => {
        console.log('Delete Crop Type clicked');
        setIsModalOpen(false);
    };

    const handleThreeDotsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(!isModalOpen);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setIsModalOpen(false);
        };

        if (isModalOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <>
            <div className="px-4 md:px-6 py-4">
                <button
                    onClick={() => navigate('/crops/my-crops')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to My Crops
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            {firstCrop.icon}
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{firstCrop.name}</h1>
                            <p className="text-sm text-gray-600">{firstCrop.variety}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 self-end sm:self-auto">
                        <button
                            onClick={onNewPlanting}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base"
                        >
                            New Planting
                        </button>
                        <button
                            onClick={onNewHarvest}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base font-medium"
                        >
                            New Harvest
                        </button>
                        <div className="relative">
                            <button
                                onClick={handleThreeDotsClick}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isModalOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCalculatePlanting();
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-left text-sm"
                                    >
                                        <Calculator size={16} className="text-green-600" />
                                        <span className="text-gray-900">Calculate Planting</span>
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBulkPlant();
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-left text-sm"
                                    >
                                        <Sprout size={16} className="text-green-600" />
                                        <span className="text-gray-900">Bulk Planting</span>
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteCropType();
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-left text-sm"
                                    >
                                        <Trash2 size={16} className="text-green-600" />
                                        <span className="text-gray-900">Delete Crop Type</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};