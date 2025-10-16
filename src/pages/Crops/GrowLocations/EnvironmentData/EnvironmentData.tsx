import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileEdit, Trash, X } from 'lucide-react';

export const GrowLocationSensors = () => {
    const [selectedView, setSelectedView] = useState('all');
    const [showSensorModal, setShowSensorModal] = useState(false);
    const [showManualReadingModal, setShowManualReadingModal] = useState(false);

    const [sensorFormData, setSensorFormData] = useState({
        sensorName: '',
        sensorType: '',
        location: '',
        installationDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        calibrationDate: '',
        description: ''
    });

    const [manualReadingFormData, setManualReadingFormData] = useState({
        dateRecorded: new Date().toISOString().split('T')[0],
        temperature: '',
        humidity: '',
        soilMoisture: '',
        lightIntensity: '',
        co2: '',
        oxygen: '',
        description: ''
    });

    // Sample data for the charts
    const sensorData = [
        { date: '2021-06-15', temperature: 25.4, humidity: 65, soilMoisture: 42, lightIntensity: 850, co2: 420, oxygen: 20.9 },
        { date: '2021-07-01', temperature: 26.8, humidity: 68, soilMoisture: 38, lightIntensity: 920, co2: 435, oxygen: 20.8 },
        { date: '2021-07-15', temperature: 24.2, humidity: 72, soilMoisture: 45, lightIntensity: 780, co2: 410, oxygen: 20.9 },
        { date: '2021-08-01', temperature: 27.5, humidity: 61, soilMoisture: 35, lightIntensity: 1100, co2: 450, oxygen: 20.7 },
        { date: '2021-08-15', temperature: 23.8, humidity: 75, soilMoisture: 48, lightIntensity: 650, co2: 395, oxygen: 21.0 },
        { date: '2021-09-01', temperature: 26.1, humidity: 63, soilMoisture: 40, lightIntensity: 950, co2: 425, oxygen: 20.8 },
    ];

    // Sample sensor records data
    const sensorRecords = [
        {
            id: 1,
            date: 'Sep. 17, 2021',
            action: 'Auto Reading',
            temperature: 25.4,
            humidity: 65,
            soilMoisture: 42,
            lightIntensity: 850,
            co2: 420,
            oxygen: 20.9,
            sensor: 'Climate Sensor #1',
            status: 'Normal'
        },
        {
            id: 2,
            date: 'Sep. 15, 2021',
            action: 'Manual Reading',
            temperature: 26.8,
            humidity: 68,
            soilMoisture: 38,
            lightIntensity: 920,
            co2: 435,
            oxygen: 20.8,
            sensor: 'Manual Entry',
            status: 'Normal'
        },
        {
            id: 3,
            date: 'Sep. 01, 2021',
            action: 'Auto Reading',
            temperature: 24.2,
            humidity: 72,
            soilMoisture: 45,
            lightIntensity: 780,
            co2: 410,
            oxygen: 20.9,
            sensor: 'Climate Sensor #1',
            status: 'High Humidity'
        },
        {
            id: 4,
            date: 'Aug. 18, 2021',
            action: 'Auto Reading',
            temperature: 27.5,
            humidity: 61,
            soilMoisture: 35,
            lightIntensity: 1100,
            co2: 450,
            oxygen: 20.7,
            sensor: 'Climate Sensor #1',
            status: 'High Temp'
        },
        {
            id: 5,
            date: 'Aug. 16, 2021',
            action: 'Auto Reading',
            temperature: 23.8,
            humidity: 75,
            soilMoisture: 48,
            lightIntensity: 650,
            co2: 395,
            oxygen: 21.0,
            sensor: 'Climate Sensor #1',
            status: 'Low Light'
        },
        {
            id: 6,
            date: 'Aug. 04, 2021',
            action: 'Manual Reading',
            temperature: 26.1,
            humidity: 63,
            soilMoisture: 40,
            lightIntensity: 950,
            co2: 425,
            oxygen: 20.8,
            sensor: 'Manual Entry',
            status: 'Normal'
        },
        {
            id: 7,
            date: 'Jul. 24, 2021',
            action: 'Auto Reading',
            temperature: 22.5,
            humidity: 78,
            soilMoisture: 52,
            lightIntensity: 580,
            co2: 380,
            oxygen: 21.1,
            sensor: 'Climate Sensor #1',
            status: 'High Moisture'
        },
        {
            id: 8,
            date: 'Jul. 21, 2021',
            action: 'Sensor Calibration',
            temperature: null,
            humidity: null,
            soilMoisture: null,
            lightIntensity: null,
            co2: null,
            oxygen: null,
            sensor: 'Climate Sensor #1',
            status: 'Calibrated'
        },
        {
            id: 9,
            date: 'Jul. 07, 2021',
            action: 'Auto Reading',
            temperature: 28.2,
            humidity: 58,
            soilMoisture: 32,
            lightIntensity: 1200,
            co2: 460,
            oxygen: 20.6,
            sensor: 'Climate Sensor #1',
            status: 'High CO2'
        }
    ];

    const chartColors = {
        temperature: '#dc2626', // red
        humidity: '#2563eb', // blue
        soilMoisture: '#16a34a', // green
        lightIntensity: '#eab308', // yellow
        co2: '#7c3aed', // purple
        oxygen: '#0891b2' // cyan
    };

    const handleSensorInputChange = (field, value) => {
        setSensorFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleManualReadingInputChange = (field, value) => {
        setManualReadingFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSensorSubmit = () => {
        console.log('Sensor submitted:', sensorFormData);
        setShowSensorModal(false);
    };

    const handleManualReadingSubmit = () => {
        console.log('Manual reading submitted:', manualReadingFormData);
        setShowManualReadingModal(false);
    };

    const handleSensorCancel = () => {
        setShowSensorModal(false);
        setSensorFormData({
            sensorName: '',
            sensorType: '',
            location: '',
            installationDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            calibrationDate: '',
            description: ''
        });
    };

    const handleManualReadingCancel = () => {
        setShowManualReadingModal(false);
        setManualReadingFormData({
            dateRecorded: new Date().toISOString().split('T')[0],
            temperature: '',
            humidity: '',
            soilMoisture: '',
            lightIntensity: '',
            co2: '',
            oxygen: '',
            description: ''
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const renderChart = (title: string, dataKeys: string[], colors: string[]) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                <div className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
                    ENVIRONMENTAL DATA
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={sensorData}>
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
                            stroke={colors[index]}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Normal': return 'bg-green-100 text-green-800';
            case 'High Humidity': return 'bg-yellow-100 text-yellow-800';
            case 'High Temp': return 'bg-red-100 text-red-800';
            case 'Low Light': return 'bg-yellow-100 text-yellow-800';
            case 'High Moisture': return 'bg-yellow-100 text-yellow-800';
            case 'High CO2': return 'bg-orange-100 text-orange-800';
            case 'Calibrated': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        2.5 Acre
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">
                            Active
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => setShowSensorModal(true)}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex-1 sm:flex-none text-center"
                    >
                        Add Sensor
                    </button>
                    <button
                        onClick={() => setShowManualReadingModal(true)}
                        className="border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex-1 sm:flex-none text-center"
                    >
                        Manual Reading
                    </button>
                    <div className="flex gap-1">
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <i className="fas fa-th"></i>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="text-gray-500 hover:text-gray-700 p-2"
                        >
                            <i className="fas fa-print"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty Environment Data State */}
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                        <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                            <div className="w-8 h-8 bg-green-600 rounded"></div>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">No environment data found</h3>
                        <p className="text-gray-600 mb-6 text-center max-w-md">
                            Add your first sensor to start monitoring environmental conditions in your field.
                        </p>
                        <button
                            onClick={() => setShowSensorModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                        >
                            Add Sensor
                        </button>
                    </div>
                </div>
            </div> */}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {renderChart(
                    'CLIMATE SENSORS',
                    ['temperature', 'humidity'],
                    [chartColors.temperature, chartColors.humidity]
                )}
                {renderChart(
                    'SOIL & LIGHT',
                    ['soilMoisture', 'lightIntensity'],
                    [chartColors.soilMoisture, chartColors.lightIntensity]
                )}
                {renderChart(
                    'AIR QUALITY',
                    ['co2', 'oxygen'],
                    [chartColors.co2, chartColors.oxygen]
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Action
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Temp (°C)
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Humidity (%)
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Soil (%)
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Light (lux)
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    CO2 (ppm)
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    O₂ (%)
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Sensor
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sensorRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-gray-900 max-w-xs truncate">
                                        {record.action}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.temperature || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.humidity || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.soilMoisture || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.lightIntensity || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.co2 || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.oxygen || '-'}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                                        {record.sensor}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                                            {record.status}
                                        </span>
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

            {/* Add Sensor Modal */}
            {showSensorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Sensor</h2>
                            <button
                                onClick={handleSensorCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} className="sm:w-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sensor Name
                                </label>
                                <input
                                    type="text"
                                    value={sensorFormData.sensorName}
                                    onChange={(e) => handleSensorInputChange('sensorName', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., Climate Sensor #1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sensor Type
                                </label>
                                <select
                                    value={sensorFormData.sensorType}
                                    onChange={(e) => handleSensorInputChange('sensorType', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select type</option>
                                    <option value="Climate">Climate Sensor</option>
                                    <option value="Soil">Soil Sensor</option>
                                    <option value="Light">Light Sensor</option>
                                    <option value="CO2">CO2 Sensor</option>
                                    <option value="Multi-Parameter">Multi-Parameter</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={sensorFormData.location}
                                    onChange={(e) => handleSensorInputChange('location', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., Northwest Corner"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Installation Date
                                </label>
                                <input
                                    type="date"
                                    value={sensorFormData.installationDate}
                                    onChange={(e) => handleSensorInputChange('installationDate', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={sensorFormData.status}
                                    onChange={(e) => handleSensorInputChange('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Calibration
                                </label>
                                <input
                                    type="date"
                                    value={sensorFormData.calibrationDate}
                                    onChange={(e) => handleSensorInputChange('calibrationDate', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description / Notes
                            </label>
                            <textarea
                                value={sensorFormData.description}
                                onChange={(e) => handleSensorInputChange('description', e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Additional details about the sensor..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={handleSensorCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSensorSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors order-1 sm:order-2"
                            >
                                Add Sensor
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manual Reading Modal */}
            {showManualReadingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Manual Environmental Reading</h2>
                            <button
                                onClick={handleManualReadingCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} className="sm:w-6" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Recorded
                            </label>
                            <input
                                type="date"
                                value={manualReadingFormData.dateRecorded}
                                onChange={(e) => handleManualReadingInputChange('dateRecorded', e.target.value)}
                                className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Environmental Readings</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Temperature (°C)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={manualReadingFormData.temperature}
                                            onChange={(e) => handleManualReadingInputChange('temperature', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">°C</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Humidity (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={manualReadingFormData.humidity}
                                            onChange={(e) => handleManualReadingInputChange('humidity', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Soil Moisture (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={manualReadingFormData.soilMoisture}
                                            onChange={(e) => handleManualReadingInputChange('soilMoisture', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Light Intensity (lux)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={manualReadingFormData.lightIntensity}
                                            onChange={(e) => handleManualReadingInputChange('lightIntensity', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">lux</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CO2 Level (ppm)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={manualReadingFormData.co2}
                                            onChange={(e) => handleManualReadingInputChange('co2', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">ppm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Oxygen Level (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={manualReadingFormData.oxygen}
                                            onChange={(e) => handleManualReadingInputChange('oxygen', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description / Notes
                            </label>
                            <textarea
                                value={manualReadingFormData.description}
                                onChange={(e) => handleManualReadingInputChange('description', e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Additional observations or notes..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={handleManualReadingCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleManualReadingSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors order-1 sm:order-2"
                            >
                                Save Reading
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};