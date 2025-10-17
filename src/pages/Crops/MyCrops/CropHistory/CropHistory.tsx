import React, { useState } from 'react';
import { CropHistoryHeader } from '../components/CropHistoryHeader';
import { HistoryPlantingChart } from '../components/HistoryPlantingChart';
import { PlantingHistoryTable } from '../components/PlantingHistoryTable';
import { EmptyPlantingHistory } from '../components/EmptyPlantingHistory';
import { EditCropModal } from '../components/modals/EditCropModal';
import { NewPlantingModal } from '../components/modals/NewPlantingModal';
import { HarvestModal } from '../../MyCrops/Harvest/components/HarvestModal';
import { useCropHistory } from '../hooks/useCropHistory';
import { useCropHistoryModals } from '../hooks/useCropHistoryModals';

// Add these interfaces to match the FuturePlantingsTable structure
interface PlantingDetail {
    location: string;
    amount: string;
    startDate: string;
    expectedHarvest: string;
}

interface PlantingHistoryItem {
    id: number;
    variety: string;
    plantingCount: number;
    firstPlanted: string;
    lastHarvested: string;
    totalHarvested: string;
    expanded: boolean;
    plantings: PlantingDetail[];
}

export const CropHistoryPage = () => {
    const {
        chartData,
        plantingHistory,
        expandedItems,
        toggleExpanded
    } = useCropHistory();

    const {
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
    } = useCropHistoryModals();

    // Transform the planting history data to match the new structure
    const transformedPlantingHistory: PlantingHistoryItem[] = plantingHistory.map(item => ({
        ...item,
        plantings: [
            {
                location: "Bed 01", // You might want to get this from your actual data
                amount: `${item.plantingCount} plantings`,
                startDate: item.firstPlanted,
                expectedHarvest: item.lastHarvested
            }
        ]
    }));

    const handleHarvestInputChange = (field: keyof typeof harvestForm, value: string) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData(prev => ({
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

    const handlePlantingDataChange = (data: typeof plantingData) => {
        setPlantingData(data);
    };

    return (
        <div className="bg-white min-h-screen">
            <CropHistoryHeader
                onAddPlanting={() => setShowNewPlantingModal(true)}
                onHarvest={() => setShowHarvestModal(true)}
                onEdit={() => setShowEditModal(true)}
            />

            {/* Content */}
            <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Planting History</h2>

                {/* Plantings by Location Chart */}
                <HistoryPlantingChart chartData={chartData} />

                {/* Planting History Table */}
                {transformedPlantingHistory.length > 0 ? (
                    <PlantingHistoryTable
                        plantingHistory={transformedPlantingHistory}
                        expandedItems={expandedItems}
                        onToggleExpanded={toggleExpanded}
                    />
                ) : (
                    <EmptyPlantingHistory onAddPlanting={() => setShowNewPlantingModal(true)} />
                )}
            </div>

            {/* Modals */}
            {showEditModal && (
                <EditCropModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}

            {showNewPlantingModal && (
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
                />
            )}

            {showHarvestModal && (
                <HarvestModal
                    show={showHarvestModal}
                    onClose={() => setShowHarvestModal(false)}
                    harvestForm={harvestForm}
                    onHarvestInputChange={handleHarvestInputChange}
                    onSave={handleSaveHarvest}
                    onCancel={handleCancelHarvest}
                />
            )}
        </div>
    );
};