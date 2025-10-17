import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Sprout, Trash2 } from 'lucide-react';
import cropVarieties from '../../crop_varieties.json';

interface CropHistoryHeaderProps {
    onAddPlanting: () => void;
    onHarvest: () => void;
    onBulkPlant: () => void;
    onCalculatePlanting: () => void;
    onEdit: () => void;
}

export const CropHistoryHeader: React.FC<CropHistoryHeaderProps> = ({
    onAddPlanting,
    onHarvest,
    onBulkPlant,
    onCalculatePlanting,
    onEdit
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
            <div className="text-white px-4 md:px-6 py-4">
                <button
                    onClick={() => navigate('/crops/my-crops')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to My Crops
                </button>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="bg-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white font-bold text-sm md:text-base">
                            {firstCrop.icon}
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold text-gray-600">{firstCrop.name}</h1>
                            <p className="text-xs md:text-sm opacity-90 text-gray-600">{firstCrop.variety}</p>
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
                    </div>
                </div>
            </div>
        </>
    );
};