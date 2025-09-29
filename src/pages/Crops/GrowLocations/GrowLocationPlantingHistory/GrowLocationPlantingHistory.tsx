import React, { useState } from 'react';
import { MoreHorizontal, Grid, List } from 'lucide-react';

interface PlantingRecord {
    id: string;
    cropName: string;
    bedNumber: string;
    amount: string;
    plantCount: number;
    plantDate: string;
    method: string;
    seedStarted: boolean;
    harvestDate?: string;
    harvestStatus?: string;
    harvestAmount?: string;
}

export const PlantingHistory: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Sample data based on the image
    const plantingRecords: PlantingRecord[] = [
        {
            id: '1',
            cropName: '767, 767',
            bedNumber: 'Bed: 01',
            amount: '2.54 sqm (100.0 bed m)',
            plantCount: 3937,
            plantDate: 'Sep. 03, 2025',
            method: 'Direct Sow',
            seedStarted: true,
            harvestDate: 'Sep. 23, 2025',
            harvestStatus: 'Harvested',
            harvestAmount: '545 of 3,937 Harvested'
        },
        {
            id: '2',
            cropName: '767, 767',
            bedNumber: 'Bed: 01',
            amount: '2.54 sqm (100.0 bed m)',
            plantCount: 3937,
            plantDate: 'Sep. 23, 2025',
            method: 'Direct Sow',
            seedStarted: true
        },
        {
            id: '3',
            cropName: '767, 767',
            bedNumber: 'Bed: 01',
            amount: '2.54 sqm (100.0 bed m)',
            plantCount: 3937,
            plantDate: 'Sep. 23, 2025',
            method: 'Transplant',
            seedStarted: true
        },
        {
            id: '4',
            cropName: '767, 767',
            bedNumber: 'Bed: 01',
            amount: '2.54 sqm (100.0 bed m)',
            plantCount: 3937,
            plantDate: 'Sep. 23, 2025',
            method: 'Direct Sow',
            seedStarted: true
        },
        {
            id: '5',
            cropName: '767, 767',
            bedNumber: 'Bed: 01',
            amount: '2.54 sqm (100.0 bed m)',
            plantCount: 3937,
            plantDate: 'Sep. 24, 2025',
            method: 'Direct Sow',
            seedStarted: true
        },
        {
            id: '6',
            cropName: '767, 767',
            bedNumber: 'Bed: 01',
            amount: '5.0 sqm (100.0 bed m)',
            plantCount: 1666,
            plantDate: 'Sep. 24, 2025',
            method: 'Direct Sow',
            seedStarted: true
        },
        {
            id: '7',
            cropName: '767, 767',
            bedNumber: 'Bed: 03',
            amount: '2.54 sqm (100.0 bed m)',
            plantCount: 3937,
            plantDate: 'Sep. 24, 2025',
            method: 'Direct Sow',
            seedStarted: true
        }
    ];

    const formatPlantCount = (count: number) => {
        return count.toLocaleString();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">

                {/* Title and View Toggle */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">tyyt</h1>
                        <p className="text-sm text-gray-600 mt-1">yt</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Planting History Section */}
            <div className="bg-white rounded-lg shadow-sm">
                {/* Section Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Planting History</h2>
                    <p className="text-sm text-gray-600">Sep. 28, 2020 - Sep. 28, 2025</p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 px-6 py-3">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Start
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Harvest
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {plantingRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                                                77
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                                    {record.cropName}
                                                </div>
                                                <div className="text-sm text-gray-500">{record.bedNumber}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{record.amount}</div>
                                        <div className="flex items-center mt-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-white">
                                                {formatPlantCount(record.plantCount)} Plants
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Plant {record.plantDate}</div>
                                        <div className="text-sm text-gray-500">{record.method}</div>
                                        {record.seedStarted && (
                                            <div className="flex items-center mt-1">
                                                <span className="text-green-600 text-xs">✓ Seed Started</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {record.harvestDate ? (
                                            <div>
                                                <div className="text-sm text-gray-900">
                                                    {record.harvestStatus} on {record.harvestDate} (1 days early)
                                                </div>
                                                <div className="text-sm text-gray-500">{record.harvestAmount}</div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400">-</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

