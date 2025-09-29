import React, { useState } from 'react';
import { Download, Grid3X3, MoreHorizontal } from 'lucide-react';

export const GrowLocationAccounting = () => {
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');

    // Sample accounting transactions data matching the image
    const transactions = [
        {
            id: 1,
            date: 'Jun. 04, 2022',
            payee: 'Boulder Farmers Market',
            category: 'Sales of livestock, produce, grains and other products you raised',
            description: 'Misc Sales at Farmers Market',
            type: 'Income',
            amount: '$296.93'
        },
        {
            id: 2,
            date: 'Jun. 02, 2022',
            payee: 'Greg Williams, Stephanie Sybak, Frank Reynolds',
            category: 'Labor hired (less employment credits)',
            description: '3 employees picking vegetables for tomorrows farmers market ($15/hr x 5 hours each)',
            type: 'Expense',
            amount: '-$225.00'
        },
        {
            id: 3,
            date: 'Jun. 01, 2022',
            payee: 'Various',
            category: 'Agricultural program payments',
            description: 'June 2022 CSA Share Payments for 70 recurring subscriptions',
            type: 'Income',
            amount: '$3,500.00'
        },
        {
            id: 4,
            date: 'Apr. 13, 2022',
            payee: 'Pete\'s Pesticides',
            category: 'Chemicals',
            description: 'Purchased first application of pesticides for 2022 Season',
            type: 'Expense',
            amount: '-$122.47'
        },
        {
            id: 5,
            date: 'Apr. 05, 2022',
            payee: 'Meyer Manure Corp',
            category: 'Fertilizers and lime',
            description: 'Manure from Meyer\'s for Northwest Field A',
            type: 'Expense',
            amount: '-$750.00'
        },
        {
            id: 6,
            date: 'Mar. 17, 2022',
            payee: 'Norton Nurseries',
            category: 'Seeds and plants',
            description: 'Seeds for 2022 CSA Crops in Northwest Field A',
            type: 'Expense',
            amount: '-$458.22'
        },
        {
            id: 7,
            date: 'Mar. 09, 2022',
            payee: 'Agriculture Fertilizer LLC',
            category: 'Fertilizers and lime',
            description: 'Various Nutrients for Northwest Field A - NitroGen Xtreme, Big Bloom, GrowZilla XXL',
            type: 'Expense',
            amount: '-$327.63'
        },
        {
            id: 8,
            date: 'Mar. 01, 2022',
            payee: 'Tillfit Tiling Services',
            category: 'Custom hire (machine work)',
            description: 'Northwest Field A prep work for 2022 season',
            type: 'Expense',
            amount: '-$539.86'
        }
    ];

    const getTypeColor = (type) => {
        return type === 'Income' ? 'bg-green-500' : 'bg-red-500';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Sales of livestock, produce, grains and other products you raised': 'bg-blue-100 text-blue-800',
            'Labor hired (less employment credits)': 'bg-yellow-100 text-yellow-800',
            'Agricultural program payments': 'bg-green-100 text-green-800',
            'Chemicals': 'bg-red-100 text-red-800',
            'Fertilizers and lime': 'bg-purple-100 text-purple-800',
            'Seeds and plants': 'bg-orange-100 text-orange-800',
            'Custom hire (machine work)': 'bg-gray-100 text-gray-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                        <p className="text-sm text-gray-600">2.5 Acre <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">Active</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                            <Grid3X3 size={16} />
                        </button>
                    </div>
                </div>

                {/* Accounting Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payee</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{transaction.date}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{transaction.payee}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">
                                            <div className="truncate" title={transaction.description}>
                                                {transaction.description}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-3 h-3 rounded-full ${getTypeColor(transaction.type)}`}></div>
                                                <span className="text-sm text-gray-900">{transaction.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-right">
                                            <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                                                {transaction.amount}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Displaying all 8 transactions
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1">
                                <Download size={14} />
                                <span>Download Transactions</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">Total Income</div>
                        <div className="text-2xl font-bold text-green-600">$3,796.93</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">Total Expenses</div>
                        <div className="text-2xl font-bold text-red-600">-$2,423.18</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">Net Profit</div>
                        <div className="text-2xl font-bold text-gray-800">$1,373.75</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

