import React from 'react';

interface Step1DetailsProps {
    formData: any;
    handleInputChange: (field: string, value: any) => void;
}

export const Step1Details: React.FC<Step1DetailsProps> = ({
    formData,
    handleInputChange,
}) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Internal ID
                </label>
                <input
                    type="text"
                    value={formData.internalId}
                    onChange={(e) => handleInputChange('internalId', e.target.value)}
                    placeholder="Internal ID"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Electronic ID
                </label>
                <input
                    type="text"
                    value={formData.electronicId}
                    onChange={(e) => handleInputChange('electronicId', e.target.value)}
                    placeholder="Electronic ID"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                    <option>Field</option>
                    <option>Greenhouse</option>
                    <option>Hydroponic</option>
                    <option>Nursery</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Planting Format
                </label>
                <select
                    value={formData.plantingFormat}
                    onChange={(e) => handleInputChange('plantingFormat', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                    <option>Planted in Beds</option>
                    <option>Planted in Pots</option>
                    <option>Vertical Racks</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Number of Beds
                </label>
                <input
                    type="number"
                    value={formData.numberOfBeds}
                    onChange={(e) =>
                        handleInputChange('numberOfBeds', parseInt(e.target.value))
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Bed Length (ft)
                </label>
                <input
                    type="number"
                    value={formData.bedLength}
                    onChange={(e) =>
                        handleInputChange('bedLength', parseFloat(e.target.value))
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Bed Width (ft)
                </label>
                <input
                    type="number"
                    value={formData.bedWidth}
                    onChange={(e) =>
                        handleInputChange('bedWidth', parseFloat(e.target.value))
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Area Size (acres)
                </label>
                <input
                    type="number"
                    value={formData.areaSize}
                    onChange={(e) => handleInputChange('areaSize', e.target.value)}
                    placeholder="Area in acres"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Estimated Land Value ($)
                </label>
                <input
                    type="number"
                    value={formData.estimatedLandValue}
                    onChange={(e) =>
                        handleInputChange('estimatedLandValue', parseFloat(e.target.value))
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    value={formData.status}
                    onChange={(e) =>
                        handleInputChange('status', e.target.value as 'Active' | 'Inactive')
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Light Profile
                </label>
                <input
                    type="text"
                    value={formData.lightProfile}
                    onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                    placeholder="Full Sun, Partial Shade, etc."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Grazing Rest Days
                </label>
                <input
                    type="number"
                    value={formData.grazingRestDays}
                    onChange={(e) => handleInputChange('grazingRestDays', e.target.value)}
                    placeholder="e.g. 30"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Add any notes or description..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            />
        </div>
    </div>
);
