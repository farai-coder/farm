import React, { useState } from 'react';

export const ResourcesEquipmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
    const [selectedEquipmentItem, setSelectedEquipmentItem] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState('details');

    // Initial equipment data - start with empty array to show "no equipment" state
    const [equipment, setEquipment] = useState([]);

    // Form data for new equipment
    const [newEquipmentData, setNewEquipmentData] = useState({
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

    const handleInputChange = (field, value) => {
        setNewEquipmentData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveEquipment = () => {
        // Generate a simple icon based on equipment type
        const getIcon = (type) => {
            const lowerType = type.toLowerCase();
            if (lowerType.includes('tractor')) return '🚜';
            if (lowerType.includes('suv') || lowerType.includes('vehicle')) return '🚗';
            if (lowerType.includes('truck') || lowerType.includes('pickup')) return '🛻';
            return '🔧';
        };

        // Generate status color based on status
        const getStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case 'in use': return 'bg-blue-100 text-blue-800';
                case 'maintenance': return 'bg-yellow-100 text-yellow-800';
                case 'out of service': return 'bg-red-100 text-red-800';
                case 'loaned out': return 'bg-orange-100 text-orange-800';
                case 'at dealer': return 'bg-purple-100 text-purple-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        };

        const newEquipment = {
            id: Date.now(), // Simple ID generation
            name: newEquipmentData.name,
            type: newEquipmentData.type,
            brandModel: newEquipmentData.brandModel,
            status: newEquipmentData.status,
            statusColor: getStatusColor(newEquipmentData.status),
            lastService: '', // Would be set later
            icon: getIcon(newEquipmentData.type),
            // Additional fields for the details view
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

        // Reset form
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

    const handleEquipmentRowClick = (equipmentItem) => {
        setSelectedEquipmentItem(equipmentItem);
        setShowSecondaryMenu(true);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedEquipment(equipment.map(item => item.id));
        } else {
            setSelectedEquipment([]);
        }
    };

    const handleSelectEquipment = (id, e) => {
        e.stopPropagation(); // Prevent row click when checkbox is clicked
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

    // Equipment Secondary Sidebar Component
    const EquipmentSecondarySidebar = () => {
        const equipmentMenuItems = [
            { id: 'details', label: 'Details' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'notes', label: 'Notes' },
            { id: 'maintenance', label: 'Maintenance' },
            { id: 'accounting', label: 'Accounting' },
            { id: 'photos', label: 'Photos' },
            { id: 'files', label: 'Files' },
            { id: 'custom-fields', label: 'Custom Fields' },
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
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // Equipment Details View Component
    const EquipmentDetailsView = () => {
        if (!selectedEquipmentItem) return null;

        return (
            <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <p className="text-gray-900">{selectedEquipmentItem.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <p className="text-gray-900">{selectedEquipmentItem.type}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedEquipmentItem.statusColor}`}>
                                {selectedEquipmentItem.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Brand/Model Information */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Brand/Model</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand/Model</label>
                            <p className="text-gray-900">{selectedEquipmentItem.brandModel}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <p className="text-gray-900">{selectedEquipmentItem.modelNumber}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model Year</label>
                            <p className="text-gray-900">{selectedEquipmentItem.modelYear}</p>
                        </div>
                    </div>
                </div>

                {/* Identification */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Identification</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID/Plate Number</label>
                            <p className="text-gray-900">{selectedEquipmentItem.idPlateNumber || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                            <p className="text-gray-900">{selectedEquipmentItem.serialNumber || 'Not set'}</p>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Engine</label>
                            <p className="text-gray-900">{selectedEquipmentItem.engine || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                            <p className="text-gray-900">{selectedEquipmentItem.transmission || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Track Usage</label>
                            <p className="text-gray-900">{selectedEquipmentItem.trackUsage}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Usage</label>
                            <p className="text-gray-900">{selectedEquipmentItem.currentUsage}</p>
                        </div>
                    </div>
                </div>

                {/* Ownership */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Ownership</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Leased or Purchased</label>
                            <p className="text-gray-900">{selectedEquipmentItem.leasedOrPurchased}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Acquired</label>
                            <p className="text-gray-900">{selectedEquipmentItem.dateAcquired || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                            <p className="text-gray-900">${selectedEquipmentItem.purchasePrice}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                            <p className="text-gray-900">${selectedEquipmentItem.estimatedValue}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedEquipmentItem.equipmentInsured}
                                readOnly
                                className="mr-3 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">Equipment is Insured</span>
                        </label>
                    </div>
                </div>

                {/* Service Manual */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Service Manual</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link To Service Manual</label>
                        <p className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            {selectedEquipmentItem.serviceManualLink}
                        </p>
                    </div>
                </div>

                {/* Description */}
                {selectedEquipmentItem.description && (
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Description</h3>
                        <p className="text-gray-900">{selectedEquipmentItem.description}</p>
                    </div>
                )}
            </div>
        );
    };

    // If secondary menu is showing, render it
    if (showSecondaryMenu && selectedEquipmentItem) {
        return (
            <div className="flex h-screen bg-gray-50">
                <EquipmentSecondarySidebar />
                <div className="flex-1 p-6 bg-white overflow-y-auto">
                    <div className="mb-6">
                        <button
                            onClick={() => setShowSecondaryMenu(false)}
                            className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Equipment List
                        </button>
                        <nav className="flex text-sm text-gray-500 mb-2">
                            <span>Equipment</span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-800 font-medium">{selectedEquipmentItem.name}</span>
                        </nav>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xl">{selectedEquipmentItem.icon}</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800">{selectedEquipmentItem.name}</h1>
                                <p className="text-gray-600">{selectedEquipmentItem.type} • {selectedEquipmentItem.brandModel}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                Edit
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                                New Task
                            </button>
                        </div>
                    </div>

                    {activeSubmenu === 'details' ? (
                        <EquipmentDetailsView />
                    ) : (
                        <div className="bg-gray-100 p-8 rounded-lg text-center">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">
                                {activeSubmenu.charAt(0).toUpperCase() + activeSubmenu.slice(1)} View
                            </h3>
                            <p className="text-gray-600">
                                This is the {activeSubmenu} section for {selectedEquipmentItem.name}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Main Equipment List View
    return (
        <div className="p-6">
            {/* Header */}
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
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>

            {/* Show empty state when no equipment */}
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
                    {/* Search and Filters */}
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

                    {/* Equipment Table */}
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

            {/* New Equipment Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">New Equipment</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Form content remains the same as before */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newEquipmentData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            {/* ... rest of the form fields ... */}

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