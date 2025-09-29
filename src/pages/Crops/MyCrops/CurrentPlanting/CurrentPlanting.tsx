import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Edit, Plus, Trash2, MoreHorizontal, ChevronDown, X, Search, Info } from 'lucide-react';

export const MyCurrentPlantings = () => {
    const [showDetailedView, setShowDetailedView] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [newPlantingStep, setNewPlantingStep] = useState(1);
    const [plantingData, setPlantingData] = useState({
        cropType: '',
        growLocation: '',
        startMethod: 'Direct Sow',
        growthStage: 'Seed Started',
        currentlyPlanted: ''
    });
    const [harvestForm, setHarvestForm] = useState({
        dateHarvested: '2025-09-23',
        estimatedRevenue: '0.00',
        batchNumber: '',
        traceNumber: '',
        note: '',
        harvestedFrom: '',
        bed: '',
        gradeSize: '',
        amountHarvested: ''
    });
    const [formData, setFormData] = useState({
        cropType: '767',
        variety: '767',
        botanicalName: 'Zea mays, Capsicum annuum, Bell, etc',
        internalId: 'tyt',
        startBeforeLastFrost: '0',
        daysToEmerge: '0',
        plantSpacing: '0',
        rowSpacing: '0',
        plantingDepth: '',
        averageHeight: '',
        startMethod: '',
        lightProfile: '',
        soilConditions: '',
        plantingDetails: '',
        pruningDetails: '',
        isPerennial: false,
        autoCreateTasks: true,
        daysToFlower: '0',
        daysToMaturity: '',
        harvestWindow: '0',
        estimatedLossRate: '0.0',
        harvestUnits: 'quantity',
        estimatedRevenue: '0.00',
        expectedYieldPer30_48m: '',
        expectedYieldPerHectare: ''
    });

    // Sample data for expected pounds per week chart
    const expectedPoundsData = [
        { date: 'Feb 18, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Mar 04, 2022', northwest: 310, northwestB: 0, northwestC: 0 },
        { date: 'Mar 18, 2022', northwest: 0, northwestB: 320, northwestC: 0 },
        { date: 'Apr 01, 2022', northwest: 0, northwestB: 0, northwestC: 410 },
        { date: 'Apr 15, 2022', northwest: 0, northwestB: 470, northwestC: 0 },
        { date: 'Apr 29, 2022', northwest: 510, northwestB: 0, northwestC: 0 },
        { date: 'May 13, 2022', northwest: 0, northwestB: 580, northwestC: 0 },
        { date: 'May 27, 2022', northwest: 640, northwestB: 0, northwestC: 0 },
        { date: 'Jun 10, 2022', northwest: 0, northwestB: 620, northwestC: 0 },
        { date: 'Jun 24, 2022', northwest: 0, northwestB: 0, northwestC: 680 },
        { date: 'Jul 08, 2022', northwest: 0, northwestB: 0, northwestC: 740 },
        { date: 'Jul 22, 2022', northwest: 820, northwestB: 0, northwestC: 0 },
        { date: 'Aug 05, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Aug 19, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 02, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 16, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 30, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Oct 14, 2022', northwest: 0, northwestB: 0, northwestC: 0 }
    ];

    // Sample plantings data
    const plantingsData = [
        {
            id: 1,
            location: 'Northwest Field A',
            totalPlanted: '266.67 sqft',
            plantedDate: 'Last Plant',
            harvestStatus: '222 of 1,200 Harvested',
            financialInfo: '$584.00 of $2,840.00 Planned',
            expectedDate: 'Expected Sep. 17, 2022',
            plantingDetails: '$364.00 of $1,840.00 Planned',
            progressPercentage: 85,
            expanded: false
        },
        {
            id: 2,
            location: 'Northwest Field B',
            totalPlanted: '266.67 sqft',
            plantedDate: 'Last Plant',
            harvestStatus: '',
            financialInfo: '',
            expectedDate: 'Expected Sep. 17, 2022',
            plantingDetails: '$800.00 Planned',
            progressPercentage: 65,
            expanded: false
        },
        {
            id: 3,
            location: 'Northwest Field C',
            totalPlanted: '266.67 sqft',
            plantedDate: 'Last Plant',
            harvestStatus: '',
            financialInfo: '',
            expectedDate: 'Expected Sep. 20, 2022',
            plantingDetails: '$ of 400 Harvested\n$800.00 Planned',
            progressPercentage: 45,
            expanded: false
        }
    ];

    const [plantings, setPlantings] = useState(plantingsData);

    const togglePlantingExpanded = (id) => {
        setPlantings(plantings.map(p =>
            p.id === id ? { ...p, expanded: !p.expanded } : p
        ));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
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

    const handleSaveHarvest = () => {
        console.log('Saving harvest:', harvestForm);
        setShowHarvestModal(false);
    };

    const handleCancelHarvest = () => {
        console.log('Cancelling harvest');
        setShowHarvestModal(false);
    };

    const handleHarvestInputChange = (field, value) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Edit Modal Component
    const EditModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Crop Details</h2>
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <CropDetailsPageContent />
                </div>
            </div>
        </div>
    );

    const CropDetailsPageContent = () => (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                        77
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">767, 767</h1>
                        <p className="text-sm opacity-90">tyt</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium">
                        Add Planting
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium">
                        Harvest
                    </button>
                    <button className="text-white hover:text-gray-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 max-w-4xl">
                {/* Type & Variety Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Type & Variety</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                            <input
                                type="text"
                                value={formData.cropType}
                                onChange={(e) => handleInputChange('cropType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Variety / Strain</label>
                            <input
                                type="text"
                                value={formData.variety}
                                onChange={(e) => handleInputChange('variety', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Botanical Name</label>
                            <input
                                type="text"
                                value={formData.botanicalName}
                                onChange={(e) => handleInputChange('botanicalName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Internal ID
                                <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <input
                                type="text"
                                value={formData.internalId}
                                onChange={(e) => handleInputChange('internalId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                            77
                        </div>
                    </div>
                </div>

                {/* Planting Details Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Planting Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Start Before Last Frost</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.startBeforeLastFrost}
                                    onChange={(e) => handleInputChange('startBeforeLastFrost', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">weeks</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Days To Emerge</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.daysToEmerge}
                                    onChange={(e) => handleInputChange('daysToEmerge', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">days</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Plant Spacing</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.plantSpacing}
                                    onChange={(e) => handleInputChange('plantSpacing', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Row Spacing</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.rowSpacing}
                                    onChange={(e) => handleInputChange('rowSpacing', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Planting Depth</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.plantingDepth}
                                    onChange={(e) => handleInputChange('plantingDepth', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Average Height</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.averageHeight}
                                    onChange={(e) => handleInputChange('averageHeight', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">cm</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Method</label>
                            <select
                                value={formData.startMethod}
                                onChange={(e) => handleInputChange('startMethod', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Select start method...</option>
                                <option value="direct-seed">Direct Seed</option>
                                <option value="transplant">Transplant</option>
                                <option value="cutting">Cutting</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Light Profile</label>
                            <select
                                value={formData.lightProfile}
                                onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Select light profile...</option>
                                <option value="full-sun">Full Sun</option>
                                <option value="partial-sun">Partial Sun</option>
                                <option value="shade">Shade</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Soil Conditions</label>
                            <select
                                value={formData.soilConditions}
                                onChange={(e) => handleInputChange('soilConditions', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Select soil conditions...</option>
                                <option value="well-drained">Well Drained</option>
                                <option value="moist">Moist</option>
                                <option value="dry">Dry</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Planting Details</label>
                            <textarea
                                value={formData.plantingDetails}
                                onChange={(e) => handleInputChange('plantingDetails', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter planting details..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pruning Details</label>
                            <textarea
                                value={formData.pruningDetails}
                                onChange={(e) => handleInputChange('pruningDetails', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter pruning details..."
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.isPerennial}
                                onChange={(e) => handleInputChange('isPerennial', e.target.checked)}
                                className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Plant is Perennial</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.autoCreateTasks}
                                onChange={(e) => handleInputChange('autoCreateTasks', e.target.checked)}
                                className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Automatically create tasks for new plantings</span>
                        </label>
                    </div>
                </div>

                {/* Harvest Details Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Harvest Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Days To Flower</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.daysToFlower}
                                    onChange={(e) => handleInputChange('daysToFlower', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">days</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Days To Maturity</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.daysToMaturity}
                                    onChange={(e) => handleInputChange('daysToMaturity', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">Days</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Harvest Window</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={formData.harvestWindow}
                                    onChange={(e) => handleInputChange('harvestWindow', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">Days</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                Estimated Loss Rate
                                <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.estimatedLossRate}
                                    onChange={(e) => handleInputChange('estimatedLossRate', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Units</label>
                            <select
                                value={formData.harvestUnits}
                                onChange={(e) => handleInputChange('harvestUnits', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="quantity">quantity</option>
                                <option value="weight">weight</option>
                                <option value="volume">volume</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                Estimated Revenue
                                <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <div className="flex items-center">
                                <span className="text-gray-700 mr-2">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.estimatedRevenue}
                                    onChange={(e) => handleInputChange('estimatedRevenue', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-gray-600 ml-2 text-sm">per harvest unit</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                Expected Yield Per 30.48m
                                <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <input
                                type="number"
                                value={formData.expectedYieldPer30_48m}
                                onChange={(e) => handleInputChange('expectedYieldPer30_48m', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                Expected Yield Per Hectare
                                <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <input
                                type="number"
                                value={formData.expectedYieldPerHectare}
                                onChange={(e) => handleInputChange('expectedYieldPerHectare', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            Customize Fields
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    // Harvest Modal Component
    const HarvestModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className=" text-white px-6 py-4 flex items-center justify-between rounded-t-lg" >
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                            77
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">767, 767</h1>
                            <p className="text-sm opacity-90">tyt</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium">
                            Add Planting
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium">
                            Harvest
                        </button>
                        <button
                            onClick={() => setShowHarvestModal(false)}
                            className="text-white hover:text-gray-200 p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Record Harvest</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Harvested</label>
                            <input
                                type="date"
                                value={harvestForm.dateHarvested}
                                onChange={(e) => handleHarvestInputChange('dateHarvested', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Revenue Per</label>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-700">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.estimatedRevenue}
                                    onChange={(e) => handleHarvestInputChange('estimatedRevenue', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-gray-600 text-sm">per</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                            <input
                                type="text"
                                value={harvestForm.batchNumber}
                                onChange={(e) => handleHarvestInputChange('batchNumber', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Trace Number</label>
                            <input
                                type="text"
                                value={harvestForm.traceNumber}
                                onChange={(e) => handleHarvestInputChange('traceNumber', e.target.value)}
                                placeholder="Leave blank to auto generate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                        <textarea
                            value={harvestForm.note}
                            onChange={(e) => handleHarvestInputChange('note', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter harvest notes..."
                        />
                    </div>

                    {/* Harvest Details Table */}
                    <div className="mb-6">
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Harvested From</label>
                                <select
                                    value={harvestForm.harvestedFrom}
                                    onChange={(e) => handleHarvestInputChange('harvestedFrom', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select...</option>
                                    <option value="field-a">Field A</option>
                                    <option value="field-b">Field B</option>
                                    <option value="field-c">Field C</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bed</label>
                                <input
                                    type="text"
                                    value={harvestForm.bed}
                                    onChange={(e) => handleHarvestInputChange('bed', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Size</label>
                                <input
                                    type="text"
                                    value={harvestForm.gradeSize}
                                    onChange={(e) => handleHarvestInputChange('gradeSize', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Harvested</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.amountHarvested}
                                    onChange={(e) => handleHarvestInputChange('amountHarvested', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>

                        <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                            Add Location
                        </button>
                    </div>

                    <div className="text-right text-lg font-semibold text-gray-800 mb-6">
                        Harvest Total: 0.00
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleCancelHarvest}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveHarvest}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            🌶️
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Peppers (Hot), Thai Dragon</h1>
                            <p className="text-sm text-gray-600">Capsicum annuum, Hot</p>
                            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">PERTH</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="bg-gray-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                        >
                            Edit Plant
                        </button>
                        <button
                            onClick={() => setShowNewPlantingModal(true)}
                            className="bg-green-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium"
                        >
                            New Planting
                        </button>
                        <button
                            onClick={() => setShowHarvestModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                        >
                            New Harvest
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <>
                    {/* Chart View */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">3 Locations Planted</h2>
                        <p className="text-sm text-gray-600 mb-4">Planned Jan. 01, 2022 - Jan. 12, 2022</p>
                        <p className="text-sm text-gray-600 mb-6">EXPECTED POUNDS PER WEEK</p>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={expectedPoundsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 900]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="northwest"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="northwestB"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="northwestC"
                                        stroke="#84cc16"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Detailed Plantings View */}
                    <div className="mb-6">
                        {/* Planting Details Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <ChevronDown size={16} />
                                        </button>
                                        <h3 className="font-medium text-gray-800">Tyyt</h3>
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">3</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">TOTAL PLANTED</div>
                                        <div className="font-semibold">7.62 sqm</div>
                                        <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">~11,811 Plants</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">0 of 11,811 Harvested</div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvest</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-4">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-blue-600 hover:text-blue-800">767, 767</div>
                                                <div className="text-xs text-gray-500">Bed: 01</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900">2.54 sqm (100.0 bed m)</div>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">~3,937 Plants</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900">Plant Sep. 23, 2025</div>
                                                <div className="text-xs text-gray-500">Direct Sow</div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <span className="mr-1">🌱</span>
                                                    <span>Seed Started</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">-</td>
                                            <td className="px-4 py-4">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-blue-600 hover:text-blue-800">767, 767</div>
                                                <div className="text-xs text-gray-500">Bed: 01</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900">2.54 sqm (100.0 bed m)</div>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">~3,937 Plants</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900">Plant Sep. 23, 2025</div>
                                                <div className="text-xs text-gray-500">Transplant</div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <span className="mr-1">🌱</span>
                                                    <span>Seed Started</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">-</td>
                                            <td className="px-4 py-4">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-4">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-blue-600 hover:text-blue-800">767, 767</div>
                                                <div className="text-xs text-gray-500">Bed: 01</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900">2.54 sqm (100.0 bed m)</div>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">~3,937 Plants</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900">Plant Sep. 23, 2025</div>
                                                <div className="text-xs text-gray-500">Direct Sow</div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <span className="mr-1">🌱</span>
                                                    <span>Seed Started</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">-</td>
                                            <td className="px-4 py-4">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                    View all Plantings in Tyyt
                                </button>
                            </div>
                        </div>
                    </div>
                </>

                {/* Modals */}
                {showEditModal && <EditModal />}

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
                                                    onClick={() => setShowNewPlantingModal(true)}
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

                {showHarvestModal && <HarvestModal />}
            </div>
        </div>
    );
};