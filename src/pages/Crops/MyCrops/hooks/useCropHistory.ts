import { useState } from 'react';

export const useCropHistory = () => {
    const [chartData] = useState({
        locations: ['7,884', '7,882', '7,880', '7,878', '7,876', '7,874', '7,872', '7,870', '7,868', '7,866', '7,864'],
        plantingsByLocation: [
            { location: '7,884', plantings: 0 },
            { location: '7,882', plantings: 0 },
            { location: '7,880', plantings: 0 },
            { location: '7,878', plantings: 0 },
            { location: '7,876', plantings: 0 },
            { location: '7,874', plantings: 1 },
            { location: '7,872', plantings: 0 },
            { location: '7,870', plantings: 0 },
            { location: '7,868', plantings: 0 },
            { location: '7,866', plantings: 0 },
            { location: '7,864', plantings: 0 }
        ]
    });

    const [plantingHistory] = useState([
        {
            id: 1,
            variety: 'Tyyt',
            plantingCount: 3,
            firstPlanted: 'Sep. 23, 2025',
            lastHarvested: 'N/A',
            totalHarvested: '0 (11,811.0 Expected)',
            expanded: false
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
        plantingHistory,
        expandedItems,
        toggleExpanded
    };
};