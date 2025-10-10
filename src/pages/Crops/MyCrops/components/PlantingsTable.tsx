import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Planting } from '../../types/planting';

interface PlantingsTableProps {
    plantings: Planting[];
    onToggleExpanded: (id: number) => void;
}

export const PlantingsTable: React.FC<PlantingsTableProps> = ({ plantings, onToggleExpanded }) => {
    return (
        <div className="mb-4 sm:mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <h3 className="font-medium text-gray-800">Tyyt</h3>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">3</span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-600">TOTAL PLANTED</div>
                            <div className="font-semibold">7.62 sqm</div>
                            <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">~11,811 Plants</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">0 of 11,811 Harvested</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvest</th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-blue-600 hover:text-blue-800">767, 767</div>
                                    <div className="text-xs text-gray-500">Bed: 01</div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-sm text-gray-900">2.54 sqm (100.0 bed m)</div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">~3,937 Plants</span>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-sm text-gray-900">Plant Sep. 23, 2025</div>
                                    <div className="text-xs text-gray-500">Direct Sow</div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-1">🌱</span>
                                        <span>Seed Started</span>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-gray-500">-</td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-blue-600 hover:text-blue-800">767, 767</div>
                                    <div className="text-xs text-gray-500">Bed: 01</div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-sm text-gray-900">2.54 sqm (100.0 bed m)</div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">~3,937 Plants</span>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-sm text-gray-900">Plant Sep. 23, 2025</div>
                                    <div className="text-xs text-gray-500">Transplant</div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-1">🌱</span>
                                        <span>Seed Started</span>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-gray-500">-</td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-blue-600 hover:text-blue-800">767, 767</div>
                                    <div className="text-xs text-gray-500">Bed: 01</div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-sm text-gray-900">2.54 sqm (100.0 bed m)</div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">~3,937 Plants</span>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="text-sm text-gray-900">Plant Sep. 23, 2025</div>
                                    <div className="text-xs text-gray-500">Direct Sow</div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-1">🌱</span>
                                        <span>Seed Started</span>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-gray-500">-</td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-t border-gray-200 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View all Plantings in Tyyt
                    </button>
                </div>
            </div>
        </div>
    );
};