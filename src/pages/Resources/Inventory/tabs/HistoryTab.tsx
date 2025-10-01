import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InventoryItem } from '../types/inventory';

interface HistoryTabProps {
    selectedItem: InventoryItem;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ selectedItem }) => {
    const handleBackClick = () => {
        window.location.href = '/resources/inventory';
    };

    return (
        <div className="space-y-6">
            {/* Back button - visible on mobile */}
            <div className="md:hidden mb-4">
                <button
                    onClick={handleBackClick}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1 font-medium"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Inventory</span>
                </button>
            </div>

            <h3 className="text-lg sm:text-xl font-medium text-gray-800">Inventory History</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Mar 15, 2024</td>
                                <td className="px-4 sm:px-6 py-4">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Added
                                    </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">+15.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{selectedItem.quantity}</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">New shipment received</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Mar 12, 2024</td>
                                <td className="px-4 sm:px-6 py-4">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                        Used
                                    </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">-3.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">12.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">Daily feeding</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile view for notes - shown below table on small screens */}
                <div className="sm:hidden border-t border-gray-200">
                    <div className="px-4 py-3 bg-gray-50">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Recent Notes</p>
                        <div className="space-y-2">
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Mar 15:</span>
                                <span className="text-gray-600 ml-1">New shipment received</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Mar 12:</span>
                                <span className="text-gray-600 ml-1">Daily feeding</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};