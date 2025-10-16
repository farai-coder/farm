import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchableDropdownProps {
    label: string;
    value: string;
    placeholder: string;
    options: Array<{ value: string; label: string; icon?: string }>;
    onSelect: (value: string) => void;
    onNewClick?: () => void;
    newButtonLabel?: string;
    searchPlaceholder: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    label,
    value,
    placeholder,
    options,
    onSelect,
    onNewClick,
    newButtonLabel,
    searchPlaceholder
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (selectedValue: string) => {
        onSelect(selectedValue);
        setShowDropdown(false);
        setSearchTerm('');
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative flex-1">
                    <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-left flex items-center justify-between"
                    >
                        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                            {value || placeholder}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                    {showDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2 border-b border-gray-200">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder={searchPlaceholder}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                            <div className="py-1">
                                {filteredOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                                    >
                                        {option.icon && <span className="text-lg">{option.icon}</span>}
                                        <span>{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {onNewClick && newButtonLabel && (
                    <button
                        onClick={onNewClick}
                        className="text-blue-600 hover:text-blue-800 text-sm text-center whitespace-nowrap border border-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
                    >
                        {newButtonLabel}
                    </button>
                )}
            </div>
        </div>
    );
};
