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
                                value="2025-09-23"
                                onChange={(e) => handleInputChange('dateHarvested', e.target.value)}
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
                                    onChange={(e) => handleInputChange('estimatedRevenue', e.target.value)}
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
                                onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Trace Number</label>
                            <input
                                type="text"
                                value={harvestForm.traceNumber}
                                onChange={(e) => handleInputChange('traceNumber', e.target.value)}
                                placeholder="Leave blank to auto generate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                        <textarea
                            value={harvestForm.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
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
                                    onChange={(e) => handleInputChange('harvestedFrom', e.target.value)}
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
                                    onChange={(e) => handleInputChange('bed', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Size</label>
                                <input
                                    type="text"
                                    value={harvestForm.gradeSize}
                                    onChange={(e) => handleInputChange('gradeSize', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Harvested</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.amountHarvested}
                                    onChange={(e) => handleInputChange('amountHarvested', e.target.value)}
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
                    <button
                        onClick={() => setShowHarvestModal(true)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium"
                    >
                        Harvest
                    </button>
                    <button className="text-white hover:text-gray-200">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Harvest History</h2>
                <p className="text-sm text-gray-600 mb-6">Jan. 01, 2020 - Sep. 24, 2025</p>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Harvests Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">HARVESTS</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <div className="relative h-full">
                                    {/* Y-axis labels */}
                                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                                        {harvestChartData.map((item, index) => (
                                            <div key={index} className="flex items-center h-5">
                                                {item.location}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart area */}
                                    <div className="ml-12 h-full relative">
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
                                        <div className="absolute -bottom-8 left-1/3 text-xs text-gray-500 transform -rotate-45">
                                            Sep. 23, 2025
                                        </div>
                                    </div>
                                </div>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Weekly Yield Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">WEEKLY YIELD SINCE PLANTING BY LOCATION</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyYieldData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="week"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                        domain={[0, 600]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="yield"
                                        stroke="#0891b2"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#0891b2' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-end mt-4">
                            <div className="flex items-center space-x-1 text-xs">
                                <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                                <span>tyyt</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Harvest Records Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvested</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvested From</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Value</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added To Inventory</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loss</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entered By</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trace Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {harvestHistory.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{record.date}</span>
                                                <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium">{record.harvested}</span>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs ml-2">{record.yieldRate}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">(14% Yield Rate)</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.harvestedFrom}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.estValue}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{record.addedToInventory}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.loss}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.enteredBy}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{record.traceNumber}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-700">Displaying 1 record</p>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            {showHarvestModal && <HarvestModal />}
        </div>
    );
};

