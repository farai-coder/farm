import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreVertical, Upload, Download, Printer, FileDown } from 'lucide-react';

interface EmptyStateProps {
    onNewCropType: () => void;
    onAddPlanting: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewCropType, onAddPlanting }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { icon: Upload, label: 'Import', action: 'import' },
        { icon: Download, label: 'Export', action: 'export' },
        { icon: Printer, label: 'Print', action: 'print' },
        { icon: FileDown, label: 'Download', action: 'download' }
    ];

    const handleMenuAction = (action: string) => {
        console.log(`Menu action: ${action}`);
        setIsMenuOpen(false);
        // Handle different menu actions here
    };

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

    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Page Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">My Crops</h1>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                            onClick={onNewCropType}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                        >
                            New Crop Type
                        </button>
                        <button
                            onClick={onAddPlanting}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                        >
                            Add Planting
                        </button>
                        <div className="relative" ref={menuRef}>
                            <button
                                className="text-gray-500 hover:text-gray-700 hidden sm:block"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4 sm:px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-9xl">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 text-center">No crops yet?</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md text-sm sm:text-base">
                        Add a new crop type and it will show up here.
                    </p>
                    <button
                        onClick={onNewCropType}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors"
                    >
                        Add your first crop type
                    </button>
                </div>
            </div>
        </div>
    );
};