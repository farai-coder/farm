// MapModal.tsx
import React from 'react';
import { Save, Trash2, X } from 'lucide-react';
import { MapArea, AREA_TYPES } from './type';
import { formatArea } from './mapUtils';

interface MapModalProps {
    showMapModal: boolean;
    editingMap: MapArea | null;
    isNewMap: boolean;
    mapName: string;
    setMapName: (name: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: (mapId: string) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
    showMapModal,
    editingMap,
    isNewMap,
    mapName,
    setMapName,
    onSave,
    onCancel,
    onDelete
}) => {
    if (!showMapModal || !editingMap) return null;

    // DEBUG: Let's see exactly what we're working with
    console.log('🔍 MAP MODAL DEBUG INFO:');
    console.log('editingMap:', editingMap);
    console.log('editingMap.type:', editingMap.type);
    console.log('editingMap.type typeof:', typeof editingMap.type);
    console.log('AREA_TYPES:', AREA_TYPES);

    const foundAreaType = AREA_TYPES.find(t => t.id === editingMap.type);
    console.log('foundAreaType:', foundAreaType);

    // If not found, try case-insensitive match
    const caseInsensitiveMatch = AREA_TYPES.find(t =>
        t.id.toLowerCase() === editingMap.type?.toLowerCase()
    );
    console.log('caseInsensitiveMatch:', caseInsensitiveMatch);

    // Final area type with fallbacks
    const areaType = foundAreaType || caseInsensitiveMatch || AREA_TYPES.find(t => t.id === 'field') || AREA_TYPES[0];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {isNewMap ? 'Add Place Details' : 'Edit Place Details'}
                    </h3>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X size={20} className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Place Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Place Name
                        </label>
                        <input
                            type="text"
                            value={mapName}
                            onChange={(e) => setMapName(e.target.value)}
                            placeholder="Enter place name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            autoFocus
                        />
                    </div>

                    {/* Type Display */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Type
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div
                                className="w-5 h-5 rounded border-2 border-white shadow-sm"
                                style={{ backgroundColor: areaType.color }}
                            ></div>
                            <span className="text-sm font-medium text-gray-700">
                                {areaType.label}
                            </span>
                        </div>
                    </div>

                    {/* Area and Center Information */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-blue-700 font-medium">Area:</span>
                                <span className="text-blue-900">{formatArea(editingMap.area)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    {!isNewMap && (
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this place?')) {
                                    onDelete(editingMap.id);
                                }
                            }}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <Trash2 size={16} />
                            <span>Delete Place</span>
                        </button>
                    )}

                    <div className={`flex space-x-3 ${isNewMap ? 'w-full justify-end' : ''}`}>
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            disabled={!mapName.trim()}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                        >
                            <Save size={16} />
                            <span>{isNewMap ? 'Create Place' : 'Save Changes'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};