import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Edit, Plus, Trash2, X, Search, Info } from 'lucide-react';

export const MyCropsHarvests = () => {
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

    // Sample data for harvest charts
    const harvestData = [
        { date: '2021-06-01', pounds: 15 },
        { date: '2021-06-15', pounds: 20 },
        { date: '2021-07-01', pounds: 25 },
        { date: '2021-07-15', pounds: 30 },
        { date: '2021-08-01', pounds: 28 },
        { date: '2021-08-15', pounds: 32 },
        { date: '2021-09-01', pounds: 35 },
        { date: '2021-09-15', pounds: 30 },
        { date: '2021-10-01', pounds: 25 },
        { date: '2021-10-15', pounds: 20 },
        { date: '2021-11-01', pounds: 15 },
        { date: '2021-11-15', pounds: 10 },
        { date: '2021-12-01', pounds: 5 },
        { date: '2021-12-15', pounds: 8 },
        { date: '2022-01-01', pounds: 12 }
    ];

    const weeklyYieldData = [
        { week: 'Week 1', northwest: 5 },
        { week: 'Week 2', northwest: 8 },
        { week: 'Week 3', northwest: 12 },
        { week: 'Week 4', northwest: 15 },
        { week: 'Week 5', northwest: 18 },
        { week: 'Week 6', northwest: 22 },
        { week: 'Week 7', northwest: 25 },
        { week: 'Week 8', northwest: 28 },
        { week: 'Week 9', northwest: 30 },
        { week: 'Week 10', northwest: 35 },
        { week: 'Week 11', northwest: 32 },
        { week: 'Week 12', northwest: 28 }
    ];

    // Sample table data for harvest records
    const harvestRecords = [
        {
            date: 'Jan. 07, 2022',
            harvested: '25.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$50.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEPPER-PH-NW01'
        },
        {
            date: 'Jan. 05, 2022',
            harvested: '13.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$39.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEPPER-PH-NW01'
        },
        {
            date: 'Jan. 01, 2022',
            harvested: '16.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$32.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEPPER-PH-NW01'
        },
        {
            date: 'Dec. 22, 2021',
            harvested: '20.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$60.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Dec. 15, 2021',
            harvested: '27.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$54.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Dec. 01, 2021',
            harvested: '30.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$60.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Nov. 18, 2021',
            harvested: '25.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$50.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Nov. 05, 2021',
            harvested: '32.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$64.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Sep. 30, 2021',
            harvested: '19.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$38.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Sep. 21, 2021',
            harvested: '23.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$46.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Sep. 13, 2021',
            harvested: '40.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$120.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        }
    ];

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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            🌶️
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">Peppers (Hot), Thai Dragon</h1>
                            <p className="text-sm text-gray-600 truncate">Capsicum annuum, Hot</p>
                            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">PERTH</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap gap-2">
                        <button className="text-gray-600 hover:text-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap">Edit Plant</button>
                        <button
                            onClick={() => setShowNewPlantingModal(true)}
                            className="text-gray-600 hover:text-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap"
                        >
                            New Planting
                        </button>
                        <button
                            onClick={() => setShowHarvestModal(true)}
                            className="text-green-600 hover:text-green-800 px-2 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap"
                        >
                            New Harvest
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                            <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Harvest History</h2>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">Jan. 01, 2017 - Jan. 12, 2022</p>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    {/* Harvests Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="bg-yellow-300 text-black px-3 py-1 rounded text-sm font-medium mb-4 inline-block">
                            HARVESTS
                        </div>
                        <div className="h-48 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={harvestData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 40]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="pounds"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center space-x-1 mt-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>NORTHWEST FIELD</span>
                        </div>
                    </div>

                    {/* Weekly Yield by Location Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="bg-yellow-300 text-black px-3 py-1 rounded text-sm font-medium mb-4 inline-block">
                            WEEKLY YIELD BY LOCATION
                        </div>
                        <div className="h-48 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyYieldData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="week"
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 40]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Bar
                                        dataKey="northwest"
                                        fill="#10b981"
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center space-x-1 mt-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>NORTHWEST FIELD</span>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800">274</div>
                        <div className="text-xs sm:text-sm text-gray-600">Harvested</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800">11</div>
                        <div className="text-xs sm:text-sm text-gray-600">Harvested From</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800">$713</div>
                        <div className="text-xs sm:text-sm text-gray-600">Est. Value</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800">11</div>
                        <div className="text-xs sm:text-sm text-gray-600">Added To Inventory</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800">0</div>
                        <div className="text-xs sm:text-sm text-gray-600">Loss</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center">
                        <div className="text-lg sm:text-2xl font-bold text-gray-800">1</div>
                        <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">Entered By Total Numbers</div>
                        <div className="text-xs sm:text-sm text-gray-600 sm:hidden">Entered By</div>
                    </div>
                </div>

                {/* Harvest Records Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvested</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Harvested From</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Est. Value</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Added To Inventory</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Loss</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Entered By</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Trace Number</th>
                                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {harvestRecords.map((record, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.date}</td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.harvested}</td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 hidden sm:table-cell">{record.harvestedFrom}</td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 hidden md:table-cell">{record.estValue}</td>
                                        <td className="px-3 sm:px-4 py-3 text-sm hidden lg:table-cell">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {record.addedToInventory}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 hidden xl:table-cell">-</td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 hidden md:table-cell">{record.enteredBy}</td>
                                        <td className="px-3 sm:px-4 py-3 text-sm hidden lg:table-cell">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {record.traceNumber}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-sm">
                                            <div className="flex items-center space-x-1">
                                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                                    <Edit size={12} className="sm:w-3.5 sm:h-3.5" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800 p-1">
                                                    <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* New Planting Modal */}
            {showNewPlantingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Planting</h2>
                            <button
                                onClick={() => {
                                    setShowNewPlantingModal(false);
                                    setNewPlantingStep(1);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                            <div className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto">
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${newPlantingStep >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        1
                                    </div>
                                    <span className={`text-xs sm:text-sm ${newPlantingStep >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'} whitespace-nowrap`}>
                                        Crop Type & Location
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${newPlantingStep >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        2
                                    </div>
                                    <span className={`text-xs sm:text-sm ${newPlantingStep >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'} whitespace-nowrap`}>
                                        Planting Details
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${newPlantingStep >= 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        ✓
                                    </div>
                                    <span className={`text-xs sm:text-sm ${newPlantingStep >= 3 ? 'text-gray-800 font-medium' : 'text-gray-500'} whitespace-nowrap`}>
                                        Complete
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 sm:p-6">
                            {newPlantingStep === 1 && (
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                            <input
                                                type="text"
                                                value={plantingData.cropType}
                                                onChange={(e) => setPlantingData(prev => ({ ...prev, cropType: e.target.value }))}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <div className="flex items-center space-x-3">
                                                <Search className="w-4 h-4 text-gray-400" />
                                                <button
                                                    onClick={handleNewCropType}
                                                    className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
                                                >
                                                    New Crop Type
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Grow Location</label>
                                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                            <input
                                                type="text"
                                                value={plantingData.growLocation}
                                                onChange={(e) => setPlantingData(prev => ({ ...prev, growLocation: e.target.value }))}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <button
                                                onClick={() => console.log('Add grow location')}
                                                className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
                                            >
                                                Add Grow Location
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {newPlantingStep === 2 && (
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm flex-shrink-0">
                                            🌶️
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold truncate">Peppers (Hot), Thai Dragon</h3>
                                            <p className="text-sm text-gray-600 truncate">Capsicum annuum, Hot</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                                        <div className="flex items-start space-x-2">
                                            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-blue-800">
                                                Planting Info: 3 sqm (Approx.) - Planted in 1 rows (3937 per row)
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Harvest Plan</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowNewPlantingModal(false);
                                    setNewPlantingStep(1);
                                }}
                                className="text-gray-600 hover:text-gray-800 px-3 sm:px-4 py-2 text-xs sm:text-sm"
                            >
                                Cancel
                            </button>

                            <div className="flex items-center space-x-2 sm:space-x-3">
                                {newPlantingStep < 2 ? (
                                    <button
                                        onClick={() => setNewPlantingStep(2)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setShowNewPlantingModal(false);
                                            setNewPlantingStep(1);
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className=" text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-t-lg space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    🌶️
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-lg sm:text-xl font-semibold truncate">Peppers (Hot), Thai Dragon</h1>
                                    <p className="text-sm opacity-90 truncate">Capsicum annuum, Hot</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 flex-wrap gap-2">
                                <button
                                    onClick={() => setShowNewPlantingModal(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium whitespace-nowrap"
                                >
                                    Add Planting
                                </button>
                                <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium whitespace-nowrap">
                                    Harvest
                                </button>
                                <button
                                    onClick={() => setShowHarvestModal(false)}
                                    className="text-white hover:text-gray-200 p-1"
                                >
                                    <X size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Record Harvest</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Harvested</label>
                                    <input
                                        type="date"
                                        value="2025-09-23"
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
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

                            <div className="mb-4 sm:mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                                <textarea
                                    value={harvestForm.note}
                                    onChange={(e) => handleHarvestInputChange('note', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter harvest notes..."
                                />
                            </div>

                            {/* Harvest Details Table */}
                            <div className="mb-4 sm:mb-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Harvested From</label>
                                        <select
                                            value={harvestForm.harvestedFrom}
                                            onChange={(e) => handleHarvestInputChange('harvestedFrom', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Northwest Field A">Northwest Field A</option>
                                            <option value="Northwest Field B">Northwest Field B</option>
                                            <option value="Greenhouse A">Greenhouse A</option>
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

                                <button className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-700 whitespace-nowrap">
                                    Add Location
                                </button>
                            </div>

                            <div className="text-right text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
                                Harvest Total: 0.00
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleCancelHarvest}
                                    className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm sm:text-base order-2 sm:order-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveHarvest}
                                    className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm sm:text-base order-1 sm:order-2"
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