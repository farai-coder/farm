import React, { useRef, useState } from 'react';
import { ActionsDropdown } from './ActionsDropdown';

interface EmptyStateProps {
    onNewLocation: () => void;
    onExport?: () => void;
    onImport?: () => void;
    onDownload?: () => void;
    onPrint?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    onNewLocation,
    onExport,
    onImport,
    onDownload,
    onPrint
}) => {
    const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
    const actionsButtonRef = useRef<HTMLButtonElement>(null);

    const handleActionsButtonClick = () => {
        setIsActionsDropdownOpen(!isActionsDropdownOpen);
    };

    const handleExport = onExport || (() => console.log('Export clicked'));
    const handleImport = onImport || (() => console.log('Import clicked'));
    const handleDownload = onDownload || (() => console.log('Download clicked'));
    const handlePrint = onPrint || (() => console.log('Print clicked'));

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center py-4 sm:py-8 px-4 sm:px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                        <i className="fas fa-map-marker-alt text-xl sm:text-2xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 text-center">No Grow Locations</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md text-sm sm:text-base">
                        You haven't added any grow locations yet. Start by creating your first grow location to organize your crops.
                    </p>
                    <button
                        onClick={onNewLocation}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium text-sm sm:text-base"
                    >
                        New Location
                    </button>
                </div>
            </div>
        </div>
    );
};