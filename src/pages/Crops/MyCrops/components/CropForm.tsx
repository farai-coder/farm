import React, { useState } from 'react';
import { CropFormData } from '../types/crop';
import { Search, X } from 'lucide-react';
import cropVarieties from '../../crop_varieties.json';

interface CropFormProps {
    formData: CropFormData;
    onInputChange: (field: keyof CropFormData, value: string | boolean) => void;
    getCropIcon: (category: string, variety: string) => string;
}

export const CropForm: React.FC<CropFormProps> = ({ formData, onInputChange, getCropIcon }) => {
    const [showCropTypeModal, setShowCropTypeModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const cropIcon = formData.category && formData.variety
        ? getCropIcon(formData.category, formData.variety)
        : '🌱';

    // Generate crop types from the actual cropVarieties data
    const cropTypes = Object.keys(cropVarieties).map(categoryId => {
        // Get the first variety's icon for the category, or use a default
        const firstVariety = cropVarieties[categoryId as keyof typeof cropVarieties][0];
        const categoryIcon = firstVariety?.icon || '🌱';

        // Format category name for display
        const categoryName = categoryId.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return {
            id: categoryId,
            name: categoryName,
            icon: categoryIcon
        };
    });

    const filteredCropTypes = cropTypes.filter(cropType =>
        cropType.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCropTypeSelect = (cropTypeId: string) => {
        onInputChange('category', cropTypeId);
        setShowCropTypeModal(false);
        setSearchTerm('');
    };

    const formatCategoryName = (category: string) => {
        if (!category) return '';
        return category.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <>
            {/* Type & Variety Section */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">Type & Variety</h2>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowCropTypeModal(true)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base text-left bg-white hover:bg-gray-50 flex items-center justify-between"
                            >
                                <span className="flex items-center space-x-2">
                                    {formData.category ? (
                                        <>
                                            <span className="text-lg">
                                                {getCropIcon(formData.category, '') || '🌱'}
                                            </span>
                                            <span>{formatCategoryName(formData.category)}</span>
                                        </>
                                    ) : (
                                        <span className="text-gray-500">Select crop type...</span>
                                    )}
                                </span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Variety / Strain</label>
                        <input
                            type="text"
                            value={formData.variety}
                            onChange={(e) => onInputChange('variety', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            placeholder="Enter variety name"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Botanical Name</label>
                        <input
                            type="text"
                            value={formData.botanicalName}
                            onChange={(e) => onInputChange('botanicalName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            Internal ID
                            <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <input
                            type="text"
                            value={formData.internalId}
                            onChange={(e) => onInputChange('internalId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        />
                    </div>
                </div>

                {/* Crop Icon Display - Made more visible */}
                <div className="mb-4 md:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop Icon</label>
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl border-2 border-gray-300 shadow-sm">
                            {cropIcon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {formData.category ? formatCategoryName(formData.category) : 'No category selected'}
                            </p>
                            <p className="text-sm text-gray-600">
                                {formData.variety || 'No variety selected'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Icon updates automatically when you select crop type and variety
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Crop Type Selection Modal */}
            {showCropTypeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Select Crop Type</h3>
                                <button
                                    onClick={() => {
                                        setShowCropTypeModal(false);
                                        setSearchTerm('');
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search crop types..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-96">
                            {filteredCropTypes.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No crop types found matching "{searchTerm}"
                                </div>
                            ) : (
                                <div className="p-2">
                                    {filteredCropTypes.map((cropType) => (
                                        <button
                                            key={cropType.id}
                                            onClick={() => handleCropTypeSelect(cropType.id)}
                                            className={`w-full p-3 text-left rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-3 ${formData.category === cropType.id ? 'bg-teal-50 border border-teal-200' : ''
                                                }`}
                                        >
                                            <span className="text-2xl flex-shrink-0 w-8 text-center">{cropType.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{cropType.name}</div>
                                                {formData.category === cropType.id && (
                                                    <div className="text-xs text-teal-600 font-medium mt-1">Currently selected</div>
                                                )}
                                            </div>
                                            {formData.category === cropType.id && (
                                                <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            
                        </div>
                    </div>
                </div>
            )}

            {/* Rest of the form remains the same */}
            {/* Planting Details Section */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">Planting Details</h2>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Start Before Last Frost</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.startBeforeLastFrost}
                                onChange={(e) => onInputChange('startBeforeLastFrost', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">weeks</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Days To Emerge</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.daysToEmerge}
                                onChange={(e) => onInputChange('daysToEmerge', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">days</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Plant Spacing</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.plantSpacing}
                                onChange={(e) => onInputChange('plantSpacing', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">cm</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Row Spacing</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.rowSpacing}
                                onChange={(e) => onInputChange('rowSpacing', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">cm</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Planting Depth</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.plantingDepth}
                                onChange={(e) => onInputChange('plantingDepth', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">cm</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Average Height</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.averageHeight}
                                onChange={(e) => onInputChange('averageHeight', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">cm</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-4 md:mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Method</label>
                        <select
                            value={formData.startMethod}
                            onChange={(e) => onInputChange('startMethod', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        >
                            <option value="">Select start method...</option>
                            <option value="direct-seed">Direct Seed</option>
                            <option value="transplant">Transplant</option>
                            <option value="cutting">Cutting</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Light Profile</label>
                        <select
                            value={formData.lightProfile}
                            onChange={(e) => onInputChange('lightProfile', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        >
                            <option value="">Select light profile...</option>
                            <option value="full-sun">Full Sun</option>
                            <option value="partial-sun">Partial Sun</option>
                            <option value="shade">Shade</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soil Conditions</label>
                        <select
                            value={formData.soilConditions}
                            onChange={(e) => onInputChange('soilConditions', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        >
                            <option value="">Select soil conditions...</option>
                            <option value="well-drained">Well Drained</option>
                            <option value="moist">Moist</option>
                            <option value="dry">Dry</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4 mb-4 md:mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Planting Details</label>
                        <textarea
                            value={formData.plantingDetails}
                            onChange={(e) => onInputChange('plantingDetails', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            placeholder="Enter planting details..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pruning Details</label>
                        <textarea
                            value={formData.pruningDetails}
                            onChange={(e) => onInputChange('pruningDetails', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            placeholder="Enter pruning details..."
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isPerennial}
                            onChange={(e) => onInputChange('isPerennial', e.target.checked)}
                            className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Plant is Perennial</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.autoCreateTasks}
                            onChange={(e) => onInputChange('autoCreateTasks', e.target.checked)}
                            className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Automatically create tasks for new plantings</span>
                    </label>
                </div>
            </div>

            {/* Harvest Details Section */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">Harvest Details</h2>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Days To Flower</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.daysToFlower}
                                onChange={(e) => onInputChange('daysToFlower', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">days</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Days To Maturity</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.daysToMaturity}
                                onChange={(e) => onInputChange('daysToMaturity', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">Days</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Harvest Window</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={formData.harvestWindow}
                                onChange={(e) => onInputChange('harvestWindow', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">Days</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                            Estimated Loss Rate
                            <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                step="0.1"
                                value={formData.estimatedLossRate}
                                onChange={(e) => onInputChange('estimatedLossRate', e.target.value)}
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-sm text-gray-600">%</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Units</label>
                        <select
                            value={formData.harvestUnits}
                            onChange={(e) => onInputChange('harvestUnits', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        >
                            <option value="quantity">quantity</option>
                            <option value="weight">weight</option>
                            <option value="volume">volume</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            Estimated Revenue
                            <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-2">$</span>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.estimatedRevenue}
                                onChange={(e) => onInputChange('estimatedRevenue', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                            <span className="text-gray-600 ml-2 text-sm">per harvest unit</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            Expected Yield Per 30.48m
                            <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <input
                            type="number"
                            value={formData.expectedYieldPer30_48m}
                            onChange={(e) => onInputChange('expectedYieldPer30_48m', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            Expected Yield Per Hectare
                            <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <input
                            type="number"
                            value={formData.expectedYieldPerHectare}
                            onChange={(e) => onInputChange('expectedYieldPerHectare', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                        />
                    </div>
                </div>

                <div className="mb-4 md:mb-6">
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Customize Fields
                    </button>
                </div>
            </div>
        </>
    );
};