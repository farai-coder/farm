import React from 'react';
import { Trash2 } from 'lucide-react';
import { usePlantings } from '../hooks/usePlantings';
import { usePlantingModals } from '../hooks/usePlantingModals';
import { PlantingsHeader } from '../components/PlantingsHeader';
import { ChartSection } from '../components/ChartSection';
import { PlantingsTable } from '../components/PlantingsTable';
import { EditCropModal } from '../components/modals/EditCropModal';
import { NewPlantingModal } from '../components/modals/NewPlantingModal';
import { HarvestModal } from '../components/modals/HarvestModal';
import { EmptyCurrentPlantings } from '../components/EmptyCurrentPlantings';

export const MyCurrentPlantings: React.FC = () => {
    const {
        plantings,
        expectedPoundsData,
        togglePlantingExpanded
    } = usePlantings();

    const {
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
    } = usePlantingModals();

    // Create handler functions that match the expected prop names for NewPlantingModal
    const handlePlantingDataChange = (data: any) => {
        setPlantingData(data);
    };

    const handleNextStep = () => {
        setNewPlantingStep(newPlantingStep + 1);
    };

    // Check if there are no plantings
    const hasPlantings = plantings && plantings.length > 0;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {hasPlantings ? (
                    <>
                        <PlantingsHeader
                            onEditPlant={() => setShowEditModal(true)}
                            onNewPlanting={() => setShowNewPlantingModal(true)}
                            onNewHarvest={() => setShowHarvestModal(true)}
                        />

                        <ChartSection expectedPoundsData={expectedPoundsData} />

                        <PlantingsTable
                            plantings={plantings}
                            onToggleExpanded={togglePlantingExpanded}
                        />

                        {/* Modals */}
                        {showEditModal && (
                            <EditCropModal
                                formData={formData}
                                onInputChange={handleInputChange}
                                onSave={handleSave}
                                onCancel={handleCancel}
                                onClose={() => setShowEditModal(false)}
                            />
                        )}

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
                                onClose={() => setShowHarvestModal(false)}
                            />
                        )}
                    </>
                ) : (
                    <EmptyCurrentPlantings
                        onNewPlanting={() => setShowNewPlantingModal(true)}
                        onAddCropType={handleNewCropType}
                    />
                )}
            </div>
        </div>
    );
};