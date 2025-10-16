import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCropForm } from '../hooks/useCropForm';
import { useModals } from '../hooks/useModals';
import { CropHeader } from '../components/CropHeader';
import { CropForm } from '../components/CropForm';
import { ActionButtons } from '../components/ActionButtons';
import { NewPlantingModal } from '../components/modals/NewPlantingModal';
import { HarvestModal } from '../components/modals/HarvestModal';
import cropVarieties from '../../crop_varieties.json';

export const CropDetailsPage: React.FC = () => {
    const navigate = useNavigate();

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

    // Helper function to get icon for a crop variety
    const getCropIcon = (category: string, variety: string) => {
        const categoryData = cropVarieties[category as keyof typeof cropVarieties];
        if (!categoryData) return '🌱'; // Default icon

        const crop = categoryData.find(item => item.variety === variety);
        return crop?.icon || getInitialsIcon(category, variety);
    };

    // Fallback function to get initials if no icon found
    const getInitialsIcon = (category: string, variety: string) => {
        if (!category || !variety) return '🌱';

        // Get first letter of category and first letter of variety
        const categoryInitial = category.charAt(0).toUpperCase();
        const varietyInitial = variety.charAt(0).toUpperCase();

        return `${categoryInitial}${varietyInitial}`;
    };

    // Format category name for display
    const formatCategoryName = (category: string) => {
        return category.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Create handler functions that match the expected prop names
    const handlePlantingDataChange = (data: any) => {
        setPlantingData(data);
    };

    const handleNextStep = () => {
        setNewPlantingStep(newPlantingStep + 1);
    };

    const handleBack = () => {
        navigate('/crops/my-crops');
    };

    // Get the current crop icon for display
    const currentCropIcon = formData.category && formData.variety
        ? getCropIcon(formData.category, formData.variety)
        : '🌱';

    return (
        <div className="bg-white min-h-screen">
            {/* Back Button */}
            <div className="border-b border-gray-200">
                <div className="p-4 md:p-6 max-w-4xl mx-auto">
                    <button
                        onClick={handleBack}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to My Crops</span>
                    </button>

                    <CropHeader
                        cropIcon={currentCropIcon}
                        cropName={formData.category ? formatCategoryName(formData.category) : 'Crop Details'}
                        cropVariety={formData.variety}
                        onAddPlanting={() => setShowNewPlantingModal(true)}
                        onHarvest={() => setShowHarvestModal(true)}
                    />
                </div>
            </div>

            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <CropForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    cropVarieties={cropVarieties}
                    getCropIcon={getCropIcon}
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
                    onNewGrowLocation={handleNewCropType}
                    cropVarieties={cropVarieties}
                    getCropIcon={getCropIcon}
                />
            )}

            {showHarvestModal && (
                <HarvestModal
                    harvestForm={harvestForm}
                    onHarvestInputChange={handleHarvestInputChange}
                    onSave={handleSaveHarvest}
                    onCancel={handleCancelHarvest}
                    onAddPlanting={() => setShowNewPlantingModal(true)}
                    cropIcon={currentCropIcon}
                />
            )}
        </div>
    );
};