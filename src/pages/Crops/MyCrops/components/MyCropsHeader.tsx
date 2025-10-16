import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreVertical, Download, Upload, Printer, FileDown } from 'lucide-react';

interface MyCropsHeaderProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNewCropType: () => void;
    onAddPlanting: () => void;
    showTabs?: boolean;
    activeTab?: 'all' | 'planted';
    onTabChange?: (tab: 'all' | 'planted') => void;
}

export const MyCropsHeader: React.FC<MyCropsHeaderProps> = ({
    searchTerm,
    onSearchChange,
    onNewCropType,
    onAddPlanting,
    showTabs = false,
    activeTab = 'all',
    onTabChange
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuAction = (action: string) => {
        console.log(`Action: ${action}`);
        setIsMenuOpen(false);
        // You can add your specific logic for each action here
    };

    const menuItems = [
        { icon: Upload, label: 'Import', action: 'import' },
        { icon: Download, label: 'Export', action: 'export' },
        { icon: Printer, label: 'Print', action: 'print' },
        { icon: FileDown, label: 'Download', action: 'download' }
    ];

    const handleTabClick = (tab: 'all' | 'planted') => {
        if (onTabChange) {
            onTabChange(tab);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">My Crops</h1>
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                        onClick={onNewCropType}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none text-center"
                    >
                        New Crop Type
                    </button>
                    <button
                        onClick={onAddPlanting}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none text-center"
                    >
                        Add Planting
                    </button>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                {menuItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                            key={item.action}
                                            onClick={() => handleMenuAction(item.action)}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                        >
                                            <IconComponent className="w-4 h-4 mr-3 text-green-600" />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                {showTabs && (
                    <div className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto pb-2">
                        <button
                            onClick={() => handleTabClick('all')}
                            className={`pb-2 text-sm font-medium whitespace-nowrap ${activeTab === 'all'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All Types
                        </button>
                        <button
                            onClick={() => handleTabClick('planted')}
                            className={`pb-2 text-sm font-medium whitespace-nowrap ${activeTab === 'planted'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Currently Planted
                        </button>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Crops"
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full"
                        />
                    </div>
                    <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filter</span>
                    </button>
                </div>
            </div>
        </>
    );
};