import React, { useState } from 'react';
import { FuturePlantingsHeader } from '../components/FuturePlantingsHeader';
import { PlantingsChart } from '../components/PlantingsChart';
import { FuturePlantingsTable } from '../components/FuturePlantingsTable';
import { EmptyFuturePlantings } from '../components/EmptyFuturePlantings';
import { NewPlantingModal } from '../components/modals/NewPlantingModal';
import { HarvestModal } from '../components/modals/HarvestModal';
import { useFuturePlantings } from '../hooks/useFuturePlantings';
import { useFuturePlantingsModals } from '../hooks/useFuturePlantingsModals';

export const FuturePlantingsPage = () => {
    const {
        chartData,
        futurePlantings,
        expandedItems,
        toggleExpanded
    } = useFuturePlantings();

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
        setHarvestForm
    } = useFuturePlantingsModals();

    const handleHarvestInputChange = (field: keyof typeof harvestForm, value: string) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveHarvest = () => {
        console.log('Saving harvest:', harvestForm);
        setShowHarvestModal(false);
        // Handle save harvest logic here
    };

    const handleCancelHarvest = () => {
        console.log('Cancelling harvest');
        setShowHarvestModal(false);
    };

    const handleNewCropType = () => {
        // Handle new crop type logic
        console.log('Create new crop type');
    };

    const handleNewGrowLocation = () => {
        console.log('Add new grow location');
    };

    const handlePlantingDataChange = (data: typeof plantingData) => {
        setPlantingData(data);
    };

    return (
        <div className="bg-white min-h-screen">
            <FuturePlantingsHeader
                onAddPlanting={() => setShowNewPlantingModal(true)}
                onHarvest={() => setShowHarvestModal(true)}
            />

            {/* Content */}
            <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Future Plantings</h2>

                {/* Future Plantings by Location Chart */}
                <PlantingsChart chartData={chartData} />

                {/* Future Plantings Table */}
                {futurePlantings.length > 0 ? (
                    <FuturePlantingsTable
                        futurePlantings={futurePlantings}
                        expandedItems={expandedItems}
                        onToggleExpanded={toggleExpanded}
                    />
                ) : (
                    <EmptyFuturePlantings onAddPlanting={() => setShowNewPlantingModal(true)} />
                )}
            </div>

            {/* Modals */}
            <NewPlantingModal
                show={showNewPlantingModal}
                onClose={() => {
                    setShowNewPlantingModal(false);
                    setNewPlantingStep(1);
                }}
                step={newPlantingStep}
                onNextStep={() => setNewPlantingStep(prev => prev + 1)}
                plantingData={plantingData}
                onPlantingDataChange={handlePlantingDataChange}
                onNewCropType={handleNewCropType}
                onNewGrowLocation={handleNewGrowLocation}
            />

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