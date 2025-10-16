// DrawingControls.tsx
import React from 'react';
import { MapPin, ChevronDown, Plus } from 'lucide-react';
import { AREA_TYPES } from './type';

interface DrawingControlsProps {
    isDrawingMode: boolean;
    selectedAreaType: string;
    isTypeDropdownOpen: boolean;
    setIsTypeDropdownOpen: (open: boolean) => void;
    onAddPlace: () => void;
    onTypeChange: (type: string) => void;
}

export const DrawingControls: React.FC<DrawingControlsProps> = ({
    isDrawingMode,
    selectedAreaType,
    isTypeDropdownOpen,
    setIsTypeDropdownOpen,
    onAddPlace,
    onTypeChange
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Type Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <div
                                className="w-3 h-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: AREA_TYPES.find(t => t.id === selectedAreaType)?.color }}
                            ></div>
                            <span>{AREA_TYPES.find(t => t.id === selectedAreaType)?.label}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {isTypeDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                    {AREA_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => onTypeChange(type.id)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${selectedAreaType === type.id ? 'bg-gray-100' : ''
                                                }`}
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full border border-gray-300"
                                                style={{ backgroundColor: type.color }}
                                            ></div>
                                            <span>{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add Place Button */}
                    <button
                        onClick={onAddPlace}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDrawingMode
                            ? 'bg-green-700 text-white'
                            : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                        <span>
                            {isDrawingMode ? 'Stop Drawing' : 'Add Place'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Instructions */}
            {isDrawingMode && (
                <div className="mt-3 flex items-start space-x-2 text-sm text-blue-600">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="flex-1">
                        Click on the map to add a place. Complete the shape of the place by clicking on the first point.
                    </span>
                </div>
            )}
        </div>
    );
};