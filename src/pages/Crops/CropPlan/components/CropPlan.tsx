import React, { useState } from 'react';
import { Plus, Printer } from 'lucide-react';
import { FilterBar } from './FilterBar';
import { CropPlanTable } from './CropPlanTable';
import { NewPlantingModal } from './NewPlantingModal';

export const CropPlan = () => {
    const [showNewPlantingModal, setShowNewPlantingModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [plantingData, setPlantingData] = useState({
        cropType: '',
        growLocation: '',
        plantingBed: '',
        numberOfPlantings: 0,
        startMethod: '',
        growthStage: '',
        plantingDate: '',
        plantSpacing: 0,
        rowSpacing: 0,
        plantedRowLength: 0,
        rows: 0,
        electronicId: '',
        currentlyPlanted: 0
    });
    const [dateRange, setDateRange] = useState({
        from: '',
        to: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const cropPlanData = [
        // {
        //     id: 1,
        //     crop: 'Tomatoes San Marzano',
        //     variety: '57w',
        //     planted: 160,
        //     unit: 'Approx 250 sq ft',
        //     location: 'Northwest Field A (CSA Shares)',
        //     beds: 'WS, GL, QS, SW',
        //     keyDates: {
        //         start: 'Jan 11, 2022',
        //         first: 'Feb 07, 2022',
        //         harvest: 'Jun 14, 2022 - Jun 22'
        //     },
        //     timeline: { jan: true, feb: true, mar: true, apr: true, may: true, jun: true }
        // },
        // {
        //     id: 2,
        //     crop: 'Tomatoes San Marzano',
        //     variety: '57w',
        //     planted: 120,
        //     unit: 'Approx 250 sq ft',
        //     location: 'Southwest Field C',
        //     beds: 'E6, QS, RN, DW',
        //     keyDates: {
        //         start: 'Jan 11, 2022',
        //         first: 'Feb 07, 2022',
        //         harvest: 'Jun 17, 2022 - Jun 19'
        //     },
        //     timeline: { feb: true, mar: true, apr: true, may: true }
        // },
        // {
        //     id: 3,
        //     crop: 'Tomatoes Roma',
        //     variety: 'Medium',
        //     planted: 40,
        //     unit: 'Approx 250 sq ft',
        //     location: 'Southwest Field A',
        //     beds: 'SW',
        //     keyDates: {
        //         start: 'Jan 07, 2021',
        //         first: 'Feb 15, 2022',
        //         harvest: 'Jun 17, 2022 - Jun 19'
        //     },
        //     timeline: { feb: true, mar: true, apr: true, may: true }
        // },
        // {
        //     id: 4,
        //     crop: 'Peppers (Hot) Thai Dragon',
        //     variety: '367ft',
        //     planted: 150,
        //     unit: 'Approx 244.67 sq ft',
        //     location: 'Northwest Field B',
        //     beds: 'QS',
        //     keyDates: {
        //         start: 'Dec 10, 2021',
        //         first: 'Jan 14, 2022',
        //         harvest: 'Jun 03, 2022 - Oct 08'
        //     },
        //     timeline: { aug: true, sep: true, oct: true }
        // },
        // {
        //     id: 5,
        //     crop: 'Peppers (Hot) Thai Dragon',
        //     variety: '367ft',
        //     planted: 150,
        //     unit: 'Approx 244.67 sq ft',
        //     location: 'Northwest Field B',
        //     beds: 'SW',
        //     keyDates: {
        //         start: 'Dec 10, 2021',
        //         first: 'Jan 14, 2022',
        //         harvest: 'Jun 03, 2022 - May 08'
        //     },
        //     timeline: { jan: true, feb: true, mar: true, apr: true, may: true, jun: true, jul: true }
        // },
        // {
        //     id: 6,
        //     crop: 'Peppers (Hot) Thai Dragon',
        //     variety: '367ft',
        //     planted: 150,
        //     unit: 'Approx 244.67 sq ft',
        //     location: 'Northwest Field A (CSA Shares)',
        //     beds: 'DW',
        //     keyDates: {
        //         start: 'Dec 30, 2020',
        //         first: 'Jan 17, 2022',
        //         harvest: 'Jun 17, 2022 - May 14'
        //     },
        //     timeline: { jun: true, jul: true, aug: true, sep: true }
        // },
        // {
        //     id: 7,
        //     crop: 'Peppers (Hot) Thai Dragon',
        //     variety: '367ft',
        //     planted: 900,
        //     unit: 'Approx 1,800.5 sq ft',
        //     location: 'Northwest Field A (CSA Shares)',
        //     beds: 'WS',
        //     keyDates: {
        //         start: 'Dec 10, 2022',
        //         first: 'Jan 17, 2022',
        //         harvest: 'Oct 03, 2022 - Oct 09'
        //     },
        //     timeline: { aug: true, sep: true, oct: true }
        // }
    ];

    const handlePrint = () => {
        window.print();
    };

    const handleAddPlanting = () => {
        setShowNewPlantingModal(true);
        setModalStep(1);
        setPlantingData({
            cropType: '',
            growLocation: '',
            plantingBed: '',
            numberOfPlantings: 0,
            startMethod: '',
            growthStage: '',
            plantingDate: '',
            plantSpacing: 0,
            rowSpacing: 0,
            plantedRowLength: 0,
            rows: 0,
            electronicId: '',
            currentlyPlanted: 0
        });
    };

    const handleCloseModal = () => {
        setShowNewPlantingModal(false);
        setModalStep(1);
    };

    const handleNextStep = () => {
        setModalStep(prev => prev + 1);
    };

    const handleNewCropType = () => {
        console.log('Add new crop type');
    };

    const handleNewGrowLocation = () => {
        console.log('Add new grow location');
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setDateRange({ from: '', to: '' });
    };

    const filteredData = cropPlanData.filter(item => {
        const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.variety.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (dateRange.from && dateRange.to) {
            const itemStartDate = new Date(item.keyDates.start);
            const fromDate = new Date(dateRange.from);
            const toDate = new Date(dateRange.to);

            return itemStartDate >= fromDate && itemStartDate <= toDate;
        }

        return true;
    });

    // Empty state component
    const EmptyCropPlanState = ({ onAddPlanting }) => (
        <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 text-center">No planting plans yet?</h3>
                <p className="text-gray-600 mb-4 sm:mb-5 text-center text-sm sm:text-base">Create your first planting plan to get started with crop management.</p>
                <button
                    onClick={onAddPlanting}
                    className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-green-700 transition-colors"
                >
                    Create Planting Plan
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Crop Plan</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleAddPlanting}
                            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                            <Plus size={16} />
                            <span>Add Planting</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="text-gray-500 hover:text-gray-700 p-2"
                        >
                            <Printer size={18} />
                        </button>
                    </div>
                </div>

                {filteredData.length > 0 && (
                    <FilterBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        onClearFilters={handleClearFilters}
                    />
                )}

                {filteredData.length > 0 ? (
                    <CropPlanTable data={filteredData} />
                ) : (
                    <EmptyCropPlanState onAddPlanting={handleAddPlanting} />
                )}
            </div>

            <NewPlantingModal
                show={showNewPlantingModal}
                onClose={handleCloseModal}
                step={modalStep}
                onNextStep={handleNextStep}
                plantingData={plantingData}
                onPlantingDataChange={setPlantingData}
                onNewCropType={handleNewCropType}
                onNewGrowLocation={handleNewGrowLocation}
            />
        </div>
    );
};