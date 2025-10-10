import React from 'react';
import { X } from 'lucide-react';
import { PlantingFormData } from '../../../types/planting';

interface EditCropModalProps {
    formData: PlantingFormData;
    onInputChange: (field: keyof PlantingFormData, value: string | boolean) => void;
    onSave: () => void;
    onCancel: () => void;
    onClose: () => void;
}

export const EditCropModal: React.FC<EditCropModalProps> = ({
    formData,
    onInputChange,
    onSave,
    onCancel,
    onClose
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Edit Crop Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
                <div className="p-4 sm:p-6">
                    <CropDetailsContent
                        formData={formData}
                        onInputChange={onInputChange}
                        onSave={onSave}
                        onCancel={onCancel}
                    />
                </div>
            </div>
        </div>
    );
};

const CropDetailsContent: React.FC<{
    formData: PlantingFormData;
    onInputChange: (field: keyof PlantingFormData, value: string | boolean) => void;
    onSave: () => void;
    onCancel: () => void;
}> = ({ formData, onInputChange, onSave, onCancel }) => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-gray-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        77
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-xl font-semibold">767, 767</h1>
                        <p className="text-xs sm:text-sm opacity-90">tyt</p>
                    </div>
                </div>
                {/* <div className="flex items-center space-x-1 sm:space-x-2 self-end sm:self-auto">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base">
                        Add Planting
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base">
                        Harvest
                    </button>
                    <button className="text-white hover:text-gray-200 p-1">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                </div> */}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 max-w-4xl">
                {/* Type & Variety Section */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Type & Variety</h2>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                            <input
                                type="text"
                                value={formData.cropType}
                                onChange={(e) => onInputChange('cropType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Variety / Strain</label>
                            <input
                                type="text"
                                value={formData.variety}
                                onChange={(e) => onInputChange('variety', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Botanical Name</label>
                            <input
                                type="text"
                                value={formData.botanicalName}
                                onChange={(e) => onInputChange('botanicalName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Internal ID
                                <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <input
                                type="text"
                                value={formData.internalId}
                                onChange={(e) => onInputChange('internalId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <div className="bg-gray-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            77
                        </div>
                    </div>
                </div>

                {/* Planting Details Section */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Planting Details</h2>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Start Before Last Frost</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.startBeforeLastFrost}
                                    onChange={(e) => onInputChange('startBeforeLastFrost', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">weeks</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Days To Emerge</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.daysToEmerge}
                                    onChange={(e) => onInputChange('daysToEmerge', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">days</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Plant Spacing</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.plantSpacing}
                                    onChange={(e) => onInputChange('plantSpacing', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Row Spacing</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.rowSpacing}
                                    onChange={(e) => onInputChange('rowSpacing', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Planting Depth</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.plantingDepth}
                                    onChange={(e) => onInputChange('plantingDepth', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Average Height</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.averageHeight}
                                    onChange={(e) => onInputChange('averageHeight', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-4 sm:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Method</label>
                            <select
                                value={formData.startMethod}
                                onChange={(e) => onInputChange('startMethod', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                            >
                                <option value="">Select soil conditions...</option>
                                <option value="well-drained">Well Drained</option>
                                <option value="moist">Moist</option>
                                <option value="dry">Dry</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4 mb-4 sm:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Planting Details</label>
                            <textarea
                                value={formData.plantingDetails}
                                onChange={(e) => onInputChange('plantingDetails', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                placeholder="Enter planting details..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pruning Details</label>
                            <textarea
                                value={formData.pruningDetails}
                                onChange={(e) => onInputChange('pruningDetails', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Harvest Details</h2>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Days To Flower</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.daysToFlower}
                                    onChange={(e) => onInputChange('daysToFlower', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">days</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Days To Maturity</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.daysToMaturity}
                                    onChange={(e) => onInputChange('daysToMaturity', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">Days</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="text-sm font-medium text-gray-700">Harvest Window</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.harvestWindow}
                                    onChange={(e) => onInputChange('harvestWindow', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">Days</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-sm text-gray-600">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Units</label>
                            <select
                                value={formData.harvestUnits}
                                onChange={(e) => onInputChange('harvestUnits', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                                />
                                <span className="text-gray-600 ml-2 text-sm hidden sm:inline">per harvest unit</span>
                                <span className="text-gray-600 ml-2 text-sm sm:hidden">per unit</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            Customize Fields
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium order-2 sm:order-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium order-1 sm:order-2"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};