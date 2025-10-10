import { useState } from 'react';
import { Planting, ChartData } from '../types/planting';

export const usePlantings = () => {
    const [plantings, setPlantings] = useState<Planting[]>([
        // {
        //     id: 1,
        //     location: 'Northwest Field A',
        //     totalPlanted: '266.67 sqft',
        //     plantedDate: 'Last Plant',
        //     harvestStatus: '222 of 1,200 Harvested',
        //     financialInfo: '$584.00 of $2,840.00 Planned',
        //     expectedDate: 'Expected Sep. 17, 2022',
        //     plantingDetails: '$364.00 of $1,840.00 Planned',
        //     progressPercentage: 85,
        //     expanded: false
        // },
        // {
        //     id: 2,
        //     location: 'Northwest Field B',
        //     totalPlanted: '266.67 sqft',
        //     plantedDate: 'Last Plant',
        //     harvestStatus: '',
        //     financialInfo: '',
        //     expectedDate: 'Expected Sep. 17, 2022',
        //     plantingDetails: '$800.00 Planned',
        //     progressPercentage: 65,
        //     expanded: false
        // },
        // {
        //     id: 3,
        //     location: 'Northwest Field C',
        //     totalPlanted: '266.67 sqft',
        //     plantedDate: 'Last Plant',
        //     harvestStatus: '',
        //     financialInfo: '',
        //     expectedDate: 'Expected Sep. 20, 2022',
        //     plantingDetails: '$ of 400 Harvested\n$800.00 Planned',
        //     progressPercentage: 45,
        //     expanded: false
        // }
    ]);

    const expectedPoundsData: ChartData[] = [
        { date: 'Feb 18, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Mar 04, 2022', northwest: 310, northwestB: 0, northwestC: 0 },
        { date: 'Mar 18, 2022', northwest: 0, northwestB: 320, northwestC: 0 },
        { date: 'Apr 01, 2022', northwest: 0, northwestB: 0, northwestC: 410 },
        { date: 'Apr 15, 2022', northwest: 0, northwestB: 470, northwestC: 0 },
        { date: 'Apr 29, 2022', northwest: 510, northwestB: 0, northwestC: 0 },
        { date: 'May 13, 2022', northwest: 0, northwestB: 580, northwestC: 0 },
        { date: 'May 27, 2022', northwest: 640, northwestB: 0, northwestC: 0 },
        { date: 'Jun 10, 2022', northwest: 0, northwestB: 620, northwestC: 0 },
        { date: 'Jun 24, 2022', northwest: 0, northwestB: 0, northwestC: 680 },
        { date: 'Jul 08, 2022', northwest: 0, northwestB: 0, northwestC: 740 },
        { date: 'Jul 22, 2022', northwest: 820, northwestB: 0, northwestC: 0 },
        { date: 'Aug 05, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Aug 19, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 02, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 16, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 30, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Oct 14, 2022', northwest: 0, northwestB: 0, northwestC: 0 }
    ];

    const togglePlantingExpanded = (id: number) => {
        setPlantings(plantings.map(p =>
            p.id === id ? { ...p, expanded: !p.expanded } : p
        ));
    };

    return {
        plantings,
        expectedPoundsData,
        togglePlantingExpanded
    };
};