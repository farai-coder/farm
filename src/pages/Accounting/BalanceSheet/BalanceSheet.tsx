import React, { useState } from 'react';
import { Download, RotateCcw, Printer, Plus } from 'lucide-react';

interface BalanceSheetItem {
    id: string;
    name: string;
    amount: number;
    isEditable?: boolean;
}

interface BalanceSheetSection {
    title: string;
    items: BalanceSheetItem[];
    showAddButton?: boolean;
}

export const BalanceSheet: React.FC = () => {
    const [assetsData, setAssetsData] = useState<BalanceSheetSection[]>([
        {
            title: "ASSETS",
            items: [
                { id: 'cash', name: 'Cash', amount: 0.00, isEditable: true },
                { id: 'accounts-receivable', name: 'Accounts receivable', amount: 0.00, isEditable: true },
                { id: 'equipment', name: 'Equipment', amount: 0.00, isEditable: true },
                { id: 'inventory', name: 'Inventory', amount: 0.00, isEditable: true },
                { id: 'land-value', name: 'Land value', amount: 0.00, isEditable: true },
                { id: 'livestock-inventory', name: 'Livestock inventory', amount: 0.00, isEditable: true }
            ],
            showAddButton: true
        }
    ]);

    const [liabilitiesData, setLiabilitiesData] = useState<BalanceSheetSection[]>([
        {
            title: "LIABILITIES",
            items: [
                { id: 'accounts-payable', name: 'Accounts payable', amount: 0.00, isEditable: true },
                { id: 'loans-credit-cards', name: 'Loans or credit cards', amount: 0.00, isEditable: true },
                { id: 'rent', name: 'Rent', amount: 0.00, isEditable: true },
                { id: 'sales-taxes', name: 'Sales taxes', amount: 0.00, isEditable: true },
                { id: 'taxes', name: 'Taxes', amount: 0.00, isEditable: true },
                { id: 'utilities', name: 'Utilities', amount: 0.00, isEditable: true }
            ],
            showAddButton: true
        }
    ]);

    const [editingItem, setEditingItem] = useState<string | null>(null);

    const calculateTotal = (sections: BalanceSheetSection[]): number => {
        return sections.reduce((total, section) => {
            return total + section.items.reduce((sectionTotal, item) => sectionTotal + item.amount, 0);
        }, 0);
    };

    const totalAssets = calculateTotal(assetsData);
    const totalLiabilities = calculateTotal(liabilitiesData);
    const ownersEquity = totalAssets - totalLiabilities;

    const handleItemEdit = (sectionType: 'assets' | 'liabilities', itemId: string, newAmount: number) => {
        if (sectionType === 'assets') {
            setAssetsData(prev => prev.map(section => ({
                ...section,
                items: section.items.map(item =>
                    item.id === itemId ? { ...item, amount: newAmount } : item
                )
            })));
        } else {
            setLiabilitiesData(prev => prev.map(section => ({
                ...section,
                items: section.items.map(item =>
                    item.id === itemId ? { ...item, amount: newAmount } : item
                )
            })));
        }
        setEditingItem(null);
    };

    const addNewRow = (sectionType: 'assets' | 'liabilities') => {
        const newId = `custom-${Date.now()}`;
        const newItem: BalanceSheetItem = {
            id: newId,
            name: 'New Item',
            amount: 0.00,
            isEditable: true
        };

        if (sectionType === 'assets') {
            setAssetsData(prev => prev.map(section => ({
                ...section,
                items: [...section.items, newItem]
            })));
        } else {
            setLiabilitiesData(prev => prev.map(section => ({
                ...section,
                items: [...section.items, newItem]
            })));
        }
    };

    const handleExport = () => {
        console.log('Exporting balance sheet...');
    };

    const handleReset = () => {
        console.log('Resetting balance sheet...');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <span className="text-blue-600 hover:underline cursor-pointer">Accounting</span>
                    <span>›</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Reports</span>
                    <span>›</span>
                    <span>Balance Sheet</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">GrossCart</h1>
                        <p className="text-gray-600 mt-1">Balance Sheet</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleExport}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>

                        <button
                            onClick={handleReset}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset</span>
                        </button>

                        <button
                            onClick={handlePrint}
                            className="p-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Balance Sheet Content */}
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Assets Section */}
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">ASSETS</h2>

                        <div className="space-y-1">
                            {assetsData[0].items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <div className="flex-1">
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 w-32">
                                        <span className="text-gray-500">$</span>
                                        {editingItem === item.id ? (
                                            <input
                                                type="number"
                                                value={item.amount}
                                                onChange={(e) => handleItemEdit('assets', item.id, parseFloat(e.target.value) || 0)}
                                                onBlur={() => setEditingItem(null)}
                                                onKeyPress={(e) => e.key === 'Enter' && setEditingItem(null)}
                                                className="w-20 text-right border border-gray-300 rounded px-2 py-1 text-sm"
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                className="text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded w-20 text-right"
                                                onClick={() => setEditingItem(item.id)}
                                            >
                                                {item.amount.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Add Row Button for Assets */}
                            <div className="pt-2">
                                <button
                                    onClick={() => addNewRow('assets')}
                                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Row</span>
                                </button>
                            </div>
                        </div>

                        {/* Total Assets */}
                        <div className="flex items-center justify-between py-3 mt-4 border-t border-gray-300 font-semibold">
                            <span className="text-gray-900">TOTAL ASSETS</span>
                            <div className="flex items-center space-x-4 w-32">
                                <span className="text-gray-500">$</span>
                                <span className="text-gray-900 w-20 text-right">{totalAssets.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Liabilities Section */}
                    <div className="p-6 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">LIABILITIES</h2>

                        <div className="space-y-1">
                            {liabilitiesData[0].items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <div className="flex-1">
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 w-32">
                                        <span className="text-gray-500">$</span>
                                        {editingItem === item.id ? (
                                            <input
                                                type="number"
                                                value={item.amount}
                                                onChange={(e) => handleItemEdit('liabilities', item.id, parseFloat(e.target.value) || 0)}
                                                onBlur={() => setEditingItem(null)}
                                                onKeyPress={(e) => e.key === 'Enter' && setEditingItem(null)}
                                                className="w-20 text-right border border-gray-300 rounded px-2 py-1 text-sm"
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                className="text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded w-20 text-right"
                                                onClick={() => setEditingItem(item.id)}
                                            >
                                                {item.amount.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Add Row Button for Liabilities */}
                            <div className="pt-2">
                                <button
                                    onClick={() => addNewRow('liabilities')}
                                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Row</span>
                                </button>
                            </div>
                        </div>

                        {/* Total Liabilities */}
                        <div className="flex items-center justify-between py-3 mt-4 border-t border-gray-300 font-semibold">
                            <span className="text-gray-900">TOTAL LIABILITIES</span>
                            <div className="flex items-center space-x-4 w-32">
                                <span className="text-gray-500">$</span>
                                <span className="text-gray-900 w-20 text-right">{totalLiabilities.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Owner's Equity Section */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between py-3 font-semibold text-lg">
                            <span className="text-gray-900">OWNER'S EQUITY</span>
                            <div className="flex items-center space-x-4 w-32">
                                <span className="text-gray-500">$</span>
                                <span className="text-gray-900 w-20 text-right">{ownersEquity.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <p className="text-xs text-gray-600 leading-relaxed">
                            <strong>Note:</strong> Updates and changes you make to the balance sheet are not saved. To save your updates please export or print your balance sheet before leaving this page.
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                            FarmBrite is not responsible for the accuracy of this data. Always review and double check your records with an accounting professional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
