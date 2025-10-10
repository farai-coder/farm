import React from 'react';

interface ChartData {
    locations: string[];
    plantingsByLocation: {
        location: string;
        plantings: number;
    }[];
}

interface PlantingsChartProps {
    chartData: ChartData;
}

export const PlantingsChart: React.FC<PlantingsChartProps> = ({ chartData }) => {
    return (
        <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-medium text-gray-700 mb-3 md:mb-4">PLANNED PLANTINGS BY LOCATION</h3>

            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="relative h-48 md:h-64">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                        {chartData.locations.map((location, index) => (
                            <div key={index} className="flex items-center h-4 md:h-5 text-xs">
                                {location}
                            </div>
                        ))}
                    </div>

                    {/* Chart area */}
                    <div className="ml-8 md:ml-12 h-full relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {chartData.locations.map((_, index) => (
                                <div key={index} className="border-t border-gray-100"></div>
                            ))}
                        </div>

                        {/* Data points */}
                        <div className="absolute inset-0">
                            {chartData.plantingsByLocation.map((item, index) => {
                                const yPosition = (index / (chartData.locations.length - 1)) * 100;
                                return (
                                    <div
                                        key={index}
                                        className="absolute"
                                        style={{
                                            top: `${yPosition}%`,
                                            left: item.plantings > 0 ? '25%' : '0%',
                                            transform: 'translateY(-50%)'
                                        }}
                                    >
                                        {item.plantings > 0 && (
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-0 right-0 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span>Future Plantings</span>
                            </div>
                        </div>

                        {/* X-axis label */}
                        <div className="absolute -bottom-6 md:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 -rotate-45">
                            Oct. 2025 - Feb. 2026
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};