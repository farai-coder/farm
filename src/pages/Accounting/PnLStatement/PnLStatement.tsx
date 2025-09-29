import React, { useState } from 'react';
import { Calendar, Printer } from 'lucide-react';

export const PnLStatementPage = () => {
    const [startDate, setStartDate] = useState('01/01/2022');
    const [endDate, setEndDate] = useState('12/31/2022');

    const pnlData = {
        income: [
            {
                id: '2',
                item: 'Sales of livestock, produce, grains, and other products you raised',
                amount: 1293.00,
                highlighted: true
            },
            {
                id: '3a',
                item: 'Cooperative distributions',
                amount: 1250.00
            },
            {
                id: '4a',
                item: 'Agricultural program payments',
                amount: 3500.00
            },
            {
                id: '7',
                item: 'Custom hire (machine work) income',
                amount: 1200.00
            }
        ],
        totalRevenue: 7243.00,
        expenses: [
            {
                id: '11',
                item: 'Chemicals',
                amount: 122.47
            },
            {
                id: '13',
                item: 'Custom hire (machine work)',
                amount: 968.66
            },
            {
                id: '16',
                item: 'Feed',
                amount: 65.00
            },
            {
                id: '17',
                item: 'Fertilizers and lime',
                amount: 1093.65
            },
            {
                id: '22',
                item: 'Labor hired (less employment credits)',
                amount: 225.00
            },
            {
                id: '25',
                item: 'Repairs and maintenance',
                amount: 1155.39
            }
        ]
    };

    const totalExpenses = pnlData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netIncome = pnlData.totalRevenue - totalExpenses;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Copperdale Gardens P&L Statement</h1>
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

                {/* P&L Statement */}
                <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300">
                    <div className="p-6">
                        {/* Income Section */}
                        <div className="mb-8 border-b-2 border-gray-300 pb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">Income</h3>
                            <div className="space-y-3">
                                {pnlData.income.map((income) => (
                                    <div
                                        key={income.id}
                                        className={`flex justify-between items-center py-2 border-b border-gray-200 ${income.highlighted ? 'bg-yellow-200 px-3 rounded' : ''
                                            }`}
                                    >
                                        <span className="text-blue-600">{income.id}. {income.item}</span>
                                        <span className="text-gray-800">${income.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total Revenue */}
                            <div className="flex justify-between items-center py-4 mt-4 border-t-2 border-gray-400 font-medium">
                                <span className="text-gray-800">Total Revenue:</span>
                                <span className="text-gray-800">${pnlData.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        {/* Expenses Section */}
                        <div className="mb-6 border-b-2 border-gray-300 pb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">Expenses</h3>
                            <div className="space-y-3">
                                {pnlData.expenses.map((expense) => (
                                    <div key={expense.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-blue-600">{expense.id}. {expense.item}</span>
                                        <span className="text-gray-800">
                                            ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total Expenses */}
                            <div className="flex justify-between items-center py-4 mt-4 border-t-2 border-gray-400 font-medium">
                                <span className="text-gray-800">Total Expenses:</span>
                                <span className="text-gray-800">${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        {/* Net Income */}
                        <div className="flex justify-between items-center py-4 border-t-2 border-gray-400 font-bold text-lg">
                            <span className="text-gray-800">Net Income:</span>
                            <span className={netIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
                                ${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

