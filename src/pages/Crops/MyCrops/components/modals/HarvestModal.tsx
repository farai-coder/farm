import React from 'react';
import { X } from 'lucide-react';
import { HarvestForm } from '../../types/crop';
import cropVarieties from '../../../crop_varieties.json';

interface HarvestModalProps {
    harvestForm: HarvestForm;
    onHarvestInputChange: (field: keyof HarvestForm, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onAddPlanting: () => void;
    cropIcon?: string;
    cropName?: string;
    cropVariety?: string;
    internalId?: string;
}

export const HarvestModal: React.FC<HarvestModalProps> = ({
    harvestForm,
    onHarvestInputChange,
    onSave,
    onCancel,
    onAddPlanting,
    cropIcon = '🌱',
    cropName = 'Crop Details',
    cropVariety = '',
    internalId = ''
}) => {
    // Format category name for display
    const formatCategoryName = (category: string) => {
        if (!category) return '';
        return category.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="text-white px-4 md:px-6 py-4 flex items-center justify-between rounded-t-lg">
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="bg-gray-600 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-white text-lg md:text-2xl">
                            {cropIcon}
                        </div>
                        <div>
                            <h1 className="text-base md:text-xl font-semibold">
                                {cropName}
                            </h1>
                            <p className="text-xs md:text-sm opacity-90">
                                {cropVariety || 'No variety selected'}
                            </p>
                            {internalId && (
                                <p className="text-xs opacity-75">ID: {internalId}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-300 hover:text-white p-1 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={24} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Record Harvest</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Harvested</label>
                            <input
                                type="date"
                                value={harvestForm.dateHarvested}
                                onChange={(e) => onHarvestInputChange('dateHarvested', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Revenue Per Unit</label>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-700">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.estimatedRevenue}
                                    onChange={(e) => onHarvestInputChange('estimatedRevenue', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                                    placeholder="0.00"
                                />
                                <span className="text-gray-600 text-sm">per unit</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                            <input
                                type="text"
                                value={harvestForm.batchNumber}
                                onChange={(e) => onHarvestInputChange('batchNumber', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                                placeholder="Enter batch number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Trace Number</label>
                            <input
                                type="text"
                                value={harvestForm.traceNumber}
                                onChange={(e) => onHarvestInputChange('traceNumber', e.target.value)}
                                placeholder="Leave blank to auto generate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            />
                        </div>
                    </div>

                    <div className="mb-4 md:mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Notes</label>
                        <textarea
                            value={harvestForm.note}
                            onChange={(e) => onHarvestInputChange('note', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                            placeholder="Enter harvest notes, quality observations, or special instructions..."
                        />
                    </div>

                    {/* Harvest Details Table */}
                    <div className="mb-4 md:mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4">Harvest Location Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Harvested From</label>
                                <select
                                    value={harvestForm.harvestedFrom}
                                    onChange={(e) => onHarvestInputChange('harvestedFrom', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                                >
                                    <option value="">Select location...</option>
                                    <option value="field-a">Field A</option>
                                    <option value="field-b">Field B</option>
                                    <option value="field-c">Field C</option>
                                    <option value="greenhouse">Greenhouse</option>
                                    <option value="nursery">Nursery</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bed/Row</label>
                                <input
                                    type="text"
                                    value={harvestForm.bed}
                                    onChange={(e) => onHarvestInputChange('bed', e.target.value)}
                                    placeholder="e.g., Bed 1, Row A"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Size</label>
                                <input
                                    type="text"
                                    value={harvestForm.gradeSize}
                                    onChange={(e) => onHarvestInputChange('gradeSize', e.target.value)}
                                    placeholder="e.g., Large, Premium"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Harvested</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.amountHarvested}
                                    onChange={(e) => onHarvestInputChange('amountHarvested', e.target.value)}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="text-right text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 border-t pt-4">
                        Harvest Total: <span className="text-teal-600">0.00 units</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm md:text-base order-2 sm:order-1 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm md:text-base order-1 sm:order-2 transition-colors"
                        >
                            Save Harvest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};