import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { X, Plus, MoreHorizontal } from 'lucide-react';

export const HarvestManagement = () => {
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [currentView, setCurrentView] = useState('history'); // 'history' or 'new'

    // State for harvest form
    const [harvestForm, setHarvestForm] = useState({
        dateHarvested: '23/09/2025',
        estimatedRevenue: '0.00',
        batchNumber: '1001',
        traceNumber: '',
        note: '',
        harvestedFrom: '',
        bed: '',
        gradeSize: '',
        amountHarvested: '0.00'
    });

    // Sample harvest data for history view
    const [harvestHistory] = useState([
        {
            id: 1,
            date: 'Sep. 23, 2025',
            harvested: '545.00',
            yieldRate: '14%',
            harvestedFrom: 'tyyt',
            estValue: '$2,180.00',
            addedToInventory: 'Add to Inventory',
            loss: '',
            enteredBy: 'Farai',
            traceNumber: '545'
        }
    ]);

    // Chart data for harvest history
    const harvestChartData = [
        { location: '845', value: 0 },
        { location: '552', value: 0 },
        { location: '550', value: 0 },
        { location: '548', value: 0 },
        { location: '546', value: 0 },
        { location: '544', value: 1 },
        { location: '542', value: 0 },
        { location: '540', value: 0 },
        { location: '538', value: 0 },
        { location: '536', value: 0 }
    ];

    // Weekly yield chart data
    const weeklyYieldData = [
        { week: 'Q1', yield: 0 },
        { week: 'Q2', yield: 100 },
        { week: 'Q3', yield: 450 },
        { week: 'Q4', yield: 550 }
    ];

    const handleInputChange = (field, value) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveHarvest = () => {
        console.log('Saving harvest:', harvestForm);
        setShowHarvestModal(false);
        // Reset form
        setHarvestForm({
            dateHarvested: '23/09/2025',
            estimatedRevenue: '0.00',
            batchNumber: '1001',
            traceNumber: '',
            note: '',
            harvestedFrom: '',
            bed: '',
            gradeSize: '',
            amountHarvested: '0.00'
        });
    };

    const handleCancelHarvest = () => {
        setShowHarvestModal(false);
        setHarvestForm({
            dateHarvested: '23/09/2025',
            estimatedRevenue: '0.00',
            batchNumber: '1001',
            traceNumber: '',
            note: '',
            harvestedFrom: '',
            bed: '',
            gradeSize: '',
            amountHarvested: '0.00'
        });
    };

    // Harvest Modal Component
    const HarvestModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-4">
                {/* Modal Header */}
                <div className="text-white px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                            <div className="bg-gray-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                                77
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-base sm:text-xl font-semibold truncate">767, 767</h1>
                                <p className="text-xs sm:text-sm opacity-90 truncate">tyt</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm whitespace-nowrap">
                                Add Planting
                            </button>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white px-2 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm whitespace-nowrap">
                                Harvest
                            </button>
                            <button
                                onClick={() => setShowHarvestModal(false)}
                                className="text-white hover:text-gray-200 p-1 flex-shrink-0"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Record Harvest</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Date Harvested</label>
                            <input
                                type="date"
                                value="2025-09-23"
                                onChange={(e) => handleInputChange('dateHarvested', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Estimated Revenue Per</label>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 text-sm">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.estimatedRevenue}
                                    onChange={(e) => handleInputChange('estimatedRevenue', e.target.value)}
                                    className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                                <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">per</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                            <input
                                type="text"
                                value={harvestForm.batchNumber}
                                onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Trace Number</label>
                            <input
                                type="text"
                                value={harvestForm.traceNumber}
                                onChange={(e) => handleInputChange('traceNumber', e.target.value)}
                                placeholder="Leave blank to auto generate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Note</label>
                        <textarea
                            value={harvestForm.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            placeholder="Enter harvest notes..."
                        />
                    </div>

                    {/* Harvest Details Table */}
                    <div className="mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Harvested From</label>
                                <select
                                    value={harvestForm.harvestedFrom}
                                    onChange={(e) => handleInputChange('harvestedFrom', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                >
                                    <option value="">Select...</option>
                                    <option value="field-a">Field A</option>
                                    <option value="field-b">Field B</option>
                                    <option value="field-c">Field C</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Bed</label>
                                <input
                                    type="text"
                                    value={harvestForm.bed}
                                    onChange={(e) => handleInputChange('bed', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Grade/Size</label>
                                <input
                                    type="text"
                                    value={harvestForm.gradeSize}
                                    onChange={(e) => handleInputChange('gradeSize', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Amount Harvested</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.amountHarvested}
                                    onChange={(e) => handleInputChange('amountHarvested', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>
                        </div>

                        <button className="bg-gray-800 text-white px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-700">
                            Add Location
                        </button>
                    </div>

                    <div className="text-right text-sm sm:text-lg font-semibold text-gray-800 mb-4">
                        Harvest Total: 0.00
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleCancelHarvest}
                            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveHarvest}
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen w-full overflow-x-hidden">
            {/* Header */}
            <div className="text-white px-4 sm:px-6 py-3 sm:py-4 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <div className="bg-gray-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                            77
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-base sm:text-xl font-semibold truncate">767, 767</h1>
                            <p className="text-xs sm:text-sm opacity-90 truncate">tyt</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm whitespace-nowrap">
                            Add Planting
                        </button>
                        <button
                            onClick={() => setShowHarvestModal(true)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-2 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm whitespace-nowrap"
                        >
                            Harvest
                        </button>
                        <button className="text-white hover:text-gray-200 p-1 flex-shrink-0">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 w-full">
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">Harvest History1</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Jan. 01, 2020 - Sep. 24, 2025</p>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Harvests Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 w-full overflow-hidden">
                        <h3 className="text-sm sm:text-lg font-medium text-gray-700 mb-4">HARVESTS</h3>
                        <div className="h-48 sm:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <div className="relative h-full w-full">
                                    {/* Y-axis labels */}
                                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 w-8 sm:w-12">
                                        {harvestChartData.map((item, index) => (
                                            <div key={index} className="flex items-center h-5">
                                                {item.location}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart area */}
                                    <div className="ml-8 sm:ml-12 h-full relative">
                                        {/* Grid lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between">
                                            {harvestChartData.map((_, index) => (
                                                <div key={index} className="border-t border-gray-100"></div>
                                            ))}
                                        </div>

                                        {/* Data point */}
                                        <div className="absolute" style={{ top: '50%', left: '40%', transform: 'translateY(-50%)' }}>
                                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                            <div className="absolute -top-6 -left-4 text-xs text-teal-600 font-medium">845</div>
                                        </div>

                                        {/* X-axis label */}
                                        <div className="absolute -bottom-8 left-1/3 text-xs text-gray-500 transform -rotate-45 whitespace-nowrap">
                                            Sep. 23, 2025
                                        </div>
                                    </div>
                                </div>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Weekly Yield Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 w-full overflow-hidden">
                        <h3 className="text-xs sm:text-base font-medium text-gray-700 mb-4">WEEKLY YIELD SINCE PLANTING BY LOCATION</h3>
                        <div className="h-48 sm:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyYieldData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="week"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11 }}
                                    />
                                    <YAxis
                                        domain={[0, 600]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="yield"
                                        stroke="#0891b2"
                                        strokeWidth={2}
                                        dot={{ r: 3, fill: '#0891b2' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-end mt-4">
                            <div className="flex items-center gap-1 text-xs">
                                <div className="w-3 h-3 bg-teal-600 rounded-full flex-shrink-0"></div>
                                <span>tyyt</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Harvest Records Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Harvested</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">From</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Value</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Inventory</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Loss</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Entered By</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Trace #</th>
                                    <th className="px-2 sm:px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {harvestHistory.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">{record.date}</span>
                                                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-xs">{record.harvested}</span>
                                                <span className="bg-gray-100 text-gray-600 px-1 py-0.5 rounded text-xs flex-shrink-0">{record.yieldRate}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 hidden sm:block">(14% Yield)</div>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900">{record.harvestedFrom}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900">{record.estValue}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">{record.addedToInventory}</span>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">{record.loss}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">{record.enteredBy}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">{record.traceNumber}</span>
                                        </td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-xs sm:text-sm text-gray-700">Displaying 1 record</p>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            {showHarvestModal && <HarvestModal />}
        </div>
    );
};