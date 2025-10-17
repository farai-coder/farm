import React, { useState } from 'react';

interface CalculationData {
    dateNeeded: string;
    amountNeeded: string;
    unit: string;
    repeatHarvestsUntil: string;
}

interface CalculatePlantingModalProps {
    show: boolean;
    onClose: () => void;
    onCalculate: (data: CalculationData) => void;
}

export const CalculatePlantingModal: React.FC<CalculatePlantingModalProps> = ({
    show,
    onClose,
    onCalculate
}) => {
    const [calculationData, setCalculationData] = useState<CalculationData>({
        dateNeeded: '',
        amountNeeded: '',
        unit: 'Pounds',
        repeatHarvestsUntil: ''
    });

    const handleCalculate = () => {
        if (!calculationData.dateNeeded || !calculationData.amountNeeded) {
            alert('Please fill in all required fields');
            return;
        }
        onCalculate(calculationData);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Calculate Plantings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mb-6 flex items-start space-x-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-blue-800">
                            Use this tool to estimate and create plantings based on the yield you need and when you need it by.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Needed <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={calculationData.dateNeeded}
                                onChange={(e) => setCalculationData({ ...calculationData, dateNeeded: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount Needed <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={calculationData.amountNeeded}
                                    onChange={(e) => setCalculationData({ ...calculationData, amountNeeded: e.target.value })}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    required
                                />
                                <select
                                    value={calculationData.unit}
                                    onChange={(e) => setCalculationData({ ...calculationData, unit: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Pounds</option>
                                    <option>Plants</option>
                                    <option>Kilograms</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                                <span>Repeat Harvests Until</span>
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <input
                                type="date"
                                value={calculationData.repeatHarvestsUntil}
                                onChange={(e) => setCalculationData({ ...calculationData, repeatHarvestsUntil: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCalculate}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                    >
                        Calculate
                    </button>
                </div>
            </div>
        </div>
    );
};