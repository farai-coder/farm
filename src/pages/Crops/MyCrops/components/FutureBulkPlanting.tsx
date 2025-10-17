import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PlantingRow {
    id: number;
    location: string;
    bed: string;
    area: string;
    areaSqft: string;
}

interface BulkFuturePlantingProps {
    onBack: () => void;
}

export const BulkFuturePlanting: React.FC<BulkFuturePlantingProps> = ({ onBack }) => {
    const [plantingDate, setPlantingDate] = useState('06/07/2024');
    const [plantBy, setPlantBy] = useState('Area (sqft)');
    const [rows, setRows] = useState<PlantingRow[]>([
        { id: 1, location: 'Southeast Field A', bed: 'O3', area: '300.0 sqft (3.0x100.0 ft)', areaSqft: '300' },
        { id: 2, location: 'Southeast Field A', bed: 'O3', area: '300.0 sqft (3.0x100.0 ft)', areaSqft: '0.00' }
    ]);
    const [addTasksChecked, setAddTasksChecked] = useState(false);

    const addLocation = () => {
        const newRow: PlantingRow = {
            id: rows.length + 1,
            location: '',
            bed: '',
            area: '',
            areaSqft: '0.00'
        };
        setRows([...rows, newRow]);
    };

    const updateRow = (id: number, field: keyof PlantingRow, value: string) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const calculateTotal = () => {
        return rows.reduce((sum, row) => {
            const value = parseFloat(row.areaSqft) || 0;
            return sum + value;
        }, 0);
    };

    const handleCreatePlantings = () => {
        console.log('Creating bulk plantings:', {
            plantingDate,
            plantBy,
            rows,
            addTasksChecked,
            totalArea: calculateTotal()
        });

        // Here you would typically make an API call to save the plantings
        // For now, we'll just navigate back to the future plantings page
        onBack();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Future Plantings
                </button>

                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-400 rounded-full"></div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h1 className="text-2xl font-semibold text-gray-900">Peppers (Hot), Hatch Green Chili</h1>
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">PEHA</span>
                        </div>
                        <p className="text-sm text-gray-600">Capsicum annuum, Hot</p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Bulk Plantings</h2>

                {/* Planting Date and Plant By */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
                        <input
                            type="date"
                            value={plantingDate}
                            onChange={(e) => setPlantingDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Plant By</label>
                        <select
                            value={plantBy}
                            onChange={(e) => setPlantBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Area (sqft)</option>
                            <option>Plants</option>
                            <option>Seeds</option>
                        </select>
                    </div>
                </div>

                {/* Planting Locations Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Plant In</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Bed</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Area</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Area (Sqft)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rows.map((row, index) => (
                                    <tr key={row.id}>
                                        <td className="px-4 py-3">
                                            <select
                                                value={row.location}
                                                onChange={(e) => updateRow(row.id, 'location', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="">-- Select Available Location --</option>
                                                <option value="Southeast Field A">Southeast Field A</option>
                                                <option value="Southeast Field B">Southeast Field B</option>
                                                <option value="North Field">North Field</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={row.bed}
                                                onChange={(e) => updateRow(row.id, 'bed', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="">-</option>
                                                <option value="O3">O3</option>
                                                <option value="O1">O1</option>
                                                <option value="O2">O2</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                value={row.area}
                                                onChange={(e) => updateRow(row.id, 'area', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                placeholder="0.0 sqft"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                value={row.areaSqft}
                                                onChange={(e) => updateRow(row.id, 'areaSqft', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                placeholder="0.00"
                                                step="0.01"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Location Button */}
                    <div className="px-4 py-3 bg-white border-t border-gray-200">
                        <button
                            onClick={addLocation}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
                        >
                            <span>+</span>
                            <span>Add Location</span>
                        </button>
                    </div>
                </div>

                {/* Total and Actions */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="addTasks"
                            checked={addTasksChecked}
                            onChange={(e) => setAddTasksChecked(e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="addTasks" className="text-sm text-gray-600">
                            Add tasks for planting dates
                        </label>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-semibold text-gray-900">Total: {calculateTotal()}</div>
                        <div className="text-sm text-gray-500">of sqft</div>
                    </div>
                </div>

                {/* Create Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleCreatePlantings}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium"
                    >
                        Create Plantings
                    </button>
                </div>
            </div>
        </div>
    );
};