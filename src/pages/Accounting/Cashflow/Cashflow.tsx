import React, { useState } from 'react';
import { Calendar, Printer } from 'lucide-react';

export const CashFlowPage = () => {
    const [startDate, setStartDate] = useState('01/01/2022');
    const [endDate, setEndDate] = useState('12/31/2022');

    const cashFlowData = {
        beginningBalance: 14324.08,
        operatingActivities: [
            { item: 'Agricultural program payments', amount: 3500.00 },
            { item: 'Cooperative distributions', amount: 1250.00 },
            { item: 'Custom hire (machine work) income', amount: 1200.00, highlighted: true },
            { item: 'Sales of livestock, produce, grains, and other products you raised', amount: 1293.00 }
        ],
        totalCashInflow: 7243.00,
        expenditures: [
            { item: 'Chemicals', amount: -122.47 },
            { item: 'Custom hire (machine work)', amount: -968.66 },
            { item: 'Feed', amount: -65.00 },
            { item: 'Fertilizers and lime', amount: -1093.65 }
        ]
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Copperdale Gardens Cash Flow Statement</h1>
                    <button className="text-gray-600 hover:text-gray-800 p-2">
                        <Printer className="w-5 h-5" />
                    </button>
                </div>

                {/* Date Range and Update */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-32"
                            />
                            <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-gray-600">to</span>
                        <div className="relative">
                            <input
                                type="text"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-32"
                            />
                            <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Update
                    </button>
                </div>

                {/* Cash Flow Statement */}
                <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300">
                    <div className="p-6">
                        {/* Beginning Cash Balance */}
                        <div className="flex justify-between items-center py-4 border-b-2 border-gray-300 mb-6">
                            <span className="font-medium text-gray-800">Beginning Cash Balance</span>
                            <span className="font-medium text-gray-800">${cashFlowData.beginningBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>

                        {/* Cash from Operating Activities */}
                        <div className="mb-8 border-b-2 border-gray-300 pb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">Cash from Operating Activities</h3>
                            <div className="space-y-3">
                                {cashFlowData.operatingActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center py-2 border-b border-gray-200 ${activity.highlighted ? 'bg-yellow-200 px-3 rounded' : ''
                                            }`}
                                    >
                                        <span className="text-gray-700">{activity.item}</span>
                                        <span className="text-gray-800">${activity.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total Cash Inflow */}
                            <div className="flex justify-between items-center py-4 mt-4 border-t-2 border-gray-400 font-medium">
                                <span className="text-gray-800">Total Cash Inflow:</span>
                                <span className="text-gray-800">${cashFlowData.totalCashInflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        {/* Cash Expenditures */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">Cash Expenditures</h3>
                            <div className="space-y-3">
                                {cashFlowData.expenditures.map((expenditure, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-700">{expenditure.item}</span>
                                        <span className="text-red-600">
                                            ${Math.abs(expenditure.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
