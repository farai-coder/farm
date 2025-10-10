import React from 'react';
import { X, Search, Info } from 'lucide-react';

interface CropData {
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

interface NewCropTypeModalProps {
    show: boolean;
    onClose: () => void;
    step: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    cropData: CropData;
    onInputChange: (field: string, value: any) => void;
    onSave: () => void;
}

export const NewCropTypeModal: React.FC<NewCropTypeModalProps> = ({
    show,
    onClose,
    step,
    onNextStep,
    onPrevStep,
    cropData,
    onInputChange,
    onSave
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {step === 1 ? 'New Crop Type' : 'New Planting Details'}
                        </h2>
                    </div>
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
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                1
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Plant Type & Variety
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                2
                            </div>
                            <span className={`text-xs sm:text-sm ${step >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                Planting Details
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${step >= 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search for Type"
                                            value={cropData.type}
                                            onChange={(e) => onInputChange('type', e.target.value)}
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Variety/Strain</label>
                                    <input
                                        type="text"
                                        placeholder="Walla Walla, Bell, Cherry, etc"
                                        value={cropData.variety}
                                        onChange={(e) => onInputChange('variety', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <label className="block text-sm font-medium text-gray-700">Internal ID</label>
                                <Info className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={cropData.internalId}
                                onChange={(e) => onInputChange('internalId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Type & Variety</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                        <input
                                            type="text"
                                            value={cropData.type}
                                            onChange={(e) => onInputChange('type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Variety / Strain</label>
                                        <input
                                            type="text"
                                            value={cropData.variety}
                                            onChange={(e) => onInputChange('variety', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Botanical Name</label>
                                        <input
                                            type="text"
                                            placeholder="Zea mays, Capsicum annuum, Bell, etc"
                                            value={cropData.botanicalName}
                                            onChange={(e) => onInputChange('botanicalName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <label className="block text-sm font-medium text-gray-700">Internal ID</label>
                                                <Info className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={cropData.internalId}
                                                onChange={(e) => onInputChange('internalId', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                        <div className="sm:ml-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                            <div className="w-12 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                                <span className="text-xs text-gray-500">FD</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Planting Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Start Before Last Frost</label>
                                        <input
                                            type="number"
                                            value={cropData.startBeforeLastFrost}
                                            onChange={(e) => onInputChange('startBeforeLastFrost', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500 whitespace-nowrap">weeks</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Days To Emerge</label>
                                        <input
                                            type="number"
                                            value={cropData.daysToEmerge}
                                            onChange={(e) => onInputChange('daysToEmerge', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">days</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Plant Spacing</label>
                                        <input
                                            type="number"
                                            value={cropData.plantSpacing}
                                            onChange={(e) => onInputChange('plantSpacing', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">cm</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Row Spacing</label>
                                        <input
                                            type="number"
                                            value={cropData.rowSpacing}
                                            onChange={(e) => onInputChange('rowSpacing', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">cm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Planting Depth</label>
                                    <input
                                        type="text"
                                        value={cropData.plantingDepth}
                                        onChange={(e) => onInputChange('plantingDepth', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                    <span className="text-sm text-gray-500 whitespace-nowrap">cm</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Average Height</label>
                                    <input
                                        type="text"
                                        value={cropData.averageHeight}
                                        onChange={(e) => onInputChange('averageHeight', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                    <span className="text-sm text-gray-500 whitespace-nowrap">cm</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Method</label>
                                    <select
                                        value={cropData.startMethod}
                                        onChange={(e) => onInputChange('startMethod', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">Select method</option>
                                        <option value="direct">Direct Seeding</option>
                                        <option value="transplant">Transplant</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Light Profile</label>
                                    <select
                                        value={cropData.lightProfile}
                                        onChange={(e) => onInputChange('lightProfile', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">Select profile</option>
                                        <option value="full-sun">Full Sun</option>
                                        <option value="partial-shade">Partial Shade</option>
                                        <option value="full-shade">Full Shade</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Soil Conditions</label>
                                    <select
                                        value={cropData.soilConditions}
                                        onChange={(e) => onInputChange('soilConditions', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">Select conditions</option>
                                        <option value="well-drained">Well Drained</option>
                                        <option value="moist">Moist</option>
                                        <option value="dry">Dry</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Planting Details</label>
                                <textarea
                                    value={cropData.plantingDetails}
                                    onChange={(e) => onInputChange('plantingDetails', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pruning Details</label>
                                <textarea
                                    value={cropData.pruningDetails}
                                    onChange={(e) => onInputChange('pruningDetails', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="perennial"
                                        checked={cropData.isPerennial}
                                        onChange={(e) => onInputChange('isPerennial', e.target.checked)}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <label htmlFor="perennial" className="text-sm text-gray-700">Plant is Perennial</label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="autoTasks"
                                        checked={cropData.autoCreateTasks}
                                        onChange={(e) => onInputChange('autoCreateTasks', e.target.checked)}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <label htmlFor="autoTasks" className="text-sm text-gray-700">Automatically create tasks for new plantings</label>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Harvest Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Days To Flower</label>
                                        <input
                                            type="number"
                                            value={cropData.daysToFlower}
                                            onChange={(e) => onInputChange('daysToFlower', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">days</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Days To Maturity</label>
                                        <input
                                            type="number"
                                            value={cropData.daysToMaturity}
                                            onChange={(e) => onInputChange('daysToMaturity', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">Days</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Harvest Window</label>
                                        <input
                                            type="number"
                                            value={cropData.harvestWindow}
                                            onChange={(e) => onInputChange('harvestWindow', parseInt(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">Days</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Estimated Loss Rate</label>
                                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={cropData.estimatedLossRate}
                                            onChange={(e) => onInputChange('estimatedLossRate', parseFloat(e.target.value))}
                                            className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">%</span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Units</label>
                                        <select
                                            value={cropData.harvestUnits}
                                            onChange={(e) => onInputChange('harvestUnits', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="quantity">quantity</option>
                                            <option value="weight">weight</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Estimated Revenue</label>
                                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm text-gray-500">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={cropData.estimatedRevenue}
                                            onChange={(e) => onInputChange('estimatedRevenue', parseFloat(e.target.value))}
                                            className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500 whitespace-nowrap">per harvest unit</span>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Expected Yield Per 30.48m²</label>
                                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 hidden sm:block" />
                                        <input
                                            type="text"
                                            value={cropData.expectedYieldPer30}
                                            onChange={(e) => onInputChange('expectedYieldPer30', e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">Expected Yield Per Hectare</label>
                                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 hidden sm:block" />
                                        <input
                                            type="text"
                                            value={cropData.expectedYieldPerHectare}
                                            onChange={(e) => onInputChange('expectedYieldPerHectare', e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        <i className="fas fa-cog mr-2"></i>
                                        Customize Fields
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-t border-gray-200 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                        {step > 1 && (
                            <button
                                onClick={onPrevStep}
                                className="text-gray-600 hover:text-gray-800 text-sm"
                            >
                                ← Back
                            </button>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800 px-3 sm:px-4 py-2 text-sm flex-1 sm:flex-none text-center"
                        >
                            Cancel
                        </button>

                        {step < 3 && (
                            <>
                                <button className="text-gray-600 hover:text-gray-800 px-3 sm:px-4 py-2 text-sm flex-1 sm:flex-none text-center hidden sm:block">
                                    Save & New
                                </button>
                                <button
                                    onClick={onNextStep}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
                                >
                                    {step === 1 ? 'Next, Planting Details' : 'Next'}
                                </button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <button
                                    onClick={onSave}
                                    className="text-gray-600 hover:text-gray-800 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md flex-1 sm:flex-none text-center"
                                >
                                    Save & New
                                </button>
                                <button
                                    onClick={onSave}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};