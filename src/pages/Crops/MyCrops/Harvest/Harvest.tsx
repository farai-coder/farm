import React, { useState } from 'react';
import { Plus, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { ChartsSection } from './components/ChartsSection';
import { HarvestTable } from './components/HarvestTable';
import { HarvestModal } from './components/HarvestModal';
import { NewPlantingModal } from '../modals/../components/modals/NewPlantingModal';
import { useHarvestData } from './hooks/useHarvestData';

export const HarvestManagement = () => {
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [showPlantingModal, setShowPlantingModal] = useState(false);
    const [plantingStep, setPlantingStep] = useState(1);

    const [plantingData, setPlantingData] = useState({
        cropType: '',
        growLocation: '',
        plantingBed: '',
        numberOfPlantings: 0,
        startMethod: '',
        growthStage: '',
        plantingDate: '',
        plantSpacing: 0,
        rowSpacing: 0,
        plantedRowLength: 0,
        rows: 0,
        electronicId: '',
        currentlyPlanted: 0
    });

    const {
        harvestForm,
        harvestHistory,
        harvestChartData,
        weeklyYieldData,
        handleInputChange,
        handleSaveHarvest,
        handleCancelHarvest
    } = useHarvestData(setShowHarvestModal);

    const navigate = useNavigate();

    const handlePlantingDataChange = (newData: any) => {
        setPlantingData(newData);
    };

    const handleNextStep = () => {
        setPlantingStep(prev => prev + 1);
    };

    const handleNewCropType = () => {
        console.log('Open new crop type modal');
    };

    const handleNewGrowLocation = () => {
        console.log('Open new grow location modal');
    };

    const handleClosePlantingModal = () => {
        setShowPlantingModal(false);
        setPlantingStep(1);
        setPlantingData({
            cropType: '',
            growLocation: '',
            plantingBed: '',
            numberOfPlantings: 0,
            startMethod: '',
            growthStage: '',
            plantingDate: '',
            plantSpacing: 0,
            rowSpacing: 0,
            plantedRowLength: 0,
            rows: 0,
            electronicId: '',
            currentlyPlanted: 0
        });
    };

    // Check if there's any harvest data to display
    const hasHarvestData = harvestHistory && harvestHistory.length > 0;

    if (!hasHarvestData) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <div className="flex items-center mb-4">
                        <button
                            onClick={() => navigate('/crops/my-crops')}
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to My Crops
                        </button>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Harvest Management</h1>
                        </div>
                        <div className="flex items-center space-x-2 self-end sm:self-auto">
                            <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowPlantingModal(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                            >
                                <Plus size={16} />
                                <span>Create Planting</span>
                            </button>
                            <button
                                onClick={() => setShowHarvestModal(true)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                            >
                                <Plus size={16} />
                                <span>Record Harvest</span>
                            </button>
                        </div>
                    </div>

                    {/* Empty State Content */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                                <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                                    <Sprout className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">No harvest data yet?</h3>
                                <p className="text-gray-600 mb-6 text-center max-w-md">
                                    Start by creating your first planting or record a harvest to track your crop yields and progress.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setShowPlantingModal(true)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                                    >
                                        Create first planting
                                    </button>
                                    <button
                                        onClick={() => setShowHarvestModal(true)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                                    >
                                        Record first harvest
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                {showHarvestModal && (
                    <HarvestModal
                        harvestForm={harvestForm}
                        onInputChange={handleInputChange}
                        onSave={handleSaveHarvest}
                        onCancel={handleCancelHarvest}
                        onClose={() => setShowHarvestModal(false)}
                    />
                )}

                {showPlantingModal && (
                    <NewPlantingModal
                        show={showPlantingModal}
                        onClose={handleClosePlantingModal}
                        step={plantingStep}
                        onNextStep={handleNextStep}
                        plantingData={plantingData}
                        onPlantingDataChange={handlePlantingDataChange}
                        onNewCropType={handleNewCropType}
                        onNewGrowLocation={handleNewGrowLocation}
                    />
                )}
            </div>
        );
    }

    // Original component with data
    return (
        <div className="bg-white min-h-screen w-full overflow-x-hidden">
            <Header
                onHarvestClick={() => setShowHarvestModal(true)}
                onPlantingClick={() => setShowPlantingModal(true)}
            />

            <div className="p-4 sm:p-6 w-full">
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">Harvest History</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Jan. 01, 2020 - Sep. 24, 2025</p>

                <ChartsSection
                    harvestChartData={harvestChartData}
                    weeklyYieldData={weeklyYieldData}
                />

                <HarvestTable harvestHistory={harvestHistory} />
            </div>

            {showHarvestModal && (
                <HarvestModal
                    harvestForm={harvestForm}
                    onInputChange={handleInputChange}
                    onSave={handleSaveHarvest}
                    onCancel={handleCancelHarvest}
                    onClose={() => setShowHarvestModal(false)}
                />
            )}

            {showPlantingModal && (
                <NewPlantingModal
                    show={showPlantingModal}
                    onClose={handleClosePlantingModal}
                    step={plantingStep}
                    onNextStep={handleNextStep}
                    plantingData={plantingData}
                    onPlantingDataChange={handlePlantingDataChange}
                    onNewCropType={handleNewCropType}
                    onNewGrowLocation={handleNewGrowLocation}
                />
            )}
        </div>
    );
};