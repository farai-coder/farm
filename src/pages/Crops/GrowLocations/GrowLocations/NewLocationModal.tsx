import React, { useState } from 'react';
import { GrowLocation} from '../GrowLocations/types/growLocation';
import { StepIndicator } from './StepIndicator';
import { ModalStep1 } from './ModalStep1';
import { ModalStep2 } from './ModalStep2';
import { ModalStep3 } from './ModalStep3';
import { ModalStep4 } from './ModalStep4';

interface NewLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (location: Omit<GrowLocation, 'id'>) => void;
}

export const NewLocationModal: React.FC<NewLocationModalProps> = ({ isOpen, onClose, onSave }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        internalId: '',
        electronicId: '',
        type: 'Field',
        plantingFormat: 'Planted in Beds',
        numberOfBeds: 5,
        bedLength: 100,
        bedWidth: 3,
        areaSize: '',
        estimatedLandValue: 0,
        status: 'Active' as 'Active' | 'Inactive',
        lightProfile: '',
        grazingRestDays: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSave = () => {
        const newLocation: Omit<GrowLocation, 'id'> = {
            name: formData.name,
            type: formData.type,
            plantingFormat: formData.plantingFormat,
            status: formData.status,
            acreage: parseFloat(formData.areaSize) || undefined,
            internalId: formData.internalId,
            electronicId: formData.electronicId,
            numberOfBeds: formData.numberOfBeds,
            bedLength: formData.bedLength,
            bedWidth: formData.bedWidth,
            areaSize: parseFloat(formData.areaSize) || undefined,
            estimatedLandValue: formData.estimatedLandValue,
            lightProfile: formData.lightProfile,
            grazingRestDays: parseInt(formData.grazingRestDays) || undefined,
            description: formData.description
        };
        onSave(newLocation);
        onClose();
    };

    const handleCancel = () => {
        setCurrentStep(1);
        setFormData({
            name: '',
            internalId: '',
            electronicId: '',
            type: 'Field',
            plantingFormat: 'Planted in Beds',
            numberOfBeds: 5,
            bedLength: 100,
            bedWidth: 3,
            areaSize: '',
            estimatedLandValue: 0,
            status: 'Active',
            lightProfile: '',
            grazingRestDays: '',
            description: ''
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">New Grow Location</h2>
                </div>

                <div className="px-6 py-6">
                    <StepIndicator currentStep={currentStep} />

                    <div className="min-h-[400px]">
                        {currentStep === 1 && <ModalStep1 formData={formData} onInputChange={handleInputChange} />}
                        {currentStep === 2 && <ModalStep2 formData={formData} onInputChange={handleInputChange} />}
                        {currentStep === 3 && <ModalStep3 />}
                        {currentStep === 4 && <ModalStep4 />}
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                    <div>
                        {currentStep > 1 && (
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                                Previous
                            </button>
                        )}
                    </div>
                    <div className="space-x-3">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        {currentStep < 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
