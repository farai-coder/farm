import React from 'react';

interface PlantingDetail {
    location: string;
    amount: string;
    startDate: string;
    expectedHarvest: string;
}

interface FuturePlanting {
    id: number;
    variety: string;
    plantingCount: number;
    startPlantingDate: string;
    expectedHarvestDate: string;
    totalPlanned: string;
    expanded: boolean;
    plantings: PlantingDetail[];
}

interface FuturePlantingsTableProps {
    futurePlantings: FuturePlanting[];
    expandedItems: Record<number, boolean>;
    onToggleExpanded: (id: number) => void;
}

export const FuturePlantingsTable: React.FC<FuturePlantingsTableProps> = ({
    futurePlantings,
    expandedItems,
    onToggleExpanded
}) => {
    // Flatten all plantings into a single array
    const allPlantings = futurePlantings.flatMap(item =>
        item.plantings.map(planting => ({
            ...planting,
            variety: item.variety,
            id: item.id
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
                            Start
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Harvest
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
                                    • 140 Plants
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.startDate}</div>
                                <div className="text-xs text-gray-500">Start in Trays, Transplant...</div>
                                <div className="text-xs text-gray-500">🌱 Seed Started</div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{planting.expectedHarvest}</div>
                                <div className="text-xs text-gray-500">0 Harvested</div>
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