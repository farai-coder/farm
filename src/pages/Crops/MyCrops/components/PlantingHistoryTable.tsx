import React from 'react';

interface PlantingDetail {
    location: string;
    amount: string;
    startDate: string;
    expectedHarvest: string;
}

interface PlantingHistoryItem {
    id: number;
    variety: string;
    plantingCount: number;
    firstPlanted: string;
    lastHarvested: string;
    totalHarvested: string;
    expanded: boolean;
    plantings: PlantingDetail[];
}

interface PlantingHistoryTableProps {
    plantingHistory: PlantingHistoryItem[];
    expandedItems: Record<number, boolean>;
    onToggleExpanded: (id: number) => void;
}

export const PlantingHistoryTable: React.FC<PlantingHistoryTableProps> = ({
    plantingHistory,
    expandedItems,
    onToggleExpanded
}) => {
    // Flatten all plantings into a single array
    const allPlantings = plantingHistory.flatMap(item =>
        item.plantings.map(planting => ({
            ...planting,
            variety: item.variety,
            id: item.id,
            totalHarvested: item.totalHarvested
        }))
    );

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-4">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left w-12">
                            <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            First Planted
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Harvested
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Harvested
                        </th>
                        <th className="px-4 py-3 text-left w-12"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allPlantings.map((planting, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.variety}</div>
                                <div className="text-xs text-gray-500">Bed 01</div>
                            </td>
                            <td className="px-4 py-4 text-sm text-blue-600">{planting.location}</td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.amount}</div>
                                <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white">
                                    • {planting.amount.replace(' plantings', '')} Plants
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.startDate}</div>
                                <div className="text-xs text-gray-500">Planted in Ground</div>
                                <div className="text-xs text-gray-500">✅ Completed</div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.expectedHarvest}</div>
                                <div className="text-xs text-gray-500">Harvest Complete</div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.totalHarvested}</div>
                                <div className="text-xs text-gray-500">Total Yield</div>
                            </td>
                            <td className="px-4 py-4">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};