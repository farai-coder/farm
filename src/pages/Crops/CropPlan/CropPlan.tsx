import React, { useState } from 'react';
import { Calendar, MapPin, Plus, Printer } from 'lucide-react';

export const CropPlan = () => {
    const [selectedYear, setSelectedYear] = useState('2022');

    // Sample crop plan data matching the image structure
    const cropPlanData = [
        {
            id: 1,
            crop: 'Tomatoes San Marzano',
            variety: '57w',
            planted: 160,
            unit: 'Approx 250 sq ft',
            location: 'Northwest Field A (CSA Shares)',
            beds: 'WS, GL, QS, SW',
            keyDates: {
                start: 'Jan 11, 2022',
                first: 'Feb 07, 2022',
                harvest: 'Jun 14, 2022 - Jun 22'
            },
            timeline: { jan: true, feb: true, mar: true, apr: true, may: true, jun: true }
        },
        {
            id: 2,
            crop: 'Tomatoes San Marzano',
            variety: '57w',
            planted: 120,
            unit: 'Approx 250 sq ft',
            location: 'Southwest Field C',
            beds: 'E6, QS, RN, DW',
            keyDates: {
                start: 'Jan 11, 2022',
                first: 'Feb 07, 2022',
                harvest: 'Jun 17, 2022 - Jun 19'
            },
            timeline: { feb: true, mar: true, apr: true, may: true }
        },
        {
            id: 3,
            crop: 'Tomatoes Roma',
            variety: 'Medium',
            planted: 40,
            unit: 'Approx 250 sq ft',
            location: 'Southwest Field A',
            beds: 'SW',
            keyDates: {
                start: 'Jan 07, 2021',
                first: 'Feb 15, 2022',
                harvest: 'Jun 17, 2022 - Jun 19'
            },
            timeline: { feb: true, mar: true, apr: true, may: true }
        },
        {
            id: 4,
            crop: 'Peppers (Hot) Thai Dragon',
            variety: '367ft',
            planted: 150,
            unit: 'Approx 244.67 sq ft',
            location: 'Northwest Field B',
            beds: 'QS',
            keyDates: {
                start: 'Dec 10, 2021',
                first: 'Jan 14, 2022',
                harvest: 'Jun 03, 2022 - Oct 08'
            },
            timeline: { aug: true, sep: true, oct: true }
        },
        {
            id: 5,
            crop: 'Peppers (Hot) Thai Dragon',
            variety: '367ft',
            planted: 150,
            unit: 'Approx 244.67 sq ft',
            location: 'Northwest Field B',
            beds: 'SW',
            keyDates: {
                start: 'Dec 10, 2021',
                first: 'Jan 14, 2022',
                harvest: 'Jun 03, 2022 - May 08'
            },
            timeline: { jan: true, feb: true, mar: true, apr: true, may: true, jun: true, jul: true }
        },
        {
            id: 6,
            crop: 'Peppers (Hot) Thai Dragon',
            variety: '367ft',
            planted: 150,
            unit: 'Approx 244.67 sq ft',
            location: 'Northwest Field A (CSA Shares)',
            beds: 'DW',
            keyDates: {
                start: 'Dec 30, 2020',
                first: 'Jan 17, 2022',
                harvest: 'Jun 17, 2022 - May 14'
            },
            timeline: { jun: true, jul: true, aug: true, sep: true }
        },
        {
            id: 7,
            crop: 'Peppers (Hot) Thai Dragon',
            variety: '367ft',
            planted: 900,
            unit: 'Approx 1,800.5 sq ft',
            location: 'Northwest Field A (CSA Shares)',
            beds: 'WS',
            keyDates: {
                start: 'Dec 10, 2022',
                first: 'Jan 17, 2022',
                harvest: 'Oct 03, 2022 - Oct 09'
            },
            timeline: { aug: true, sep: true, oct: true }
        }
    ];

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const getTimelineColor = (crop: 'Tomatoes San Marzano' | 'Tomatoes Roma' | 'Peppers (Hot) Thai Dragon', month: string): string => {
        const colors = {
            'Tomatoes San Marzano': '#f59e0b', // amber
            'Tomatoes Roma': '#3b82f6', // blue  
            'Peppers (Hot) Thai Dragon': '#10b981' // green
        };
        return colors[crop] || '#6b7280';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Crop Plan</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="2022">Planning Year 2022</option>
                            <option value="2023">Planning Year 2023</option>
                            <option value="2024">Planning Year 2024</option>
                        </select>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                            <Plus size={16} />
                            <span>Add Planting</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <Printer size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
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
                                {cropPlanData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        {/* Crop Name Column */}
                                        <td className="px-6 py-4 border-r border-gray-200">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                    {item.crop}
                                                </span>
                                                <span className="text-xs text-gray-500">{item.variety}</span>
                                            </div>
                                        </td>

                                        {/* Planted Quantity Column */}
                                        <td className="px-6 py-4 border-r border-gray-200">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900">{item.planted}</span>
                                                <span className="text-xs text-gray-500">{item.unit}</span>
                                            </div>
                                        </td>

                                        {/* Location Column */}
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

                                        {/* Key Dates Column */}
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

                                        {/* Timeline Columns */}
                                        {months.map((month) => (
                                            <td key={month} className="px-1 py-4 text-center border-r border-gray-200 last:border-r-0">
                                                {item.timeline[month.toLowerCase() as keyof typeof item.timeline] && (
                                                    <div
                                                        className="h-6 rounded mx-auto border border-opacity-20"
                                                        style={{
                                                            backgroundColor: getTimelineColor(item.crop as "Tomatoes San Marzano" | "Tomatoes Roma" | "Peppers (Hot) Thai Dragon", month),
                                                            borderColor: getTimelineColor(item.crop as "Tomatoes San Marzano" | "Tomatoes Roma" | "Peppers (Hot) Thai Dragon", month),
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
            </div>
        </div>
    );
};