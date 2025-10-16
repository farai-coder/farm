// HeaderControls.tsx
import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Settings, Printer, Download, Trash2 } from 'lucide-react';
import { MapArea } from './type';
import { formatArea } from './mapUtils';

interface HeaderControlsProps {
    zoomLevel: number;
    totalArea: number;
    isSettingsOpen: boolean;
    setIsSettingsOpen: (open: boolean) => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFullscreen: () => void;
    onPrint: () => void;
    onSaveData: () => void;
    onClearAll: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
    zoomLevel,
    totalArea,
    isSettingsOpen,
    setIsSettingsOpen,
    onZoomIn,
    onZoomOut,
    onFullscreen,
    onPrint,
    onSaveData,
    onClearAll
}) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">Location Map</h1>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={onZoomOut}
                    className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                    title="Zoom Out"
                >
                    <ZoomOut size={16} />
                </button>
                <span className="text-sm text-gray-600 px-2">{zoomLevel}%</span>
                <button
                    onClick={onZoomIn}
                    className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                    title="Zoom In"
                >
                    <ZoomIn size={16} />
                </button>
                <button
                    onClick={onFullscreen}
                    className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                    title="Fullscreen"
                >
                    <Maximize2 size={16} />
                </button>
                <button
                    onClick={onPrint}
                    className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                    title="Print"
                >
                    <Printer size={16} />
                </button>
       
            </div>
        </div>
    );
};