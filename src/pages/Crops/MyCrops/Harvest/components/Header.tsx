import React from 'react';
import { MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import your crop data (make sure the path is correct)
import cropData from '../../../crop_varieties.json';

interface HeaderProps {
    onHarvestClick: () => void;
    onPlantingClick: () => void;
    currentCrop?: {
        type: string;
        variety: string;
        icon: string;
    };
}

export const Header: React.FC<HeaderProps> = ({
    onHarvestClick,
    onPlantingClick,
    currentCrop = {
        type: 'Tomato',
        variety: 'Roma VF',
        icon: '🍅'
    }
}) => {
    const navigate = useNavigate();

    return (
        <div className="text-white px-4 sm:px-6 py-3 sm:py-4 w-full">
            {/* Back to My Crops button added here */}
            <button
                onClick={() => navigate('/crops/my-crops')}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-3"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to My Crops
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <div className="bg-gray-200 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                        {currentCrop.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-base sm:text-xl font-semibold truncate text-gray-600">{currentCrop.type}</h1>
                        <p className="text-xs sm:text-sm opacity-90 truncate text-gray-600">{currentCrop.variety}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                    <button
                        onClick={onPlantingClick}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm whitespace-nowrap"
                    >
                        Add Planting
                    </button>
                    <button
                        onClick={onHarvestClick}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-2 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm whitespace-nowrap"
                    >
                        Harvest
                    </button>
                    <button className="text-white hover:text-gray-200 p-1 flex-shrink-0">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};