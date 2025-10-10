import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyCropsHeader } from './components/MyCropsHeader';
import { CropsTable } from './components/CropsTable';
import { EmptyState } from './components/EmptyState';
import { NewCropTypeModal } from './components/modals/NewCropTypeModal';
import { NewPlantingModal } from './components/modals/NewPlantingModal';
import { NewGrowLocationModal } from './components/modals/NewGrowLocationModal';
import { useCropTypes } from './hooks/useCropTypes';
import { useCropModals } from './hooks/useCropModals';

interface MyCropsPageProps {
    onCropTypesChange: (cropTypesExist: boolean, cropSelected: boolean) => void;
}

export const MyCropsPage: React.FC<MyCropsPageProps> = ({ onCropTypesChange }) => {
    const navigate = useNavigate();

    const {
        cropTypes,
        filteredCropTypes,
        searchTerm,
        setSearchTerm,
        fetchCropTypes,
        createCropType
    } = useCropTypes();

    const {
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
    } = useCropModals();

    const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

    // Notify parent about crop types state
    useEffect(() => {
        onCropTypesChange(cropTypes.length > 0, selectedCropId !== null);
    }, [cropTypes, selectedCropId, onCropTypesChange]);

    // Fetch crop types on component mount
    useEffect(() => {
        fetchCropTypes();
    }, []);

    const handleNewCropType = () => {
        setShowNewCropModal(true);
        setModalStep(1);
    };

    const handleCancelNewCrop = () => {
        setShowNewCropModal(false);
        setModalStep(1);
        setCropData({
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
    };

    const handleSaveCrop = async () => {
        const newCrop = await createCropType(cropData);
        if (newCrop) {
            // Crop will be added via the hook state update
            handleCancelNewCrop();
        } else {
            // Fallback handled in hook
            handleCancelNewCrop();
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setCropData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // If no crop types exist, show the empty state
    if (cropTypes.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="p-4 sm:p-6">
                    <EmptyState onNewCropType={handleNewCropType} />
                </div>

                <NewCropTypeModal
                    show={showNewCropModal}
                    onClose={handleCancelNewCrop}
                    step={modalStep}
                    onNextStep={() => setModalStep(prev => prev + 1)}
                    onPrevStep={() => setModalStep(prev => prev - 1)}
                    cropData={cropData}
                    onInputChange={handleInputChange}
                    onSave={handleSaveCrop}
                />
            </div>
        );
    }

    // If crop types exist, show the crops list with proper layout
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-4 sm:p-6">
                <MyCropsHeader
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onNewCropType={handleNewCropType}
                    onAddPlanting={() => setShowNewPlantingModal(true)}
                    showTabs={true}
                />

                <CropsTable
                    crops={filteredCropTypes}
                    activeDropdown={activeDropdown}
                    onToggleDropdown={setActiveDropdown}
                    onCropClick={(cropId) => {
                        setSelectedCropId(cropId);
                        navigate('/crops/my-crops/details');
                    }}
                    onNewPlanting={() => setShowNewPlantingModal(true)}
                />
            </div>

            {/* Modals */}
            <NewCropTypeModal
                show={showNewCropModal}
                onClose={handleCancelNewCrop}
                step={modalStep}
                onNextStep={() => setModalStep(prev => prev + 1)}
                onPrevStep={() => setModalStep(prev => prev - 1)}
                cropData={cropData}
                onInputChange={handleInputChange}
                onSave={handleSaveCrop}
            />

            <NewPlantingModal
                show={showNewPlantingModal}
                onClose={() => {
                    setShowNewPlantingModal(false);
                    setNewPlantingStep(1);
                }}
                step={newPlantingStep}
                onNextStep={() => setNewPlantingStep(prev => prev + 1)}
                plantingData={plantingData}
                onPlantingDataChange={setPlantingData}
                onNewCropType={handleNewCropType}
                onNewGrowLocation={() => setShowNewGrowLocationModal(true)}
            />

            <NewGrowLocationModal
                show={showNewGrowLocationModal}
                onClose={() => setShowNewGrowLocationModal(false)}
                growLocationData={growLocationData}
                onGrowLocationDataChange={setGrowLocationData}
            />
        </div>
    );
};