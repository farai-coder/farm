import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, FileEdit, Trash, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GrowLocationNutrients = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState('all');

    const [showNutrientsModal, setShowNutrientsModal] = useState(false);
    const [showSampleModal, setShowSampleModal] = useState(false);

    const [nutrientsFormData, setNutrientsFormData] = useState({
        productApplied: '',
        dateApplied: '27/09/2025',
        amountApplied: '',
        applicationMethod: '',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        magnesium: '',
        sulfur: '',
        calcium: '',
        boron: '',
        copper: '',
        iron: '',
        zinc: '',
        manganese: '',
        description: ''
    });

    const [sampleFormData, setSampleFormData] = useState({
        dateSampled: '27/09/2025',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        magnesium: '',
        sulfur: '',
        calcium: '',
        boron: '',
        copper: '',
        iron: '',
        zinc: '',
        manganese: '',
        phLevel: '',
        description: ''
    });

    // Sample data for the charts
    const nutrientData = [
        { date: '2021-06-15', nitrogen: 298, phosphorus: 145, potassium: 189, calcium: 62, sulfur: 51, boron: 68, magnesium: 25, iron: 45, pH: 6.5 },
        { date: '2021-07-01', nitrogen: 310, phosphorus: 130, potassium: 160, calcium: 55, sulfur: 45, boron: 63, magnesium: 12, iron: 35, pH: 6.0 },
        { date: '2021-07-15', nitrogen: 326, phosphorus: 152, potassium: 155, calcium: 68, sulfur: 72, boron: 80, magnesium: 27, iron: 42, pH: 6.7 },
        { date: '2021-08-01', nitrogen: 298, phosphorus: 126, potassium: 151, calcium: 58, sulfur: 62, boron: 81, magnesium: 22, iron: 36, pH: 7.1 },
        { date: '2021-08-15', nitrogen: 257, phosphorus: 126, potassium: 151, calcium: 58, sulfur: 62, boron: 81, magnesium: 22, iron: 36, pH: 7.1 },
        { date: '2021-09-01', nitrogen: 310, phosphorus: 130, potassium: 160, calcium: 55, sulfur: 45, boron: 63, magnesium: 12, iron: 35, pH: 6.0 },
    ];

    // Sample nutrient records data
    const nutrientRecords = [
        {
            id: 1,
            date: 'Sep. 17, 2021',
            action: 'Sampled',
            nitrogen: 298,
            phosphorus: 145,
            potassium: 189,
            magnesium: 62,
            sulfur: 51,
            calcium: 68,
            boron: 25,
            copper: 45,
            pH: 6.5,
            enteredBy: 'Chris'
        },
        {
            id: 2,
            date: 'Sep. 15, 2021',
            action: 'Fox Farm Beastie Bloom added +1250mg',
            nitrogen: 1,
            phosphorus: 10,
            potassium: 70,
            magnesium: 2,
            sulfur: 3,
            calcium: 6,
            boron: 8,
            copper: 4,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 3,
            date: 'Sep. 01, 2021',
            action: 'Fox Farm Big Bloom added +.5',
            nitrogen: 2,
            phosphorus: 5,
            potassium: 3,
            magnesium: 1,
            sulfur: 0,
            calcium: 4,
            boron: 3,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 4,
            date: 'Sep. 01, 2021',
            action: 'Sampled',
            nitrogen: 310,
            phosphorus: 130,
            potassium: 160,
            magnesium: 55,
            sulfur: 45,
            calcium: 63,
            boron: 12,
            copper: 35,
            pH: 6.0,
            enteredBy: 'Chris'
        },
        {
            id: 5,
            date: 'Aug. 18, 2021',
            action: 'Sampled',
            nitrogen: 326,
            phosphorus: 152,
            potassium: 155,
            magnesium: 68,
            sulfur: 72,
            calcium: 80,
            boron: 27,
            copper: 42,
            pH: 6.7,
            enteredBy: 'Chris'
        },
        {
            id: 6,
            date: 'Aug. 16, 2021',
            action: 'Growzilla added +.5',
            nitrogen: 4,
            phosphorus: 6,
            potassium: 10,
            magnesium: 1,
            sulfur: 1,
            calcium: 2,
            boron: 3,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 7,
            date: 'Aug. 04, 2021',
            action: 'NitroGro added +1gal',
            nitrogen: 7,
            phosphorus: 2,
            potassium: 4,
            magnesium: 2,
            sulfur: 2,
            calcium: 3,
            boron: 4,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 8,
            date: 'Jul. 24, 2021',
            action: 'Sampled',
            nitrogen: 257,
            phosphorus: 126,
            potassium: 151,
            magnesium: 58,
            sulfur: 62,
            calcium: 81,
            boron: 22,
            copper: 36,
            pH: 7.1,
            enteredBy: 'Chris'
        },
        {
            id: 9,
            date: 'Jul. 21, 2021',
            action: 'Fox Farm Big Bloom added +.5 L',
            nitrogen: 2,
            phosphorus: 5,
            potassium: 3,
            magnesium: 1,
            sulfur: 0,
            calcium: 4,
            boron: 3,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 10,
            date: 'Jul. 07, 2021',
            action: 'Fox Farm Grow Big added +.25 L',
            nitrogen: 5,
            phosphorus: 3,
            potassium: 6,
            magnesium: 3,
            sulfur: 2,
            calcium: 0,
            boron: 1,
            copper: 0,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 11,
            date: 'Jun. 15, 2021',
            action: 'No Bull Manure Treatment added +600Kg',
            nitrogen: null,
            phosphorus: null,
            potassium: null,
            magnesium: null,
            sulfur: null,
            calcium: null,
            boron: null,
            copper: null,
            pH: null,
            enteredBy: 'Chris'
        }
    ];

    const chartColors = {
        nitrogen: '#2563eb', // blue
        phosphorus: '#dc2626', // red
        potassium: '#16a34a', // green
        calcium: '#ea580c', // orange
        sulfur: '#7c3aed', // purple
        boron: '#0891b2', // cyan
        magnesium: '#be185d', // pink
        iron: '#059669', // emerald
        pH: '#1f2937' // gray
    };

    const handleNutrientsInputChange = (field, value) => {
        setNutrientsFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSampleInputChange = (field, value) => {
        setSampleFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNutrientsSubmit = () => {
        console.log('Nutrients submitted:', nutrientsFormData);
        setShowNutrientsModal(false);
    };

    const handleSampleSubmit = () => {
        console.log('Sample submitted:', sampleFormData);
        setShowSampleModal(false);
    };

    const handleNutrientsCancel = () => {
        setShowNutrientsModal(false);
        setNutrientsFormData({
            productApplied: '',
            dateApplied: '27/09/2025',
            amountApplied: '',
            applicationMethod: '',
            nitrogen: '',
            phosphorus: '',
            potassium: '',
            magnesium: '',
            sulfur: '',
            calcium: '',
            boron: '',
            copper: '',
            iron: '',
            zinc: '',
            manganese: '',
            description: ''
        });
    };

    const handleSampleCancel = () => {
        setShowSampleModal(false);
        setSampleFormData({
            dateSampled: '27/09/2025',
            nitrogen: '',
            phosphorus: '',
            potassium: '',
            magnesium: '',
            sulfur: '',
            calcium: '',
            boron: '',
            copper: '',
            iron: '',
            zinc: '',
            manganese: '',
            phLevel: '',
            description: ''
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const renderChart = (title: string, dataKeys: string[], color: string) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                <div className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded">
                    N-P-K MEASUREMENTS
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={nutrientData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    {dataKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={Array.isArray(color) ? color[index] : color}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const EmptyTreatmentState = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                    <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">No treatment data yet?</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md">
                        Record your first nutrient application or soil sample to start tracking your field's health.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowNutrientsModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                        >
                            Add Nutrients
                        </button>
                        <button
                            onClick={() => setShowSampleModal(true)}
                            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors"
                        >
                            Record Sample
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => navigate('/crops/grow-locations')}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors self-start"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Grow Locations
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            2.5 Acre
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">
                                Active
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => setShowNutrientsModal(true)}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex-1 sm:flex-none text-center"
                    >
                        Add Nutrients
                    </button>
                    <button
                        onClick={() => setShowSampleModal(true)}
                        className="border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex-1 sm:flex-none text-center"
                    >
                        Record Sample
                    </button>
                    <div className="flex gap-1">
                        <button
                            onClick={handlePrint}
                            className="text-gray-500 hover:text-gray-700 p-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <i className="fas fa-th"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {renderChart(
                    'N-P-K MEASUREMENTS',
                    ['nitrogen', 'phosphorus', 'potassium'],
                    chartColors.nitrogen
                )}
                {renderChart(
                    'OTHER NUTRIENTS SAMPLE',
                    ['calcium', 'sulfur', 'boron', 'magnesium'],
                    chartColors.calcium
                )}
                {renderChart(
                    'PH MEASUREMENTS',
                    ['pH'],
                    chartColors.pH
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-yellow-100">
                            <tr>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Action
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    N
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    P
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    K
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Mg
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    S
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Ca
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    B
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Cu
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    PH
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Entered By
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {nutrientRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-gray-900 max-w-xs truncate">
                                        {record.action.includes('Sampled') ? (
                                            <span className="text-blue-600 cursor-pointer hover:underline">
                                                {record.action} ▲
                                            </span>
                                        ) : (
                                            record.action
                                        )}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.nitrogen || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.phosphorus || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.potassium || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.magnesium || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.sulfur || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.calcium || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.boron || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.copper || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.pH || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                                        {record.enteredBy}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-1 sm:space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                <FileEdit size={14} className="sm:w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 transition-colors">
                                                <Trash size={14} className="sm:w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty Treatment State - Uncomment to show when no data exists */}
            {nutrientRecords.length === 0 || nutrientData.length === 0 ? (
                <EmptyTreatmentState />
            ) : (
                // Your existing content when both have records
                <div>
                </div>
            )}

            {/* New Nutrients Modal */}
            {showNutrientsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">New Nutrients</h2>
                            <button
                                onClick={handleNutrientsCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} className="sm:w-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Applied
                                </label>
                                <input
                                    type="text"
                                    value={nutrientsFormData.productApplied}
                                    onChange={(e) => handleNutrientsInputChange('productApplied', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date Applied
                                </label>
                                <input
                                    type="date"
                                    value={nutrientsFormData.dateApplied}
                                    onChange={(e) => handleNutrientsInputChange('dateApplied', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount Applied
                                </label>
                                <input
                                    type="text"
                                    value={nutrientsFormData.amountApplied}
                                    onChange={(e) => handleNutrientsInputChange('amountApplied', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Application Method
                                </label>
                                <select
                                    value={nutrientsFormData.applicationMethod}
                                    onChange={(e) => handleNutrientsInputChange('applicationMethod', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select method</option>
                                    <option value="Spray">Spray</option>
                                    <option value="Drench">Drench</option>
                                    <option value="Broadcast">Broadcast</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Nutrients Applied</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nitrogen (N)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.nitrogen}
                                        onChange={(e) => handleNutrientsInputChange('nitrogen', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phosphorus (P)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.phosphorus}
                                        onChange={(e) => handleNutrientsInputChange('phosphorus', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Potassium (K)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.potassium}
                                        onChange={(e) => handleNutrientsInputChange('potassium', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Magnesium (Mg)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.magnesium}
                                        onChange={(e) => handleNutrientsInputChange('magnesium', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sulfur (S)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.sulfur}
                                        onChange={(e) => handleNutrientsInputChange('sulfur', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Calcium (Ca)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.calcium}
                                        onChange={(e) => handleNutrientsInputChange('calcium', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Boron (B)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.boron}
                                        onChange={(e) => handleNutrientsInputChange('boron', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Copper (Cu)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.copper}
                                        onChange={(e) => handleNutrientsInputChange('copper', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Iron (Fe)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.iron}
                                        onChange={(e) => handleNutrientsInputChange('iron', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Zinc (Zn)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.zinc}
                                        onChange={(e) => handleNutrientsInputChange('zinc', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Manganese (Mn)
                                    </label>
                                    <input
                                        type="number"
                                        value={nutrientsFormData.manganese}
                                        onChange={(e) => handleNutrientsInputChange('manganese', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description / Note
                            </label>
                            <textarea
                                value={nutrientsFormData.description}
                                onChange={(e) => handleNutrientsInputChange('description', e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={handleNutrientsCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleNutrientsSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors order-1 sm:order-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Sample Modal */}
            {showSampleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">New Sample</h2>
                            <button
                                onClick={handleSampleCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} className="sm:w-6" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Sampled
                            </label>
                            <input
                                type="date"
                                value={sampleFormData.dateSampled}
                                onChange={(e) => handleSampleInputChange('dateSampled', e.target.value)}
                                className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Sample Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nitrogen (N)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.nitrogen}
                                            onChange={(e) => handleSampleInputChange('nitrogen', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phosphorus (P)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.phosphorus}
                                            onChange={(e) => handleSampleInputChange('phosphorus', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Potassium (K)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.potassium}
                                            onChange={(e) => handleSampleInputChange('potassium', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Magnesium (Mg)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.magnesium}
                                            onChange={(e) => handleSampleInputChange('magnesium', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sulfur (S)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.sulfur}
                                            onChange={(e) => handleSampleInputChange('sulfur', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Calcium (Ca)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.calcium}
                                            onChange={(e) => handleSampleInputChange('calcium', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Boron (B)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.boron}
                                            onChange={(e) => handleSampleInputChange('boron', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Copper (Cu)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.copper}
                                            onChange={(e) => handleSampleInputChange('copper', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Iron (Fe)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.iron}
                                            onChange={(e) => handleSampleInputChange('iron', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Zinc (Zn)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.zinc}
                                            onChange={(e) => handleSampleInputChange('zinc', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Manganese (Mn)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={sampleFormData.manganese}
                                            onChange={(e) => handleSampleInputChange('manganese', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ph Level
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={sampleFormData.phLevel}
                                        onChange={(e) => handleSampleInputChange('phLevel', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description / Note
                            </label>
                            <textarea
                                value={sampleFormData.description}
                                onChange={(e) => handleSampleInputChange('description', e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={handleSampleCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSampleSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors order-1 sm:order-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};