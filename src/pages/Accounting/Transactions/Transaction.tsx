import React, { useState } from 'react';
import { Plus, Search, Filter, Upload, Printer, ChevronDown } from 'lucide-react';

export const TransactionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('Date: This Year');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // Mock transaction data
    const transactions = [
        {
            id: 1,
            date: 'Jun. 03, 2021',
            payee: 'Corn Williams - North via Sayloff - Fresh Reynolds',
            category: 'Labor hired (less employment credits)',
            description: '3 employees picking vegetables for tomorrows',
            type: 'Expense',
            amount: -125.00
        },
        {
            id: 2,
            date: 'May. 28, 2021',
            payee: 'Agricultural Coop',
            category: 'Cooperative distributions',
            description: 'Quarterly distribution payment',
            type: 'Income',
            amount: 312.50
        },
        {
            id: 3,
            date: 'May. 25, 2021',
            payee: 'Farm Supply Co.',
            category: 'Fertilizers and lime',
            description: 'Bulk fertilizer purchase for spring planting',
            type: 'Expense',
            amount: -547.33
        },
        {
            id: 4,
            date: 'May. 20, 2021',
            payee: 'Local Farmers Market',
            category: 'Sales of livestock, produce, grains',
            description: 'Weekly produce sales',
            type: 'Income',
            amount: 286.75
        },
        {
            id: 5,
            date: 'May. 15, 2021',
            payee: 'Machinery Rental LLC',
            category: 'Custom hire (machine work)',
            description: 'Tractor rental for field preparation',
            type: 'Expense',
            amount: -175.00
        }
    ];

    const summaryData = {
        revenue: 7243,
        expenses: 4851,
        profit: 2392
    };

    const chartData = [
        { month: 'January', income: 850, expense: -650 },
        { month: 'February', income: 950, expense: -750 },
        { month: 'March', income: 1200, expense: -800 },
        { month: 'April', income: 1500, expense: -950 },
        { month: 'May', income: 1800, expense: -1200 },
        { month: 'June', income: 2100, expense: -900 },
        { month: 'July', income: 2400, expense: -1100 },
        { month: 'August', income: 1900, expense: -850 },
        { month: 'September', income: 1650, expense: -950 },
        { month: 'October', income: 1400, expense: -800 },
        { month: 'November', income: 1200, expense: -650 },
        { month: 'December', income: 1000, expense: -500 }
    ];

    const expenseCategories = [
        { category: 'Seeds and plants', percentage: 28.14, color: 'bg-teal-600' },
        { category: 'Repairs and main', percentage: 23.83, color: 'bg-blue-600' },
        { category: 'Fertilizers and', percentage: 22.54, color: 'bg-yellow-500' },
        { category: 'Custom hire', percentage: 19.94, color: 'bg-green-500' },
        { category: 'Labor hired', percentage: 4.64, color: 'bg-gray-500' },
        { category: 'Chemicals', percentage: 2.52, color: 'bg-purple-500' },
        { category: 'Feed', percentage: 1.34, color: 'bg-red-500' }
    ];

    const filteredTransactions = transactions.filter(transaction =>
        transaction.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Summary Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">2022 Summary</h2>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* Income vs Expense Chart */}
                        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="text-sm font-medium text-gray-600 mb-4">2022 INCOME VS EXPENSE</h3>
                            <div className="h-64 flex items-end justify-between space-x-1">
                                {chartData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1 max-w-8">
                                        <div className="flex flex-col justify-end h-48 w-full space-y-px">
                                            {/* Income bar */}
                                            <div
                                                className="bg-green-600 w-full"
                                                style={{ height: `${Math.max((data.income / 2500) * 120, 2)}px` }}
                                            ></div>
                                            {/* Expense bar */}
                                            <div
                                                className="bg-red-500 w-full"
                                                style={{ height: `${Math.max((Math.abs(data.expense) / 2500) * 120, 2)}px` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-bottom-left">
                                            {data.month.slice(0, 3)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center mt-4 space-x-4 text-xs">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-600 mr-1"></div>
                                    <span>Income</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 mr-1"></div>
                                    <span>Expense</span>
                                </div>
                            </div>
                        </div>

                        {/* Expense Categories Pie Chart */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="text-sm font-medium text-gray-600 mb-4">2022 EXPENSE CATEGORIES</h3>

                            {/* Pie Chart */}
                            <div className="flex justify-center mb-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                                        {/* Create pie slices */}
                                        <circle
                                            cx="18"
                                            cy="18"
                                            r="15.9155"
                                            fill="none"
                                            stroke="#0F766E" // teal-700
                                            strokeWidth="3"
                                            strokeDasharray="28.14, 100"
                                        />
                                        <circle
                                            cx="18"
                                            cy="18"
                                            r="15.9155"
                                            fill="none"
                                            stroke="#2563EB" // blue-600
                                            strokeWidth="3"
                                            strokeDasharray="23.83, 100"
                                            strokeDashoffset="-28.14"
                                        />
                                        <circle
                                            cx="18"
                                            cy="18"
                                            r="15.9155"
                                            fill="none"
                                            stroke="#EAB308" // yellow-500
                                            strokeWidth="3"
                                            strokeDasharray="22.54, 100"
                                            strokeDashoffset="-51.97"
                                        />
                                        <circle
                                            cx="18"
                                            cy="18"
                                            r="15.9155"
                                            fill="none"
                                            stroke="#22C55E" // green-500
                                            strokeWidth="3"
                                            strokeDasharray="19.94, 100"
                                            strokeDashoffset="-74.51"
                                        />
                                        <circle
                                            cx="18"
                                            cy="18"
                                            r="15.9155"
                                            fill="none"
                                            stroke="#6B7280" // gray-500
                                            strokeWidth="3"
                                            strokeDasharray="4.64, 100"
                                            strokeDashoffset="-94.45"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="space-y-2 text-xs">
                                {expenseCategories.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className={`w-3 h-3 ${item.color} rounded mr-2`}></div>
                                            <span className="text-gray-700">{item.category} ({item.percentage}%)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Record Transaction Button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Record a Transaction</span>
                        </button>

                        {/* Upload Button */}
                        <button className="text-gray-600 hover:text-gray-800 p-2">
                            <Upload className="w-4 h-4" />
                        </button>

                        {/* Print Button */}
                        <button className="text-gray-600 hover:text-gray-800 p-2">
                            <Printer className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Transactions"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 pl-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <span>{dateFilter}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
                        Revenue: ${summaryData.revenue.toLocaleString()}
                    </div>
                    <div className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium">
                        Expenses: ${summaryData.expenses.toLocaleString()}
                    </div>
                    <div className="bg-green-700 text-white px-4 py-2 rounded text-sm font-medium">
                        Profit: ${summaryData.profit.toLocaleString()}
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Criteria: Transaction Date: This Year</span>
                        <button className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                        <div className="col-span-2">Date</div>
                        <div className="col-span-3">Payee</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-3">Description</div>
                        <div className="col-span-1">Type</div>
                        <div className="col-span-1">Amount</div>
                    </div>

                    {/* Transaction Rows */}
                    <div className="divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                            <div key={transaction.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-900">{transaction.date}</span>
                                </div>
                                <div className="col-span-3">
                                    <span className="text-sm text-gray-900">{transaction.payee}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-600">{transaction.category}</span>
                                </div>
                                <div className="col-span-3">
                                    <span className="text-sm text-gray-600">{transaction.description}</span>
                                </div>
                                <div className="col-span-1">
                                    <span className={`text-sm px-2 py-1 rounded text-xs ${transaction.type === 'Income'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {transaction.type}
                                    </span>
                                </div>
                                <div className="col-span-1 text-right">
                                    <span className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

