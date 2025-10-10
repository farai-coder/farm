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
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {futurePlantings.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                    {/* Main row */}
                    <div className="px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3 md:space-x-4">
                            <button
                                onClick={() => onToggleExpanded(item.id)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className={`w-4 h-4 transform transition-transform ${expandedItems[item.id] ? 'rotate-90' : 'rotate-0'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="font-medium text-gray-900 flex items-center text-sm md:text-base">
                                {item.variety}
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                    {item.plantingCount} Planned
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 text-sm w-full sm:w-auto">
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">START PLANTING</div>
                                <div className="text-gray-900 font-medium text-sm md:text-base">{item.startPlantingDate}</div>
                            </div>

                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">EXPECTED HARVEST</div>
                                <div className="text-gray-900 font-medium text-sm md:text-base">{item.expectedHarvestDate}</div>
                            </div>

                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">TOTAL PLANNED</div>
                                <div className="text-gray-900 font-medium text-sm md:text-base">{item.totalPlanned}</div>
                            </div>
                        </div>

                        <button className="text-gray-400 hover:text-gray-600 self-end sm:self-auto">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
                    </div>

                    {/* Expanded content - Detailed plantings table */}
                    {expandedItems[item.id] && (
                        <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-gray-300">
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Location</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Amount</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Start Date</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Expected Harvest</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.plantings.map((planting, index) => (
                                            <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                                <td className="py-3 text-sm text-gray-900 font-medium">{planting.location}</td>
                                                <td className="py-3 text-sm text-gray-700">{planting.amount}</td>
                                                <td className="py-3 text-sm text-gray-700">{planting.startDate}</td>
                                                <td className="py-3 text-sm text-gray-700">{planting.expectedHarvest}</td>
                                                <td className="py-3 text-sm">
                                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                                                        <button className="text-green-600 hover:text-green-800 text-xs">Start Planting</button>
                                                        <button className="text-red-600 hover:text-red-800 text-xs">Cancel</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                                <div className="text-sm text-gray-600">
                                    Total: {item.plantingCount} planned plantings for {item.variety}
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm w-full sm:w-auto">
                                    Add Location
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};