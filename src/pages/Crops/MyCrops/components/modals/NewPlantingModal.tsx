import React from 'react';
import { X, Search, Info } from 'lucide-react';

interface PlantingData {
    cropType: string;
    growLocation: string;
    plantingBed: string;
    numberOfPlantings: number;
    startMethod: string;
    growthStage: string;
    plantingDate: string;
    plantSpacing: number;
    rowSpacing: number;
    plantedRowLength: number;
    rows: number;
    electronicId: string;
    currentlyPlanted: number;
}

interface NewPlantingModalProps {
    show: boolean;
    onClose: () => void;
    step: number;
    onNextStep: () => void;
    plantingData: PlantingData;
    onPlantingDataChange: (data: PlantingData) => void;
    onNewCropType: () => void;
    onNewGrowLocation: () => void;
}

export const NewPlantingModal: React.FC<NewPlantingModalProps> = ({
    show,
    onClose,
    step,
    onNextStep,
    plantingData,
    onPlantingDataChange,
    onNewCropType,
    onNewGrowLocation
}) => {
    if (!show) return null;

    const handleInputChange = (field: keyof PlantingData, value: any) => {
        onPlantingDataChange({
            ...plantingData,
            [field]: value
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Planting</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between sm:justify-start sm:space-x-4 lg:space-x-8 overflow-x-auto">
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                1
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Crop Type & Location
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                2
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Planting Details
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                ✓
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 3 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Complete
                            </span>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6">
                    {step === 1 && (
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                    <input
                                        type="text"
                                        value={plantingData.cropType}
                                        onChange={(e) => handleInputChange('cropType', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                    <Search className="w-4 h-4 text-gray-400 hidden sm:block" />
                                    <button
                                        onClick={onNewCropType}
                                        className="text-blue-600 hover:text-blue-800 text-sm text-center"
                                    >
                                        New Crop Type
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grow Location</label>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                    <input
                                        type="text"
                                        value={plantingData.growLocation}
                                        onChange={(e) => handleInputChange('growLocation', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                    <button
                                        onClick={onNewGrowLocation}
                                        className="text-blue-600 hover:text-blue-800 text-sm text-center"
                                    >
                                        Add Grow Location
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm">
                                    77
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold">767, 767</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">tyyt - Bed: 01 tyt-yt-B01</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Method</label>
                                    <select
                                        value={plantingData.startMethod}
                                        onChange={(e) => handleInputChange('startMethod', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="Direct Sow">Direct Sow</option>
                                        <option value="Transplant">Transplant</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Growth Stage</label>
                                    <select
                                        value={plantingData.growthStage}
                                        onChange={(e) => handleInputChange('growthStage', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="Seed Started">Seed Started</option>
                                        <option value="Germinated">Germinated</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                                <div className="flex items-center space-x-2">
                                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm text-blue-800">
                                        Planting Info: 3 sqm (Approx.) - Planted in 1 rows (3937 per row)
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Harvest Plan</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Planned First Harvest</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Harvest Amount</label>
                                        <input
                                            type="number"
                                            value={plantingData.currentlyPlanted}
                                            onChange={(e) => handleInputChange('currentlyPlanted', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-t border-gray-200 space-y-3 sm:space-y-0">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 px-3 sm:px-4 py-2 text-sm text-center"
                    >
                        Cancel
                    </button>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {step < 2 ? (
                            <button
                                onClick={onNextStep}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
                            >
                                Create Planting(s)
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};