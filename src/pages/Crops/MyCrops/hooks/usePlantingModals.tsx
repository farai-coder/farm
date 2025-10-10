import { useState } from 'react';
import { PlantingFormData, NewPlantingData, HarvestFormData } from '../types/planting';

export const usePlantingModals = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [newPlantingStep, setNewPlantingStep] = useState(1);

    const [formData, setFormData] = useState<PlantingFormData>({
        cropType: '767',
        variety: '767',
        botanicalName: 'Zea mays, Capsicum annuum, Bell, etc',
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

    const [plantingData, setPlantingData] = useState<NewPlantingData>({
        cropType: '',
        growLocation: '',
        startMethod: 'Direct Sow',
        growthStage: 'Seed Started',
        currentlyPlanted: ''
    });

    const [harvestForm, setHarvestForm] = useState<HarvestFormData>({
        dateHarvested: '2025-09-23',
        estimatedRevenue: '0.00',
        batchNumber: '',
        traceNumber: '',
        note: '',
        harvestedFrom: '',
        bed: '',
        gradeSize: '',
        amountHarvested: ''
    });

    const handleInputChange = (field: keyof PlantingFormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleHarvestInputChange = (field: keyof HarvestFormData, value: string) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving crop details:', formData);
        setShowEditModal(false);
    };

    const handleCancel = () => {
        console.log('Cancelling changes');
        setShowEditModal(false);
    };

    const handleNewCropType = () => {
        console.log('Creating new crop type');
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
        showEditModal,
        setShowEditModal,
        showNewPlantingModal,
        setShowNewPlantingModal,
        showHarvestModal,
        setShowHarvestModal,
        newPlantingStep,
        setNewPlantingStep,
        formData,
        plantingData,
        harvestForm,
        setPlantingData,
        handleInputChange,
        handleHarvestInputChange,
        handleSave,
        handleCancel,
        handleNewCropType,
        handleSaveHarvest,
        handleCancelHarvest,
        resetNewPlantingModal
    };
};