import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

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
}

interface HarvestRecord {
    id: number;
    date: string;
    harvested: string;
    yieldRate: string;
    harvestedFrom: string;
    estValue: string;
    addedToInventory: string;
    loss: string;
    enteredBy: string;
    traceNumber: string;
}

export const useHarvestData = (setShowModal: Dispatch<SetStateAction<boolean>>) => {
    const [harvestForm, setHarvestForm] = useState<HarvestForm>({
        dateHarvested: '23/09/2025',
        estimatedRevenue: '2,180.00',
        batchNumber: '1001',
        traceNumber: 'TRC-2025-09-23-001',
        note: 'Premium quality tomatoes harvested from greenhouse section B',
        harvestedFrom: 'Greenhouse B - Tomato Section',
        bed: 'Bed 12',
        gradeSize: 'Large',
        amountHarvested: '545.00'
    });

    const [harvestHistory] = useState<HarvestRecord[]>([
        {
            id: 1,
            date: 'Sep. 23, 2025',
            harvested: '545.00',
            yieldRate: '14%',
            harvestedFrom: 'Greenhouse B - Tomato Section',
            estValue: '$2,180.00',
            addedToInventory: 'Add to Inventory',
            loss: '',
            enteredBy: 'Farai',
            traceNumber: '545'
        }
    ]);

    const harvestChartData = [
        { location: '845', value: 7 },
        { location: '552', value: 0 },
        { location: '550', value: 8 },
        { location: '548', value: 0 },
        { location: '546', value: 0 },
        { location: '544', value: 1 },
        { location: '542', value: 0 },
        { location: '540', value: 0 },
        { location: '538', value: 0 },
        { location: '536', value: 0 }
    ];

    const weeklyYieldData = [
        { week: 'Q1', yield: 0 },
        { week: 'Q2', yield: 100 },
        { week: 'Q3', yield: 450 },
        { week: 'Q4', yield: 550 }
    ];

    const handleInputChange = (field: keyof HarvestForm, value: string) => {
        setHarvestForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveHarvest = () => {
        console.log('Saving harvest:', harvestForm);
        setShowModal(false);
        setHarvestForm({
            dateHarvested: '23/09/2025',
            estimatedRevenue: '0.00',
            batchNumber: '1001',
            traceNumber: '',
            note: '',
            harvestedFrom: 'Greenhouse B - Tomato Section',
            bed: '',
            gradeSize: '',
            amountHarvested: '0.00'
        });
    };

    const handleCancelHarvest = () => {
        setShowModal(false);
        setHarvestForm({
            dateHarvested: '23/09/2025',
            estimatedRevenue: '0.00',
            batchNumber: '1001',
            traceNumber: '',
            note: '',
            harvestedFrom: 'Greenhouse B - Tomato Section',
            bed: '',
            gradeSize: '',
            amountHarvested: '0.00'
        });
    };

    return {
        harvestForm,
        harvestHistory,
        harvestChartData,
        weeklyYieldData,
        handleInputChange,
        handleSaveHarvest,
        handleCancelHarvest
    };
};