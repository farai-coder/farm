import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface CropTypeSelectProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
    label?: string;
    required?: boolean;
}

export const CropTypeSelect: React.FC<CropTypeSelectProps> = ({
    selectedType,
    onTypeChange,
    required = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const cropTypes = [
        "Tomatoes", "Peppers", "Lettuce",
        // Cereals
        "Maize", "Rice", "Wheat", "Barley", "Oats", "Sorghum", "Millet", "Rye", "Triticale",
        // Legumes
        "Soybean", "Groundnut (Peanut)", "Cowpea", "Common Bean", "Lentil", "Chickpea", "Pigeon Pea", "Faba Bean", "Mung Bean",
        // Root and Tubers
        "Cassava", "Potato", "Sweet Potato", "Yam", "Taro", "Beetroot", "Turnip",
        // Vegetables
        "Onion", "Garlic", "Carrot", "Cabbage", "Spinach", "Okra", "Eggplant", "Cucumber", "Zucchini", "Pea", "Broccoli", "Cauliflower",
        // Fruits
        "Mango", "Banana", "Orange", "Apple", "Pineapple", "Papaya", "Watermelon", "Pomegranate", "Grapes", "Strawberry", "Blueberry", "Avocado", "Lemon",
        // Nuts
        "Almond", "Walnut", "Pecan", "Cashew", "Hazelnut",
        // Oil Crops
        "Sunflower", "Sesame", "Rapeseed (Canola)", "Oil Palm", "Cottonseed", "Olive",
        // Fiber Crops
        "Cotton", "Jute", "Kenaf", "Flax", "Hemp",
        // Beverage and Stimulant Crops
        "Tea", "Coffee", "Cocoa", "Yerba Mate",
        // Spices and Herbs
        "Pepper (spice)", "Ginger", "Turmeric", "Basil", "Rosemary", "Coriander", "Chili Pepper", "Cinnamon",
        // Fodder and Forage Crops
        "Alfalfa", "Clover", "Silage Maize", "Grass Hay",
        // Industrial and Miscellaneous Crops
        "Sugarcane", "Sugar Beet", "Tobacco", "Hops", "Natural Rubber", "Bamboo (cultivated)", "Essential Oils (Lavender)"
    ];

    const filteredCropTypes = cropTypes.filter(type =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔒 Ensure only one dropdown open globally
    useEffect(() => {
        const handleGlobalDropdown = () => setIsOpen(false);
        window.addEventListener('openCropDropdown', handleGlobalDropdown);

        return () => {
            window.removeEventListener('openCropDropdown', handleGlobalDropdown);
        };
    }, []);

    const toggleDropdown = () => {
        if (!isOpen) window.dispatchEvent(new Event('openCropDropdown'));
        setIsOpen(!isOpen);
    };

    // 🧠 Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (type: string) => {
        onTypeChange(type);
        setIsOpen(false);
        setSearchTerm('');
    };

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        onTypeChange('');
    };

    // Clean the selected type to remove any extra characters
    const cleanSelectedType = selectedType?.replace(/[∨▾▼]/g, '').trim() || '';

    return (
        <div className="space-y-2">
            <div className="relative" ref={dropdownRef}>
                {/* Dropdown Button */}
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                >
                    <span className={cleanSelectedType ? 'text-gray-900' : 'text-gray-500'}>
                        {cleanSelectedType || 'Select crop type'}
                    </span>
                    <div className="flex items-center space-x-1">
                        {cleanSelectedType && (
                            <button
                                onClick={clearSelection}
                                className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                        <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search crop types..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="py-1 max-h-48 overflow-y-auto">
                            {filteredCropTypes.length === 0 ? (
                                <div className="px-4 py-2 text-sm text-gray-500 text-center">
                                    No crop types found
                                </div>
                            ) : (
                                filteredCropTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleSelect(type)}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${cleanSelectedType === type
                                            ? 'bg-green-50 text-green-700 font-medium'
                                            : 'text-gray-700'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};