import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
}

const steps = [
    { number: 1, label: 'Crop Type & Location' },
    { number: 2, label: 'Planting Details' },
    { number: 3, label: 'Complete' }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    return (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex items-center justify-between sm:justify-start sm:space-x-4 lg:space-x-8 overflow-x-auto">
                {steps.map((step) => (
                    <div key={step.number} className="flex items-center space-x-2 flex-shrink-0">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${currentStep >= step.number ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {step.number}
                        </div>
                        <span className={`text-xs sm:text-sm ${currentStep >= step.number ? 'text-gray-800 font-medium' : 'text-gray-500'
                            }`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
