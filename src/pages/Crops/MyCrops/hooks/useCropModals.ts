import { useState, useEffect } from 'react';

export const useCropModals = () => {
    const [showNewCropModal, setShowNewCropModal] = useState(false);
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showNewGrowLocationModal, setShowNewGrowLocationModal] = useState(false);

    const [modalStep, setModalStep] = useState(1);
    const [newPlantingStep, setNewPlantingStep] = useState(1);

    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const [cropData, setCropData] = useState({
        type: '',
        variety: '',
        botanicalName: '',
        internalId: '',
        startBeforeLastFrost: 0,
        daysToEmerge: 0,
        plantSpacing: 0,
        rowSpacing: 0,
        plantingDepth: '',
        averageHeight: '',
        startMethod: '',
        lightProfile: '',
        soilConditions: '',
        plantingDetails: '',
        pruningDetails: '',
        isPerennial: false,
        autoCreateTasks: true,
        daysToFlower: 0,
        daysToMaturity: 0,
        harvestWindow: 0,
        estimatedLossRate: 0,
        harvestUnits: 'quantity',
        estimatedRevenue: 0,
        expectedYieldPer30: '',
        expectedYieldPerHectare: ''
    });

    const [plantingData, setPlantingData] = useState({
        cropType: '',
        growLocation: '',
        plantingBed: '01',
        numberOfPlantings: 1,
        startMethod: 'Direct Sow',
        growthStage: 'Seed Started',
        plantingDate: '',
        plantSpacing: 0,
        rowSpacing: 0,
        plantedRowLength: 100,
        rows: 1,
        electronicId: '',
        currentlyPlanted: 3937
    });

    const [growLocationData, setGrowLocationData] = useState({
        name: '',
        internalId: '',
        electronicId: '',
        locationType: 'Field',
        plantingFormat: 'Planted in Beds',
        numberOfBeds: 5,
        bedLength: 100,
        bedWidth: 3,
        areaSize: '',
        estimatedLandValue: 0,
        status: 'Active',
        lightProfile: '',
        grazingRestDays: 0,
        description: ''
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };

        if (activeDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [activeDropdown]);

    return {
        // Modal states
        showNewCropModal,
        setShowNewCropModal,
        showNewPlantingModal,
        setShowNewPlantingModal,
        showNewGrowLocationModal,
        setShowNewGrowLocationModal,

        // Form states
        cropData,
        setCropData,
        plantingData,
        setPlantingData,
        growLocationData,
        setGrowLocationData,

        // Step states
        modalStep,
        setModalStep,
        newPlantingStep,
        setNewPlantingStep,

        // Dropdown state
        activeDropdown,
        setActiveDropdown
    };
};