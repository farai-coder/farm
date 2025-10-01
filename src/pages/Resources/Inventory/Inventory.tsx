import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, Package, AlertTriangle, X, Bold, Italic, Underline, List, AlignLeft, Link, MapPin, Paperclip, ArrowLeft, Menu } from 'lucide-react';

export const ResourcesInventory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [currentUrl, setCurrentUrl] = useState('');
    const [modalType, setModalType] = useState(''); // 'add', 'warehouse', 'remove', 'adjust'
    const [showNewNoteModal, setShowNewNoteModal] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const [photos, setPhotos] = useState([
        {
            id: 1,
            name: "Screenshot_505.png",
            date: "Sep 28, 2025",
            url: "/api/placeholder/150/100" // placeholder image
        }
    ]);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // For debugging and URL simulation
    const navigate = (url) => {
        setCurrentUrl(url);
        console.log('Navigating to:', url);
        // Update browser URL if you have React Router set up
        if (window.history && window.history.pushState) {
            window.history.pushState(null, '', url);
        }
    };

    // Sample inventory data - keeping your exact data structure
    const inventoryItems = [
        { id: 1, name: 'Goat Feed', quantity: '13.00 pounds', value: '$38.00', avgDailyUsage: '0.00' },
        { id: 2, name: 'Green Garlic Hull Sauce', quantity: '24.00', value: '$156.00', avgDailyUsage: '0.00' },
        { id: 3, name: 'Hay', quantity: '215.00 pounds', value: '$500.00', avgDailyUsage: '5.20' },
        { id: 4, name: 'Insecticide', quantity: '17.00 fluid ounces', value: '', avgDailyUsage: '0.10' },
        { id: 5, name: 'Jalapeno Peppers', quantity: '85.00 pounds', value: '', avgDailyUsage: '2.30' },
        { id: 6, name: 'Jerking Supplies', quantity: '', value: '$70.00', avgDailyUsage: '0.00' },
        { id: 7, name: 'Large Square Bale', quantity: '6.00 bales', value: '', avgDailyUsage: '0.50' },
        { id: 8, name: 'Limes', quantity: '10.00 pounds', value: '$16.00', avgDailyUsage: '1.20' },
        { id: 9, name: 'Liquid Fertilizer', quantity: '21.00 gallons', value: '$1,200.00', avgDailyUsage: '0.80' },
        { id: 10, name: 'Milk', quantity: '10.50 gallons', value: '', avgDailyUsage: '3.50' },
        { id: 11, name: 'Oil', quantity: '5.00 quarts', value: '', avgDailyUsage: '0.25' },
        { id: 12, name: 'Peppers (Hot), Thai Dragon', quantity: '48.00 pounds', value: '$192.16', avgDailyUsage: '1.80' },
        { id: 13, name: 'Plant Fertilizer', quantity: '45.84 pounds', value: '', avgDailyUsage: '2.10' },
        { id: 14, name: 'Sheep Entraps', quantity: '', value: '$5.00', avgDailyUsage: '0.00' },
        { id: 15, name: 'String Round Bale', quantity: '6.00 bales', value: '', avgDailyUsage: '0.30' },
        { id: 16, name: 'Small Square Bale', quantity: '', value: '$8.00', avgDailyUsage: '0.00' },
        { id: 17, name: 'Tomatoes, San Marzano', quantity: '48.00 pounds', value: '$197.53', variety: 'San Marzano', avgDailyUsage: '4.20' }
    ];

    const filteredItems = inventoryItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [newNote, setNewNote] = useState({
        content: '',
        date: new Date().toISOString().split('T')[0],
        keywords: '',
        assignTask: '',
        addToCalendar: false
    });

    const sidebarItems = [
        { id: 'details', label: 'Details' },
        { id: 'recipes', label: 'Recipes' },
        { id: 'notes', label: 'Notes' },
        { id: 'history', label: 'History' },
        { id: 'photos', label: 'Photos' }
    ];

    const [showRecipeModal, setShowRecipeModal] = useState(false);
    const [recipes, setRecipes] = useState([]);

    // Handle URL changes and set selected item/tab - simplified version
    useEffect(() => {
        // Only handle URL changes if you have React Router set up
        // For now, we'll just log the URL for debugging
        console.log('Current URL state:', currentUrl);
    }, [currentUrl]);

    // Handle row click - simplified without URL complications
    const handleRowClick = (item) => {
        console.log('Row clicked:', item.name);
        setSelectedItem(item);
        setActiveTab('details');
        setShowMobileSidebar(false);
        // Simulate URL update
        setCurrentUrl(`/resources/inventory/${item.id}/details`);
    };

    // Handle back click
    const handleBackClick = () => {
        console.log('Back clicked');
        setSelectedItem(null);
        setShowMobileSidebar(false);
        setCurrentUrl('/resources/inventory');
    };

    // Handle tab click with URL updating
    const handleTabClick = (tabId) => {
        console.log('Tab clicked:', tabId);
        setActiveTab(tabId);
        setShowMobileSidebar(false);
        if (selectedItem) {
            const newUrl = `/resources/inventory/${selectedItem.id}/${tabId}`;
            setCurrentUrl(newUrl);
            navigate(newUrl);
        }
    };

    // Modal handlers
    const openAddInventoryModal = () => {
        setModalType('add');
        setShowModal(true);
    };

    const openWarehouseModal = () => {
        setModalType('warehouse');
        setShowModal(true);
    };

    const openRemoveModal = () => {
        setModalType('remove');
        setShowModal(true);
    };

    const openAdjustModal = () => {
        setModalType('adjust');
        setShowModal(true);
    };

    const openNewInventoryTypeModal = () => {
        setModalType('newType');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
    };

    const handleNewNote = () => {
        setShowNewNoteModal(true);
    };

    const handleCloseNewNoteModal = () => {
        setShowNewNoteModal(false);
        setNewNote({
            content: '',
            date: new Date().toISOString().split('T')[0],
            keywords: '',
            assignTask: '',
            addToCalendar: false
        });
    };

    const handleSaveNote = () => {
        // Handle save note logic here
        console.log('Saving note:', newNote);
        handleCloseNewNoteModal();
    };

    const handleUploadPhoto = () => {
        setShowUploadModal(true);
    };

    const handleCloseUploadModal = () => {
        setShowUploadModal(false);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhoto = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    date: new Date().toLocaleDateString(),
                    url: e.target.result
                };
                setPhotos(prev => [...prev, newPhoto]);
            };
            reader.readAsDataURL(file);
        });
        setShowUploadModal(false);
    };

    const handleDeletePhoto = (photoId) => {
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    };
    
    const renderModalContent = () => {
        switch (modalType) {
            case 'add':
                return (
                    <>
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Add Inventory</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory</label>
                                <div className="sm:col-span-2">
                                    <span className="text-sm text-gray-900">Seed (Rye) - 0.00 Available</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Add</label>
                                <div className="sm:col-span-2 flex items-center space-x-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        defaultValue="0.00"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">quantity</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Date</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="date"
                                        defaultValue="2025-09-28"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Warehouse</label>
                                <div className="sm:col-span-2">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Select warehouse</option>
                                    </select>
                                    <button
                                        onClick={openWarehouseModal}
                                        className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
                                    >
                                        + Add warehouse
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Source</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                                <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Reason</label>
                                <div className="sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                Save
                            </button>
                        </div>
                    </>
                );

            case 'warehouse':
                return (
                    <>
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Warehouse</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Name</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Internal ID</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Track Capacity</label>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="trackCapacity" defaultChecked className="text-blue-600" />
                                        <span className="text-sm text-gray-700">In separate bins</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="trackCapacity" className="text-blue-600" />
                                        <span className="text-sm text-gray-700">Only in this location</span>
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                                <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Description</label>
                                <div className="sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                Save
                            </button>
                        </div>
                    </>
                );

            case 'remove':
                return (
                    <>
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Use Inventory</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory</label>
                                <div className="sm:col-span-2">
                                    <span className="text-sm text-gray-900">Seed (Rye) - 0.00 Available</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Remove</label>
                                <div className="sm:col-span-2 flex items-center space-x-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        defaultValue="0.00"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">quantity</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Date</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="date"
                                        defaultValue="2025-09-28"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Warehouse</label>
                                <div className="sm:col-span-2">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Select warehouse</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <div></div>
                                <div className="sm:col-span-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Exclude from usage calculations</span>
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                                <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Reason</label>
                                <div className="sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                Save
                            </button>
                        </div>
                    </>
                );

            case 'adjust':
                return (
                    <>
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Manually Adjust Inventory Amount</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory</label>
                                <div className="sm:col-span-2">
                                    <span className="text-sm text-gray-900">Seed (Rye) - 0.00 Available</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Available Inventory</label>
                                <div className="sm:col-span-2 flex items-center space-x-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        defaultValue="0.00"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">quantity</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Date</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="date"
                                        defaultValue="2025-09-28"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Warehouse</label>
                                <div className="sm:col-span-2">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Select warehouse</option>
                                    </select>
                                    <button
                                        onClick={openWarehouseModal}
                                        className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
                                    >
                                        + Add warehouse
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Source</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                                <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Reason</label>
                                <div className="sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        defaultValue="Manual Adjustment"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                                Save
                            </button>
                        </div>
                    </>
                );

            case 'newType':
                return (
                    <>
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Inventory Type</h2>
                                    <div className="flex items-center mt-2 space-x-2 sm:space-x-4 overflow-x-auto">
                                        <div className="flex items-center space-x-2 flex-shrink-0">
                                            <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                                            <span className="text-sm font-medium text-gray-800">Define Inventory Type</span>
                                        </div>
                                        <div className="flex items-center space-x-2 flex-shrink-0">
                                            <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">2</div>
                                            <span className="text-sm text-gray-500">Add Inventory to Warehouses</span>
                                        </div>
                                        <div className="flex items-center space-x-2 flex-shrink-0">
                                            <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">✓</div>
                                            <span className="text-sm text-gray-500">Complete</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-4 sm:px-6 py-4 space-y-4">
                            {/* Type Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Type Name</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Seed, vaccine, grain, etc"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Variety */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Variety</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Internal ID / SKU */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Internal ID / SKU</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Electronic Id */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Electronic Id</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Inventory Unit */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory Unit</label>
                                <div className="sm:col-span-2">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                        <option>quantity</option>
                                        <option>pounds</option>
                                        <option>gallons</option>
                                        <option>bales</option>
                                        <option>fluid ounces</option>
                                        <option>quarts</option>
                                    </select>
                                </div>
                            </div>

                            {/* Estimated Value Per Unit */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Estimated Value Per Unit</label>
                                <div className="sm:col-span-2 flex items-center space-x-2">
                                    <span className="text-gray-500">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Estimated Kg Per Unit */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Estimated Kg Per Unit</label>
                                <div className="sm:col-span-2 flex items-center space-x-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-gray-500">kg</span>
                                </div>
                            </div>

                            {/* Track Lots */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Track Lots</label>
                                <div className="sm:col-span-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Track individual inventory lots</span>
                                    </label>
                                </div>
                            </div>

                            {/* Alert When Less Than */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Alert When Less Than</label>
                                <div className="sm:col-span-2 flex items-center space-x-2">
                                    <input
                                        type="number"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-gray-500">Units</span>
                                </div>
                            </div>

                            {/* Email Inventory Alerts To */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                                <label className="text-sm font-medium text-gray-700 sm:text-right">Email Inventory Alerts To</label>
                                <div className="sm:col-span-2">
                                    <input
                                        type="email"
                                        placeholder="farai.rato@students.uz.ac.zw"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                                <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Description</label>
                                <div className="sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Next
                            </button>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    const renderTabContent = () => {
        if (!selectedItem) return null;

        switch (activeTab) {
            case 'details':
                return (
                    <div className="space-y-6">
                        {/* Item Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-1">{selectedItem.name}</h2>
                                <div className="flex items-center space-x-2 sm:space-x-4 text-sm text-gray-600 flex-wrap">
                                    <span>{selectedItem.avgDailyUsage || '0.00'} Avg Daily Usage</span>
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button className="text-gray-400">📊</button>
                                </div>
                            </div>
                        </div>

                        {/* Availability Alert */}
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                <span className="text-red-700 font-medium">0.00 available</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <button
                                onClick={openAddInventoryModal}
                                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center space-x-2"
                            >
                                <Plus size={16} />
                                <span>Add</span>
                            </button>
                            <button
                                onClick={openRemoveModal}
                                className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                            >
                                Remove
                            </button>
                            <button
                                onClick={openAdjustModal}
                                className="text-blue-600 hover:text-blue-800 px-3 sm:px-4 py-2 border border-blue-300 rounded-md text-sm flex items-center space-x-2"
                            >
                                <span>📝</span>
                                <span>Manually Adjust</span>
                            </button>
                        </div>

                        {/* No Inventory Message */}
                        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                            <div className="text-gray-500 mb-2">No inventory available</div>
                            <div className="text-gray-400 text-sm">You don't have any warehouses with inventory.</div>
                        </div>

                        {/* Inventory Table - Showing when there's inventory */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Warehouse
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Bin
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Current
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Available
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Est. Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* Sample inventory data - you can replace this with dynamic data */}
                                        <tr>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Main Storage</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">All counters</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">9.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">9.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">$36.00</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Cold Storage</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Bin A-1</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">5.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">5.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">$20.00</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Dry Storage</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Bin B-2</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">3.50</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">3.50</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-right">$14.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Total Available:</span>
                                <span className="text-sm font-bold text-gray-900">17.50</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-medium text-gray-700">Total Value:</span>
                                <span className="text-sm font-bold text-gray-900">$70.00</span>
                            </div>
                        </div>
                    </div>
                );
            
            case 'recipes':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-medium text-gray-800">Recipes</h3>
                            <button
                                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                                onClick={() => setShowRecipeModal(true)}
                            >
                                Add Recipe
                            </button>
                        </div>
                        {recipes.length === 0 ? (
                            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                                <div className="text-gray-500 mb-2">No recipes available</div>
                                <div className="text-gray-400 text-sm">Add recipes that use this inventory item.</div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipe Name</th>
                                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Makes</th>
                                                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {recipes.map((recipe) => (
                                                <tr key={recipe.id} className="hover:bg-gray-50">
                                                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-blue-600">{recipe.name}</td>
                                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{recipe.makes} {recipe.unit}</td>
                                                    <td className="px-4 sm:px-6 py-4 text-center">
                                                        <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                                        <button className="text-red-600 hover:text-red-800">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'notes':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-medium text-gray-800">Notes</h3>
                            <button
                                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                                onClick={handleNewNote}
                            >
                                Add Note
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium text-yellow-800">Storage Instructions</span>
                                    <span className="text-xs text-yellow-600">2024-03-15</span>
                                </div>
                                <p className="text-sm text-yellow-700">Store in cool, dry place. Check for spoilage weekly.</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium text-blue-800">Quality Note</span>
                                    <span className="text-xs text-blue-600">2024-03-12</span>
                                </div>
                                <p className="text-sm text-blue-700">Last batch had excellent quality. Consider reordering from same supplier.</p>
                            </div>
                        </div>
                    </div>
                );

            case 'history':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg sm:text-xl font-medium text-gray-800">Inventory History</h3>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Mar 15, 2024</td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                    Added
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">+15.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{selectedItem.quantity}</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">New shipment received</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">Mar 12, 2024</td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                    Used
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">-3.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">12.00</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">Daily feeding</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'photos':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-medium text-gray-800">Photos</h3>
                            <button
                                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                                onClick={handleUploadPhoto}
                            >
                                Add Attachment
                            </button>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                            1 / 100 images (Max 10MBs each)
                        </div>

                        {photos.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                                {photos.map((photo) => (
                                    <div key={photo.id} className="relative group">
                                        <div className="border border-gray-200 rounded-lg p-2 bg-white">
                                            <div className="relative">
                                                <img
                                                    src={photo.url}
                                                    alt={photo.name}
                                                    className="w-full h-20 sm:h-24 object-cover rounded"
                                                />
                                                <button
                                                    onClick={() => handleDeletePhoto(photo.id)}
                                                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="text-xs">⋮</span>
                                                </button>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-600">
                                                <div className="font-medium truncate">{photo.name}</div>
                                                <div>{photo.date}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                                <div className="text-gray-500 mb-2">No photos uploaded</div>
                                <div className="text-gray-400 text-sm">Add photos of this inventory item for reference.</div>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    // If an item is selected, show the detailed view
    if (selectedItem) {
        return (
            <div className="min-h-screen bg-white flex">
                {/* Mobile Sidebar Toggle */}
                <div className="lg:hidden fixed top-4 left-4 z-40">
                    <button
                        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                        className="md:hidden fixed top-20 left-4 z-30 text-gray-700 p-2 rounded-md bg-gray-100 hover:bg-gray-500 transition-colors duration-200"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Left Sidebar */}
                <div className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-48 bg-gray-50 border-r border-gray-200 flex-shrink-0
                    transform transition-transform duration-300 ease-in-out
                    ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    {/* Item Name Header */}
                    <div className="px-4 py-4 border-b border-gray-200">
                        <button
                            onClick={handleBackClick}
                            className="text-blue-600 hover:text-blue-800 text-sm mb-2 flex items-center space-x-1"
                        >
                            <ArrowLeft size={14} />
                            <span>Back</span>
                        </button>
                        <h2 className="font-medium text-gray-800 text-sm">{selectedItem.name}</h2>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${activeTab === item.id
                                    ? 'bg-white text-gray-900 font-medium border-r-2 border-green-600'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Overlay for mobile sidebar */}
                {showMobileSidebar && (
                    <div 
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={() => setShowMobileSidebar(false)}
                    ></div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-6 mt-14 lg:mt-0">
                    {renderTabContent()}
                </div>

                {/* Upload Photo Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Upload Photo</h2>
                                <button
                                    onClick={handleCloseUploadModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="photo-upload"
                                    />
                                    <label
                                        htmlFor="photo-upload"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="text-gray-400 mb-2">📷</div>
                                        <div className="text-sm text-gray-600 mb-1">Click to upload photos</div>
                                        <div className="text-xs text-gray-500">Max 10MB each, 100 images total</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* New Note Modal */}
                {showNewNoteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">New Note for Seed (Rre)</h2>
                                <button
                                    onClick={handleCloseNewNoteModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Text Editor Toolbar */}
                                <div className="border border-gray-300 rounded-t-md">
                                    <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
                                        <select className="text-sm border-none bg-transparent">
                                            <option>Normal</option>
                                        </select>
                                        <div className="border-l border-gray-300 h-6 mx-2"></div>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Bold size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Italic size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Underline size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <span className="text-sm">S</span>
                                        </button>
                                        <div className="border-l border-gray-300 h-6 mx-2"></div>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <List size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <AlignLeft size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <span className="text-sm">≡</span>
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <span className="text-sm">⋯</span>
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Link size={16} />
                                        </button>
                                    </div>
                                    <textarea
                                        placeholder="Add note or comment"
                                        value={newNote.content}
                                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                        rows="6"
                                        className="w-full px-3 py-2 border-none resize-none focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="date"
                                            value={newNote.date}
                                            onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Keywords"
                                                value={newNote.keywords}
                                                onChange={(e) => setNewNote({ ...newNote, keywords: e.target.value })}
                                                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                            <span className="absolute right-2 top-2 text-gray-400">🏷️</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <select
                                        value={newNote.assignTask}
                                        onChange={(e) => setNewNote({ ...newNote, assignTask: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="">Assign Task</option>
                                        <option value="task1">Task 1</option>
                                        <option value="task2">Task 2</option>
                                    </select>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="addToCalendar"
                                        checked={newNote.addToCalendar}
                                        onChange={(e) => setNewNote({ ...newNote, addToCalendar: e.target.checked })}
                                        className="rounded"
                                    />
                                    <label htmlFor="addToCalendar" className="text-sm text-gray-700">
                                        Add to Calendar
                                    </label>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <button className="flex items-center space-x-1 hover:text-gray-800">
                                        <MapPin size={16} />
                                        <span>Add Map Location</span>
                                    </button>
                                    <button className="flex items-center space-x-1 hover:text-gray-800">
                                        <Paperclip size={16} />
                                        <span>Add Attachment</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleCloseNewNoteModal}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showRecipeModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Add New Recipe</h2>
                                    <button
                                        onClick={() => setShowRecipeModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 sm:px-6 py-4 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter recipe name"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Makes</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Select unit</option>
                                            <option value="quantity">quantity</option>
                                            <option value="pounds">pounds</option>
                                            <option value="gallons">gallons</option>
                                            <option value="ounces">ounces</option>
                                            <option value="liters">liters</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter recipe instructions..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                                    <div className="border border-gray-300 rounded-md p-4">
                                        <div className="text-center text-gray-500 py-4">
                                            <p>No ingredients added yet</p>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                                                + Add ingredients
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowRecipeModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle recipe creation here
                                        setShowRecipeModal(false);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Create Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {renderModalContent()}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Main inventory list view (keeping your exact original structure)
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Inventory</h1>
                    <button
                        onClick={openNewInventoryTypeModal}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 w-fit"
                    >
                        <Plus size={16} />
                        <span>{inventoryItems.length === 0 ? 'New Inventory Type' : 'Add Item'}</span>
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
                            placeholder={inventoryItems.length === 0 ? "Search Inventory" : "Search inventory..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                {/* Empty State or Content */}
                {inventoryItems.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-12 text-center">
                        <div className="flex justify-center mb-6">
                            {/* Warehouse/Storage Icon */}
                            <div className="relative">
                                <div className="w-16 h-12 bg-gray-300 rounded-sm"></div>
                                <div className="absolute -top-2 left-2 w-12 h-8 bg-gray-400 rounded-sm"></div>
                                <div className="absolute -top-4 left-4 w-8 h-6 bg-gray-500 rounded-sm"></div>
                            </div>
                        </div>
                        <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">Nothing yet?</h2>
                        <p className="text-gray-600 mb-1">Add an inventory type and they'll show up here</p>
                        <p className="text-gray-500 text-sm">
                            Need help? Check out this{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-800">Getting Started Guide</a>.
                        </p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <Search size={40} sm:size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">No results found</h2>
                        <p className="text-gray-600">Try adjusting your search terms</p>
                    </div>
                ) : (
                    <>
                        {/* Inventory Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Item Name
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Value
                                            </th>
                                            <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredItems.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => handleRowClick(item)}
                                            >
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                            {item.name}
                                                        </span>
                                                        {item.variety && (
                                                            <span className="text-xs text-gray-500">{item.variety}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-right text-sm text-gray-900">
                                                    {item.quantity || '-'}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-right text-sm text-gray-900">
                                                    {item.value || '-'}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-800 p-1">
                                                            <Edit size={14} />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-800 p-1">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                                <p className="text-sm text-gray-700">
                                    Displaying all {filteredItems.length} records
                                </p>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="text-sm font-medium text-gray-600 mb-2">Total Items</div>
                                <div className="text-xl sm:text-2xl font-bold text-gray-800">{inventoryItems.length}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="text-sm font-medium text-gray-600 mb-2">Items with Quantities</div>
                                <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    {inventoryItems.filter(item => item.quantity).length}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="text-sm font-medium text-gray-600 mb-2">Items with Values</div>
                                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                                    {inventoryItems.filter(item => item.value).length}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {renderModalContent()}
                        </div>
                    </div>
                )}
            </div>
           
        </div>
    );
};