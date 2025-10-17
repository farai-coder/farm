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
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvest</th>
                                <th className="px-4 py-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Peppers (Hot), Hatch Green Chili</div>
                                    <div className="text-xs text-gray-500">Bed 02</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-600">Southeast Field A</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">264.89 sqft</div>
                                    <span className="inline-block bg-gray-800 text-white px-2 py-0.5 rounded text-xs mt-1">~5,168 Plants</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Start May, 08, 2024 - Plant May, 14, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">Start in Trays, Transplant • <span className="inline-flex items-center"><span className="mr-1">🌱</span>Seed Started</span></div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Expected Jul, 31, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">0 Harvested</div>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Peppers (Hot), Hatch Green Chili</div>
                                    <div className="text-xs text-gray-500">Bed 03</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-600">Southeast Field A</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">213.33 sqft</div>
                                    <span className="inline-block bg-gray-800 text-white px-2 py-0.5 rounded text-xs mt-1">~120 Plants</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Start Apr, 18, 2024 - Plant Jun, 07, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">Start in Trays, Transplant • <span className="inline-flex items-center"><span className="mr-1">🌱</span>Seed Started</span></div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Expected Aug, 24, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">0 of 120 Harvested</div>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Peppers (Hot), Hatch Green Chili</div>
                                    <div className="text-xs text-gray-500">Bed 03</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-600">Southeast Field A</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">298.67 sqft</div>
                                    <span className="inline-block bg-gray-800 text-white px-2 py-0.5 rounded text-xs mt-1">~168 Plants</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Start May, 28, 2024 - Plant Jun, 07, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">Start in Trays, Transplant • <span className="inline-flex items-center"><span className="mr-1">🌱</span>Seed Started</span></div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Expected Aug, 24, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">0 Harvested</div>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Peppers (Hot), Hatch Green Chili</div>
                                    <div className="text-xs text-gray-500">Bed 04</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-600">Southeast Field A</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">298.67 sqft</div>
                                    <span className="inline-block bg-gray-800 text-white px-2 py-0.5 rounded text-xs mt-1">~168 Plants</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Start May, 28, 2024 - Plant Jun, 07, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">Start in Trays, Transplant • <span className="inline-flex items-center"><span className="mr-1">🌱</span>Seed Started</span></div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Expected Aug, 24, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">0 Harvested</div>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Peppers (Hot), Hatch Green Chili</div>
                                    <div className="text-xs text-gray-500">Bed 02</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-600">Southeast Field A</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">298.67 sqft</div>
                                    <span className="inline-block bg-gray-800 text-white px-2 py-0.5 rounded text-xs mt-1">~168 Plants</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Start May, 28, 2024 - Plant Jun, 07, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">Start in Trays, Transplant • <span className="inline-flex items-center"><span className="mr-1">🌱</span>Seed Started</span></div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-gray-900">Expected Aug, 24, 2024</div>
                                    <div className="text-xs text-gray-500 mt-1">0 Harvested</div>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};