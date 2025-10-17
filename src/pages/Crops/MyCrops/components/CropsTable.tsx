import React from 'react';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import cropVarieties from '../../crop_varieties.json';
import { useNavigate } from 'react-router-dom';

interface Crop {
    id: number;
    type: string;
    variety: string;
    botanicalName: string;
    internalId: string;
    startBeforeLastFrost: number;
    daysToEmerge: number;
    plantSpacing: number;
    rowSpacing: number;
    plantingDepth: string;
    averageHeight: string;
    startMethod: string;
    lightProfile: string;
    soilConditions: string;
    plantingDetails: string;
    pruningDetails: string;
    isPerennial: boolean;
    autoCreateTasks: boolean;
    daysToFlower: number;
    daysToMaturity: number;
    harvestWindow: number;
    estimatedLossRate: number;
    harvestUnits: string;
    estimatedRevenue: number;
    expectedYieldPer30: string;
    expectedYieldPerHectare: string;
}

interface CropsTableProps {
    crops: Crop[];
    activeDropdown: number | null;
    onToggleDropdown: (cropId: number | null) => void;
    onCropClick: (cropId: number) => void;
    onNewPlanting: () => void;
}

export const CropsTable: React.FC<CropsTableProps> = ({
    crops,
    activeDropdown,
    onToggleDropdown,
    onCropClick,
    onNewPlanting
}) => {
    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const toggleDropdown = (cropId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleDropdown(activeDropdown === cropId ? null : cropId);
    };

    const navigate = useNavigate();

    // Function to find crop icon using imported JSON
    const getCropIcon = (cropType: string, cropVariety: string) => {
        // Convert crop type to match JSON keys (lowercase, underscores, handle plural)
        let normalizedType = cropType.toLowerCase().replace(/ /g, '_');

        // Handle common plural/singular differences
        if (normalizedType === 'tomato') normalizedType = 'tomatoes';
        if (normalizedType === 'potato') normalizedType = 'root_and_tubers';
        if (normalizedType === 'carrot') normalizedType = 'vegetables';
        if (normalizedType === 'lettuce') normalizedType = 'vegetables';
        if (normalizedType === 'maize' || normalizedType === 'corn') normalizedType = 'cereals';

        // Check if the crop type exists in our data
        const cropCategory = cropVarieties[normalizedType as keyof typeof cropVarieties];
        if (cropCategory) {
            // Try exact variety match first
            let foundVariety = cropCategory.find(v =>
                v.variety.toLowerCase() === cropVariety.toLowerCase()
            );

            // If no exact match, try partial match
            if (!foundVariety) {
                foundVariety = cropCategory.find(v =>
                    v.variety.toLowerCase().includes(cropVariety.toLowerCase()) ||
                    cropVariety.toLowerCase().includes(v.variety.toLowerCase())
                );
            }

            // If still no match, try matching by name
            if (!foundVariety) {
                foundVariety = cropCategory.find(v =>
                    v.name.toLowerCase() === cropType.toLowerCase()
                );
            }

            // If still no match, just take the first variety in the category
            if (!foundVariety && cropCategory.length > 0) {
                foundVariety = cropCategory[0];
            }

            if (foundVariety) {
                return foundVariety.icon;
            }
        }

        // Fallback to initials if no icon found
        return cropType.substring(0, 2).toUpperCase();
    };

    // Fixed harvest data - consistent across refreshes using crop id as seed
    const harvestProgress = React.useMemo(() => {
        const progressMap: { [key: number]: { harvested: number, total: number, progress: number } } = {};
        crops.forEach(crop => {
            // Use crop id as seed for consistent random values
            const seed = crop.id * 12345; // Simple seed based on crop id
            const harvested = Math.floor((Math.sin(seed) * 0.5 + 0.5) * 7874); // Consistent pseudo-random
            const total = 7874;
            const progress = (harvested / total) * 100;
            progressMap[crop.id] = { harvested, total, progress };
        });
        return progressMap;
    }, [crops]);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                            <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Planted</th>
                            <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Expected</th>
                            <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {crops.map((crop) => {
                            const { harvested, total, progress } = harvestProgress[crop.id] || { harvested: 0, total: 0, progress: 0 };
                            const cropIcon = getCropIcon(crop.type, crop.variety);
                            const isEmoji = cropIcon.length <= 2 ? false : true;

                            return (
                                <tr
                                    key={crop.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => onCropClick(crop.id)}
                                >
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center ${isEmoji ? 'text-6xl' : 'text-xl font-medium'} text-gray-600`}>
                                                {cropIcon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                    {crop.type}, {crop.variety}
                                                </div>
                                                <div className="text-xs text-gray-500">{crop.type}</div>
                                                {/* Mobile-only additional info */}
                                                <div className="sm:hidden text-xs text-gray-500 mt-1">
                                                    <div>Planted: Sep. 23, 2025</div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className="text-red-500">⚠</span>
                                                        <span>{harvested} of {total} Harvested</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-center hidden sm:table-cell">
                                        <div className="text-sm text-gray-900">Sep. 23, 2025</div>
                                        <div className="text-xs text-gray-500">Approx. 0.79 sqm</div>
                                        <div className="text-xs text-gray-500">tyyt</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-center hidden sm:table-cell">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-center space-x-1">
                                                <span className="text-red-500">⚠</span>
                                                <span className="text-sm text-gray-900">{harvested} of {total} Harvested</span>
                                            </div>
                                            {/* Harvest Progress Bar */}
                                            {total > 0 && (
                                                <div className="w-32 mx-auto bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-center relative">
                                        <div className="dropdown-container">
                                            <button
                                                onClick={(e) => toggleDropdown(crop.id, e)}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                            >
                                                <MoreVertical size={16} />
                                            </button>
                                            {activeDropdown === crop.id && (
                                                <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50" onClick={handleDropdownClick}>
                                                    <div className="py-1">
                                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                            onClick={() => navigate('/crops/my-crops/details')}>
                                                            <span>✏️</span>
                                                            <span>Edit Crop Type</span>
                                                        </button>
                                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                        onClick={() => navigate('/crops/my-crops/details')}>
                                                            <span>🌱</span>
                                                            <span>Planting Details</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onNewPlanting();
                                                                activeDropdown && onToggleDropdown(null);
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                        >
                                                            <span>➕</span>
                                                            <span>New Planting</span>
                                                        </button>
                                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                                                            <span>❌</span>
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700">Displaying {crops.length} of {crops.length} records</p>
            </div>
        </div>
    );
};