import React from 'react';

interface PlantingHistoryItem {
    id: number;
    variety: string;
    plantingCount: number;
    firstPlanted: string;
    lastHarvested: string;
    totalHarvested: string;
    expanded: boolean;
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
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {plantingHistory.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                    {/* Main row */}
                    <div className="px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 space-y-2 sm:space-y-0">
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
                                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                    {item.plantingCount}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-sm">
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">FIRST PLANTED</div>
                                <div className="text-gray-900 text-sm md:text-base">{item.firstPlanted}</div>
                            </div>

                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">LAST HARVESTED</div>
                                <div className="text-gray-900 text-sm md:text-base">{item.lastHarvested}</div>
                            </div>

                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">TOTAL HARVESTED</div>
                                <div className="text-gray-900 text-sm md:text-base">{item.totalHarvested}</div>
                            </div>
                        </div>

                        <button className="text-gray-400 hover:text-gray-600 self-end sm:self-auto">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
                    </div>

                    {/* Expanded content */}
                    {expandedItems[item.id] && (
                        <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                <p>Detailed planting information for {item.variety} would appear here.</p>
                                <p className="mt-2">This could include specific planting dates, locations, quantities, and harvest records.</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};