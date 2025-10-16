// MapContainer.tsx
import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface MapContainerProps {
    mapRef: React.RefObject<HTMLDivElement>;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
    mapRef,
    onZoomIn,
    onZoomOut
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
                <div
                    ref={mapRef}
                    className="w-full"
                    style={{ height: '600px' }}
                />

                {/* Zoom Controls (bottom right) */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200">
                    <button
                        onClick={onZoomIn}
                        className="block p-2 hover:bg-gray-50 border-b border-gray-200"
                    >
                        <ZoomIn size={18} />
                    </button>
                    <button
                        onClick={onZoomOut}
                        className="block p-2 hover:bg-gray-50"
                    >
                        <ZoomOut size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};