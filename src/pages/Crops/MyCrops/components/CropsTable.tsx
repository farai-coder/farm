import React from 'react';
import { MoreHorizontal } from 'lucide-react';

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
                        {crops.map((crop) => (
                            <tr
                                key={crop.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => onCropClick(crop.id)}
                            >
                                <td className="px-4 sm:px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                                            {crop.type.substring(0, 2).toUpperCase()}
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
                                                    <span>0 of 7,874 Harvested</span>
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
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="text-red-500">⚠</span>
                                        <span className="text-sm text-gray-900">0 of 7,874 Harvested</span>
                                    </div>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-center relative">
                                    <div className="dropdown-container">
                                        <button
                                            onClick={(e) => toggleDropdown(crop.id, e)}
                                            className="text-gray-400 hover:text-gray-600 p-1"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                        {activeDropdown === crop.id && (
                                            <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50" onClick={handleDropdownClick}>
                                                <div className="py-1">
                                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                        <span>✏️</span>
                                                        <span>Edit Crop Type</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                        <span>🌱</span>
                                                        <span>Planting Details</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onNewPlanting();
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                    >
                                                        <span>➕</span>
                                                        <span>New Planting</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                        <span>📋</span>
                                                        <span>Duplicate Crop Type</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                                                        <span>🗑️</span>
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700">Displaying {crops.length} of {crops.length} records</p>
            </div>
        </div>
    );
};