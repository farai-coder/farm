import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit, Package, AlertTriangle, X } from 'lucide-react';

export const WarehouseManagement = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewWarehouseModal, setShowNewWarehouseModal] = useState(false);
    const [showNewBinModal, setShowNewBinModal] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({
        name: '',
        internalId: '',
        trackCapacity: 'separate',
        description: ''
    });
    const [newBin, setNewBin] = useState({
        name: '',
        internalId: '',
        maxCapacity: '',
        capacityUnit: 'quantity',
        description: ''
    });

    // Warehouses list data
    const warehouses = [
        { id: 1, name: "Aurora Barn A", bins: 1 },
        { id: 2, name: "Central Warehouse", bins: 2 },
        { id: 3, name: "DelHavenBest Storage", bins: 2 },
        { id: 4, name: "East Side Barn", bins: 5 },
        { id: 5, name: "Loft North Shed", bins: 5 },
        { id: 6, name: "Middle Warehouse", bins: 1 },
        { id: 7, name: "North Corner Shed", bins: 6 },
        { id: 8, name: "Northside Cold Storage", bins: 2, hasAlert: true },
        { id: 9, name: "Northside Hay Loft", bins: 5 },
        { id: 10, name: "Off Site Storage", bins: 2 },
        { id: 11, name: "Silo A", bins: 5 },
        { id: 12, name: "Silo B", bins: 5 },
        { id: 13, name: "Silo C", bins: 5 },
        { id: 14, name: "Southern Shack", bins: 1 },
        { id: 15, name: "Southside Storage Warehouse", bins: 2 }
    ];

    // Sample warehouse detail data
    const warehouseDetails = {
        name: "Westside Storage Barn",
        code: "WSB",
        bins: [
            {
                id: 1,
                name: "Bin 1",
                items: [
                    { name: "Asparagus, Green Stalks", quantity: "Organic", color: "bg-teal-600" },
                    { name: "Carrots", quantity: "", color: "bg-teal-600" }
                ]
            },
            {
                id: 2,
                name: "Bin 2",
                items: [
                    { name: "Broccoli", quantity: "", color: "bg-teal-600" }
                ]
            },
            {
                id: 3,
                name: "Bin 3",
                items: [
                    { name: "Peppers (Hot), Thai Dragon", quantity: "", color: "bg-teal-600" }
                ]
            },
            {
                id: 4,
                name: "Bin 4",
                items: [
                    { name: "Cucumbers, Pukly Cuke", quantity: "Broccoli", color: "bg-teal-600" }
                ]
            },
            {
                id: 5,
                name: "Bin 5",
                items: [
                    { name: "Tomatoes San Marzano,San Marzano", quantity: "Soap Sales", color: "bg-yellow-500" }
                ],
                hasAlert: true
            }
        ],
        inventory: [
            { name: "Asparagus, Green Stalks", quantity: "104.5 pounds" },
            { name: "Broccoli", quantity: "111.5 pounds" },
            { name: "Carrots", quantity: "50.0 pounds" },
            { name: "Cucumbers, Pukly Cuke", quantity: "50.0 pounds" },
            { name: "Dill", quantity: "7.0 pounds" }
        ]
    };

    const filteredWarehouses = warehouses.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleWarehouseClick = (warehouse) => {
        setSelectedWarehouse(warehouse);
    };

    const handleBackToList = () => {
        setSelectedWarehouse(null);
    };

    const handleNewWarehouse = () => {
        setShowNewWarehouseModal(true);
    };

    const handleCloseNewWarehouseModal = () => {
        setShowNewWarehouseModal(false);
        setNewWarehouse({ name: '', internalId: '', trackCapacity: 'separate', description: '' });
    };

    const handleSaveWarehouse = () => {
        // Handle save warehouse logic here
        console.log('Saving warehouse:', newWarehouse);
        handleCloseNewWarehouseModal();
    };

    const handleNewBin = () => {
        setShowNewBinModal(true);
    };

    const handleCloseNewBinModal = () => {
        setShowNewBinModal(false);
        setNewBin({ name: '', internalId: '', maxCapacity: '', capacityUnit: 'quantity', description: '' });
    };

    const handleSaveBin = () => {
        // Handle save bin logic here
        console.log('Saving bin:', newBin);
        handleCloseNewBinModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {!selectedWarehouse ? (
                    <>
                        {/* Warehouses List View */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Warehouses</h1>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                                onClick={handleNewWarehouse}
                            >
                                <Plus size={16} />
                                <span>New Warehouse</span>
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <div className="relative max-w-md">
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search Warehouses"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-10 pl-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        {/* Warehouses Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bins
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredWarehouses.map((warehouse) => (
                                        <tr
                                            key={warehouse.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleWarehouseClick(warehouse)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {warehouse.hasAlert && (
                                                        <AlertTriangle size={16} className="text-yellow-500" />
                                                    )}
                                                    <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                        {warehouse.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-900">
                                                {warehouse.bins}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle delete
                                                    }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Warehouse Detail View */}
                        <div className="mb-4">
                            <button
                                onClick={handleBackToList}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                ← Back to Warehouses
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                    <span>WAREHOUSES</span>
                                    <span>/</span>
                                    <span>Westside Storage Barn</span>
                                </div>
                                <h1 className="text-2xl font-semibold text-gray-800">Westside Storage Barn</h1>
                                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">WSB</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm">Edit Warehouse</button>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                                    Add Inventory
                                </button>
                            </div>
                        </div>

                        {/* Add Bin Button */}
                        <div className="mb-6">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                                onClick={handleNewBin}
                            >
                                Add Bin
                            </button>
                        </div>

                        {/* Bins Section */}
                        <div className="space-y-4 mb-8">
                            {warehouseDetails.bins.map((bin) => (
                                <div key={bin.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-gray-800">{bin.name}</span>
                                            {bin.hasAlert && (
                                                <AlertTriangle size={16} className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Items in bin */}
                                    <div className="space-y-2">
                                        {bin.items.map((item, index) => (
                                            <div key={index} className={`${item.color} text-white text-sm p-2 rounded`}>
                                                <div className="flex justify-between items-center">
                                                    <span>{item.name}</span>
                                                    <span>{item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* All Inventory Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">All inventory</h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Inventory</th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Quantity</th>
                                            <th className="px-4 py-3 text-center w-12"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {warehouseDetails.inventory.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                                        <button className="text-red-600 hover:text-red-800 p-1">
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* New Warehouse Modal */}
            {showNewWarehouseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">New Warehouse</h2>
                            <button
                                onClick={handleCloseNewWarehouseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newWarehouse.name}
                                    onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Internal ID</label>
                                <input
                                    type="text"
                                    value={newWarehouse.internalId}
                                    onChange={(e) => setNewWarehouse({ ...newWarehouse, internalId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Track Capacity</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="trackCapacity"
                                            value="separate"
                                            checked={newWarehouse.trackCapacity === 'separate'}
                                            onChange={(e) => setNewWarehouse({ ...newWarehouse, trackCapacity: e.target.value })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">In separate bins</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="trackCapacity"
                                            value="location"
                                            checked={newWarehouse.trackCapacity === 'location'}
                                            onChange={(e) => setNewWarehouse({ ...newWarehouse, trackCapacity: e.target.value })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Only in this location</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newWarehouse.description}
                                    onChange={(e) => setNewWarehouse({ ...newWarehouse, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3 mt-6">
                            <button
                                onClick={handleCloseNewWarehouseModal}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveWarehouse}
                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Bin Modal */}
            {showNewBinModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">New Bin</h2>
                            <button
                                onClick={handleCloseNewBinModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newBin.name}
                                    onChange={(e) => setNewBin({ ...newBin, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Internal ID</label>
                                <input
                                    type="text"
                                    value={newBin.internalId}
                                    onChange={(e) => setNewBin({ ...newBin, internalId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                                    <input
                                        type="text"
                                        value={newBin.maxCapacity}
                                        onChange={(e) => setNewBin({ ...newBin, maxCapacity: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div className="w-24">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                                    <select
                                        value={newBin.capacityUnit}
                                        onChange={(e) => setNewBin({ ...newBin, capacityUnit: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="quantity">quantity</option>
                                        <option value="weight">weight</option>
                                        <option value="volume">volume</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newBin.description}
                                    onChange={(e) => setNewBin({ ...newBin, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3 mt-6">
                            <button
                                onClick={handleCloseNewBinModal}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveBin}
                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

