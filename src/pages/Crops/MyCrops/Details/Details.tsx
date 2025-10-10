import React from 'react';
import { useCropForm } from '../hooks/useCropForm';
import { useModals } from '../hooks/useModals';
import { CropHeader } from '../components/CropHeader';
import { CropForm } from '../components/CropForm';
import { ActionButtons } from '../components/ActionButtons';
import { NewPlantingModal } from '../components/modals/NewPlantingModal';
import { HarvestModal } from '../components/modals/HarvestModal';

export const CropDetailsPage: React.FC = () => {
    const {
        formData,
        handleInputChange,
        handleSave,
        handleCancel
    } = useCropForm();

    const {
        showNewPlantingModal,
        setShowNewPlantingModal,
        showHarvestModal,
        setShowHarvestModal,
        newPlantingStep,
        setNewPlantingStep,
        plantingData,
        setPlantingData,
        harvestForm,
        handleHarvestInputChange,
        handleSaveHarvest,
        handleCancelHarvest,
        handleNewCropType,
        resetNewPlantingModal
    } = useModals();

    // Create handler functions that match the expected prop names
    const handlePlantingDataChange = (data: any) => {
        setPlantingData(data);
    };

    const handleNextStep = () => {
        setNewPlantingStep(newPlantingStep + 1);
    };

    return (
        <div className="bg-white min-h-screen">
            <CropHeader
                onAddPlanting={() => setShowNewPlantingModal(true)}
                onHarvest={() => setShowHarvestModal(true)}
            />

            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <CropForm
                    formData={formData}
                    onInputChange={handleInputChange}
                />

                <ActionButtons
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            </div>

            {/* Modals */}
            {showNewPlantingModal && (
                <NewPlantingModal
                    show={showNewPlantingModal}
                    onClose={resetNewPlantingModal}
                    step={newPlantingStep}
                    onNextStep={handleNextStep}
                    plantingData={plantingData}
                    onPlantingDataChange={handlePlantingDataChange}
                    onNewCropType={handleNewCropType}
                    onNewGrowLocation={handleNewCropType} // Using same handler for grow location for now
                />
            )}

            {showHarvestModal && (
                <HarvestModal
                    harvestForm={harvestForm}
                    onHarvestInputChange={handleHarvestInputChange}
                    onSave={handleSaveHarvest}
                    onCancel={handleCancelHarvest}
                    onAddPlanting={() => setShowNewPlantingModal(true)}
                />
            )}
        </div>
    );
};