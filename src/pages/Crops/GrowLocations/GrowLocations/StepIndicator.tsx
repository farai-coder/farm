import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => (
    <div className="flex items-center justify-center mb-6">
        {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
                <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step === currentStep
                            ? 'bg-black text-white'
                            : step < currentStep
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                >
                    {step < currentStep ? '✓' : step}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                    {step === 1 && 'Details'}
                    {step === 2 && 'Map Location'}
                    {step === 3 && 'Add Plantings'}
                    {step === 4 && 'Complete'}
                </span>
                {step < 4 && <div className="mx-4 h-px w-8 bg-gray-300"></div>}
            </div>
        ))}
    </div>
);
