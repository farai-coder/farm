import React from 'react';

interface CropPlanItem {
    id: number;
    crop: string;
    variety: string;
    planted: number;
    unit: string;
    location: string;
    beds: string;
    keyDates: {
        start: string;
        first: string;
        harvest: string;
    };
    timeline: Record<string, boolean>;
}

interface CropPlanTableProps {
    data: CropPlanItem[];
}

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getTimelineColor = (crop: string): string => {
    const colors: Record<string, string> = {
        'Tomatoes San Marzano': '#f59e0b',
        'Tomatoes Roma': '#3b82f6',
        'Peppers (Hot) Thai Dragon': '#10b981'
    };
    return colors[crop] || '#6b7280';
};

export const CropPlanTable: React.FC<CropPlanTableProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                Crop
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                # Planted
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-48">
                                Key Dates
                            </th>
                            {months.map(month => (
                                <th key={month} className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-10 border-r border-gray-200 last:border-r-0">
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                            {item.crop}
                                        </span>
                                        <span className="text-xs text-gray-500">{item.variety}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900">{item.planted}</span>
                                        <span className="text-xs text-gray-500">{item.unit}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                            {item.location}
                                        </span>
                                        <div className="flex items-center mt-1 space-x-1">
                                            <span className="text-xs text-gray-500">Beds:</span>
                                            {item.beds.split(', ').map((bed, index) => (
                                                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {bed}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 border-r border-gray-200 w-48">
                                    <div className="text-xs space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                                            <span className="text-gray-600 truncate">Start: {item.keyDates.start}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-block w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                                            <span className="text-gray-600 truncate">First: {item.keyDates.first}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                                            <span className="text-gray-600 truncate">Harvest: {item.keyDates.harvest}</span>
                                        </div>
                                    </div>
                                </td>

                                {months.map((month) => (
                                    <td key={month} className="px-1 py-4 text-center border-r border-gray-200 last:border-r-0">
                                        {item.timeline[month.toLowerCase() as keyof typeof item.timeline] && (
                                            <div
                                                className="h-6 rounded mx-auto border border-opacity-20"
                                                style={{
                                                    backgroundColor: getTimelineColor(item.crop),
                                                    borderColor: getTimelineColor(item.crop),
                                                    width: '20px'
                                                }}
                                            ></div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
