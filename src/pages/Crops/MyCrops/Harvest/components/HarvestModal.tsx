import React from 'react';
import { X, Search } from 'lucide-react';

// Import the JSON file directly
import cropData from '../../../crop_varieties.json'; // Adjust the path as needed

interface HarvestForm {
    dateHarvested: string;
    estimatedRevenue: string;
    batchNumber: string;
    traceNumber: string;
    note: string;
    harvestedFrom: string;
    bed: string;
    gradeSize: string;
    amountHarvested: string;
    locationType: string;
    unitCount?: string;
}

interface HarvestModalProps {
    harvestForm: HarvestForm;
    onInputChange: (field: keyof HarvestForm, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onClose: () => void;
}

export const HarvestModal: React.FC<HarvestModalProps> = ({
    harvestForm,
    onInputChange,
    onSave,
    onCancel,
    onClose
}) => {
    // For demo purposes, using the first tomato variety
    const selectedCrop = cropData.tomatoes[0]; // Roma tomato

    // State for dropdown search functionality
    const [harvestedFromSearch, setHarvestedFromSearch] = React.useState('');
    const [locationSearch, setLocationSearch] = React.useState('');
    const [showHarvestedFromDropdown, setShowHarvestedFromDropdown] = React.useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);

    // Sample data for dropdown options
    const fieldOptions = [
        'Field A - North Section',
        'Field A - South Section',
        'Field B - East Wing',
        'Field B - West Wing',
        'Field C - Upper Terrace',
        'Field C - Lower Terrace',
        'Greenhouse 1',
        'Greenhouse 2',
        'Outdoor Plot 1',
        'Outdoor Plot 2'
    ];

    // Organized by location type
    const locationOptions = {
        beds: [
            'Bed 1 - Raised (Tomatoes)',
            'Bed 2 - Raised (Lettuce)',
            'Bed 3 - Ground (Carrots)',
            'Bed 4 - Ground (Peppers)',
            'Bed 5 - Raised (Herbs)'
        ],
        pots: [
            'Pots - Small (Seedlings)',
            'Pots - Medium (Herbs)',
            'Pots - Large (Tomatoes)',
            'Pots - Extra Large (Citrus)'
        ],
        hydroponics: [
            'Hydroponics - NFT System 1',
            'Hydroponics - NFT System 2',
            'Hydroponics - DWC System',
            'Hydroponics - Aeroponics'
        ],
        tables: [
            'Table 1 - Seedling Station',
            'Table 2 - Propagation',
            'Table 3 - Microgreens'
        ],
        other: [
            'Vertical Farm Module A',
            'Vertical Farm Module B',
            'Container Farm 1',
            'Grow Bags - Potato'
        ]
    };

    // Determine location type based on selection
    const getLocationType = (location: string): string => {
        if (location.includes('Bed')) return 'beds';
        if (location.includes('Pot')) return 'pots';
        if (location.includes('Hydroponics')) return 'hydroponics';
        if (location.includes('Table')) return 'tables';
        return 'other';
    };

    // Check if location type requires unit count
    const requiresUnitCount = (locationType: string): boolean => {
        return ['pots', 'hydroponics', 'tables'].includes(locationType);
    };

    // Get all location options for search
    const allLocationOptions = [
        ...locationOptions.beds,
        ...locationOptions.pots,
        ...locationOptions.hydroponics,
        ...locationOptions.tables,
        ...locationOptions.other
    ];

    // Filter options based on search
    const filteredFieldOptions = fieldOptions.filter(option =>
        option.toLowerCase().includes(harvestedFromSearch.toLowerCase())
    );

    const filteredLocationOptions = allLocationOptions.filter(option =>
        option.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const handleHarvestedFromSelect = (value: string) => {
        onInputChange('harvestedFrom', value);
        setShowHarvestedFromDropdown(false);
        setHarvestedFromSearch('');
    };

    const handleLocationSelect = (value: string) => {
        const locationType = getLocationType(value);
        onInputChange('bed', value);
        onInputChange('locationType', locationType);
        setShowLocationDropdown(false);
        setLocationSearch('');
    };

    // Auto-detect location type when bed changes
    React.useEffect(() => {
        if (harvestForm.bed) {
            const detectedType = getLocationType(harvestForm.bed);
            onInputChange('locationType', detectedType);
        }
    }, [harvestForm.bed]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-4 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Modal Header */}
                <div className="text-white px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                            <div className="bg-gray-200 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                                {selectedCrop.icon}
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-gray-600 sm:text-xl font-semibold truncate">{selectedCrop.name}</h1>
                                <p className="text-gray-600 sm:text-sm opacity-90 truncate">{selectedCrop.variety}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Record Harvest</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Date Harvested</label>
                            <input
                                type="date"
                                value="2025-09-23"
                                onChange={(e) => onInputChange('dateHarvested', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Estimated Revenue Per</label>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 text-sm">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.estimatedRevenue}
                                    onChange={(e) => onInputChange('estimatedRevenue', e.target.value)}
                                    className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                                <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">per</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                            <input
                                type="text"
                                value={harvestForm.batchNumber}
                                onChange={(e) => onInputChange('batchNumber', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Trace Number</label>
                            <input
                                type="text"
                                value={harvestForm.traceNumber}
                                onChange={(e) => onInputChange('traceNumber', e.target.value)}
                                placeholder="Leave blank to auto generate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Note</label>
                        <textarea
                            value={harvestForm.note}
                            onChange={(e) => onInputChange('note', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            placeholder="Enter harvest notes..."
                        />
                    </div>

                    {/* Harvest Details Table */}
                    <div className="mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {/* Harvested From with Searchable Dropdown */}
                            <div className="relative">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Harvested From</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={harvestForm.harvestedFrom}
                                        onChange={(e) => onInputChange('harvestedFrom', e.target.value)}
                                        onFocus={() => setShowHarvestedFromDropdown(true)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm pr-10"
                                        placeholder="Select or search field..."
                                    />
                                    <Search
                                        size={16}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                        onClick={() => setShowHarvestedFromDropdown(!showHarvestedFromDropdown)}
                                    />
                                </div>

                                {showHarvestedFromDropdown && (
                                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        <div className="p-2 border-b border-gray-200">
                                            <input
                                                type="text"
                                                value={harvestedFromSearch}
                                                onChange={(e) => setHarvestedFromSearch(e.target.value)}
                                                placeholder="Search fields..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="py-1">
                                            {filteredFieldOptions.length > 0 ? (
                                                filteredFieldOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                        onClick={() => handleHarvestedFromSelect(option)}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-gray-500 text-sm">No fields found</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Growing Location with Searchable Dropdown */}
                            <div className="relative">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Growing Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={harvestForm.bed}
                                        onChange={(e) => onInputChange('bed', e.target.value)}
                                        onFocus={() => setShowLocationDropdown(true)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm pr-10"
                                        placeholder="Select bed, pot, system..."
                                    />
                                    <Search
                                        size={16}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                    />
                                </div>

                                {showLocationDropdown && (
                                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        <div className="p-2 border-b border-gray-200">
                                            <input
                                                type="text"
                                                value={locationSearch}
                                                onChange={(e) => setLocationSearch(e.target.value)}
                                                placeholder="Search locations..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="py-1">
                                            {filteredLocationOptions.length > 0 ? (
                                                filteredLocationOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-l-4"
                                                        style={{
                                                            borderLeftColor: getLocationType(option) === 'beds' ? '#10B981' :
                                                                getLocationType(option) === 'pots' ? '#F59E0B' :
                                                                    getLocationType(option) === 'hydroponics' ? '#3B82F6' :
                                                                        getLocationType(option) === 'tables' ? '#8B5CF6' : '#6B7280'
                                                        }}
                                                        onClick={() => handleLocationSelect(option)}
                                                    >
                                                        <div className="font-medium">{option}</div>
                                                        <div className="text-xs text-gray-500 capitalize">
                                                            {getLocationType(option)} • {
                                                                requiresUnitCount(getLocationType(option))
                                                                    ? 'Enter unit count'
                                                                    : 'No unit count needed'
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-gray-500 text-sm">No locations found</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Unit Count - Conditionally shown */}
                            {requiresUnitCount(harvestForm.locationType) && (
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        {harvestForm.locationType === 'pots' ? 'Number of Pots' :
                                            harvestForm.locationType === 'hydroponics' ? 'Number of Systems' :
                                                harvestForm.locationType === 'tables' ? 'Number of Tables' : 'Unit Count'}
                                    </label>
                                    <input
                                        type="number"
                                        value={harvestForm.unitCount || ''}
                                        onChange={(e) => onInputChange('unitCount', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                        placeholder={`Enter number of ${harvestForm.locationType}...`}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Grade/Size</label>
                                <input
                                    type="text"
                                    value={harvestForm.gradeSize}
                                    onChange={(e) => onInputChange('gradeSize', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Amount Harvested</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={harvestForm.amountHarvested}
                                    onChange={(e) => onInputChange('amountHarvested', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-right text-sm sm:text-lg font-semibold text-gray-800 mb-4">
                        Harvest Total: 0.00
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                        <button
                            onClick={onCancel}
                            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};