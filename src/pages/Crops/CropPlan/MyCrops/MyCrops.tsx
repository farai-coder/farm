import React, { useState, useEffect } from 'react';
import { X, Search, Filter, MoreHorizontal, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MyCropsPageProps {
    onCropTypesChange: (cropTypesExist: boolean, cropSelected: boolean) => void;
}

export const MyCropsPage: React.FC<MyCropsPageProps> = ({ onCropTypesChange }) => {
    const [cropTypes, setCropTypes] = useState([
        {
            id: 1,
            type: 'Tomato',
            variety: 'Cherry',
            botanicalName: 'Solanum lycopersicum',
            internalId: 'TOM-CHERRY-001',
            startBeforeLastFrost: 6,
            daysToEmerge: 7,
            plantSpacing: 45,
            rowSpacing: 90,
            plantingDepth: '0.6',
            averageHeight: '150',
            startMethod: 'transplant',
            lightProfile: 'full-sun',
            soilConditions: 'well-drained',
            plantingDetails: 'Start indoors 6 weeks before last frost',
            pruningDetails: 'Remove suckers for better fruit production',
            isPerennial: false,
            autoCreateTasks: true,
            daysToFlower: 60,
            daysToMaturity: 75,
            harvestWindow: 30,
            estimatedLossRate: 5,
            harvestUnits: 'quantity',
            estimatedRevenue: 4.50,
            expectedYieldPer30: '200-300 fruits',
            expectedYieldPerHectare: '15,000-20,000 kg'
        },
        {
            id: 2,
            type: 'Lettuce',
            variety: 'Romaine',
            botanicalName: 'Lactuca sativa',
            internalId: 'LET-ROMAINE-001',
            startBeforeLastFrost: 2,
            daysToEmerge: 5,
            plantSpacing: 30,
            rowSpacing: 45,
            plantingDepth: '0.3',
            averageHeight: '25',
            startMethod: 'direct',
            lightProfile: 'partial-shade',
            soilConditions: 'moist',
            plantingDetails: 'Can be direct seeded or transplanted',
            pruningDetails: 'Harvest outer leaves for continuous production',
            isPerennial: false,
            autoCreateTasks: true,
            daysToFlower: 0,
            daysToMaturity: 55,
            harvestWindow: 21,
            estimatedLossRate: 8,
            harvestUnits: 'quantity',
            estimatedRevenue: 2.75,
            expectedYieldPer30: '40-50 heads',
            expectedYieldPerHectare: '12,000-15,000 heads'
        }
    ]); // Start with sample crops
    const [showNewCropModal, setShowNewCropModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const navigate = useNavigate();
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
    const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showNewGrowLocationModal, setShowNewGrowLocationModal] = useState(false);
    const [newPlantingStep, setNewPlantingStep] = useState(1);
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

    // Modify the useEffect that notifies parent
    useEffect(() => {
        onCropTypesChange(cropTypes.length > 0, selectedCropId !== null);
    }, [cropTypes, selectedCropId, onCropTypesChange]);

    const handleNewCropType = () => {
        setShowNewCropModal(true);
        setModalStep(1);
    };

    const handleNextStep = () => {
        if (modalStep < 3) {
            setModalStep(modalStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (modalStep > 1) {
            setModalStep(modalStep - 1);
        }
    };

    const handleCancel = () => {
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

    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (cropId, e) => {
        if (e) e.stopPropagation();
        setActiveDropdown(activeDropdown === cropId ? null : cropId);
    };

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

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    const handleSave = () => {
        // Add the new crop type to the list
        setCropTypes([...cropTypes, { ...cropData, id: Date.now() }]);
        handleCancel();
    };

    const handleInputChange = (field, value) => {
        setCropData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    console.log("new planting: ", showNewPlantingModal);

    // If no crop types exist, show the empty state
    if (cropTypes.length === 0) {
        return (
            <>
                <div className="bg-gray-50 min-h-screen">
                    {/* Main Content */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-sm">
                            {/* Page Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-2xl font-semibold text-gray-800">My Crops</h1>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={handleNewCropType}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            New Crop Type
                                        </button>
                                        <button
                                            onClick={() => setShowNewPlantingModal(true)}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Add Planting
                                        </button>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="relative flex-1 max-w-md">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search Crops"
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <button className="ml-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md">
                                        <Filter className="w-4 h-4" />
                                        <span className="text-sm">Filter</span>
                                    </button>
                                </div>
                            </div>

                            {/* Empty State */}
                            <div className="flex flex-col items-center justify-center py-16 px-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center w-full max-w-8xl">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">No crops yet?</h3>
                                    <p className="text-gray-600 mb-6 text-center max-w-md">
                                        Add a new crop type and it will show up here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Crop Type Modal - MOVED OUTSIDE CONDITIONAL */}
                {showNewCropModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {modalStep === 1 ? 'New Crop Type' : 'New Planting Details'}
                                    </h2>
                                </div>
                                <button
                                    onClick={handleCancel}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Step Indicator */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center space-x-8">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${modalStep >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            1
                                        </div>
                                        <span className={`text-sm ${modalStep >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                            Plant Type & Variety
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${modalStep >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            2
                                        </div>
                                        <span className={`text-sm ${modalStep >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                            Planting Details
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${modalStep >= 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            ✓
                                        </div>
                                        <span className={`text-sm ${modalStep >= 3 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                            Complete
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {modalStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search for Type"
                                                        value={cropData.type}
                                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Variety/Strain</label>
                                                <input
                                                    type="text"
                                                    placeholder="Walla Walla, Bell, Cherry, etc"
                                                    value={cropData.variety}
                                                    onChange={(e) => handleInputChange('variety', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <label className="block text-sm font-medium text-gray-700">Internal ID</label>
                                            <Info className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={cropData.internalId}
                                            onChange={(e) => handleInputChange('internalId', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                )}

                                {modalStep === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">Type & Variety</h3>
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                                    <input
                                                        type="text"
                                                        value={cropData.type}
                                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Variety / Strain</label>
                                                    <input
                                                        type="text"
                                                        value={cropData.variety}
                                                        onChange={(e) => handleInputChange('variety', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Botanical Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Zea mays, Capsicum annuum, Bell, etc"
                                                        value={cropData.botanicalName}
                                                        onChange={(e) => handleInputChange('botanicalName', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="flex items-end">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <label className="block text-sm font-medium text-gray-700">Internal ID</label>
                                                            <Info className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={cropData.internalId}
                                                            onChange={(e) => handleInputChange('internalId', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                        <div className="w-12 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                                            <span className="text-xs text-gray-500">FD</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">Planting Details</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Start Before Last Frost</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.startBeforeLastFrost}
                                                        onChange={(e) => handleInputChange('startBeforeLastFrost', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">weeks</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Days To Emerge</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.daysToEmerge}
                                                        onChange={(e) => handleInputChange('daysToEmerge', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">days</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Plant Spacing</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.plantSpacing}
                                                        onChange={(e) => handleInputChange('plantSpacing', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">cm</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Row Spacing</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.rowSpacing}
                                                        onChange={(e) => handleInputChange('rowSpacing', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">cm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Planting Depth</label>
                                                <input
                                                    type="text"
                                                    value={cropData.plantingDepth}
                                                    onChange={(e) => handleInputChange('plantingDepth', e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">cm</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Average Height</label>
                                                <input
                                                    type="text"
                                                    value={cropData.averageHeight}
                                                    onChange={(e) => handleInputChange('averageHeight', e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">cm</span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Method</label>
                                                <select
                                                    value={cropData.startMethod}
                                                    onChange={(e) => handleInputChange('startMethod', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                >
                                                    <option value="">Select method</option>
                                                    <option value="direct">Direct Seeding</option>
                                                    <option value="transplant">Transplant</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Light Profile</label>
                                                <select
                                                    value={cropData.lightProfile}
                                                    onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                >
                                                    <option value="">Select profile</option>
                                                    <option value="full-sun">Full Sun</option>
                                                    <option value="partial-shade">Partial Shade</option>
                                                    <option value="full-shade">Full Shade</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Conditions</label>
                                                <select
                                                    value={cropData.soilConditions}
                                                    onChange={(e) => handleInputChange('soilConditions', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                >
                                                    <option value="">Select conditions</option>
                                                    <option value="well-drained">Well Drained</option>
                                                    <option value="moist">Moist</option>
                                                    <option value="dry">Dry</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Planting Details</label>
                                            <textarea
                                                value={cropData.plantingDetails}
                                                onChange={(e) => handleInputChange('plantingDetails', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pruning Details</label>
                                            <textarea
                                                value={cropData.pruningDetails}
                                                onChange={(e) => handleInputChange('pruningDetails', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id="perennial"
                                                    checked={cropData.isPerennial}
                                                    onChange={(e) => handleInputChange('isPerennial', e.target.checked)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <label htmlFor="perennial" className="text-sm text-gray-700">Plant is Perennial</label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id="autoTasks"
                                                    checked={cropData.autoCreateTasks}
                                                    onChange={(e) => handleInputChange('autoCreateTasks', e.target.checked)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <label htmlFor="autoTasks" className="text-sm text-gray-700">Automatically create tasks for new plantings</label>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">Harvest Details</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Days To Flower</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.daysToFlower}
                                                        onChange={(e) => handleInputChange('daysToFlower', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">days</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Days To Maturity</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.daysToMaturity}
                                                        onChange={(e) => handleInputChange('daysToMaturity', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">Days</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Harvest Window</label>
                                                    <input
                                                        type="number"
                                                        value={cropData.harvestWindow}
                                                        onChange={(e) => handleInputChange('harvestWindow', parseInt(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">Days</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Estimated Loss Rate</label>
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={cropData.estimatedLossRate}
                                                        onChange={(e) => handleInputChange('estimatedLossRate', parseFloat(e.target.value))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">%</span>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Units</label>
                                                    <select
                                                        value={cropData.harvestUnits}
                                                        onChange={(e) => handleInputChange('harvestUnits', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    >
                                                        <option value="quantity">quantity</option>
                                                        <option value="weight">weight</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Estimated Revenue</label>
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-500">$</span>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={cropData.estimatedRevenue}
                                                        onChange={(e) => handleInputChange('estimatedRevenue', parseFloat(e.target.value))}
                                                        className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                    <span className="text-sm text-gray-500">per harvest unit</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Expected Yield Per 30.48m²</label>
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={cropData.expectedYieldPer30}
                                                        onChange={(e) => handleInputChange('expectedYieldPer30', e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <label className="block text-sm font-medium text-gray-700">Expected Yield Per Hectare</label>
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={cropData.expectedYieldPerHectare}
                                                        onChange={(e) => handleInputChange('expectedYieldPerHectare', e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-gray-200">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    <i className="fas fa-cog mr-2"></i>
                                                    Customize Fields
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* Modal Footer */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center space-x-3">
                                    {modalStep > 1 && (
                                        <button
                                            onClick={handlePrevStep}
                                            className="text-gray-600 hover:text-gray-800 text-sm"
                                        >
                                            ← Back
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={handleCancel}
                                        className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm"
                                    >
                                        Cancel
                                    </button>

                                    {modalStep < 3 && (
                                        <>
                                            <button className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">
                                                Save & New
                                            </button>
                                            <button
                                                onClick={handleNextStep}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                            >
                                                {modalStep === 1 ? 'Next, Planting Details' : 'Next'}
                                            </button>
                                        </>
                                    )}

                                    {modalStep === 3 && (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm border border-gray-300 rounded-md"
                                            >
                                                Save & New
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                            >
                                                Save
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </>
        );
    }
    // If crop types exist, show the crops list with proper layout
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">My Crops</h1>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleNewCropType}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            New Crop Type
                        </button>
                        <button
                            onClick={() => setShowNewPlantingModal(true)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Add Planting
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-8">
                        <button className="pb-2 text-sm font-medium text-green-600 border-b-2 border-green-600">All Types</button>
                        <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700">Currently Planted</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search Crops"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">Filter</span>
                        </button>
                    </div>
                </div>

                {/* Crops Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Planted</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cropTypes.map((crop) => (
                                <tr
                                    key={crop.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        setSelectedCropId(crop.id);
                                        navigate('/crops/my-crops/details');
                                    }}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                                                {crop.type.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                    {crop.type}, {crop.variety}
                                                </div>
                                                <div className="text-xs text-gray-500">{crop.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-900">Sep. 23, 2025</div>
                                        <div className="text-xs text-gray-500">Approx. 0.79 sqm</div>
                                        <div className="text-xs text-gray-500">tyyt</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-1">
                                            <span className="text-red-500">⚠</span>
                                            <span className="text-sm text-gray-900">0 of 7,874 Harvested</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center relative">
                                        <div className="dropdown-container">
                                            <button
                                                onClick={(e) => toggleDropdown(crop.id, e)}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {activeDropdown === crop.id && (
                                                <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50" onClick={handleDropdownClick}>
                                                    <div className="py-1">
                                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                            <span>✏️</span>
                                                            <span>Edit Crop Type</span>
                                                        </button>
                                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                            <span>🌱</span>
                                                            <span>Planting Details</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowNewPlantingModal(true);
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                                        >
                                                            <span>➕</span>
                                                            <span>New Planting</span>
                                                        </button>
                                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                            <span>📋</span>
                                                            <span>Duplicate Crop Type</span>
                                                        </button>
                                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                                                            <span>🗑️</span>
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-700">Displaying all {cropTypes.length} records</p>
                    </div>
                </div>
            </div>

            {/* New Crop Type Modal - MOVED TO BOTTOM SO IT'S ALWAYS AVAILABLE */}
            {showNewCropModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {modalStep === 1 ? 'New Crop Type' : 'New Planting Details'}
                                </h2>
                            </div>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center space-x-8">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${modalStep >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        1
                                    </div>
                                    <span className={`text-sm ${modalStep >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                        Plant Type & Variety
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${modalStep >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        2
                                    </div>
                                    <span className={`text-sm ${modalStep >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                        Planting Details
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${modalStep >= 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        ✓
                                    </div>
                                    <span className={`text-sm ${modalStep >= 3 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                        Complete
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {modalStep === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    placeholder="Search for Type"
                                                    value={cropData.type}
                                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Variety/Strain</label>
                                            <input
                                                type="text"
                                                placeholder="Walla Walla, Bell, Cherry, etc"
                                                value={cropData.variety}
                                                onChange={(e) => handleInputChange('variety', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <label className="block text-sm font-medium text-gray-700">Internal ID</label>
                                        <Info className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={cropData.internalId}
                                        onChange={(e) => handleInputChange('internalId', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            )}

                            {modalStep === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Type & Variety</h3>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                                <input
                                                    type="text"
                                                    value={cropData.type}
                                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Variety / Strain</label>
                                                <input
                                                    type="text"
                                                    value={cropData.variety}
                                                    onChange={(e) => handleInputChange('variety', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Botanical Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Zea mays, Capsicum annuum, Bell, etc"
                                                    value={cropData.botanicalName}
                                                    onChange={(e) => handleInputChange('botanicalName', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <label className="block text-sm font-medium text-gray-700">Internal ID</label>
                                                        <Info className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={cropData.internalId}
                                                        onChange={(e) => handleInputChange('internalId', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                    <div className="w-12 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">FD</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Planting Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Start Before Last Frost</label>
                                                <input
                                                    type="number"
                                                    value={cropData.startBeforeLastFrost}
                                                    onChange={(e) => handleInputChange('startBeforeLastFrost', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">weeks</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Days To Emerge</label>
                                                <input
                                                    type="number"
                                                    value={cropData.daysToEmerge}
                                                    onChange={(e) => handleInputChange('daysToEmerge', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">days</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Plant Spacing</label>
                                                <input
                                                    type="number"
                                                    value={cropData.plantSpacing}
                                                    onChange={(e) => handleInputChange('plantSpacing', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">cm</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Row Spacing</label>
                                                <input
                                                    type="number"
                                                    value={cropData.rowSpacing}
                                                    onChange={(e) => handleInputChange('rowSpacing', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">cm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalStep === 3 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <label className="block text-sm font-medium text-gray-700">Planting Depth</label>
                                            <input
                                                type="text"
                                                value={cropData.plantingDepth}
                                                onChange={(e) => handleInputChange('plantingDepth', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <span className="text-sm text-gray-500">cm</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="block text-sm font-medium text-gray-700">Average Height</label>
                                            <input
                                                type="text"
                                                value={cropData.averageHeight}
                                                onChange={(e) => handleInputChange('averageHeight', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <span className="text-sm text-gray-500">cm</span>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Method</label>
                                            <select
                                                value={cropData.startMethod}
                                                onChange={(e) => handleInputChange('startMethod', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            >
                                                <option value="">Select method</option>
                                                <option value="direct">Direct Seeding</option>
                                                <option value="transplant">Transplant</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Light Profile</label>
                                            <select
                                                value={cropData.lightProfile}
                                                onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            >
                                                <option value="">Select profile</option>
                                                <option value="full-sun">Full Sun</option>
                                                <option value="partial-shade">Partial Shade</option>
                                                <option value="full-shade">Full Shade</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Soil Conditions</label>
                                            <select
                                                value={cropData.soilConditions}
                                                onChange={(e) => handleInputChange('soilConditions', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            >
                                                <option value="">Select conditions</option>
                                                <option value="well-drained">Well Drained</option>
                                                <option value="moist">Moist</option>
                                                <option value="dry">Dry</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Planting Details</label>
                                        <textarea
                                            value={cropData.plantingDetails}
                                            onChange={(e) => handleInputChange('plantingDetails', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pruning Details</label>
                                        <textarea
                                            value={cropData.pruningDetails}
                                            onChange={(e) => handleInputChange('pruningDetails', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                id="perennial"
                                                checked={cropData.isPerennial}
                                                onChange={(e) => handleInputChange('isPerennial', e.target.checked)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <label htmlFor="perennial" className="text-sm text-gray-700">Plant is Perennial</label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                id="autoTasks"
                                                checked={cropData.autoCreateTasks}
                                                onChange={(e) => handleInputChange('autoCreateTasks', e.target.checked)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <label htmlFor="autoTasks" className="text-sm text-gray-700">Automatically create tasks for new plantings</label>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Harvest Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Days To Flower</label>
                                                <input
                                                    type="number"
                                                    value={cropData.daysToFlower}
                                                    onChange={(e) => handleInputChange('daysToFlower', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">days</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Days To Maturity</label>
                                                <input
                                                    type="number"
                                                    value={cropData.daysToMaturity}
                                                    onChange={(e) => handleInputChange('daysToMaturity', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">Days</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Harvest Window</label>
                                                <input
                                                    type="number"
                                                    value={cropData.harvestWindow}
                                                    onChange={(e) => handleInputChange('harvestWindow', parseInt(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">Days</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Estimated Loss Rate</label>
                                                <Info className="w-4 h-4 text-gray-400" />
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={cropData.estimatedLossRate}
                                                    onChange={(e) => handleInputChange('estimatedLossRate', parseFloat(e.target.value))}
                                                    className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">%</span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Units</label>
                                                <select
                                                    value={cropData.harvestUnits}
                                                    onChange={(e) => handleInputChange('harvestUnits', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                >
                                                    <option value="quantity">quantity</option>
                                                    <option value="weight">weight</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Estimated Revenue</label>
                                                <Info className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={cropData.estimatedRevenue}
                                                    onChange={(e) => handleInputChange('estimatedRevenue', parseFloat(e.target.value))}
                                                    className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-sm text-gray-500">per harvest unit</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Expected Yield Per 30.48m²</label>
                                                <Info className="w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={cropData.expectedYieldPer30}
                                                    onChange={(e) => handleInputChange('expectedYieldPer30', e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label className="block text-sm font-medium text-gray-700">Expected Yield Per Hectare</label>
                                                <Info className="w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={cropData.expectedYieldPerHectare}
                                                    onChange={(e) => handleInputChange('expectedYieldPerHectare', e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                <i className="fas fa-cog mr-2"></i>
                                                Customize Fields
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Modal Footer */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3">
                                {modalStep > 1 && (
                                    <button
                                        onClick={handlePrevStep}
                                        className="text-gray-600 hover:text-gray-800 text-sm"
                                    >
                                        ← Back
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleCancel}
                                    className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>

                                {modalStep < 3 && (
                                    <>
                                        <button className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">
                                            Save & New
                                        </button>
                                        <button
                                            onClick={handleNextStep}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            {modalStep === 1 ? 'Next, Planting Details' : 'Next'}
                                        </button>
                                    </>
                                )}

                                {modalStep === 3 && (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm border border-gray-300 rounded-md"
                                        >
                                            Save & New
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Save
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Other modals */}
            {showNewPlantingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">New Planting</h2>
                            <button
                                onClick={() => {
                                    setShowNewPlantingModal(false);
                                    setNewPlantingStep(1);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center space-x-8">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${newPlantingStep >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        1
                                    </div>
                                    <span className={`text-sm ${newPlantingStep >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                        Crop Type & Location
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${newPlantingStep >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        2
                                    </div>
                                    <span className={`text-sm ${newPlantingStep >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                        Planting Details
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${newPlantingStep >= 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        ✓
                                    </div>
                                    <span className={`text-sm ${newPlantingStep >= 3 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                        Complete
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {newPlantingStep === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={plantingData.cropType}
                                                onChange={(e) => setPlantingData(prev => ({ ...prev, cropType: e.target.value }))}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <Search className="w-4 h-4 text-gray-400" />
                                            <button
                                                onClick={handleNewCropType}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                New Crop Type
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Grow Location</label>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={plantingData.growLocation}
                                                onChange={(e) => setPlantingData(prev => ({ ...prev, growLocation: e.target.value }))}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <button
                                                onClick={() => setShowNewGrowLocationModal(true)}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                Add Grow Location
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {newPlantingStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm">
                                            77
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">767, 767</h3>
                                            <p className="text-sm text-gray-600">tyyt - Bed: 01 tyt-yt-B01</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Method</label>
                                            <select
                                                value={plantingData.startMethod}
                                                onChange={(e) => setPlantingData(prev => ({ ...prev, startMethod: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            >
                                                <option value="Direct Sow">Direct Sow</option>
                                                <option value="Transplant">Transplant</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Growth Stage</label>
                                            <select
                                                value={plantingData.growthStage}
                                                onChange={(e) => setPlantingData(prev => ({ ...prev, growthStage: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            >
                                                <option value="Seed Started">Seed Started</option>
                                                <option value="Germinated">Germinated</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                                        <div className="flex items-center space-x-2">
                                            <Info className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm text-blue-800">
                                                Planting Info: 3 sqm (Approx.) - Planted in 1 rows (3937 per row)
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Harvest Plan</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Planned First Harvest</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Harvest Amount</label>
                                                <input
                                                    type="number"
                                                    value={plantingData.currentlyPlanted}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowNewPlantingModal(false);
                                    setNewPlantingStep(1);
                                }}
                                className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>

                            <div className="flex items-center space-x-3">
                                {newPlantingStep < 2 ? (
                                    <button
                                        onClick={() => setNewPlantingStep(2)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setShowNewPlantingModal(false);
                                            setNewPlantingStep(1);
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Create Planting(s)
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showNewGrowLocationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">New Grow Location</h2>
                            <button
                                onClick={() => setShowNewGrowLocationModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Example: Northwest Field"
                                        value={growLocationData.name}
                                        onChange={(e) => setGrowLocationData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Electronic Id</label>
                                    <input
                                        type="text"
                                        value={growLocationData.electronicId}
                                        onChange={(e) => setGrowLocationData(prev => ({ ...prev, electronicId: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">🏠</div>
                                    <h3 className="font-medium text-blue-800 mb-2">Planted in Beds</h3>
                                    <p className="text-xs text-blue-600">Distinct number of beds for diverse crops. Often 100' length. Example: Carrots, Tomatos, Spinach, etc. Plantings based on row length and count.</p>
                                </div>
                                <div className="border-2 border-gray-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">⬛</div>
                                    <h3 className="font-medium text-gray-800 mb-2">Cover Crop</h3>
                                    <p className="text-xs text-gray-600">Complete crop coverage or grazing location. Example: Alfalfa, Hay, Rye, Oats, Pasture, etc. Planting coverage based on location area.</p>
                                </div>
                                <div className="border-2 border-gray-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">📏</div>
                                    <h3 className="font-medium text-gray-800 mb-2">Row Crop</h3>
                                    <p className="text-xs text-gray-600">One crop planted in rows wide enough to be cultivated by machinery. Example: Corn, Soy Beans, Hemp, Potatos, etc. Planting coverage based on location area.</p>
                                </div>
                                <div className="border-2 border-gray-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">#</div>
                                    <h3 className="font-medium text-gray-800 mb-2">Other</h3>
                                    <p className="text-xs text-gray-600">Any alternative growing method. Example: Shelves, aquaponics, trays, etc. Plantings based on specified amount planted.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number Of Beds</label>
                                    <input
                                        type="number"
                                        value={growLocationData.numberOfBeds}
                                        onChange={(e) => setGrowLocationData(prev => ({ ...prev, numberOfBeds: parseInt(e.target.value) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bed Length</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={growLocationData.bedLength}
                                            onChange={(e) => setGrowLocationData(prev => ({ ...prev, bedLength: parseInt(e.target.value) }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">Meters</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bed Width</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={growLocationData.bedWidth}
                                            onChange={(e) => setGrowLocationData(prev => ({ ...prev, bedWidth: parseInt(e.target.value) }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                        <span className="text-sm text-gray-500">Meters</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowNewGrowLocationModal(false)}
                                className="text-blue-600 hover:text-blue-800 px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowNewGrowLocationModal(false)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};