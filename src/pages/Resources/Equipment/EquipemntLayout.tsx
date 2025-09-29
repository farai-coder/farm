import React, { useState } from 'react';
import { CustomFields } from "../CustomFields/CustomFields";
import { EquipmentFiles } from "../Files/Files";
import { Photos } from "../Photos/Photos";

// Equipment Secondary Sidebar Component
const EquipmentSecondarySidebar = ({ activeSubmenu, setActiveSubmenu }) => {
    const equipmentMenuItems = [
        { id: 'details', label: 'Details', icon: 'fa-info-circle' },
        { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-alt' },
        { id: 'tasks', label: 'Tasks', icon: 'fa-tasks' },
        { id: 'notes', label: 'Notes', icon: 'fa-sticky-note' },
        { id: 'maintenance', label: 'Maintenance', icon: 'fa-wrench' },
        { id: 'accounting', label: 'Accounting', icon: 'fa-calculator' },
        { id: 'photos', label: 'Photos', icon: 'fa-camera' },
        { id: 'files', label: 'Files', icon: 'fa-file-alt' },
        { id: 'custom-fields', label: 'Custom Fields', icon: 'fa-list' },
    ];

    return (
        <div className="bg-gray-50 w-48 flex-shrink-0 relative h-full border-r border-gray-200">
            <div className="py-4">
                {equipmentMenuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSubmenu(item.id)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative flex items-center ${activeSubmenu === item.id
                                ? 'bg-white text-green-700 font-medium border-r-2 border-green-600'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        {/* <i className={`fas ${item.icon} mr-3 w-4 text-xs`}></i> */}
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Equipment Details Component
const EquipmentDetails = () => {
    const [equipmentData, setEquipmentData] = useState({
        name: 'John Deere 5070E',
        type: 'Tractor',
        status: 'In Use',
        brandModel: 'John Deere',
        modelNumber: '5070E',
        modelYear: '2015',
        ownerNumber: 'JD1234',
        serialNumber: '64231187Crog873',
        engineTransmission: 'Engine Hp: 2.9L 4 cyl Diesel(I)',
        transmissionLog: 'Transmission Log: Collar shift (8+8)',
        trackUsage: 'Hourly',
        linkToServiceManual: 'http:///',
        leasedOrPurchased: 'Purchased',
        dateAcquired: '02/22/2023',
        purchasePrice: '27500',
        equipmentInsured: true
    });

    return (
        <div className="flex-1 p-6 bg-white">
            {/* Breadcrumb */}
            <div className="mb-4">
                <nav className="flex text-sm text-gray-500">
                    <span>Equipment</span>
                    <i className="fas fa-chevron-right mx-2 text-xs"></i>
                    <span>John Deere 5070E & John Deere Tractor</span>
                </nav>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-tractor text-gray-600 text-xl"></i>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">{equipmentData.name}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                        <i className="fas fa-th"></i>
                    </button>
                </div>
            </div>

            {/* Equipment Details Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={equipmentData.name}
                            onChange={(e) => setEquipmentData({ ...equipmentData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <input
                            type="text"
                            value={equipmentData.type}
                            onChange={(e) => setEquipmentData({ ...equipmentData, type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={equipmentData.status}
                            onChange={(e) => setEquipmentData({ ...equipmentData, status: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="In Use">In Use</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Out of Service">Out of Service</option>
                            <option value="Sold">Sold</option>
                            <option value="Loaned Out">Loaned Out</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand/Model</label>
                            <input
                                type="text"
                                value={equipmentData.brandModel}
                                onChange={(e) => setEquipmentData({ ...equipmentData, brandModel: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <input
                                type="text"
                                value={equipmentData.modelNumber}
                                onChange={(e) => setEquipmentData({ ...equipmentData, modelNumber: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Model Year</label>
                        <input
                            type="text"
                            value={equipmentData.modelYear}
                            onChange={(e) => setEquipmentData({ ...equipmentData, modelYear: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Owner Number</label>
                        <input
                            type="text"
                            value={equipmentData.ownerNumber}
                            onChange={(e) => setEquipmentData({ ...equipmentData, ownerNumber: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                        <input
                            type="text"
                            value={equipmentData.serialNumber}
                            onChange={(e) => setEquipmentData({ ...equipmentData, serialNumber: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Engine/Transmission</label>
                        <input
                            type="text"
                            value={equipmentData.engineTransmission}
                            onChange={(e) => setEquipmentData({ ...equipmentData, engineTransmission: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transmission Log</label>
                        <input
                            type="text"
                            value={equipmentData.transmissionLog}
                            onChange={(e) => setEquipmentData({ ...equipmentData, transmissionLog: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Track Usage (Miles/Hours)</label>
                        <input
                            type="text"
                            value={equipmentData.trackUsage}
                            onChange={(e) => setEquipmentData({ ...equipmentData, trackUsage: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link To Service Manual</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={equipmentData.linkToServiceManual}
                                onChange={(e) => setEquipmentData({ ...equipmentData, linkToServiceManual: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                            <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                                <i className="fas fa-search text-gray-500"></i>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Paste link to manual here</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Leased Or Purchased</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="leasedOrPurchased"
                                    value="Leased"
                                    checked={equipmentData.leasedOrPurchased === 'Leased'}
                                    onChange={(e) => setEquipmentData({ ...equipmentData, leasedOrPurchased: e.target.value })}
                                    className="mr-2 text-green-600 focus:ring-green-500"
                                />
                                Leased
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="leasedOrPurchased"
                                    value="Purchased"
                                    checked={equipmentData.leasedOrPurchased === 'Purchased'}
                                    onChange={(e) => setEquipmentData({ ...equipmentData, leasedOrPurchased: e.target.value })}
                                    className="mr-2 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-blue-600">● Purchased</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Acquired</label>
                        <input
                            type="date"
                            value={equipmentData.dateAcquired}
                            onChange={(e) => setEquipmentData({ ...equipmentData, dateAcquired: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                        <div className="flex">
                            <span className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">$</span>
                            <input
                                type="number"
                                value={equipmentData.purchasePrice}
                                onChange={(e) => setEquipmentData({ ...equipmentData, purchasePrice: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={equipmentData.equipmentInsured}
                            onChange={(e) => setEquipmentData({ ...equipmentData, equipmentInsured: e.target.checked })}
                            className="mr-3 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label className="text-sm text-gray-700">Equipment is Insured</label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
                <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
                    Save Equipment Details
                </button>
            </div>
        </div>
    );
};

// Main Equipment Layout Component
export const EquipmentLayout = () => {
    const [activeSubmenu, setActiveSubmenu] = useState('details');

    const renderContent = () => {
        switch (activeSubmenu) {
            case 'details':
                return <EquipmentDetails />;
            case 'schedule':
                return (
                    <div className="flex-1 p-6 bg-white">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Schedule</h2>
                        <p className="text-gray-600">Schedule maintenance and usage for this equipment.</p>
                    </div>
                );
            case 'tasks':
                return (
                    <div className="flex-1 p-6 bg-white">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Tasks</h2>
                        <p className="text-gray-600">Manage tasks related to this equipment.</p>
                    </div>
                );
            case 'notes':
                return (
                    <div className="flex-1 p-6 bg-white">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Notes</h2>
                        <p className="text-gray-600">Add notes and observations about this equipment.</p>
                    </div>
                );
            case 'maintenance':
                return (
                    <div className="flex-1 p-6 bg-white">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Records</h2>
                        <p className="text-gray-600">Track maintenance history and schedule future maintenance.</p>
                    </div>
                );
            case 'accounting':
                return (
                    <div className="flex-1 p-6 bg-white">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Accounting</h2>
                        <p className="text-gray-600">Track costs, depreciation, and financial details.</p>
                    </div>
                );
            case 'photos':
                return <Photos />;

            case 'files':
                return <EquipmentFiles />;
                
            case 'custom-fields':
                return  <CustomFields />;
            default:
                return <EquipmentDetails />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <EquipmentSecondarySidebar
                activeSubmenu={activeSubmenu}
                setActiveSubmenu={setActiveSubmenu}
            />
            {renderContent()}
        </div>
    );
};

