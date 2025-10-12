import React, { useState, useRef } from 'react';
import { GrowLocation, GrowLocationsPageProps } from '../GrowLocations/types/growLocation';
import { NewLocationModal } from './NewLocationModal';
import { EmptyState } from './EmptyState';
import { LocationsTable } from './LocationsTable';
import { ActionsDropdown } from './ActionsDropdown';
import { ExportModal } from './ExportModal';
import { ImportModal } from './ImportModal';
import { exportToJSON, exportToCSV, downloadPDF, printLocations } from '../GrowLocations/utils/growLocationExport';
import { importFromJSON, importFromCSV } from '../GrowLocations/utils/growLocationImport';

const mockGrowLocations: GrowLocation[] = [];

export const GrowLocationsPage: React.FC<GrowLocationsPageProps> = ({
    onLocationSelect
}) => {
    const [growLocations, setGrowLocations] = useState<GrowLocation[]>(mockGrowLocations);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<GrowLocation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmptyStateActionsDropdownOpen, setIsEmptyStateActionsDropdownOpen] = useState(false);
    const [isNormalStateActionsDropdownOpen, setIsNormalStateActionsDropdownOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const emptyStateActionsButtonRef = useRef<HTMLButtonElement>(null);
    const normalStateActionsButtonRef = useRef<HTMLButtonElement>(null);

    const filteredLocations = growLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.plantingFormat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (location: GrowLocation) => {
        setSelectedLocation(location);
        if (onLocationSelect) {
            onLocationSelect(location);
        }
        console.log(`Selected grow location: ${location.name} - Secondary menu should now appear`);
    };

    const handleNewLocation = () => {
        setIsModalOpen(true);
    };

    const handleSaveNewLocation = (newLocationData: Omit<GrowLocation, 'id'>) => {
        const newLocation: GrowLocation = {
            ...newLocationData,
            id: Date.now().toString()
        };

        setGrowLocations(prev => [...prev, newLocation]);
        setIsModalOpen(false);
        console.log('New location created:', newLocation);
    };

    const handleExport = () => {
        setIsExportModalOpen(true);
    };

    const handleImport = () => {
        setIsImportModalOpen(true);
    };

    const handleDownload = () => {
        downloadPDF(growLocations);
    };

    const handlePrint = () => {
        printLocations(growLocations);
    };

    const handleExportJSON = () => {
        exportToJSON(growLocations);
    };

    const handleExportCSV = () => {
        exportToCSV(growLocations);
    };

    const handleImportJSON = () => {
        importFromJSON(
            (locations) => {
                setGrowLocations(prev => [...prev, ...locations]);
                alert(`Successfully imported ${locations.length} locations`);
            },
            (error) => {
                alert(`Import failed: ${error}`);
            }
        );
    };

    const handleImportCSV = () => {
        importFromCSV(
            (locations) => {
                setGrowLocations(prev => [...prev, ...locations]);
                alert(`Successfully imported ${locations.length} locations`);
            },
            (error) => {
                alert(`Import failed: ${error}`);
            }
        );
    };

    const handleEmptyStateActionsButtonClick = () => {
        setIsEmptyStateActionsDropdownOpen(!isEmptyStateActionsDropdownOpen);
    };

    const handleNormalStateActionsButtonClick = () => {
        setIsNormalStateActionsDropdownOpen(!isNormalStateActionsDropdownOpen);
    };

    if (growLocations.length === 0) {
        return (
            <>
                <div className="bg-white rounded-lg shadow-sm min-h-screen">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Grow Locations</h1>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <button
                                    onClick={handleNewLocation}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                                >
                                    New Location
                                </button>
                                <div className="relative">
                                    <button
                                        ref={emptyStateActionsButtonRef}
                                        onClick={handleEmptyStateActionsButtonClick}
                                        className="text-gray-500 hover:text-gray-700 hidden sm:block p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                    <ActionsDropdown
                                        isOpen={isEmptyStateActionsDropdownOpen}
                                        onClose={() => setIsEmptyStateActionsDropdownOpen(false)}
                                        onExport={handleExport}
                                        onImport={handleImport}
                                        onDownload={handleDownload}
                                        onPrint={handlePrint}
                                        triggerRef={emptyStateActionsButtonRef}
                                        hasLocations={false}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <div className="relative flex-1">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search Locations"
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <button className="sm:ml-4 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                </svg>
                                <span className="text-sm">Filter</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <EmptyState
                            onNewLocation={handleNewLocation}
                            onExport={handleExport}
                            onImport={handleImport}
                            onDownload={handleDownload}
                            onPrint={handlePrint}
                        />
                    </div>
                </div>

                <NewLocationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveNewLocation}
                />

                <ImportModal
                    isOpen={isImportModalOpen}
                    onClose={() => setIsImportModalOpen(false)}
                    onImportJSON={handleImportJSON}
                    onImportCSV={handleImportCSV}
                />
            </>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm min-h-screen">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Grow Locations</h1>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <button
                                onClick={handleNewLocation}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none"
                            >
                                New Location
                            </button>
                            <div className="relative">
                                <button
                                    ref={normalStateActionsButtonRef}
                                    onClick={handleNormalStateActionsButtonClick}
                                    className="text-gray-500 hover:text-gray-700 hidden sm:block p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                                <ActionsDropdown
                                    isOpen={isNormalStateActionsDropdownOpen}
                                    onClose={() => setIsNormalStateActionsDropdownOpen(false)}
                                    onExport={handleExport}
                                    onImport={handleImport}
                                    onDownload={handleDownload}
                                    onPrint={handlePrint}
                                    triggerRef={normalStateActionsButtonRef}
                                    hasLocations={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search Locations"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <button className="sm:ml-4 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                            </svg>
                            <span className="text-sm">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="p-6">

                    <LocationsTable locations={filteredLocations} onRowClick={handleRowClick} />
                </div>
            </div>

            <NewLocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNewLocation}
            />

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                onExportJSON={handleExportJSON}
                onExportCSV={handleExportCSV}
            />

            <ImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportJSON={handleImportJSON}
                onImportCSV={handleImportCSV}
            />
        </>
    );
};