import React, { useState } from 'react';

interface GrowLocation {
    id: string;
    name: string;
    type: string;
    plantingFormat: string;
    status: 'Active' | 'Inactive';
    acreage?: number;
    internalId?: string;
    electronicId?: string;
    numberOfBeds?: number;
    bedLength?: number;
    bedWidth?: number;
    areaSize?: number;
    estimatedLandValue?: number;
    lightProfile?: string;
    grazingRestDays?: number;
    description?: string;
}

// Mock data - replace with actual data fetching
const mockGrowLocations: GrowLocation[] = [
    {
        id: '1',
        name: 'tyyt',
        type: 'Greenhouse',
        plantingFormat: 'Planted in Beds',
        status: 'Active',
        acreage: 2.5
    },
    // Add more mock locations as needed
];

// Props interface to handle secondary menu display
interface GrowLocationsPageProps {
    onLocationSelect?: (location: GrowLocation) => void;
}

// New Location Modal Component
const NewLocationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (location: Omit<GrowLocation, 'id'>) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        internalId: '',
        electronicId: '',
        type: 'Field',
        plantingFormat: 'Planted in Beds',
        numberOfBeds: 5,
        bedLength: 100,
        bedWidth: 3,
        areaSize: '',
        estimatedLandValue: 0,
        status: 'Active' as 'Active' | 'Inactive',
        lightProfile: '',
        grazingRestDays: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSave = () => {
        const newLocation: Omit<GrowLocation, 'id'> = {
            name: formData.name,
            type: formData.type,
            plantingFormat: formData.plantingFormat,
            status: formData.status,
            acreage: parseFloat(formData.areaSize) || undefined,
            internalId: formData.internalId,
            electronicId: formData.electronicId,
            numberOfBeds: formData.numberOfBeds,
            bedLength: formData.bedLength,
            bedWidth: formData.bedWidth,
            areaSize: parseFloat(formData.areaSize) || undefined,
            estimatedLandValue: formData.estimatedLandValue,
            lightProfile: formData.lightProfile,
            grazingRestDays: parseInt(formData.grazingRestDays) || undefined,
            description: formData.description
        };
        onSave(newLocation);
        onClose();
    };

    const handleCancel = () => {
        setCurrentStep(1);
        setFormData({
            name: '',
            internalId: '',
            electronicId: '',
            type: 'Field',
            plantingFormat: 'Planted in Beds',
            numberOfBeds: 5,
            bedLength: 100,
            bedWidth: 3,
            areaSize: '',
            estimatedLandValue: 0,
            status: 'Active',
            lightProfile: '',
            grazingRestDays: '',
            description: ''
        });
        onClose();
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-6">
            {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step === currentStep
                                ? 'bg-black text-white'
                                : step < currentStep
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}
                    >
                        {step < currentStep ? '✓' : step}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                        {step === 1 && 'Details'}
                        {step === 2 && 'Map Location'}
                        {step === 3 && 'Add Plantings'}
                        {step === 4 && 'Complete'}
                    </span>
                    {step < 4 && <div className="mx-4 h-px w-8 bg-gray-300"></div>}
                </div>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    placeholder="Example: Northwest Field"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Internal Id <span className="text-blue-500">ⓘ</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Example: F001"
                        value={formData.internalId}
                        onChange={(e) => handleInputChange('internalId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Electronic Id</label>
                    <input
                        type="text"
                        value={formData.electronicId}
                        onChange={(e) => handleInputChange('electronicId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                    <option value="Field">Field</option>
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Pasture">Pasture</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Planting Format</label>
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.plantingFormat === 'Planted in Beds'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onClick={() => handleInputChange('plantingFormat', 'Planted in Beds')}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-gray-800 rounded mr-3 flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-px">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                            <span className="font-medium">Planted in Beds</span>
                        </div>
                        <p className="text-xs text-gray-600">
                            Distinct number of beds for diverse crops. Often 100' length. Example: Carrots, Tomatos, Spinach, etc. Plantings based on row length and count.
                        </p>
                    </div>

                    <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.plantingFormat === 'Cover Crop'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onClick={() => handleInputChange('plantingFormat', 'Cover Crop')}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-black rounded mr-3"></div>
                            <span className="font-medium">Cover Crop</span>
                        </div>
                        <p className="text-xs text-gray-600">
                            Complete crop coverage or grazing location. Example: Alfalfa, Hay, Rye, Wheat, Pasture, etc. Planting coverage based on location area.
                        </p>
                    </div>

                    <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.plantingFormat === 'Row Crop'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onClick={() => handleInputChange('plantingFormat', 'Row Crop')}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-gray-600 rounded mr-3 flex items-center justify-center">
                                <div className="space-y-1">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-4 h-px bg-white"></div>
                                    ))}
                                </div>
                            </div>
                            <span className="font-medium">Row Crop</span>
                        </div>
                        <p className="text-xs text-gray-600">
                            One crop planted in rows wide enough to be cultivated by machinery. Example: Corn, Soy Beans, Hemp, Potatos, etc. Planting coverage based on location area.
                        </p>
                    </div>

                    <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.plantingFormat === 'Other'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onClick={() => handleInputChange('plantingFormat', 'Other')}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-gray-600 rounded mr-3 flex items-center justify-center text-white text-xs">#</div>
                            <span className="font-medium">Other</span>
                        </div>
                        <p className="text-xs text-gray-600">
                            Any alternative growing method. Example: Shelves, aquaponics, trays, etc. Plantings based on specified amount planted.
                        </p>
                    </div>
                </div>
            </div>

            {formData.plantingFormat === 'Planted in Beds' && (
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number Of Beds</label>
                        <input
                            type="number"
                            value={formData.numberOfBeds}
                            onChange={(e) => handleInputChange('numberOfBeds', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bed Length</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.bedLength}
                                onChange={(e) => handleInputChange('bedLength', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                            <span className="absolute right-3 top-2 text-gray-500">Meters</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bed Width</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.bedWidth}
                                onChange={(e) => handleInputChange('bedWidth', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                            <span className="absolute right-3 top-2 text-gray-500">Meters</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area/Size (Ha) <span className="text-blue-500">ⓘ</span>
                </label>
                <input
                    type="number"
                    step="0.1"
                    value={formData.areaSize}
                    onChange={(e) => handleInputChange('areaSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Land Value</label>
                <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.estimatedLandValue}
                        onChange={(e) => handleInputChange('estimatedLandValue', parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as 'Active' | 'Inactive')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Light Profile</label>
                <select
                    value={formData.lightProfile}
                    onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                    <option value="">Select Light Profile</option>
                    <option value="Full Sun">Full Sun</option>
                    <option value="Partial Sun">Partial Sun</option>
                    <option value="Shade">Shade</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grazing Rest Days <span className="text-blue-500">ⓘ</span>
                </label>
                <input
                    type="number"
                    value={formData.grazingRestDays}
                    onChange={(e) => handleInputChange('grazingRestDays', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-seedling text-2xl text-green-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Add Plantings</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                This step allows you to add plantings to your grow location. You can skip this for now and add plantings later.
            </p>
            <div className="text-sm text-gray-600">
                <p>Next: Add Plantings →</p>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Great! Field added!</h3>
            <p className="text-gray-500 mb-6">
                Map your field to calculate it's area. Then 'Add Plantings'
            </p>
            <div className="space-x-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
                    Let's do this! Map field
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    Maybe later. Add Plantings
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">New Grow Location</h2>
                </div>

                <div className="px-6 py-6">
                    {renderStepIndicator()}

                    <div className="min-h-[400px]">
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}
                        {currentStep === 4 && renderStep4()}
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                    <div>
                        {currentStep > 1 && (
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                                Previous
                            </button>
                        )}
                    </div>
                    <div className="space-x-3">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        {currentStep < 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const GrowLocationsPage: React.FC<GrowLocationsPageProps> = ({
    onLocationSelect
}) => {
    const [growLocations, setGrowLocations] = useState<GrowLocation[]>(mockGrowLocations);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<GrowLocation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter locations based on search term
    const filteredLocations = growLocations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.plantingFormat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (location: GrowLocation) => {
        setSelectedLocation(location);
        // This will trigger the secondary menu display in the parent component
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
            id: Date.now().toString() // Simple ID generation
        };

        setGrowLocations(prev => [...prev, newLocation]);
        setIsModalOpen(false);
        console.log('New location created:', newLocation);
    };

    // Empty state component
    const EmptyState = () => (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Page Header */}
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
                        <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
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

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4 sm:px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                        <i className="fas fa-map-marker-alt text-xl sm:text-2xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 text-center">No Grow Locations</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md text-sm sm:text-base">
                        You haven't added any grow locations yet. Start by creating your first grow location to organize your crops.
                    </p>
                    <button
                        onClick={handleNewLocation}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium text-sm sm:text-base"
                    >
                        New Location
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm min-h-screen">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-800">Grow Locations</h1>
                        {growLocations.length > 0 && (
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleNewLocation}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                                >
                                    New Location
                                </button>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {growLocations.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            {/* Table */}
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
                                            {filteredLocations.map((location) => (
                                                <tr
                                                    key={location.id}
                                                    onClick={() => handleRowClick(location)}
                                                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Handle actions menu
                                                            }}
                                                            className="text-gray-400 hover:text-gray-600"
                                                        >
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Table Footer */}
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                                    <p className="text-sm text-gray-700">
                                        Displaying {filteredLocations.length} record{filteredLocations.length !== 1 ? 's' : ''}
                                        {searchTerm && ` matching "${searchTerm}"`}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modal */}
            <NewLocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNewLocation}
            />
        </>
    );
};