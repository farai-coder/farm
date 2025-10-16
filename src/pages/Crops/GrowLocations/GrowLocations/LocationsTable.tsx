import React, { useState, useRef, useEffect } from 'react';
import { GrowLocation } from '../GrowLocations/types/growLocation';

interface LocationsTableProps {
    locations: GrowLocation[];
    onRowClick: (location: GrowLocation) => void;
}

export const LocationsTable: React.FC<LocationsTableProps> = ({ locations, onRowClick }) => {
    const [selectedLocation, setSelectedLocation] = useState<GrowLocation | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const actionsButtonRef = useRef<HTMLButtonElement>(null);

    const handleActionsClick = (e: React.MouseEvent, location: GrowLocation) => {
        e.stopPropagation();
        setSelectedLocation(location);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCloseDropdown = () => {
        setIsDropdownOpen(false);
        setSelectedLocation(null);
    };

    const handleEdit = () => {
        console.log('Edit location:', selectedLocation);
        handleCloseDropdown();
    };

    const handleViewDetails = () => {
        console.log('View details:', selectedLocation);
        handleCloseDropdown();
    };

    const handleDelete = () => {
        console.log('Delete location:', selectedLocation);
        handleCloseDropdown();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                handleCloseDropdown();
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center space-x-1">
                                        <span>Name</span>
                                        <i className="fas fa-caret-up text-gray-400"></i>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Planting Format
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {locations.map((location) => (
                                <tr
                                    key={location.id}
                                    onClick={() => onRowClick(location)}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200 relative"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                                                    {location.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {location.name}
                                                </div>
                                                {location.acreage && (
                                                    <div className="text-xs text-gray-500">
                                                        {location.acreage} Acre
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{location.type}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{location.plantingFormat}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex justify-start">
                                            <div className="relative">
                                                <button
                                                    ref={actionsButtonRef}
                                                    onClick={(e) => handleActionsClick(e, location)}
                                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
                                                >
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </button>

                                                {/* Dropdown Menu */}
                                                {isDropdownOpen && selectedLocation?.id === location.id && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                                                    >
                                                        <div className="py-1">
                                                            <button
                                                                onClick={handleEdit}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center space-x-3"
                                                            >
                                                                <i className="fas fa-edit text-gray-500 w-4"></i>
                                                                <span>Edit</span>
                                                            </button>

                                                            <button
                                                                onClick={handleViewDetails}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center space-x-3"
                                                            >
                                                                <i className="fas fa-eye text-gray-500 w-4"></i>
                                                                <span>View Details</span>
                                                            </button>

                                                            <button
                                                                onClick={handleDelete}
                                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center space-x-3"
                                                            >
                                                                <i className="fas fa-trash text-red-500 w-4"></i>
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                        Displaying {locations.length} record{locations.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </>
    );
};