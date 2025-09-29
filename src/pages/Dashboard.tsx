import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Calendar, CheckCircle, Circle, DollarSign, TrendingUp, MapPin, Wheat, Sprout } from 'lucide-react';

export const Dashboard = () => {
    const [selectedDay, setSelectedDay] = useState(2); // Tuesday selected

    // Mock weather data
    const currentWeather = {
        temp: 91,
        condition: 'Few Clouds',
        feelsLike: 96,
        tempHigh: 92,
        tempLow: 68,
        windSpeed: 7,
        humidity: 21,
        skycover: 20,
        precipChance: 0
    };

    const hourlyForecast = [
        { time: '2PM', temp: 92, icon: Sun },
        { time: '3PM', temp: 92, icon: Sun },
        { time: '4PM', temp: 92, icon: Sun },
        { time: '5PM', temp: 91, icon: Sun },
        { time: '6PM', temp: 86, icon: Sun },
        { time: '7PM', temp: 80, icon: Sun }
    ];

    const dailyForecast = [
        { day: 'Today', high: 92, low: 68, icon: Sun },
        { day: 'Wed', high: 92, low: 70, icon: Sun },
        { day: 'Thu', high: 92, low: 72, icon: Sun },
        { day: 'Fri', high: 91, low: 74, icon: Sun },
        { day: 'Sat', high: 86, low: 76, icon: CloudRain },
        { day: 'Sun', high: 80, low: 78, icon: CloudRain }
    ];

    // Mock tasks data
    const todaysTasks = [
        {
            id: 1,
            task: "Plant Basil - Brazilian in Carrot bed field",
            time: "8:00 AM",
            dueDate: "Today (01/21/23)",
            completed: true
        },
        {
            id: 2,
            task: "Start seeds for Basil - Brazilian from Carrot bed field",
            time: "9:00 AM",
            dueDate: "Today (01/21/23)",
            completed: false
        }
    ];

    // Mock income data for chart
    const incomeData = [
        { month: 'Jan', income: 12000, expenses: 8000 },
        { month: 'Feb', income: 15000, expenses: 9000 },
        { month: 'Mar', income: 18000, expenses: 11000 },
        { month: 'Apr', income: 22000, expenses: 13000 },
        { month: 'May', income: 25000, expenses: 15000 },
        { month: 'Jun', income: 28000, expenses: 16000 }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">

                {/* Weather Section */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Weather for Lancaster</h2>
                        </div>

                        {/* Current Temperature */}
                        <div className="flex items-center mb-6">
                            <div className="text-6xl font-light text-gray-800 mr-4">{currentWeather.temp}°</div>
                            <div className="text-orange-500">
                                <Sun size={48} />
                            </div>
                        </div>

                        {/* Current Conditions */}
                        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                            <div>
                                <div className="text-gray-600">Few Clouds</div>
                                <div className="text-gray-600">Hi {currentWeather.tempHigh}° Lo {currentWeather.tempLow}°</div>
                                <div className="text-gray-600">Feels like {currentWeather.feelsLike}°</div>
                            </div>
                            <div>
                                <div className="text-gray-600">Wind {currentWeather.windSpeed} mph</div>
                                <div className="text-gray-600">Sky Cover: {currentWeather.skycover}%</div>
                                <div className="text-gray-600">Humidity: {currentWeather.humidity}%</div>
                                <div className="text-gray-600">Precip Chance: {currentWeather.precipChance}%</div>
                            </div>
                        </div>

                        {/* Hourly and Daily Toggle */}
                        <div className="flex border-b border-gray-200 mb-4">
                            <button className="px-3 py-2 text-sm font-medium text-gray-800 border-b-2 border-green-600">Hourly</button>
                            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Daily</button>
                        </div>

                        {/* Hourly Forecast */}
                        <div className="flex justify-between items-center">
                            {hourlyForecast.map((hour, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-xs text-gray-600 mb-1">{hour.time}</div>
                                    <div className="text-yellow-500 mb-1">
                                        <hour.icon size={16} />
                                    </div>
                                    <div className="text-sm font-medium">{hour.temp}°</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full">
                        <div className="relative h-80 bg-blue-50 rounded-lg overflow-hidden">
                            {/* Map placeholder with basic styling */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                                {/* Simulated roads */}
                                <div className="absolute top-20 left-0 w-full h-1 bg-gray-400"></div>
                                <div className="absolute top-40 left-0 w-full h-1 bg-gray-400"></div>
                                <div className="absolute left-32 top-0 w-1 h-full bg-gray-400"></div>
                                <div className="absolute left-64 top-0 w-1 h-full bg-gray-400"></div>

                                {/* Farm locations */}
                                <div className="absolute top-24 left-36 w-3 h-3 bg-green-600 rounded-full"></div>
                                <div className="absolute top-32 left-48 w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="absolute top-44 left-40 w-3 h-3 bg-yellow-600 rounded-full"></div>
                            </div>

                            {/* Map Legend */}
                            <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-lg text-xs">
                                <div className="font-semibold mb-2">Legend</div>
                                <div className="flex items-center mb-1">
                                    <div className="w-3 h-3 bg-gray-400 mr-2"></div>
                                    <span>CRM Standard</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <div className="w-3 h-3 bg-blue-600 mr-2"></div>
                                    <span>Precipitation</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <div className="w-3 h-3 bg-green-600 mr-2"></div>
                                    <span>Field</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <div className="w-3 h-3 bg-gray-600 mr-2"></div>
                                    <span>Previous</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-600 mr-2"></div>
                                    <span>None</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Tasks */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Today's Tasks</h3>
                        <div className="space-y-4">
                            {todaysTasks.map((task) => (
                                <div key={task.id} className="flex items-start space-x-3">
                                    <div className="mt-1">
                                        {task.completed ? (
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                            {task.task}
                                        </p>
                                        <p className="text-xs text-gray-500">{task.time}</p>
                                        <p className="text-xs text-gray-400">{task.dueDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Income vs Expenses Chart */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Income vs Expenses</h3>
                        <div className="h-48 flex items-end justify-between space-x-1">
                            {incomeData.map((data, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div className="flex flex-col justify-end h-32 w-full space-y-1">
                                        <div
                                            className="bg-green-500 rounded-t"
                                            style={{ height: `${(data.income / 30000) * 100}%` }}
                                        ></div>
                                        <div
                                            className="bg-orange-400 rounded-t"
                                            style={{ height: `${(data.expenses / 30000) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">{data.month}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center mt-4 space-x-4 text-xs">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                                <span className="text-gray-600">Income</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-400 rounded mr-1"></div>
                                <span className="text-gray-600">Expenses</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fields Planted */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Fields Planted</h3>

                        {/* Pie Chart Representation */}
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative w-32 h-32">
                                {/* Simple pie chart using CSS */}
                                <div className="w-full h-full rounded-full" style={{
                                    background: `conic-gradient(
                    #3B82F6 0deg 129.6deg,
                    #F59E0B 129.6deg 259.2deg,
                    #10B981 259.2deg 360deg
                  )`
                                }}>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                                        <Wheat className="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                    <span className="text-sm text-gray-700">Winter (36.0%)</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span className="text-sm text-gray-700">Pesticide (36.0%)</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span className="text-sm text-gray-700">Summer (28.0%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
