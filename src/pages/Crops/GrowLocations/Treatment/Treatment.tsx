import React, { useState } from 'react';
import { FileEdit, Trash, X } from 'lucide-react';

export const GrowLocationTreatments = () => {
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        treatmentType: '',
        detailsProduct: '',
        batchNumber: '',
        amountApplied: '',
        subtractFromInventory: false,
        inventoryAmountUsed: '',
        applicationMethod: '',
        treatmentLocation: 'Leaf, Seed, Soil',
        daysUntilEnd: '',
        retreatDate: '',
        technician: '',
        treatmentTotalCost: '',
        recordExpense: true,
        description: '',
        treatmentDate: '27/09/2025',
        keywords: ''
    });

    // Sample treatment records data
    const treatmentRecords = [
        {
            id: 1,
            date: 'Sep. 14, 2021',
            type: 'Mold',
            typeColor: 'bg-blue-100 text-blue-800',
            detailsProduct: 'Break The Mold',
            amount: '25 oz',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 2,
            date: 'Sep. 07, 2021',
            type: 'Pesticide',
            typeColor: 'bg-orange-100 text-orange-800',
            detailsProduct: 'Insect Incinerator',
            amount: '14g',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 3,
            date: 'Sep. 02, 2021',
            type: 'Mildew',
            typeColor: 'bg-purple-100 text-purple-800',
            detailsProduct: 'Mildew Mitigator',
            amount: '5g',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 4,
            date: 'Aug. 23, 2021',
            type: 'Fungus',
            typeColor: 'bg-yellow-100 text-yellow-800',
            detailsProduct: 'Fungus Fighter 3500 Max Xtreme',
            amount: '19g',
            retreatDate: 'Aug. 18, 2021',
            enteredBy: 'Chris'
        },
        {
            id: 5,
            date: 'Aug. 04, 2021',
            type: 'Herbicide',
            typeColor: 'bg-green-100 text-green-800',
            detailsProduct: 'Weed Cutter',
            amount: '3kt',
            retreatDate: 'Aug. 18, 2021',
            enteredBy: 'Chris'
        },
        {
            id: 6,
            date: 'Jul. 14, 2021',
            type: 'Mites',
            typeColor: 'bg-red-100 text-red-800',
            detailsProduct: 'Neem Oil',
            amount: '1L',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 7,
            date: 'Jul. 05, 2021',
            type: 'Insect',
            typeColor: 'bg-indigo-100 text-indigo-800',
            detailsProduct: 'Bug-B-Gone',
            amount: '2bt',
            retreatDate: 'Jul. 19, 2021',
            enteredBy: 'Chris'
        }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedTreatments(treatmentRecords.map(record => record.id));
        } else {
            setSelectedTreatments([]);
        }
    };

    const handleSelectTreatment = (id) => {
        setSelectedTreatments(prev => {
            if (prev.includes(id)) {
                return prev.filter(treatmentId => treatmentId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
        // Reset form data if needed
        setFormData({
            treatmentType: '',
            detailsProduct: '',
            batchNumber: '',
            amountApplied: '',
            subtractFromInventory: false,
            inventoryAmountUsed: '',
            applicationMethod: '',
            treatmentLocation: 'Leaf, Seed, Soil',
            daysUntilEnd: '',
            retreatDate: '',
            technician: '',
            treatmentTotalCost: '',
            recordExpense: true,
            description: '',
            treatmentDate: '27/09/2025',
            keywords: ''
        });
    };

    const isAllSelected = selectedTreatments.length === treatmentRecords.length;
    const isPartiallySelected = selectedTreatments.length > 0 && selectedTreatments.length < treatmentRecords.length;

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        2.5 Acre
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">
                            Active
                        </span>
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors w-full sm:w-auto"
                    >
                        New Treatment Record
                    </button>
                    <div className="flex space-x-1">
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <i className="fas fa-print"></i>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <i className="fas fa-th"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        ref={input => {
                                            if (input) input.indeterminate = isPartiallySelected;
                                        }}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details/Product
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Retreat Date
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Entered By
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {treatmentRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedTreatments.includes(record.id)}
                                            onChange={() => handleSelectTreatment(record.id)}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${record.typeColor}`}>
                                            {record.type} ▼
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="flex items-center">
                                            <span className="truncate max-w-[120px] sm:max-w-none">
                                                {record.detailsProduct}
                                            </span>
                                            ▼
                                            <span className="ml-1 font-medium">{record.amount}</span>
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.retreatDate}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.enteredBy}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                <FileEdit size={16} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 transition-colors">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-700">Displaying all 7 treatments</p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">New Treatment for tyyt</h2>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Treatment Type
                                        </label>
                                        <select
                                            value={formData.treatmentType}
                                            onChange={(e) => handleInputChange('treatmentType', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select treatment type</option>
                                            <option value="Mold">Mold</option>
                                            <option value="Pesticide">Pesticide</option>
                                            <option value="Mildew">Mildew</option>
                                            <option value="Fungus">Fungus</option>
                                            <option value="Herbicide">Herbicide</option>
                                            <option value="Mites">Mites</option>
                                            <option value="Insect">Insect</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Details/Product
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.detailsProduct}
                                            onChange={(e) => handleInputChange('detailsProduct', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="subtractInventory"
                                            checked={formData.subtractFromInventory}
                                            onChange={(e) => handleInputChange('subtractFromInventory', e.target.checked)}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                        <label htmlFor="subtractInventory" className="text-sm text-gray-700">
                                            Subtract From Inventory
                                        </label>
                                        <span className="text-blue-500 text-sm">No Available Inventory</span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Application Method
                                        </label>
                                        <select
                                            value={formData.applicationMethod}
                                            onChange={(e) => handleInputChange('applicationMethod', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select method</option>
                                            <option value="Spray">Spray</option>
                                            <option value="Drench">Drench</option>
                                            <option value="Broadcast">Broadcast</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Days until End Of Withholding Period
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.daysUntilEnd}
                                            onChange={(e) => handleInputChange('daysUntilEnd', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Technician
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.technician}
                                            onChange={(e) => handleInputChange('technician', e.target.value)}
                                            placeholder="example: Alpine Vet, etc"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            rows="4"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Treatment Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.treatmentDate}
                                            onChange={(e) => handleInputChange('treatmentDate', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="text-gray-600 text-sm flex items-center space-x-1"
                                    >
                                        <span>📍</span>
                                        <span>Add Map Location</span>
                                    </button>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Batch #
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.batchNumber}
                                            onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Amount Applied
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.amountApplied}
                                            onChange={(e) => handleInputChange('amountApplied', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Inventory Amount Used
                                        </label>
                                        <select
                                            value={formData.inventoryAmountUsed}
                                            onChange={(e) => handleInputChange('inventoryAmountUsed', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select amount</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Treatment Location
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.treatmentLocation}
                                            onChange={(e) => handleInputChange('treatmentLocation', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Retreat Date
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.retreatDate}
                                            onChange={(e) => handleInputChange('retreatDate', e.target.value)}
                                            placeholder="dd/mm/yyyy"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Treatment Total Cost
                                        </label>
                                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={formData.treatmentTotalCost}
                                                    onChange={(e) => handleInputChange('treatmentTotalCost', e.target.value)}
                                                    placeholder="$"
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <input
                                                    type="checkbox"
                                                    id="recordExpense"
                                                    checked={formData.recordExpense}
                                                    onChange={(e) => handleInputChange('recordExpense', e.target.checked)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <label htmlFor="recordExpense" className="text-sm text-gray-700">
                                                    Record Expense
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Keywords
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.keywords}
                                            onChange={(e) => handleInputChange('keywords', e.target.value)}
                                            placeholder="example: monthly application, etc"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="mt-auto pt-8">
                                        <div className="text-right">
                                            <span className="text-teal-600 text-sm cursor-pointer">
                                                🎛️ Customize Fields
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6 sm:mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors order-1 sm:order-2"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};