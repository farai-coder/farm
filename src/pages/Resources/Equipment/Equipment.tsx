import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EquipmentItem {
    id: number;
    name: string;
    type: string;
    brandModel: string;
    status: string;
    statusColor: string;
    lastService: string;
    icon: string;
    modelNumber: string;
    modelYear: string;
    idPlateNumber: string;
    serialNumber: string;
    electronicId: string;
    engine: string;
    transmission: string;
    trackUsage: string;
    currentUsage: string;
    serviceManualLink: string;
    leasedOrPurchased: string;
    dateAcquired: string;
    purchasePrice: string;
    estimatedValue: string;
    description: string;
    equipmentInsured: boolean;
}

interface NewEquipmentData {
    name: string;
    type: string;
    status: string;
    brandModel: string;
    modelNumber: string;
    modelYear: string;
    idPlateNumber: string;
    serialNumber: string;
    electronicId: string;
    engine: string;
    transmission: string;
    trackUsage: string;
    currentUsage: string;
    serviceReminder: string;
    emailAlerts: string;
    estimatedCost: string;
    serviceManualLink: string;
    leasedOrPurchased: string;
    dateAcquired: string;
    purchasePrice: string;
    estimatedValue: string;
    description: string;
    equipmentInsured: boolean;
}

export const ResourcesEquipmentPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    // Initial equipment data
    // In ResourcesEquipmentPage.tsx, replace the empty equipment state:
    const [equipment, setEquipment] = useState<EquipmentItem[]>([
        {
            id: 1,
            name: 'Test Tractor',
            type: 'Tractor',
            brandModel: 'John Deere',
            status: 'In Use',
            statusColor: 'bg-blue-100 text-blue-800',
            lastService: '2023-01-15',
            icon: '🚜',
            modelNumber: '5070E',
            modelYear: '2015',
            idPlateNumber: 'JD1234',
            serialNumber: '64231187Crog873',
            electronicId: '',
            engine: '2.9L 4 cyl Diesel',
            transmission: 'Collar shift (8+8)',
            trackUsage: 'Hours',
            currentUsage: '120.5',
            serviceManualLink: 'http://example.com',
            leasedOrPurchased: 'Purchased',
            dateAcquired: '2023-02-22',
            purchasePrice: '27500',
            estimatedValue: '25000',
            description: 'Test equipment',
            equipmentInsured: true
        }
    ]);

    // Form data for new equipment
    const [newEquipmentData, setNewEquipmentData] = useState<NewEquipmentData>({
        name: '',
        type: '',
        status: '',
        brandModel: '',
        modelNumber: '',
        modelYear: '',
        idPlateNumber: '',
        serialNumber: '',
        electronicId: '',
        engine: '',
        transmission: '',
        trackUsage: 'Hours',
        currentUsage: '0.0',
        serviceReminder: '',
        emailAlerts: '',
        estimatedCost: '',
        serviceManualLink: 'http://',
        leasedOrPurchased: 'Leased',
        dateAcquired: '',
        purchasePrice: '0.00',
        estimatedValue: '0.00',
        description: '',
        equipmentInsured: false
    });

    const handleInputChange = (field: keyof NewEquipmentData, value: string | boolean) => {
        setNewEquipmentData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveEquipment = () => {
        const getIcon = (type: string): string => {
            const lowerType = type.toLowerCase();
            if (lowerType.includes('tractor')) return '🚜';
            if (lowerType.includes('suv') || lowerType.includes('vehicle')) return '🚗';
            if (lowerType.includes('truck') || lowerType.includes('pickup')) return '🛻';
            return '🔧';
        };

        const getStatusColor = (status: string): string => {
            switch (status.toLowerCase()) {
                case 'in use': return 'bg-blue-100 text-blue-800';
                case 'maintenance': return 'bg-yellow-100 text-yellow-800';
                case 'out of service': return 'bg-red-100 text-red-800';
                case 'loaned out': return 'bg-orange-100 text-orange-800';
                case 'at dealer': return 'bg-purple-100 text-purple-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        };

        const newEquipment: EquipmentItem = {
            id: Date.now(),
            name: newEquipmentData.name,
            type: newEquipmentData.type,
            brandModel: newEquipmentData.brandModel,
            status: newEquipmentData.status,
            statusColor: getStatusColor(newEquipmentData.status),
            lastService: '',
            icon: getIcon(newEquipmentData.type),
            modelNumber: newEquipmentData.modelNumber,
            modelYear: newEquipmentData.modelYear,
            idPlateNumber: newEquipmentData.idPlateNumber,
            serialNumber: newEquipmentData.serialNumber,
            electronicId: newEquipmentData.electronicId,
            engine: newEquipmentData.engine,
            transmission: newEquipmentData.transmission,
            trackUsage: newEquipmentData.trackUsage,
            currentUsage: newEquipmentData.currentUsage,
            serviceManualLink: newEquipmentData.serviceManualLink,
            leasedOrPurchased: newEquipmentData.leasedOrPurchased,
            dateAcquired: newEquipmentData.dateAcquired,
            purchasePrice: newEquipmentData.purchasePrice,
            estimatedValue: newEquipmentData.estimatedValue,
            description: newEquipmentData.description,
            equipmentInsured: newEquipmentData.equipmentInsured
        };

        setEquipment(prev => [...prev, newEquipment]);
        setShowModal(false);

        setNewEquipmentData({
            name: '',
            type: '',
            status: '',
            brandModel: '',
            modelNumber: '',
            modelYear: '',
            idPlateNumber: '',
            serialNumber: '',
            electronicId: '',
            engine: '',
            transmission: '',
            trackUsage: 'Hours',
            currentUsage: '0.0',
            serviceReminder: '',
            emailAlerts: '',
            estimatedCost: '',
            serviceManualLink: 'http://',
            leasedOrPurchased: 'Leased',
            dateAcquired: '',
            purchasePrice: '0.00',
            estimatedValue: '0.00',
            description: '',
            equipmentInsured: false
        });
    };

    const handleEquipmentRowClick = (equipmentItem: EquipmentItem) => {
        // Navigate to the equipment details page with details tab active
        navigate('/resources/equipment/details');
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedEquipment(equipment.map(item => item.id));
        } else {
            setSelectedEquipment([]);
        }
    };

    const handleSelectEquipment = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedEquipment(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandModel.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isAllSelected = selectedEquipment.length === filteredEquipment.length && filteredEquipment.length > 0;
    const isPartiallySelected = selectedEquipment.length > 0 && selectedEquipment.length < filteredEquipment.length;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Equipment</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                        New Equipment
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {equipment.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No equipment yet?</h3>
                    <p className="text-gray-600 mb-4">Add your equipment and it will show up here</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                        Add Your First Equipment
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Equipment"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Filter ▼</button>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name ▲
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Brand/Model
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEquipment.map((item) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => handleEquipmentRowClick(item)}
                                            className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedEquipment.includes(item.id)}
                                                    onChange={(e) => handleSelectEquipment(item.id, e)}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-lg">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900 block">{item.name}</span>
                                                        <span className="text-xs text-gray-500">{item.modelNumber}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.brandModel}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.status && (
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.statusColor}`}>
                                                        {item.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.lastService || 'Never'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="text-gray-400 hover:text-gray-600"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">New Equipment</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={newEquipmentData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        placeholder="e.g., Tractor, Truck, SUV"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={newEquipmentData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="In Use">In Use</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Out of Service">Out of Service</option>
                                        <option value="Loaned Out">Loaned Out</option>
                                        <option value="At Dealer">At Dealer</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand/Model</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.brandModel}
                                        onChange={(e) => handleInputChange('brandModel', e.target.value)}
                                        placeholder="e.g., John Deere"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Model Number</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.modelNumber}
                                        onChange={(e) => handleInputChange('modelNumber', e.target.value)}
                                        placeholder="e.g., 5070E"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Model Year</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.modelYear}
                                        onChange={(e) => handleInputChange('modelYear', e.target.value)}
                                        placeholder="e.g., 2015"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID/Plate Number</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.idPlateNumber}
                                        onChange={(e) => handleInputChange('idPlateNumber', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                                <input
                                    type="text"
                                    value={newEquipmentData.serialNumber}
                                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Engine</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.engine}
                                        onChange={(e) => handleInputChange('engine', e.target.value)}
                                        placeholder="e.g., 2.9L 4 cyl Diesel"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.transmission}
                                        onChange={(e) => handleInputChange('transmission', e.target.value)}
                                        placeholder="e.g., Collar shift (8+8)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Track Usage</label>
                                    <select
                                        value={newEquipmentData.trackUsage}
                                        onChange={(e) => handleInputChange('trackUsage', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="Hours">Hours</option>
                                        <option value="Miles">Miles</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Usage</label>
                                    <input
                                        type="text"
                                        value={newEquipmentData.currentUsage}
                                        onChange={(e) => handleInputChange('currentUsage', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link To Service Manual</label>
                                <input
                                    type="text"
                                    value={newEquipmentData.serviceManualLink}
                                    onChange={(e) => handleInputChange('serviceManualLink', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
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
                                            checked={newEquipmentData.leasedOrPurchased === 'Leased'}
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
                                            checked={newEquipmentData.leasedOrPurchased === 'Purchased'}
                                            onChange={(e) => handleInputChange('leasedOrPurchased', e.target.value)}
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        Purchased
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Acquired</label>
                                    <input
                                        type="date"
                                        value={newEquipmentData.dateAcquired}
                                        onChange={(e) => handleInputChange('dateAcquired', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                                    <div className="flex">
                                        <span className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">$</span>
                                        <input
                                            type="number"
                                            value={newEquipmentData.purchasePrice}
                                            onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                                <div className="flex">
                                    <span className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">$</span>
                                    <input
                                        type="number"
                                        value={newEquipmentData.estimatedValue}
                                        onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newEquipmentData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                    placeholder="Add any additional notes or description..."
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newEquipmentData.equipmentInsured}
                                    onChange={(e) => handleInputChange('equipmentInsured', e.target.checked)}
                                    className="mr-3 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <label className="text-sm text-gray-700">Equipment is Insured</label>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEquipment}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
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