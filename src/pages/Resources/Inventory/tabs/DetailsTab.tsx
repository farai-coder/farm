import React from 'react';
import { Plus } from 'lucide-react';
import { InventoryItem } from '../types/inventory';

interface DetailsTabProps {
    selectedItem: InventoryItem;
    openAddInventoryModal: () => void;
    openRemoveModal: () => void;
    openAdjustModal: () => void;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({
    selectedItem,
    openAddInventoryModal,
    openRemoveModal,
    openAdjustModal
}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-1">{selectedItem.name}</h2>
                    <div className="flex items-center space-x-2 sm:space-x-4 text-sm text-gray-600 flex-wrap">
                        <span>{selectedItem.avgDailyUsage || '0.00'} Avg Daily Usage</span>

                    </div>
                </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-red-700 font-medium">0.00 available</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                    onClick={openAddInventoryModal}
                    className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center space-x-2"
                >
                    <Plus size={16} />
                    <span>Add</span>
                </button>
                <button
                    onClick={openRemoveModal}
                    className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                    Remove
                </button>
                <button
                    onClick={openAdjustModal}
                    className="text-blue-600 hover:text-blue-800 px-3 sm:px-4 py-2 border border-blue-300 rounded-md text-sm flex items-center space-x-2"
                >
                    <span>📝</span>
                    <span>Manually Adjust</span>
                </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                <div className="text-gray-500 mb-2">No inventory available</div>
                <div className="text-gray-400 text-sm">You don't have any warehouses with inventory.</div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Warehouse
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bin
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Current
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Available
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Est. Value
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Main Storage</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">All counters</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">9.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">9.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">$36.00</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Cold Storage</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Bin A-1</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">5.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">5.00</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">$20.00</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Dry Storage</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Bin B-2</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">3.50</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">3.50</td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">$14.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Available:</span>
                    <span className="text-sm font-bold text-gray-900">17.50</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-gray-700">Total Value:</span>
                    <span className="text-sm font-bold text-gray-900">$70.00</span>
                </div>
            </div>
        </div>
    );
};