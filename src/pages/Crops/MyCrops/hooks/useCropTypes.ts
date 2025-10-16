
import { useState, useEffect } from 'react';

interface Crop {
    id: number;
    type: string;
    variety: string;
    botanicalName: string;
    internalId: string;
    startBeforeLastFrost: number;
    daysToEmerge: number;
    plantSpacing: number;
    rowSpacing: number;
    plantingDepth: string;
    averageHeight: string;
    startMethod: string;
    lightProfile: string;
    soilConditions: string;
    plantingDetails: string;
    pruningDetails: string;
    isPerennial: boolean;
    autoCreateTasks: boolean;
    daysToFlower: number;
    daysToMaturity: number;
    harvestWindow: number;
    estimatedLossRate: number;
    harvestUnits: string;
    estimatedRevenue: number;
    expectedYieldPer30: string;
    expectedYieldPerHectare: string;
}

interface CropData {
    type: string;
    variety: string;
    botanicalName: string;
    internalId: string;
    startBeforeLastFrost: number;
    daysToEmerge: number;
    plantSpacing: number;
    rowSpacing: number;
    plantingDepth: string;
    averageHeight: string;
    startMethod: string;
    lightProfile: string;
    soilConditions: string;
    plantingDetails: string;
    pruningDetails: string;
    isPerennial: boolean;
    autoCreateTasks: boolean;
    daysToFlower: number;
    daysToMaturity: number;
    harvestWindow: number;
    estimatedLossRate: number;
    harvestUnits: string;
    estimatedRevenue: number;
    expectedYieldPer30: string;
    expectedYieldPerHectare: string;
}

export const useCropTypes = () => {
    const [cropTypes, setCropTypes] = useState<Crop[]>([]);
    const [filteredCropTypes, setFilteredCropTypes] = useState<Crop[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const farm_id = 1; // This should come from your auth context or props

    // Fetch crop types from API
    const fetchCropTypes = async () => {
        try {
            const response = await fetch(`http://localhost:8000/v1/resources/crops?farm_id=${farm_id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Transform API data to match our frontend structure
                const transformedData = data.map((crop: any) => ({
                    id: crop.id,
                    type: crop.crop_type,
                    variety: crop.variety_name,
                    botanicalName: crop.botanical_name,
                    internalId: crop.id, // Using the API id as internalId
                    daysToMaturity: crop.days_to_maturity,
                    expectedYieldPerHectare: crop.expected_yield_unit,
                    // Add default values for other required fields
                    startBeforeLastFrost: 0,
                    daysToEmerge: 0,
                    plantSpacing: 0,
                    rowSpacing: 0,
                    plantingDepth: '',
                    averageHeight: '',
                    startMethod: '',
                    lightProfile: '',
                    soilConditions: '',
                    plantingDetails: '',
                    pruningDetails: '',
                    isPerennial: false,
                    autoCreateTasks: true,
                    daysToFlower: 0,
                    harvestWindow: 0,
                    estimatedLossRate: 0,
                    harvestUnits: 'quantity',
                    estimatedRevenue: 0,
                    expectedYieldPer30: ''
                }));
                setCropTypes(transformedData);
                setFilteredCropTypes(transformedData);
            } else {
                console.error('Failed to fetch crop types');
                // Fallback to sample data if API fails
                const sampleData = [
                    {
                        id: 1,
                        type: 'Tomato',
                        variety: 'Cherry',
                        botanicalName: 'Solanum lycopersicum',
                        internalId: 'TOM-CHERRY-001',
                        startBeforeLastFrost: 6,
                        daysToEmerge: 7,
                        plantSpacing: 45,
                        rowSpacing: 90,
                        plantingDepth: '0.6',
                        averageHeight: '150',
                        startMethod: 'transplant',
                        lightProfile: 'full-sun',
                        soilConditions: 'well-drained',
                        plantingDetails: 'Start indoors 6 weeks before last frost',
                        pruningDetails: 'Remove suckers for better fruit production',
                        isPerennial: false,
                        autoCreateTasks: true,
                        daysToFlower: 60,
                        daysToMaturity: 75,
                        harvestWindow: 30,
                        estimatedLossRate: 5,
                        harvestUnits: 'quantity',
                        estimatedRevenue: 4.50,
                        expectedYieldPer30: '200-300 fruits',
                        expectedYieldPerHectare: '15,000-20,000 kg'
                    },
                    {
                        id: 2,
                        type: 'Lettuce',
                        variety: 'Romaine',
                        botanicalName: 'Lactuca sativa',
                        internalId: 'LET-ROMAINE-001',
                        startBeforeLastFrost: 2,
                        daysToEmerge: 5,
                        plantSpacing: 30,
                        rowSpacing: 45,
                        plantingDepth: '0.3',
                        averageHeight: '25',
                        startMethod: 'direct',
                        lightProfile: 'partial-shade',
                        soilConditions: 'moist',
                        plantingDetails: 'Can be direct seeded or transplanted',
                        pruningDetails: 'Harvest outer leaves for continuous production',
                        isPerennial: false,
                        autoCreateTasks: true,
                        daysToFlower: 0,
                        daysToMaturity: 55,
                        harvestWindow: 21,
                        estimatedLossRate: 8,
                        harvestUnits: 'quantity',
                        estimatedRevenue: 2.75,
                        expectedYieldPer30: '40-50 heads',
                        expectedYieldPerHectare: '12,000-15,000 heads'
                    },
                    {
                        id: 3,
                        type: 'Lettuce',
                        variety: 'Romaine',
                        botanicalName: 'Lactuca sativa',
                        internalId: 'LET-ROMAINE-001',
                        startBeforeLastFrost: 2,
                        daysToEmerge: 5,
                        plantSpacing: 30,
                        rowSpacing: 45,
                        plantingDepth: '0.3',
                        averageHeight: '25',
                        startMethod: 'direct',
                        lightProfile: 'partial-shade',
                        soilConditions: 'moist',
                        plantingDetails: 'Can be direct seeded or transplanted',
                        pruningDetails: 'Harvest outer leaves for continuous production',
                        isPerennial: false,
                        autoCreateTasks: true,
                        daysToFlower: 0,
                        daysToMaturity: 55,
                        harvestWindow: 21,
                        estimatedLossRate: 8,
                        harvestUnits: 'quantity',
                        estimatedRevenue: 2.75,
                        expectedYieldPer30: '40-50 heads',
                        expectedYieldPerHectare: '12,000-15,000 heads'
                    },
                    {
                        id: 4,
                        type: 'Maize',
                        variety: 'Sweet Corn',
                        botanicalName: 'Zea mays saccharata',
                        internalId: 'MAI-SWEET-001',
                        startBeforeLastFrost: 0,
                        daysToEmerge: 7,
                        plantSpacing: 25,
                        rowSpacing: 75,
                        plantingDepth: '2.5',
                        averageHeight: '250',
                        startMethod: 'direct',
                        lightProfile: 'full-sun',
                        soilConditions: 'loamy and well-drained',
                        plantingDetails: 'Plant directly outdoors once soil temperature reaches 10°C or higher',
                        pruningDetails: 'Not required; remove weak plants after emergence if overcrowded',
                        isPerennial: false,
                        autoCreateTasks: true,
                        daysToFlower: 60,
                        daysToMaturity: 95,
                        harvestWindow: 20,
                        estimatedLossRate: 10,
                        harvestUnits: 'cobs',
                        estimatedRevenue: 1.20,
                        expectedYieldPer30: '60-80 cobs',
                        expectedYieldPerHectare: '6,000-8,000 kg'
                    }
                ];
                setCropTypes(sampleData);
                setFilteredCropTypes(sampleData);
            }
        } catch (error) {
            console.error('Error fetching crop types:', error);
            // Fallback to sample data if API fails
            const sampleData = [
                {
                    id: 1,
                    type: 'Tomato',
                    variety: 'Cherry',
                    botanicalName: 'Solanum lycopersicum',
                    internalId: 'TOM-CHERRY-001',
                    startBeforeLastFrost: 6,
                    daysToEmerge: 7,
                    plantSpacing: 45,
                    rowSpacing: 90,
                    plantingDepth: '0.6',
                    averageHeight: '150',
                    startMethod: 'transplant',
                    lightProfile: 'full-sun',
                    soilConditions: 'well-drained',
                    plantingDetails: 'Start indoors 6 weeks before last frost',
                    pruningDetails: 'Remove suckers for better fruit production',
                    isPerennial: false,
                    autoCreateTasks: true,
                    daysToFlower: 60,
                    daysToMaturity: 75,
                    harvestWindow: 30,
                    estimatedLossRate: 5,
                    harvestUnits: 'quantity',
                    estimatedRevenue: 4.50,
                    expectedYieldPer30: '200-300 fruits',
                    expectedYieldPerHectare: '15,000-20,000 kg'
                },
                {
                    id: 2,
                    type: 'Lettuce',
                    variety: 'Romaine',
                    botanicalName: 'Lactuca sativa',
                    internalId: 'LET-ROMAINE-001',
                    startBeforeLastFrost: 2,
                    daysToEmerge: 5,
                    plantSpacing: 30,
                    rowSpacing: 45,
                    plantingDepth: '0.3',
                    averageHeight: '25',
                    startMethod: 'direct',
                    lightProfile: 'partial-shade',
                    soilConditions: 'moist',
                    plantingDetails: 'Can be direct seeded or transplanted',
                    pruningDetails: 'Harvest outer leaves for continuous production',
                    isPerennial: false,
                    autoCreateTasks: true,
                    daysToFlower: 0,
                    daysToMaturity: 55,
                    harvestWindow: 21,
                    estimatedLossRate: 8,
                    harvestUnits: 'quantity',
                    estimatedRevenue: 2.75,
                    expectedYieldPer30: '40-50 heads',
                    expectedYieldPerHectare: '12,000-15,000 heads'
                },
                    {
                    id: 3,
                    type: 'Maize',
                    variety: 'Sweet Corn',
                    botanicalName: 'Zea mays saccharata',
                    internalId: 'MAI-SWEET-001',
                    startBeforeLastFrost: 0,
                    daysToEmerge: 7,
                    plantSpacing: 25,
                    rowSpacing: 75,
                    plantingDepth: '2.5',
                    averageHeight: '250',
                    startMethod: 'direct',
                    lightProfile: 'full-sun',
                    soilConditions: 'loamy and well-drained',
                    plantingDetails: 'Plant directly outdoors once soil temperature reaches 10°C or higher',
                    pruningDetails: 'Not required; remove weak plants after emergence if overcrowded',
                    isPerennial: false,
                    autoCreateTasks: true,
                    daysToFlower: 60,
                    daysToMaturity: 95,
                    harvestWindow: 20,
                    estimatedLossRate: 10,
                    harvestUnits: 'cobs',
                    estimatedRevenue: 1.20,
                    expectedYieldPer30: '60-80 cobs',
                    expectedYieldPerHectare: '6,000-8,000 kg'
                },
                {
                    id: 4,
                    type: 'Potato',
                    variety: 'Russet',
                    botanicalName: 'Solanum tuberosum',
                    internalId: 'POT-RUSSET-001',
                    startBeforeLastFrost: 4,
                    daysToEmerge: 14,
                    plantSpacing: 30,
                    rowSpacing: 75,
                    plantingDepth: '8.0',
                    averageHeight: '60',
                    startMethod: 'direct',
                    lightProfile: 'full-sun',
                    soilConditions: 'loose, well-drained, slightly acidic',
                    plantingDetails: 'Plant seed potatoes 10cm deep after last frost',
                    pruningDetails: 'Hill up soil around stems as plants grow',
                    isPerennial: false,
                    autoCreateTasks: true,
                    daysToFlower: 50,
                    daysToMaturity: 110,
                    harvestWindow: 30,
                    estimatedLossRate: 10,
                    harvestUnits: 'kg',
                    estimatedRevenue: 1.90,
                    expectedYieldPer30: '10-15 kg',
                    expectedYieldPerHectare: '25,000-35,000 kg'
                }
            ];
            setCropTypes(sampleData);
            setFilteredCropTypes(sampleData);
        }
    };

    // Create crop type using API
    const createCropType = async (cropData: CropData) => {
        try {
            const response = await fetch('http://localhost:8000/v1/resources/crops', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    crop_type: cropData.type,
                    variety_name: cropData.variety,
                    botanical_name: cropData.botanicalName,
                    days_to_maturity: cropData.daysToMaturity,
                    expected_yield_unit: cropData.expectedYieldPerHectare,
                    farm_id: farm_id
                }),
            });

            if (response.ok) {
                const newCrop = await response.json();
                // Transform the API response to match our frontend structure
                const transformedCrop: Crop = {
                    id: newCrop.id,
                    type: newCrop.crop_type,
                    variety: newCrop.variety_name,
                    botanicalName: newCrop.botanical_name,
                    internalId: newCrop.id,
                    daysToMaturity: newCrop.days_to_maturity,
                    expectedYieldPerHectare: newCrop.expected_yield_unit,
                    // Include all the other fields from cropData
                    ...cropData
                };
                setCropTypes(prev => [...prev, transformedCrop]);
                return transformedCrop;
            } else {
                console.error('Failed to create crop type');
                // Fallback to local state
                const newCrop: Crop = {
                    ...cropData,
                    id: Date.now()
                };
                setCropTypes(prev => [...prev, newCrop]);
                return newCrop;
            }
        } catch (error) {
            console.error('Error creating crop type:', error);
            // Fallback to local state
            const newCrop: Crop = {
                ...cropData,
                id: Date.now()
            };
            setCropTypes(prev => [...prev, newCrop]);
            return newCrop;
        }
    };

    // Filter crop types based on search term
    const filterCropTypes = (search: string) => {
        if (!search) {
            setFilteredCropTypes(cropTypes);
            return;
        }

        const filtered = cropTypes.filter(crop =>
            crop.type.toLowerCase().includes(search.toLowerCase()) ||
            crop.variety.toLowerCase().includes(search.toLowerCase()) ||
            crop.botanicalName.toLowerCase().includes(search.toLowerCase()) ||
            crop.internalId.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCropTypes(filtered);
    };

    // Apply filter when search term changes
    useEffect(() => {
        filterCropTypes(searchTerm);
    }, [searchTerm, cropTypes]);

    return {
        cropTypes,
        filteredCropTypes,
        searchTerm,
        setSearchTerm,
        fetchCropTypes,
        createCropType
    };
};