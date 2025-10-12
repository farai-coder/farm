import React from 'react';
import { PlantingFormatCard } from './PlantingFormatCard';

interface ModalStep1Props {
    formData: {
        name: string;
        internalId: string;
        electronicId: string;
        type: string;
        plantingFormat: string;
        numberOfBeds: number;
        bedLength: number;
        bedWidth: number;
    };
    onInputChange: (field: string, value: any) => void;
}

export const ModalStep1: React.FC<ModalStep1Props> = ({ formData, onInputChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    placeholder="Example: Northwest Field"
                    value={formData.name}
                    onChange={(e) => onInputChange('name', e.target.value)}
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
                        onChange={(e) => onInputChange('internalId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Electronic Id</label>
                    <input
                        type="text"
                        value={formData.electronicId}
                        onChange={(e) => onInputChange('electronicId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                <select
                    value={formData.type}
                    onChange={(e) => onInputChange('type', e.target.value)}
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
                    <PlantingFormatCard
                        title="Planted in Beds"
                        description="Distinct number of beds for diverse crops. Often 100' length. Example: Carrots, Tomatos, Spinach, etc. Plantings based on row length and count."
                        icon="beds"
                        isSelected={formData.plantingFormat === 'Planted in Beds'}
                        onClick={() => onInputChange('plantingFormat', 'Planted in Beds')}
                    />

                    <PlantingFormatCard
                        title="Cover Crop"
                        description="Complete crop coverage or grazing location. Example: Alfalfa, Hay, Rye, Wheat, Pasture, etc. Planting coverage based on location area."
                        icon="cover"
                        isSelected={formData.plantingFormat === 'Cover Crop'}
                        onClick={() => onInputChange('plantingFormat', 'Cover Crop')}
                    />

                    <PlantingFormatCard
                        title="Row Crop"
                        description="One crop planted in rows wide enough to be cultivated by machinery. Example: Corn, Soy Beans, Hemp, Potatos, etc. Planting coverage based on location area."
                        icon="row"
                        isSelected={formData.plantingFormat === 'Row Crop'}
                        onClick={() => onInputChange('plantingFormat', 'Row Crop')}
                    />

                    <PlantingFormatCard
                        title="Hydroponic"
                        description="Soilless cultivation using nutrient-rich water solutions. Example: Lettuce, Herbs, Microgreens, etc. Plantings based on system capacity and spacing."
                        icon="hydroponic"
                        isSelected={formData.plantingFormat === 'Hydroponic'}
                        onClick={() => onInputChange('plantingFormat', 'Hydroponic')}
                    />

                    <PlantingFormatCard
                        title="Pots"
                        description="Individual container gardening for various plant sizes. Example: Ornamental plants, Herbs, Small vegetables, etc. Plantings based on pot count and size."
                        icon="pots"
                        isSelected={formData.plantingFormat === 'Pots'}
                        onClick={() => onInputChange('plantingFormat', 'Pots')}
                    />

                    <PlantingFormatCard
                        title="Tables or Benches"
                        description="Elevated surface cultivation for improved access and drainage. Example: Seedlings, Microgreens, Nursery plants, etc. Plantings based on table area."
                        icon="tables"
                        isSelected={formData.plantingFormat === 'Tables or Benches'}
                        onClick={() => onInputChange('plantingFormat', 'Tables or Benches')}
                    />

                    <PlantingFormatCard
                        title="Other"
                        description="Any alternative growing method. Example: Shelves, aquaponics, trays, etc. Plantings based on specified amount planted."
                        icon="other"
                        isSelected={formData.plantingFormat === 'Other'}
                        onClick={() => onInputChange('plantingFormat', 'Other')}
                    />
                </div>
            </div>

            {formData.plantingFormat === 'Planted in Beds' && (
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number Of Beds</label>
                        <input
                            type="number"
                            value={formData.numberOfBeds}
                            onChange={(e) => onInputChange('numberOfBeds', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bed Length</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.bedLength}
                                onChange={(e) => onInputChange('bedLength', parseInt(e.target.value) || 0)}
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
                                onChange={(e) => onInputChange('bedWidth', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                            <span className="absolute right-3 top-2 text-gray-500">Meters</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};