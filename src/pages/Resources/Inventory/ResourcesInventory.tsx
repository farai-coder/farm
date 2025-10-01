import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, ArrowLeft, Menu } from 'lucide-react';
import { DetailsTab } from './tabs/DetailsTab';
import { RecipesTab } from './tabs/RecipesTab';
import { NotesTab } from './tabs/NotesTab';
import { HistoryTab } from './tabs/HistoryTab';
import { PhotosTab } from './tabs/PhotosTab';
import { Modals } from './modals/Modals';
import { InventoryItem, Photo, Recipe, Note, SidebarItem, ModalType } from './types/inventory';

export const ResourcesInventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [activeTab, setActiveTab] = useState<string>('details');
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [modalType, setModalType] = useState<ModalType>('');
    const [showNewNoteModal, setShowNewNoteModal] = useState<boolean>(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
    const [photos, setPhotos] = useState<Photo[]>([
        {
            id: 1,
            name: "Screenshot_505.png",
            date: "Sep 28, 2025",
            url: "/api/placeholder/150/100"
        }
    ]);
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [showRecipeModal, setShowRecipeModal] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [newNote, setNewNote] = useState<Note>({
        content: '',
        date: new Date().toISOString().split('T')[0],
        keywords: '',
        assignTask: '',
        addToCalendar: false
    });

    const sidebarItems: SidebarItem[] = [
        { id: 'details', label: 'Details' },
        { id: 'recipes', label: 'Recipes' },
        { id: 'notes', label: 'Notes' },
        { id: 'history', label: 'History' },
        { id: 'photos', label: 'Photos' }
    ];

    const inventoryItems: InventoryItem[] = [
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

    const navigate = (url: string): void => {
        setCurrentUrl(url);
        console.log('Navigating to:', url);
        if (window.history && window.history.pushState) {
            window.history.pushState(null, '', url);
        }
    };

    useEffect(() => {
        console.log('Current URL state:', currentUrl);
    }, [currentUrl]);

    const handleRowClick = (item: InventoryItem): void => {
        console.log('Row clicked:', item.name);
        setSelectedItem(item);
        setActiveTab('details');
        setShowMobileSidebar(false);
        setCurrentUrl(`/resources/inventory/${item.id}/details`);
    };

    const handleBackClick = (): void => {
        console.log('Back clicked - returning to inventory list');
        setSelectedItem(null);
        setShowMobileSidebar(false);
        setCurrentUrl('/resources/inventory');
    };

    const handleTabClick = (tabId: string): void => {
        console.log('Tab clicked:', tabId);
        setActiveTab(tabId);
        setShowMobileSidebar(false);
        if (selectedItem) {
            const newUrl = `/resources/inventory/${selectedItem.id}/${tabId}`;
            setCurrentUrl(newUrl);
            navigate(newUrl);
        }
    };

    const openAddInventoryModal = (): void => {
        setModalType('add');
        setShowModal(true);
    };

    const openWarehouseModal = (): void => {
        setModalType('warehouse');
        setShowModal(true);
    };

    const openRemoveModal = (): void => {
        setModalType('remove');
        setShowModal(true);
    };

    const openAdjustModal = (): void => {
        setModalType('adjust');
        setShowModal(true);
    };

    const openNewInventoryTypeModal = (): void => {
        setModalType('newType');
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
        setModalType('');
    };

    const handleNewNote = (): void => {
        setShowNewNoteModal(true);
    };

    const handleCloseNewNoteModal = (): void => {
        setShowNewNoteModal(false);
        setNewNote({
            content: '',
            date: new Date().toISOString().split('T')[0],
            keywords: '',
            assignTask: '',
            addToCalendar: false
        });
    };

    const handleSaveNote = (): void => {
        console.log('Saving note:', newNote);
        handleCloseNewNoteModal();
    };

    const handleUploadPhoto = (): void => {
        setShowUploadModal(true);
    };

    const handleCloseUploadModal = (): void => {
        setShowUploadModal(false);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhoto: Photo = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    date: new Date().toLocaleDateString(),
                    url: e.target?.result as string
                };
                setPhotos(prev => [...prev, newPhoto]);
            };
            reader.readAsDataURL(file);
        });
        setShowUploadModal(false);
    };

    const handleDeletePhoto = (photoId: number): void => {
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    };

    const renderTabContent = (): React.ReactNode => {
        if (!selectedItem) return null;

        const tabProps = {
            selectedItem,
            openAddInventoryModal,
            openRemoveModal,
            openAdjustModal,
            handleNewNote,
            handleUploadPhoto,
            photos,
            handleDeletePhoto,
            showRecipeModal,
            setShowRecipeModal,
            recipes,
            setRecipes
        };

        switch (activeTab) {
            case 'details':
                return <DetailsTab {...tabProps} />;
            case 'recipes':
                return <RecipesTab {...tabProps} />;
            case 'notes':
                return <NotesTab {...tabProps} />;
            case 'history':
                return <HistoryTab {...tabProps} />;
            case 'photos':
                return <PhotosTab {...tabProps} />;
            default:
                return null;
        }
    };

    if (selectedItem) {
        return (
            <div className="min-h-screen bg-white flex">
                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setShowMobileSidebar(true)}
                    className="md:hidden fixed top-20 left-4 z-30 text-gray-700 p-2 rounded-md bg-gray-100 hover:bg-gray-500 transition-colors duration-200"
                >
                    <Menu size={20} />
                </button>

                {/* Desktop Sidebar */}
                <div className="hidden md:block bg-gray-50 w-48 flex-shrink-0 relative h-screen pt-16">
                    <div className="absolute right-0 top-16 h-full w-px bg-gray-200"></div>
                    <div className="px-4 py-4 border-b border-gray-200">
                        <button
                            onClick={handleBackClick}
                            className="text-blue-600 hover:text-blue-800 text-sm mb-2 flex items-center space-x-1"
                        >
                            <ArrowLeft size={14} />
                            <span>Back to Inventory</span>
                        </button>
                        <h2 className="font-medium text-gray-800 text-sm">{selectedItem.name}</h2>
                    </div>
                    <div className="py-4">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative ${activeTab === item.id
                                    ? 'bg-white text-green-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                {item.label}
                                {activeTab === item.id && (
                                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-600"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div
                    className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${showMobileSidebar ? 'translate-y-0' : '-translate-y-full'
                        }`}
                >
                    <div className="h-full w-full flex flex-col">
                        {/* Mobile Drawer Header */}
                        <div className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 flex-shrink-0">
                            <div className="flex flex-col">
                                <button
                                    onClick={handleBackClick}
                                    className="text-blue-600 hover:text-blue-800 text-xs mb-1 flex items-center space-x-1"
                                >
                                    <ArrowLeft size={12} />
                                    <span>Back to Inventory</span>
                                </button>
                                <span className="text-lg font-semibold text-gray-800">{selectedItem.name}</span>
                            </div>
                            <button
                                onClick={() => setShowMobileSidebar(false)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <span className="text-2xl leading-none">×</span>
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
                            {sidebarItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleTabClick(item.id)}
                                    className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 cursor-pointer ${activeTab === item.id
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-sm font-medium truncate">{item.label}</span>
                                    {activeTab === item.id && (
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-6 pt-20 md:pt-20">
                    {/* Back to Inventory link - visible on all tabs */}
                    <div className="mb-4 md:hidden">
                        <button
                            onClick={handleBackClick}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1 font-medium"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Inventory</span>
                        </button>
                    </div>
                    {renderTabContent()}
                </div>

                <Modals
                    showModal={showModal}
                    modalType={modalType}
                    closeModal={closeModal}
                    openWarehouseModal={openWarehouseModal}
                    showUploadModal={showUploadModal}
                    handleCloseUploadModal={handleCloseUploadModal}
                    handleFileUpload={handleFileUpload}
                    showNewNoteModal={showNewNoteModal}
                    handleCloseNewNoteModal={handleCloseNewNoteModal}
                    handleSaveNote={handleSaveNote}
                    newNote={newNote}
                    setNewNote={setNewNote}
                    showRecipeModal={showRecipeModal}
                    setShowRecipeModal={setShowRecipeModal}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
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

                {inventoryItems.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-12 text-center">
                        <div className="flex justify-center mb-6">
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
                            <Search size={40} className="text-gray-300" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">No results found</h2>
                        <p className="text-gray-600">Try adjusting your search terms</p>
                    </div>
                ) : (
                    <>
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

                            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                                <p className="text-sm text-gray-700">
                                    Displaying all {filteredItems.length} records
                                </p>
                            </div>
                        </div>

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

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <Modals
                                showModal={showModal}
                                modalType={modalType}
                                closeModal={closeModal}
                                openWarehouseModal={openWarehouseModal}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};