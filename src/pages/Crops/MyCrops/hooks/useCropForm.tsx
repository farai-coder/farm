import { useState } from 'react';
import { CropFormData } from '../types/crop';

export const useCropForm = () => {
    const [formData, setFormData] = useState<CropFormData>({
        category: 'tomatoes',
        variety: 'Cherry',
        botanicalName: 'Solanum lycopersicum',
        internalId: 'tyt',
        startBeforeLastFrost: '0',
        daysToEmerge: '0',
        plantSpacing: '0',
        rowSpacing: '0',
        plantingDepth: '',
        averageHeight: '',
        startMethod: '',
        lightProfile: '',
        soilConditions: '',
        plantingDetails: '',
        pruningDetails: '',
        isPerennial: false,
        autoCreateTasks: true,
        daysToFlower: '0',
        daysToMaturity: '',
        harvestWindow: '0',
        estimatedLossRate: '0.0',
        harvestUnits: 'quantity',
        estimatedRevenue: '0.00',
        expectedYieldPer30_48m: '',
        expectedYieldPerHectare: ''
    });

    const handleInputChange = (field: keyof CropFormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving crop details:', formData);
        // Handle save logic here
    };

    const handleCancel = () => {
        console.log('Cancelling changes');
        // Handle cancel logic here
    };

    return {
        formData,
        handleInputChange,
        handleSave,
        handleCancel
    };
};