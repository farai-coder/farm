import { useState } from 'react';
import { PlantingData, HarvestForm } from '../types/crop';

export const useModals = () => {
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [newPlantingStep, setNewPlantingStep] = useState(1);
    const [plantingData, setPlantingData] = useState<PlantingData>({
        cropType: '',
        growLocation: '',
        startMethod: 'Direct Sow',
        growthStage: 'Seed Started',
        currentlyPlanted: ''
    });
    const [harvestForm, setHarvestForm] = useState<HarvestForm>({
        dateHarvested: '2025-09-23',
        estimatedRevenue: '',
        batchNumber: '',
        traceNumber: '',
        note: '',
        harvestedFrom: '',
        bed: '',
        gradeSize: '',
        amountHarvested: ''
    });

    const handleNewCropType = () => {
        console.log('Create new crop type');
    };

    const handleHarvestInputChange = (field: keyof HarvestForm, value: string) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveHarvest = () => {
        console.log('Saving harvest:', harvestForm);
        setShowHarvestModal(false);
    };

    const handleCancelHarvest = () => {
        console.log('Cancelling harvest');
        setShowHarvestModal(false);
    };

    const resetNewPlantingModal = () => {
        setShowNewPlantingModal(false);
        setNewPlantingStep(1);
    };

    return {
        showNewPlantingModal,
        setShowNewPlantingModal,
        showHarvestModal,
        setShowHarvestModal,
        newPlantingStep,
        setNewPlantingStep,
        plantingData,
        setPlantingData,
        harvestForm,
        setHarvestForm,
        handleNewCropType,
        handleHarvestInputChange,
        handleSaveHarvest,
        handleCancelHarvest,
        resetNewPlantingModal
    };
};