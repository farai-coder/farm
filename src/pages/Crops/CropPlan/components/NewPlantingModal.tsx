import React from 'react';
import { X, Info } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { SearchableDropdown } from './SearchableDropdown';

const cropVarieties = {
    tomatoes: [{ icon: '🍅', name: 'San Marzano' }],
    peppers: [{ icon: '🌶️', name: 'Thai Dragon' }]
};

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

    const allCropTypes = Object.keys(cropVarieties);

    const growLocations = [
        'Field A - North Section',
        'Field A - South Section',
        'Greenhouse 1',
        'Greenhouse 2',
        'Raised Bed Garden',
        'Container Garden',
        'Orchard Section'
    ];

    const getCropIcon = (cropType: string) => {
        if (!cropType) return '';

        let normalizedType = cropType.toLowerCase().replace(/ /g, '_');

        if (normalizedType === 'tomato') normalizedType = 'tomatoes';
        if (normalizedType === 'potato') normalizedType = 'root_and_tubers';
        if (normalizedType === 'carrot') normalizedType = 'vegetables';
        if (normalizedType === 'lettuce') normalizedType = 'vegetables';
        if (normalizedType === 'maize' || normalizedType === 'corn') normalizedType = 'cereals';

        const cropCategory = cropVarieties[normalizedType as keyof typeof cropVarieties];
        if (cropCategory && cropCategory.length > 0) {
            return cropCategory[0].icon;
        }
        return cropType.substring(0, 2).toUpperCase();
    };

    const handleInputChange = (field: string, value: any) => {
        onPlantingDataChange({
            ...plantingData,
            [field]: value
        });
    };

    const handleCropTypeSelect = (type: string) => {
        const displayName = type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        handleInputChange('cropType', displayName);
    };

    const selectedCropIcon = plantingData.cropType ? getCropIcon(plantingData.cropType) : '';

    const cropTypeOptions = allCropTypes.map(type => {
        const icon = getCropIcon(type);
        const displayName = type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return { value: type, label: displayName, icon };
    });

    const growLocationOptions = growLocations.map(location => ({
        value: location,
        label: location
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-2 sm:p-4">
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

                <StepIndicator currentStep={step} />

                <div className="p-4 sm:p-6">
                    {step === 1 && (
                        <div className="space-y-4 sm:space-y-6">
                            <SearchableDropdown
                                label="Crop Type"
                                value={plantingData.cropType}
                                placeholder="Select crop type"
                                options={cropTypeOptions}
                                onSelect={handleCropTypeSelect}
                                onNewClick={onNewCropType}
                                newButtonLabel="New Crop Type"
                                searchPlaceholder="Search crop types..."
                            />

                            <SearchableDropdown
                                label="Grow Location"
                                value={plantingData.growLocation}
                                placeholder="Select grow location"
                                options={growLocationOptions}
                                onSelect={(value) => handleInputChange('growLocation', value)}
                                onNewClick={onNewGrowLocation}
                                newButtonLabel="Add Grow Location"
                                searchPlaceholder="Search grow locations..."
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-lg">{selectedCropIcon}</span>
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold">{plantingData.cropType}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">{plantingData.growLocation}</p>
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
