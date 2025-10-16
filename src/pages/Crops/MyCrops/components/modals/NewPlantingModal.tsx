import React, { useState, useEffect } from 'react';
import { X, Search, Info, ChevronDown } from 'lucide-react';
import cropVarieties from '../../../crop_varieties.json';

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
    const [showCropTypeDropdown, setShowCropTypeDropdown] = useState(false);
    const [showGrowLocationDropdown, setShowGrowLocationDropdown] = useState(false);
    const [cropTypeSearchTerm, setCropTypeSearchTerm] = useState('');
    const [growLocationSearchTerm, setGrowLocationSearchTerm] = useState('');

    if (!show) return null;

    // Get all crop types from JSON
    const allCropTypes = Object.keys(cropVarieties);

    // Filter crop types based on search
    const filteredCropTypes = allCropTypes.filter(type =>
        type.toLowerCase().includes(cropTypeSearchTerm.toLowerCase())
    );

    // Mock grow locations - replace with actual data
    const growLocations = [
        'Field A - North Section',
        'Field A - South Section',
        'Greenhouse 1',
        'Greenhouse 2',
        'Raised Bed Garden',
        'Container Garden',
        'Orchard Section'
    ];

    // Filter grow locations based on search
    const filteredGrowLocations = growLocations.filter(location =>
        location.toLowerCase().includes(growLocationSearchTerm.toLowerCase())
    );

    // Get icon for selected crop type
    const getCropIcon = (cropType: string) => {
        if (!cropType) return '';

        // Convert crop type to match JSON keys (lowercase, underscores, handle plural)
        let normalizedType = cropType.toLowerCase().replace(/ /g, '_');

        // Handle common plural/singular differences
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

    const handleInputChange = (field: keyof PlantingData, value: any) => {
        onPlantingDataChange({
            ...plantingData,
            [field]: value
        });
    };

    const handleCropTypeSelect = (type: string) => {
        const displayName = type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        handleInputChange('cropType', displayName);
        setShowCropTypeDropdown(false);
        setCropTypeSearchTerm('');
    };

    const handleGrowLocationSelect = (location: string) => {
        handleInputChange('growLocation', location);
        setShowGrowLocationDropdown(false);
        setGrowLocationSearchTerm('');
    };

    const handleNewCropTypeClick = () => {
        // Close dropdowns first
        setShowCropTypeDropdown(false);
        setShowGrowLocationDropdown(false);
        // Then open new crop type modal
        onNewCropType();
    };

    const selectedCropIcon = plantingData.cropType ? getCropIcon(plantingData.cropType) : '';

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

                {/* Step Indicator */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between sm:justify-start sm:space-x-4 lg:space-x-8 overflow-x-auto">
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                1
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Crop Type & Location
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                2
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Planting Details
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                3
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
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                    <div className="relative flex-1">
                                        <button
                                            type="button"
                                            onClick={() => setShowCropTypeDropdown(!showCropTypeDropdown)}
                                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-left flex items-center justify-between"
                                        >
                                            <span className={plantingData.cropType ? 'text-gray-900' : 'text-gray-500'}>
                                                {plantingData.cropType || 'Select crop type'}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                                        {showCropTypeDropdown && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                <div className="p-2 border-b border-gray-200">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search crop types..."
                                                            value={cropTypeSearchTerm}
                                                            onChange={(e) => setCropTypeSearchTerm(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="py-1">
                                                    {filteredCropTypes.map((type) => {
                                                        const icon = getCropIcon(type);
                                                        const displayName = type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                                        return (
                                                            <button
                                                                key={type}
                                                                onClick={() => handleCropTypeSelect(type)}
                                                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                                                            >
                                                                <span className="text-lg">{icon}</span>
                                                                <span>{displayName}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleNewCropTypeClick}
                                        className="text-blue-600 hover:text-blue-800 text-sm text-center whitespace-nowrap border border-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
                                    >
                                        New Crop Type
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grow Location</label>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                    <div className="relative flex-1">
                                        <button
                                            type="button"
                                            onClick={() => setShowGrowLocationDropdown(!showGrowLocationDropdown)}
                                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-left flex items-center justify-between"
                                        >
                                            <span className={plantingData.growLocation ? 'text-gray-900' : 'text-gray-500'}>
                                                {plantingData.growLocation || 'Select grow location'}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                                        {showGrowLocationDropdown && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                <div className="p-2 border-b border-gray-200">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search grow locations..."
                                                            value={growLocationSearchTerm}
                                                            onChange={(e) => setGrowLocationSearchTerm(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="py-1">
                                                    {filteredGrowLocations.map((location) => (
                                                        <button
                                                            key={location}
                                                            onClick={() => handleGrowLocationSelect(location)}
                                                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                                        >
                                                            {location}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={onNewGrowLocation}
                                        className="text-blue-600 hover:text-blue-800 text-sm text-center whitespace-nowrap border border-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
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