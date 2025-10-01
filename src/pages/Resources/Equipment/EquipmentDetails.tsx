import React, { useState } from 'react';

interface EquipmentData {
    name: string;
    type: string;
    status: string;
    brandModel: string;
    modelNumber: string;
    modelYear: string;
    ownerNumber: string;
    serialNumber: string;
    engineTransmission: string;
    transmissionLog: string;
    trackUsage: string;
    linkToServiceManual: string;
    leasedOrPurchased: string;
    dateAcquired: string;
    purchasePrice: string;
    equipmentInsured: boolean;
}

export const EquipmentDetails: React.FC = () => {
    const [equipmentData, setEquipmentData] = useState<EquipmentData>({
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

    const handleInputChange = (field: keyof EquipmentData, value: string | boolean) => {
        setEquipmentData(prev => ({
            ...prev,
            [field]: value
        }));
    };

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
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <input
                            type="text"
                            value={equipmentData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={equipmentData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
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
                                onChange={(e) => handleInputChange('brandModel', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <input
                                type="text"
                                value={equipmentData.modelNumber}
                                onChange={(e) => handleInputChange('modelNumber', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Model Year</label>
                        <input
                            type="text"
                            value={equipmentData.modelYear}
                            onChange={(e) => handleInputChange('modelYear', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Owner Number</label>
                        <input
                            type="text"
                            value={equipmentData.ownerNumber}
                            onChange={(e) => handleInputChange('ownerNumber', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                        <input
                            type="text"
                            value={equipmentData.serialNumber}
                            onChange={(e) => handleInputChange('serialNumber', e.target.value)}
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
                            onChange={(e) => handleInputChange('engineTransmission', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transmission Log</label>
                        <input
                            type="text"
                            value={equipmentData.transmissionLog}
                            onChange={(e) => handleInputChange('transmissionLog', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Track Usage (Miles/Hours)</label>
                        <input
                            type="text"
                            value={equipmentData.trackUsage}
                            onChange={(e) => handleInputChange('trackUsage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link To Service Manual</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={equipmentData.linkToServiceManual}
                                onChange={(e) => handleInputChange('linkToServiceManual', e.target.value)}
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
                                    onChange={(e) => handleInputChange('leasedOrPurchased', e.target.value)}
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
                                    onChange={(e) => handleInputChange('leasedOrPurchased', e.target.value)}
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
                            onChange={(e) => handleInputChange('dateAcquired', e.target.value)}
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
                                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={equipmentData.equipmentInsured}
                            onChange={(e) => handleInputChange('equipmentInsured', e.target.checked)}
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