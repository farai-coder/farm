import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface GrowLocationData {
  name: string;
  internalId: string;
  electronicId: string;
  locationType: string;
  plantingFormat: string;
  numberOfBeds: number;
  bedLength: number;
  bedWidth: number;
  areaSize: string;
  estimatedLandValue: number;
  status: string;
  lightProfile: string;
  grazingRestDays: number;
  description: string;
  containerCount?: number;
  tableCount?: number;
  containerSize?: string;
}

interface NewGrowLocationModalProps {
  show: boolean;
  onClose: () => void;
  growLocationData: GrowLocationData;
  onGrowLocationDataChange: (data: GrowLocationData) => void;
}

const PlantingFormatCard: React.FC<{
  title: string;
  description: string;
  icon:
    | 'beds'
    | 'cover'
    | 'row'
    | 'hydroponic'
    | 'pots'
    | 'tables'
    | 'vertical'
    | 'other';
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, description, icon, isSelected, onClick }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'beds':
        return (
          <div className="w-6 h-6 bg-green-600 rounded mr-3 flex items-center justify-center">
            <div className="space-y-0.5">
              <div className="w-4 h-0.5 bg-white"></div>
              <div className="w-4 h-0.5 bg-white"></div>
              <div className="w-4 h-0.5 bg-white"></div>
            </div>
          </div>
        );
      case 'cover':
        return (
          <div className="w-6 h-6 bg-lime-600 rounded mr-3 flex items-center justify-center">
            <div className="w-4 h-4 bg-lime-400 rounded-sm"></div>
          </div>
        );
      case 'row':
        return (
          <div className="w-6 h-6 bg-yellow-600 rounded mr-3 flex items-center justify-center">
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-4 h-0.5 bg-white"></div>
              ))}
            </div>
          </div>
        );
      case 'hydroponic':
        return (
          <div className="w-6 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center">
            <div className="space-y-0.5">
              <div className="w-3 h-1 bg-white rounded"></div>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'pots':
        return (
          <div className="w-6 h-6 mr-3 flex items-center justify-center">
            <div className="relative flex space-x-0.5">
              <div className="w-2 h-2 bg-gray-700 rounded-b-sm border-t-2 border-gray-500"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-b-sm border-t-2 border-gray-500"></div>
            </div>
          </div>
        );
      case 'tables':
        return (
          <div className="w-6 h-6 bg-gray-700 rounded mr-3 flex items-center justify-center">
            <div className="space-y-0.5">
              <div className="w-4 h-1 bg-white rounded"></div>
              <div className="flex justify-between">
                <div className="w-0.5 h-2 bg-white rounded"></div>
                <div className="w-0.5 h-2 bg-white rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'vertical':
        return (
          <div className="w-6 h-6 bg-indigo-600 rounded mr-3 flex items-center justify-center">
            <div className="space-y-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-3 h-0.5 bg-white rounded-sm"
                ></div>
              ))}
            </div>
          </div>
        );
      case 'other':
        return (
          <div className="w-6 h-6 bg-purple-600 rounded mr-3 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
          </div>
        );
    }
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        {renderIcon()}
        <span className="font-medium text-sm">{title}</span>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
};

export const NewGrowLocationModal: React.FC<NewGrowLocationModalProps> = ({
  show,
  onClose,
  growLocationData,
  onGrowLocationDataChange
}) => {
  const [showLocationTypeDropdown, setShowLocationTypeDropdown] = useState(false);

  if (!show) return null;

  const handleInputChange = (field: keyof GrowLocationData, value: any) => {
    onGrowLocationDataChange({
      ...growLocationData,
      [field]: value
    });
  };

  const handlePlantingFormatSelect = (format: string) => {
    handleInputChange('plantingFormat', format);
  };

  const handleLocationTypeSelect = (type: string) => {
    handleInputChange('locationType', type);
    setShowLocationTypeDropdown(false);
  };

  const locationTypes = [
    'Greenhouse',
    'Field',
    'Indoor Facility',
    'High Tunnel',
    'Cold Frame',
    'Container Yard',
    'Vertical Farm',
    'Aquaponics Facility'
  ];

  const plantingFormats = [
    {
      title: 'Planted in Beds',
      description:
        "Distinct number of beds for diverse crops. Often 100' length. Example: Carrots, Tomatoes, Spinach, etc.",
      icon: 'beds' as const
    },
    {
      title: 'Cover Crop',
      description:
        'Complete crop coverage or grazing location. Example: Alfalfa, Hay, Rye, Oats, Pasture, etc.',
      icon: 'cover' as const
    },
    {
      title: 'Row Crop',
      description:
        'One crop planted in rows wide enough for machinery. Example: Corn, Soybeans, Hemp, Potatoes, etc.',
      icon: 'row' as const
    },
    {
      title: 'Hydroponics',
      description:
        'Soilless growing with nutrient solutions. Example: NFT systems, DWC, Aeroponics, etc.',
      icon: 'hydroponic' as const
    },
    {
      title: 'Pots',
      description:
        'Individual container growing. Example: Nursery pots, fabric pots, containers of various sizes.',
      icon: 'pots' as const
    },
    {
      title: 'Tables or Benches',
      description:
        'Elevated growing surfaces. Example: Bench systems, tray tables, elevated beds.',
      icon: 'tables' as const
    },
    {
      title: 'Vertical Farming',
      description:
        'Multi-level indoor growing. Example: Vertical racks, tower gardens, wall systems.',
      icon: 'vertical' as const
    },
    {
      title: 'Other',
      description:
        'Any alternative growing method. Example: Shelves, aquaponics, trays, etc.',
      icon: 'other' as const
    }
  ];

  const showBedFields = growLocationData.plantingFormat === 'Planted in Beds';
  const showContainerFields =
    growLocationData.plantingFormat === 'Pots' ||
    growLocationData.plantingFormat === 'Hydroponics';
  const showTableFields =
    growLocationData.plantingFormat === 'Tables or Benches';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            New Grow Location
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Example: Northwest Field"
                value={growLocationData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Electronic Id
              </label>
              <input
                type="text"
                value={growLocationData.electronicId}
                onChange={(e) => handleInputChange('electronicId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Location Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Type
              </label>
              <button
                type="button"
                onClick={() =>
                  setShowLocationTypeDropdown(!showLocationTypeDropdown)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 text-left flex items-center justify-between"
              >
                <span
                  className={
                    growLocationData.locationType
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }
                >
                  {growLocationData.locationType || 'Select location type'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showLocationTypeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <div className="py-1">
                    {locationTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleLocationTypeSelect(type)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={growLocationData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
          </div>

          {/* Planting Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Planting Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {plantingFormats.map((format) => (
                <PlantingFormatCard
                  key={format.title}
                  title={format.title}
                  description={format.description}
                  icon={format.icon}
                  isSelected={growLocationData.plantingFormat === format.title}
                  onClick={() => handlePlantingFormatSelect(format.title)}
                />
              ))}
            </div>
          </div>

          {/* Conditional Fields */}
          {showBedFields && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-base font-medium text-gray-800 mb-4">
                Bed Configuration
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number Of Beds
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={growLocationData.numberOfBeds}
                    onChange={(e) =>
                      handleInputChange('numberOfBeds', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Length (m)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={growLocationData.bedLength}
                    onChange={(e) =>
                      handleInputChange('bedLength', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Width (m)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={growLocationData.bedWidth}
                    onChange={(e) =>
                      handleInputChange('bedWidth', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Save Grow Location
          </button>
        </div>
      </div>
    </div>
  );
};
