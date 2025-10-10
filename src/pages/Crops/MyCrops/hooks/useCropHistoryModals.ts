import { useState } from 'react';

export const useCropHistoryModals = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [newPlantingStep, setNewPlantingStep] = useState(1);

    const [plantingData, setPlantingData] = useState({
        cropType: '',
        growLocation: '',
        startMethod: 'Direct Sow',
        growthStage: 'Seed Started',
        currentlyPlanted: ''
    });

    const [harvestForm, setHarvestForm] = useState({
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

    const [formData, setFormData] = useState({
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

    return {
        showEditModal,
        setShowEditModal,
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
        formData,
        setFormData
    };
};