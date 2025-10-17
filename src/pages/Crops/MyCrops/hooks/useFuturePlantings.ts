import { useState } from 'react';

export const useFuturePlantings = () => {
    const [chartData] = useState({
        locations: ['7,884', '7,882', '7,880', '7,878', '7,876', '7,874', '7,872', '7,870', '7,868', '7,866', '7,864'],
        plantingsByLocation: [
            { location: '7,884', plantings: 0 },
            { location: '7,882', plantings: 1 },
            { location: '7,880', plantings: 0 },
            { location: '7,878', plantings: 1 },
            { location: '7,876', plantings: 0 },
            { location: '7,874', plantings: 0 },
            { location: '7,872', plantings: 1 },
            { location: '7,870', plantings: 0 },
            { location: '7,868', plantings: 1 },
            { location: '7,866', plantings: 0 },
            { location: '7,864', plantings: 0 }
        ]
    });

    const [futurePlantings] = useState([
        {
            id: 1,
            variety: 'Tyyt',
            plantingCount: 4,
            startPlantingDate: 'Oct. 15, 2025',
            expectedHarvestDate: 'Jan. 22, 2026',
            totalPlanned: '15,600 Plants (12.5 sqm)',
            expanded: false,
            plantings: [
                {
                    location: 'Northwest Field A',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Oct. 15, 2025',
                    expectedHarvest: 'Jan. 22, 2026'
                },
                {
                    location: 'Northwest Field B',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Oct. 20, 2025',
                    expectedHarvest: 'Jan. 27, 2026'
                },
                {
                    location: 'Southwest Field C',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Oct. 25, 2025',
                    expectedHarvest: 'Feb. 01, 2026'
                },
                {
                    location: 'East Field D',
                    amount: '3,900 Plants (3.1 sqm)',
                    startDate: 'Nov. 01, 2025',
                    expectedHarvest: 'Feb. 08, 2026'
                }
            ]
        },
        {
            id: 2,
            variety: 'Pepper Variety 2',
            plantingCount: 2,
            startPlantingDate: 'Nov. 10, 2025',
            expectedHarvestDate: 'Feb. 15, 2026',
            totalPlanned: '8,000 Plants (6.4 sqm)',
            expanded: false,
            plantings: [
                {
                    location: 'Greenhouse A',
                    amount: '4,000 Plants (3.2 sqm)',
                    startDate: 'Nov. 10, 2025',
                    expectedHarvest: 'Feb. 15, 2026'
                },
                {
                    location: 'Greenhouse B',
                    amount: '4,000 Plants (3.2 sqm)',
                    startDate: 'Nov. 15, 2025',
                    expectedHarvest: 'Feb. 20, 2026'
                }
            ]
        }
    ]);

    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

    const toggleExpanded = (id: number) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return {
        chartData,
        futurePlantings,
        expandedItems,
        toggleExpanded
    };
};