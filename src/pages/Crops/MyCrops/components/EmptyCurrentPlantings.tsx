import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Upload, Download, Printer, FileDown } from 'lucide-react';
import { NewPlantingModal } from './modals/NewPlantingModal';
import { NewCropTypeModal } from './modals/NewCropTypeModal';

interface EmptyCurrentPlantingsProps {
    onNewPlanting: () => void;
    onAddCropType: () => void;
}

export const EmptyCurrentPlantings: React.FC<EmptyCurrentPlantingsProps> = ({
    onNewPlanting,
    onAddCropType
}) => {
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showNewCropTypeModal, setShowNewCropTypeModal] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [plantingStep, setPlantingStep] = useState(1);
    const [cropTypeStep, setCropTypeStep] = useState(1);
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
        autoCreateTasks: false,
        daysToFlower: 0,
        daysToMaturity: 0,
        harvestWindow: 0,
        estimatedLossRate: 0,
        harvestUnits: '',
        estimatedRevenue: 0,
        expectedYieldPer30: '',
        expectedYieldPerHectare: ''
    });

    const menuRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { icon: Upload, label: 'Import', action: 'import' },
        { icon: Download, label: 'Export', action: 'export' },
        { icon: Printer, label: 'Print', action: 'print' },
        { icon: FileDown, label: 'Download', action: 'download' }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenuDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNewPlantingClick = () => {
        setShowNewPlantingModal(true);
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

    const handleNewCropTypeClick = () => {
        setShowNewCropTypeModal(true);
        setCropTypeStep(1);
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
            autoCreateTasks: false,
            daysToFlower: 0,
            daysToMaturity: 0,
            harvestWindow: 0,
            estimatedLossRate: 0,
            harvestUnits: '',
            estimatedRevenue: 0,
            expectedYieldPer30: '',
            expectedYieldPerHectare: ''
        });
    };

    const handleClosePlantingModal = () => {
        setShowNewPlantingModal(false);
    };

    const handleCloseCropTypeModal = () => {
        setShowNewCropTypeModal(false);
    };

    const handleNextPlantingStep = () => {
        setPlantingStep(prev => prev + 1);
    };

    const handleNextCropTypeStep = () => {
        setCropTypeStep(prev => prev + 1);
    };

    const handlePrevCropTypeStep = () => {
        setCropTypeStep(prev => prev - 1);
    };

    const handlePlantingDataChange = (data: any) => {
        setPlantingData(data);
    };

    const handleCropDataChange = (field: string, value: any) => {
        setCropData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveCropType = () => {
        console.log('Saving crop type:', cropData);
        setShowNewCropTypeModal(false);
    };

    const handleMenuAction = (action: string) => {
        setShowMenuDropdown(false);
        console.log('Menu action:', action);
        switch (action) {
            case 'import':
                break;
            case 'export':
                break;
            case 'print':
                break;
            case 'download':
                break;
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm">
                {/* Page Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">My Current Plantings</h1>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <button
                                onClick={handleNewPlantingClick}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                            >
                                New Planting
                            </button>
                            <button
                                onClick={handleNewCropTypeClick}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                            >
                                Add Crop Type
                            </button>
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                                    className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    {/* Vertical Three Dots */}
                                    <div className="flex flex-col space-y-0.5">
                                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    </div>
                                </button>

                                {showMenuDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                        <div className="py-1">
                                            {menuItems.map((item, index) => {
                                                const IconComponent = item.icon;
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleMenuAction(item.action)}
                                                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                                    >
                                                        <IconComponent className="w-4 h-4 text-green-600" />
                                                        <span>{item.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State Content */}
                <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4 sm:px-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                        {/* Green Icon */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 text-center">No current plantings yet?</h3>
                        <p className="text-gray-600 mb-6 text-center max-w-md text-sm sm:text-base">
                            Start by creating your first planting to track your crops and harvest schedule.
                        </p>
                        <button
                            onClick={handleNewPlantingClick}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                        >
                            Create First Planting
                        </button>
                    </div>
                </div>
            </div>

            {/* New Planting Modal */}
            <NewPlantingModal
                show={showNewPlantingModal}
                onClose={handleClosePlantingModal}
                step={plantingStep}
                onNextStep={handleNextPlantingStep}
                plantingData={plantingData}
                onPlantingDataChange={handlePlantingDataChange}
                onNewCropType={handleNewCropTypeClick}
                onNewGrowLocation={() => {
                    console.log('Add new grow location');
                }}
            />

            {/* New Crop Type Modal */}
            <NewCropTypeModal
                show={showNewCropTypeModal}
                onClose={handleCloseCropTypeModal}
                step={cropTypeStep}
                onNextStep={handleNextCropTypeStep}
                onPrevStep={handlePrevCropTypeStep}
                cropData={cropData}
                onInputChange={handleCropDataChange}
                onSave={handleSaveCropType}
            />
        </>
    );
};