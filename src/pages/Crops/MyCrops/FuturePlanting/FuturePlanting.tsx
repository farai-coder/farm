import React, { useState } from 'react';
import { X, Search, Info } from 'lucide-react';

export const FuturePlantingsPage = () => {
    // Sample data for the chart and future plantings
    const [chartData] = useState({
        locations: ['7,884', '7,882', '7,880', '7,878', '7,876', '7,874', '7,872', '7,870', '7,868', '7,866', '7,864'],
        plantingsByLocation: [
            { location: '7,884', plantings: 0 },
            { location: '7,882', plantings: 1 },
            { location: '7,880', plantings: 0 },
            { location: '7,878', plantings: 1 },
            { location: '7,876', plantings: 0 },
            { location: '7,874', plantings: 0 },
            { location: '7,872', plantings: 1 },
            { location: '7,870', plantings: 0 },
            { location: '7,868', plantings: 1 },
            { location: '7,866', plantings: 0 },
            { location: '7,864', plantings: 0 }
        ]
    });

    const [futurePlantings] = useState([
        {
            id: 1,
            variety: 'Tyyt',
            plantingCount: 4,
            startPlantingDate: 'Oct. 15, 2025',
            expectedHarvestDate: 'Jan. 22, 2026',
            totalPlanned: '15,600 Plants (12.5 sqm)',
            expanded: false,
            plantings: [
                {
                    location: 'Northwest Field A',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Oct. 15, 2025',
                    expectedHarvest: 'Jan. 22, 2026'
                },
                {
                    location: 'Northwest Field B',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Oct. 20, 2025',
                    expectedHarvest: 'Jan. 27, 2026'
                },
                {
                    location: 'Southwest Field C',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Oct. 25, 2025',
                    expectedHarvest: 'Feb. 01, 2026'
                },
                {
                    location: 'East Field D',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Nov. 01, 2025',
                    expectedHarvest: 'Feb. 08, 2026'
                }
            ]
        },
        {
            id: 2,
            variety: 'Pepper Variety 2',
            plantingCount: 2,
            startPlantingDate: 'Nov. 10, 2025',
            expectedHarvestDate: 'Feb. 15, 2026',
            totalPlanned: '8,000 Plants (6.4 sqm)',
            expanded: false,
            plantings: [
                {
                    location: 'Greenhouse A',
                    amount: '4,000 Plants (3.2 sqm)',
                    startDate: 'Nov. 10, 2025',
                    expectedHarvest: 'Feb. 15, 2026'
                },
                {
                    location: 'Greenhouse B',
                    amount: '4,000 Plants (3.2 sqm)',
                    startDate: 'Nov. 15, 2025',
                    expectedHarvest: 'Feb. 20, 2026'
                }
            ]
        }
    ]);

    const [expandedItems, setExpandedItems] = useState({});

    // Modal states
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
        estimatedRevenue: '',
        batchNumber: '',
        traceNumber: '',
        note: '',
        harvestedFrom: '',
        bed: '',
        gradeSize: '',
        amountHarvested: ''
    });

    const toggleExpanded = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleHarvestInputChange = (field, value) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNewCropType = () => {
        // Handle new crop type logic
        console.log('Create new crop type');
    };

    const handleSaveHarvest = () => {
        console.log('Saving harvest:', harvestForm);
        setShowHarvestModal(false);
        // Handle save harvest logic here
    };

    const handleCancelHarvest = () => {
        console.log('Cancelling harvest');
        setShowHarvestModal(false);
        // Handle cancel harvest logic here
    };

    return (
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
                    <button
                        onClick={() => setShowNewPlantingModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                    >
                        Add Planting
                    </button>
                    <button
                        onClick={() => setShowHarvestModal(true)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium"
                    >
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
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Future Plantings</h2>

                {/* Future Plantings by Location Chart */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">PLANNED PLANTINGS BY LOCATION</h3>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="relative h-64">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                                {chartData.locations.map((location, index) => (
                                    <div key={index} className="flex items-center h-5">
                                        {location}
                                    </div>
                                ))}
                            </div>

                            {/* Chart area */}
                            <div className="ml-12 h-full relative">
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    {chartData.locations.map((_, index) => (
                                        <div key={index} className="border-t border-gray-100"></div>
                                    ))}
                                </div>

                                {/* Data points */}
                                <div className="absolute inset-0">
                                    {chartData.plantingsByLocation.map((item, index) => {
                                        const yPosition = (index / (chartData.locations.length - 1)) * 100;
                                        return (
                                            <div
                                                key={index}
                                                className="absolute"
                                                style={{
                                                    top: `${yPosition}%`,
                                                    left: item.plantings > 0 ? '25%' : '0%',
                                                    transform: 'translateY(-50%)'
                                                }}
                                            >
                                                {item.plantings > 0 && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Legend */}
                                <div className="absolute bottom-0 right-0 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Future Plantings</span>
                                    </div>
                                </div>

                                {/* X-axis label */}
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 -rotate-45">
                                    Oct. 2025 - Feb. 2026
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Future Plantings Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {futurePlantings.map((item) => (
                        <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                            {/* Main row */}
                            <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => toggleExpanded(item.id)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className={`w-4 h-4 transform transition-transform ${expandedItems[item.id] ? 'rotate-90' : 'rotate-0'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    <div className="font-medium text-gray-900 flex items-center">
                                        {item.variety}
                                        <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                            {item.plantingCount} Planned
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-8 text-sm">
                                    <div>
                                        <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">START PLANTING</div>
                                        <div className="text-gray-900 font-medium">{item.startPlantingDate}</div>
                                    </div>

                                    <div>
                                        <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">EXPECTED HARVEST</div>
                                        <div className="text-gray-900 font-medium">{item.expectedHarvestDate}</div>
                                    </div>

                                    <div>
                                        <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">TOTAL PLANNED</div>
                                        <div className="text-gray-900 font-medium">{item.totalPlanned}</div>
                                    </div>
                                </div>

                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Expanded content - Detailed plantings table */}
                            {expandedItems[item.id] && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="border-b border-gray-300">
                                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Location</th>
                                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Amount</th>
                                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Start Date</th>
                                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Expected Harvest</th>
                                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.plantings.map((planting, index) => (
                                                    <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                                        <td className="py-3 text-sm text-gray-900 font-medium">{planting.location}</td>
                                                        <td className="py-3 text-sm text-gray-700">{planting.amount}</td>
                                                        <td className="py-3 text-sm text-gray-700">{planting.startDate}</td>
                                                        <td className="py-3 text-sm text-gray-700">{planting.expectedHarvest}</td>
                                                        <td className="py-3 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                                                                <button className="text-green-600 hover:text-green-800 text-xs">Start Planting</button>
                                                                <button className="text-red-600 hover:text-red-800 text-xs">Cancel</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            Total: {item.plantingCount} planned plantings for {item.variety}
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                                            Add Location
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {futurePlantings.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Future Plantings Planned</h3>
                        <p className="text-gray-500 mb-4">Plan your next growing season by adding future plantings.</p>
                        <button
                            onClick={() => setShowNewPlantingModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                        >
                            Plan First Planting
                        </button>
                    </div>
                )}
            </div>

            {/* New Planting Modal */}
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
                                                onClick={() => console.log('Add grow location')}
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
                                                    onChange={(e) => setPlantingData(prev => ({ ...prev, currentlyPlanted: e.target.value }))}
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

            {/* Harvest Modal */}
            {showHarvestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className=" text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
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
                                <button
                                    onClick={() => setShowNewPlantingModal(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                                >
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
            )}
        </div>
    );
};