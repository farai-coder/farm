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

export const GrowLocationDetails: React.FC = () => {
    // Default location data
    const [location, setLocation] = useState<GrowLocation>({
        id: '1',
        name: 'New Location',
        type: 'Field',
        plantingFormat: 'Planted in Beds',
        status: 'Active'
    });

    const [formData, setFormData] = useState({
        name: location.name || '',
        internalId: location.internalId || '',
        electronicId: location.electronicId || '',
        type: location.type || 'Field',
        plantingFormat: location.plantingFormat || 'Planted in Beds',
        numberOfBeds: location.numberOfBeds || 5,
        bedLength: location.bedLength || 100,
        bedWidth: location.bedWidth || 3,
        areaSize: location.areaSize?.toString() || '',
        estimatedLandValue: location.estimatedLandValue || 0,
        status: location.status || 'Active',
        lightProfile: location.lightProfile || '',
        grazingRestDays: location.grazingRestDays?.toString() || '',
        description: location.description || ''
    });

    const [activeSection, setActiveSection] = useState('Details');

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        const updatedLocation: GrowLocation = {
            ...location,
            name: formData.name,
            type: formData.type,
            plantingFormat: formData.plantingFormat,
            status: formData.status as 'Active' | 'Inactive',
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
        setLocation(updatedLocation);
        // You could add additional save logic here (API call, etc.)
        console.log('Location saved:', updatedLocation);
    };

    const handleCancel = () => {
        // Reset form data to current location data
        setFormData({
            name: location.name || '',
            internalId: location.internalId || '',
            electronicId: location.electronicId || '',
            type: location.type || 'Field',
            plantingFormat: location.plantingFormat || 'Planted in Beds',
            numberOfBeds: location.numberOfBeds || 5,
            bedLength: location.bedLength || 100,
            bedWidth: location.bedWidth || 3,
            areaSize: location.areaSize?.toString() || '',
            estimatedLandValue: location.estimatedLandValue || 0,
            status: location.status || 'Active',
            lightProfile: location.lightProfile || '',
            grazingRestDays: location.grazingRestDays?.toString() || '',
            description: location.description || ''
        });
        console.log('Changes cancelled');
    };

    const sidebarItems = [
        { name: 'Details', icon: 'fas fa-info-circle', active: true },
        { name: 'Plantings', icon: 'fas fa-seedling', active: false },
        { name: 'Crop Plan', icon: 'fas fa-calendar-alt', active: false },
        { name: 'Planting History', icon: 'fas fa-history', active: false },
        { name: 'Grazing', icon: 'fas fa-grass', active: false },
        { name: 'Treatments', icon: 'fas fa-spray-can', active: false },
        { name: 'Nutrients', icon: 'fas fa-leaf', active: false },
        { name: 'Schedule', icon: 'fas fa-clock', active: false },
        { name: 'Tasks', icon: 'fas fa-tasks', active: false },
        { name: 'Notes', icon: 'fas fa-sticky-note', active: false },
        { name: 'Map', icon: 'fas fa-map', active: false },
        { name: 'Accounting', icon: 'fas fa-dollar-sign', active: false },
        { name: 'Photos', icon: 'fas fa-camera', active: false },
        { name: 'Files', icon: 'fas fa-file', active: false }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
           

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                

                {/* Content */}
                <div className="flex-1 p-6">
                    {activeSection === 'Details' && (
                        <div className="max-w-4xl">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Internal ID and Electronic ID */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Internal Id <span className="text-blue-500">ⓘ</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.internalId}
                                                onChange={(e) => handleInputChange('internalId', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Electronic Id</label>
                                            <input
                                                type="text"
                                                value={formData.electronicId}
                                                onChange={(e) => handleInputChange('electronicId', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Location Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
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

                                    {/* Planting Format */}
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

                                    {/* Area/Size and Mapped Area */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Mapped Area</label>
                                            <div className="flex items-center justify-center py-8 border border-gray-300 rounded-md bg-gray-50">
                                                <div className="text-center">
                                                    <i className="fas fa-map-marker-alt text-2xl text-gray-400 mb-2"></i>
                                                    <p className="text-sm text-gray-600">Map location to calculate area</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Estimated Land Value */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Land Value</label>
                                        <div className="relative max-w-xs">
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

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 max-w-xs"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                    {/* Light Profile */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Light Profile</label>
                                        <select
                                            value={formData.lightProfile}
                                            onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 max-w-xs"
                                        >
                                            <option value="">Select Light Profile</option>
                                            <option value="Full Sun">Full Sun</option>
                                            <option value="Full to Part Sun">Full to Part Sun</option>
                                            <option value="Partial Sun">Partial Sun</option>
                                            <option value="Shade">Shade</option>
                                        </select>
                                    </div>

                                    {/* Grazing Rest Days */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Grazing Rest Days <span className="text-blue-500">ⓘ</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.grazingRestDays}
                                            onChange={(e) => handleInputChange('grazingRestDays', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 max-w-xs"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other sections */}
                    {activeSection !== 'Details' && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <i className={`${sidebarItems.find(item => item.name === activeSection)?.icon} text-4xl text-gray-400 mb-4`}></i>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{activeSection}</h3>
                                <p className="text-gray-500">This section is not implemented yet.</p>
                            </div>
                        </div>
                    )}

                    
                </div>

               
            </div>
        </div>
    );
};