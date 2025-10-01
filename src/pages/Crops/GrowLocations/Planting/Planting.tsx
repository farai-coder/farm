import React, { useState } from 'react';

export const GrowLocationPlantings = () => {
    const [activeTab, setActiveTab] = useState('2022 Planting Year');
    const [expandedBeds, setExpandedBeds] = useState(new Set());
    const [expandedPlantings, setExpandedPlantings] = useState(new Set());

    const [showAddBedsModal, setShowAddBedsModal] = useState(false);
    const [showPlantingDrawer, setShowPlantingDrawer] = useState(false);
    const [showNewCropModal, setShowNewCropModal] = useState(false);
    const [newCropStep, setNewCropStep] = useState(1);

    const [addBedsForm, setAddBedsForm] = useState({
        numberOfBeds: 10,
        plantingLength: 100.0,
        plantingWidth: 3.0
    });

    const [newCropForm, setNewCropForm] = useState({
        type: '',
        variety: '',
        internalId: '',
        botanicalName: '',
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
        daysToMaturity: '',
        harvestWindow: 0,
        estimatedLossRate: 0.0,
        harvestUnits: 'quantity',
        estimatedRevenue: 0.00,
        expectedYieldPer30: '',
        expectedYieldPerHectare: ''
    });

    // Sample crop types for drag and drop
    const cropTypes = [
        { id: '767767', name: '767, 767' },
        { id: 'ddsddsd', name: 'Ddsd, Dsd' },
        { id: 'fdfddfd', name: 'Fdfd, Dffd' }
    ];

    // Sample planting data
    const plantingData = {
        'Bed: 01': {
            bedNumber: '801',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: [
                {
                    id: 1,
                    crop: 'Lettuce, Head, Boston',
                    variety: 'LETTUCE/VARIETY | Bed: 01',
                    type: 'Type',
                    amount: '300.0 sqft',
                    amountColor: 'bg-gray-600',
                    start: 'Start Apr 25, 2022',
                    startDetails: 'Direct Seeded | Seed Seeded',
                    harvest: 'Expected Jun 11, 2022',
                    harvestDetails: '9 of 300 harvested',
                    harvestExpected: 'Expected Aug 21, 2022',
                    harvestExpectedDetails: '5 of 300 harvested',
                    detailedInfo: {
                        variety: 'LETTUCE/VARIETY',
                        bedLocation: 'Bed: 01',
                        plantingMethod: 'Direct Seeded',
                        seedType: 'Seed Seeded',
                        plantingDate: 'Apr 25, 2022',
                        expectedHarvestDate: 'Jun 11, 2022',
                        actualHarvestDate: 'Aug 21, 2022',
                        totalPlanted: 300,
                        harvested: 9,
                        harvestedSecond: 5,
                        status: 'Active'
                    }
                },
                {
                    id: 2,
                    crop: 'Lettuce, Head, Boston',
                    variety: 'LETTUCE/VARIETY | Bed: 02',
                    type: 'Type',
                    amount: '300.0 sqft',
                    amountColor: 'bg-gray-600',
                    start: 'Start Jun 13, 2022',
                    startDetails: 'Direct Seeded',
                    harvest: '',
                    harvestDetails: '',
                    harvestExpected: '',
                    harvestExpectedDetails: '',
                    detailedInfo: {
                        variety: 'LETTUCE/VARIETY',
                        bedLocation: 'Bed: 02',
                        plantingMethod: 'Direct Seeded',
                        seedType: 'Direct Seeded',
                        plantingDate: 'Jun 13, 2022',
                        expectedHarvestDate: 'Aug 01, 2022',
                        actualHarvestDate: '',
                        totalPlanted: 300,
                        harvested: 0,
                        harvestedSecond: 0,
                        status: 'Growing'
                    }
                }
            ]
        },
        'Bed: 02': {
            bedNumber: '802',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: []
        },
        'Bed: 03': {
            bedNumber: '803',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: []
        },
        'Bed: 04': {
            bedNumber: '804',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: []
        },
        'Bed: 05': {
            bedNumber: '805',
            status: '33 sqft free',
            statusColor: 'text-gray-600',
            plantings: []
        }
    };

    const toggleBedExpansion = (bedKey: string) => {
        const newExpanded = new Set(expandedBeds);
        if (newExpanded.has(bedKey)) {
            newExpanded.delete(bedKey);
        } else {
            newExpanded.add(bedKey);
        }
        setExpandedBeds(newExpanded);
    };

    const togglePlantingExpansion = (plantingId: string) => {
        const newExpanded = new Set(expandedPlantings);
        if (newExpanded.has(plantingId)) {
            newExpanded.delete(plantingId);
        } else {
            newExpanded.add(plantingId);
        }
        setExpandedPlantings(newExpanded);
    };

    const renderBedIcons = (bedKey: 'Bed: 01' | 'Bed: 02' | 'Bed: 03' | 'Bed: 04' | 'Bed: 05') => {
        // Sample icons based on the bed
        const iconSets: Record<string, string[]> = {
            'Bed: 01': ['🌿', '🌿'],
            'Bed: 02': ['🌿', '⚪'],
            'Bed: 03': ['🌿', '🌿', '🌿', '⚪'],
            'Bed: 04': ['⚪', '🔶'],
            'Bed: 05': ['🔴']
        };

        return iconSets[bedKey] || [];
    };

    const handleAddBeds = () => {
        setShowAddBedsModal(true);
    };

    const handleNewPlanting = () => {
        setShowPlantingDrawer(true);
    };

    const handleNewCropType = () => {
        setShowNewCropModal(true);
        setNewCropStep(1);
    };

    const handleAddBedsSubmit = () => {
        console.log('Adding beds:', addBedsForm);
        setShowAddBedsModal(false);
    };

    const handleNewCropNext = () => {
        if (newCropStep < 3) {
            setNewCropStep(newCropStep + 1);
        }
    };

    const handleNewCropSave = () => {
        console.log('Saving crop:', newCropForm);
        setShowNewCropModal(false);
        setNewCropStep(1);
    };

    const resetNewCropForm = () => {
        setNewCropForm({
            type: '',
            variety: '',
            internalId: '',
            botanicalName: '',
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
            daysToMaturity: '',
            harvestWindow: 0,
            estimatedLossRate: 0.0,
            harvestUnits: 'quantity',
            estimatedRevenue: 0.00,
            expectedYieldPer30: '',
            expectedYieldPerHectare: ''
        });
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        2.5 Acre
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">
                            Active
                        </span>
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleNewPlanting}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex-1 sm:flex-none"
                    >
                        New Planting
                    </button>
                    <button
                        onClick={handleAddBeds}
                        className="border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex-1 sm:flex-none"
                    >
                        Add Beds
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-2 hidden sm:block">
                        <i className="fas fa-th"></i>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                <nav className="flex space-x-4 sm:space-x-8 min-w-max">
                    {['2022 Planting Year', 'Future Plantings', 'Currently Planted', 'Harvested'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Beds List */}
            <div className="space-y-4">
                {Object.entries(plantingData).map(([bedKey, bedData]) => (
                    <div key={bedKey} className="bg-white border border-gray-200 rounded-lg">
                        {/* Bed Header */}
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBedExpansion(bedKey)}>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <button className="text-gray-400">
                                    <i className={`fas ${expandedBeds.has(bedKey) ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                                </button>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium text-gray-900 truncate">{bedKey}</h3>
                                    <p className="text-sm text-gray-500 truncate">{bedData.bedNumber}</p>
                                </div>
                                <div className="flex items-center space-x-1 flex-shrink-0">
                                    {renderBedIcons(bedKey as 'Bed: 01' | 'Bed: 02' | 'Bed: 03' | 'Bed: 04' | 'Bed: 05').map((icon, index) => (
                                        <span key={index} className="text-sm">{icon}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-4 ml-2">
                                <span className={`text-xs sm:text-sm ${bedData.statusColor} hidden xs:inline`}>
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {bedData.status}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Status */}
                        <div className="px-4 pb-2 xs:hidden">
                            <span className={`text-xs ${bedData.statusColor}`}>
                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                {bedData.status}
                            </span>
                        </div>

                        {/* Expanded Bed Content */}
                        {expandedBeds.has(bedKey) && bedData.plantings.length > 0 && (
                            <div className="border-t border-gray-200">
                                <div className="p-4">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[600px]">
                                            <thead>
                                                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <th className="pb-3">Type</th>
                                                    <th className="pb-3">Amount</th>
                                                    <th className="pb-3">Start</th>
                                                    <th className="pb-3">Harvest</th>
                                                    <th className="pb-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bedData.plantings.map((planting) => (
                                                    <React.Fragment key={planting.id}>
                                                        <tr className="border-t border-gray-100 hover:bg-gray-50">
                                                            <td className="py-3">
                                                                <div className="flex items-center min-w-0">
                                                                    <button
                                                                        onClick={() => togglePlantingExpansion(String(planting.id))}
                                                                        className="mr-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                                                                    >
                                                                        <i className={`fas ${expandedPlantings.has(planting.id) ? 'fa-chevron-down' : 'fa-chevron-right'} text-xs`}></i>
                                                                    </button>
                                                                    <div className="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                                                                        <span className="text-white text-xs">🌿</span>
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="font-medium text-gray-900 truncate">{planting.crop}</p>
                                                                        <p className="text-sm text-gray-500 truncate">{planting.variety}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-3">
                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${planting.amountColor}`}>
                                                                    {planting.amount}
                                                                </span>
                                                            </td>
                                                            <td className="py-3">
                                                                <div className="min-w-0">
                                                                    <p className="text-sm text-gray-900 truncate">{planting.start}</p>
                                                                    <p className="text-xs text-gray-500 truncate">{planting.startDetails}</p>
                                                                </div>
                                                            </td>
                                                            <td className="py-3">
                                                                <div className="space-y-1 min-w-0">
                                                                    {planting.harvest && (
                                                                        <div>
                                                                            <p className="text-sm text-gray-900 truncate">{planting.harvest}</p>
                                                                            <p className="text-xs text-gray-500 truncate">{planting.harvestDetails}</p>
                                                                        </div>
                                                                    )}
                                                                    {planting.harvestExpected && (
                                                                        <div>
                                                                            <p className="text-sm text-gray-900 truncate">{planting.harvestExpected}</p>
                                                                            <p className="text-xs text-gray-500 truncate">{planting.harvestExpectedDetails}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-3">
                                                                <button className="text-gray-400 hover:text-gray-600">
                                                                    <i className="fas fa-ellipsis-v"></i>
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        {/* Expanded Planting Details */}
                                                        {expandedPlantings.has(planting.id) && (
                                                            <tr className="bg-gray-50">
                                                                <td colSpan={5} className="px-4 sm:px-6 py-4">
                                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                                        <div className="flex items-center mb-4">
                                                                            <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                                                                                <span className="text-white text-sm">🌿</span>
                                                                            </div>
                                                                            <div className="min-w-0 flex-1">
                                                                                <h4 className="font-medium text-gray-900 truncate">{planting.crop}</h4>
                                                                                <p className="text-sm text-gray-500 truncate">{planting.detailedInfo.variety} | {planting.detailedInfo.bedLocation}</p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                                                            <div>
                                                                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Type</h5>
                                                                                <p className="text-sm text-gray-900 truncate">{planting.detailedInfo.variety}</p>
                                                                                <p className="text-xs text-gray-500 truncate">{planting.detailedInfo.bedLocation}</p>
                                                                            </div>

                                                                            <div>
                                                                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Amount</h5>
                                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${planting.amountColor}`}>
                                                                                    {planting.amount}
                                                                                </span>
                                                                            </div>

                                                                            <div>
                                                                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Start</h5>
                                                                                <p className="text-sm text-gray-900 truncate">{planting.detailedInfo.plantingDate}</p>
                                                                                <p className="text-xs text-gray-500 truncate">{planting.detailedInfo.plantingMethod} | {planting.detailedInfo.seedType}</p>
                                                                            </div>

                                                                            <div>
                                                                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Harvest</h5>
                                                                                {planting.detailedInfo.expectedHarvestDate && (
                                                                                    <div className="mb-2">
                                                                                        <p className="text-sm text-gray-900 truncate">Expected {planting.detailedInfo.expectedHarvestDate}</p>
                                                                                        <p className="text-xs text-gray-500 truncate">{planting.detailedInfo.harvested} of {planting.detailedInfo.totalPlanted} harvested</p>
                                                                                    </div>
                                                                                )}
                                                                                {planting.detailedInfo.actualHarvestDate && (
                                                                                    <div>
                                                                                        <p className="text-sm text-gray-900 truncate">Expected {planting.detailedInfo.actualHarvestDate}</p>
                                                                                        <p className="text-xs text-gray-500 truncate">{planting.detailedInfo.harvestedSecond} of {planting.detailedInfo.totalPlanted} harvested</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                                                            <button className="text-gray-400 hover:text-gray-600">
                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Add Planting Button */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                                            <i className="fas fa-plus mr-2"></i>
                                            Add Planting to Bed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty Bed Message */}
                        {expandedBeds.has(bedKey) && bedData.plantings.length === 0 && (
                            <div className="border-t border-gray-200 p-4">
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No plantings in this bed yet</p>
                                    <button className="flex items-center justify-center mx-auto text-green-600 hover:text-green-700 text-sm font-medium">
                                        <i className="fas fa-plus mr-2"></i>
                                        Add Planting to Bed
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Beds Modal */}
            {showAddBedsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm sm:max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Add Beds</h2>
                            <button
                                onClick={() => setShowAddBedsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Number Of Beds</label>
                                <input
                                    type="number"
                                    value={addBedsForm.numberOfBeds}
                                    onChange={(e) => setAddBedsForm({ ...addBedsForm, numberOfBeds: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Planting Length</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            value={addBedsForm.plantingLength}
                                            onChange={(e) => setAddBedsForm({ ...addBedsForm, plantingLength: parseFloat(e.target.value) })}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                                            Meters
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Planting Width</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            value={addBedsForm.plantingWidth}
                                            onChange={(e) => setAddBedsForm({ ...addBedsForm, plantingWidth: parseFloat(e.target.value) })}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                                            Meters
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 mt-6">
                            <button
                                onClick={() => setShowAddBedsModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddBedsSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 order-1 sm:order-2"
                            >
                                Add Beds
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Planting Drawer */}
            {showPlantingDrawer && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPlantingDrawer(false)}></div>
                    <div className="absolute left-0 top-0 h-full w-full sm:w-80 bg-white shadow-lg">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Drag & Drop to Add Planting</h2>
                                <button
                                    onClick={() => setShowPlantingDrawer(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Plants"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="space-y-2 mb-4">
                                {cropTypes.map((crop) => (
                                    <div
                                        key={crop.id}
                                        className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-move"
                                        draggable
                                    >
                                        {crop.name}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleNewCropType}
                                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-700"
                            >
                                New Crop Type
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Crop Type Modal */}
            {showNewCropModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    {newCropStep === 1 ? 'New Crop Type' : newCropStep === 2 ? 'New Planting Details' : 'Crop Type Added'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowNewCropModal(false);
                                        setNewCropStep(1);
                                        resetNewCropForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            {newCropStep < 3 && (
                                <div className="flex items-center mt-4 overflow-x-auto">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${newCropStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                        1
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700 whitespace-nowrap">Plant Type & Variety</span>

                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ml-4 sm:ml-8 flex-shrink-0 ${newCropStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                        2
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">Planting Details</span>

                                    <div className="flex items-center justify-center w-8 h-8 rounded-full ml-4 sm:ml-8 bg-gray-200 flex-shrink-0">
                                        <i className="fas fa-check text-gray-500"></i>
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">Complete</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 sm:p-6">
                            {newCropStep === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                        <input
                                            type="text"
                                            value={newCropForm.type}
                                            onChange={(e) => setNewCropForm({ ...newCropForm, type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="fdf"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Variety/Strain</label>
                                        <input
                                            type="text"
                                            value={newCropForm.variety}
                                            onChange={(e) => setNewCropForm({ ...newCropForm, variety: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Walla Walla, Bell, Cherry, etc"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Internal ID <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                                        </label>
                                        <input
                                            type="text"
                                            value={newCropForm.internalId}
                                            onChange={(e) => setNewCropForm({ ...newCropForm, internalId: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="rere"
                                        />
                                    </div>
                                </div>
                            )}

                            {newCropStep === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Type & Variety</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                                                <input
                                                    type="text"
                                                    value={newCropForm.type}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, type: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Variety / Strain</label>
                                                <input
                                                    type="text"
                                                    value={newCropForm.variety}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, variety: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Botanical Name</label>
                                                <input
                                                    type="text"
                                                    value={newCropForm.botanicalName}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, botanicalName: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Zea mays, Capsicum annuum, Bell, etc"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Internal ID <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newCropForm.internalId}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, internalId: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white">
                                                    FD
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Planting Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Before Last Frost</label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        value={newCropForm.startBeforeLastFrost}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, startBeforeLastFrost: parseInt(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">weeks</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Days To Emerge</label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        value={newCropForm.daysToEmerge}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, daysToEmerge: parseInt(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">days</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Plant Spacing</label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        value={newCropForm.plantSpacing}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, plantSpacing: parseInt(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">cm</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Row Spacing</label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        value={newCropForm.rowSpacing}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, rowSpacing: parseInt(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">cm</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Planting Depth</label>
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        value={newCropForm.plantingDepth}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, plantingDepth: e.target.value })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">cm</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Average Height</label>
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        value={newCropForm.averageHeight}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, averageHeight: e.target.value })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">cm</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Method</label>
                                                <select
                                                    value={newCropForm.startMethod}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, startMethod: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="direct">Direct Seed</option>
                                                    <option value="transplant">Transplant</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Light Profile</label>
                                                <select
                                                    value={newCropForm.lightProfile}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, lightProfile: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="full-sun">Full Sun</option>
                                                    <option value="partial-shade">Partial Shade</option>
                                                    <option value="full-shade">Full Shade</option>
                                                </select>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Conditions</label>
                                                <select
                                                    value={newCropForm.soilConditions}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, soilConditions: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="well-drained">Well Drained</option>
                                                    <option value="moist">Moist</option>
                                                    <option value="dry">Dry</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Planting Details</label>
                                        <textarea
                                            value={newCropForm.plantingDetails}
                                            onChange={(e) => setNewCropForm({ ...newCropForm, plantingDetails: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pruning Details</label>
                                        <textarea
                                            value={newCropForm.pruningDetails}
                                            onChange={(e) => setNewCropForm({ ...newCropForm, pruningDetails: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isPerennial"
                                                checked={newCropForm.isPerennial}
                                                onChange={(e) => setNewCropForm({ ...newCropForm, isPerennial: e.target.checked })}
                                                className="mr-2"
                                            />
                                            <label htmlFor="isPerennial" className="text-sm text-gray-700">Plant is Perennial</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="autoCreateTasks"
                                                checked={newCropForm.autoCreateTasks}
                                                onChange={(e) => setNewCropForm({ ...newCropForm, autoCreateTasks: e.target.checked })}
                                                className="mr-2"
                                            />
                                            <label htmlFor="autoCreateTasks" className="text-sm text-gray-700">Automatically create tasks for new plantings</label>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Harvest Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Days To Flower</label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        value={newCropForm.daysToFlower}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, daysToFlower: parseInt(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">days</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Days To Maturity</label>
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        value={newCropForm.daysToMaturity}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, daysToMaturity: e.target.value })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">Days</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Window</label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        value={newCropForm.harvestWindow}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, harvestWindow: parseInt(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">Days</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Estimated Loss Rate <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={newCropForm.estimatedLossRate}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, estimatedLossRate: parseFloat(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm">%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Units</label>
                                                <select
                                                    value={newCropForm.harvestUnits}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, harvestUnits: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="quantity">quantity</option>
                                                    <option value="weight">weight</option>
                                                    <option value="volume">volume</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Estimated Revenue <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                                                </label>
                                                <div className="flex">
                                                    <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={newCropForm.estimatedRevenue}
                                                        onChange={(e) => setNewCropForm({ ...newCropForm, estimatedRevenue: parseFloat(e.target.value) })}
                                                        className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm hidden sm:inline">per harvest unit</span>
                                                    <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm sm:hidden">per unit</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expected Yield Per 30.48m <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newCropForm.expectedYieldPer30}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, expectedYieldPer30: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expected Yield Per Hectare <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newCropForm.expectedYieldPerHectare}
                                                    onChange={(e) => setNewCropForm({ ...newCropForm, expectedYieldPerHectare: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            <i className="fas fa-cog mr-1"></i>
                                            Customize Fields
                                        </button>
                                    </div>
                                </div>
                            )}

                            {newCropStep === 3 && (
                                <div className="text-center py-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {newCropForm.type}, {newCropForm.variety} Created
                                    </h3>
                                    <p className="text-gray-600 mb-6">What would you like to do now?</p>

                                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                                        <button
                                            onClick={() => {
                                                setShowNewCropModal(false);
                                                setNewCropStep(1);
                                                resetNewCropForm();
                                            }}
                                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                                        >
                                            Create Planting
                                        </button>
                                        <button
                                            onClick={() => {
                                                setNewCropStep(1);
                                                resetNewCropForm();
                                            }}
                                            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
                                        >
                                            Add Another Crop Type
                                        </button>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => {
                                                setShowNewCropModal(false);
                                                setNewCropStep(1);
                                                resetNewCropForm();
                                            }}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Nevermind, close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        {newCropStep < 3 && (
                            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-3">
                                <button
                                    onClick={() => {
                                        setShowNewCropModal(false);
                                        setNewCropStep(1);
                                        resetNewCropForm();
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1"
                                >
                                    Cancel
                                </button>
                                {newCropStep === 1 ? (
                                    <button
                                        onClick={handleNewCropNext}
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 order-1 sm:order-2"
                                    >
                                        Next, Planting Details
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNewCropSave}
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 order-1 sm:order-2"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};