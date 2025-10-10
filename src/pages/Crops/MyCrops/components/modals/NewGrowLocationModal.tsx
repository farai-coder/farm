import React from 'react';
import { X } from 'lucide-react';

interface GrowLocationData {
    name: string;
    internalId: string;
    electronicId: string;
    locationType: string;
    plantingFormat: string;
    numberOfBeds: number;
    bedLength: number;
    bedWidth: number;
    areaSize: string;
    estimatedLandValue: number;
    status: string;
    lightProfile: string;
    grazingRestDays: number;
    description: string;
}

interface NewGrowLocationModalProps {
    show: boolean;
    onClose: () => void;
    growLocationData: GrowLocationData;
    onGrowLocationDataChange: (data: GrowLocationData) => void;
}

export const NewGrowLocationModal: React.FC<NewGrowLocationModalProps> = ({
    show,
    onClose,
    growLocationData,
    onGrowLocationDataChange
}) => {
    if (!show) return null;

    const handleInputChange = (field: keyof GrowLocationData, value: any) => {
        onGrowLocationDataChange({
            ...growLocationData,
            [field]: value
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Grow Location</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Example: Northwest Field"
                                value={growLocationData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Electronic Id</label>
                            <input
                                type="text"
                                value={growLocationData.electronicId}
                                onChange={(e) => handleInputChange('electronicId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl mb-2">🏠</div>
                            <h3 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">Planted in Beds</h3>
                            <p className="text-xs text-blue-600">Distinct number of beds for diverse crops. Often 100' length. Example: Carrots, Tomatos, Spinach, etc. Plantings based on row length and count.</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl mb-2">⬛</div>
                            <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Cover Crop</h3>
                            <p className="text-xs text-gray-600">Complete crop coverage or grazing location. Example: Alfalfa, Hay, Rye, Oats, Pasture, etc. Planting coverage based on location area.</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl mb-2">📏</div>
                            <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Row Crop</h3>
                            <p className="text-xs text-gray-600">One crop planted in rows wide enough to be cultivated by machinery. Example: Corn, Soy Beans, Hemp, Potatos, etc. Planting coverage based on location area.</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl mb-2">#</div>
                            <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Other</h3>
                            <p className="text-xs text-gray-600">Any alternative growing method. Example: Shelves, aquaponics, trays, etc. Plantings based on specified amount planted.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number Of Beds</label>
                            <input
                                type="number"
                                value={growLocationData.numberOfBeds}
                                onChange={(e) => handleInputChange('numberOfBeds', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bed Length</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={growLocationData.bedLength}
                                    onChange={(e) => handleInputChange('bedLength', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="text-sm text-gray-500">Meters</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bed Width</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={growLocationData.bedWidth}
                                    onChange={(e) => handleInputChange('bedWidth', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="text-sm text-gray-500">Meters</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-t border-gray-200 space-y-3 sm:space-y-0">
                    <button
                        onClick={onClose}
                        className="text-blue-600 hover:text-blue-800 px-3 sm:px-4 py-2 text-sm text-center"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};