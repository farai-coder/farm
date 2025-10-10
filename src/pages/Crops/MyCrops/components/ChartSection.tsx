import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartData } from '../../types/planting';

interface ChartSectionProps {
    expectedPoundsData: ChartData[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ expectedPoundsData }) => {
    return (
        <>
            <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">3 Locations Planted</h2>
                <p className="text-sm text-gray-600 mb-2 sm:mb-4">Planned Jan. 01, 2022 - Jan. 12, 2022</p>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">EXPECTED POUNDS PER WEEK</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="h-48 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={expectedPoundsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                tick={false}
                                axisLine={false}
                            />
                            <YAxis
                                domain={[0, 900]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="northwest"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="northwestB"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="northwestC"
                                stroke="#84cc16"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};