import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';

export const GrowLocationCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2022, 4, 29)); // May 29, 2022
    const [viewMode, setViewMode] = useState('Week');

    // Sample calendar events matching the image
    const events = [
        {
            id: 1,
            title: 'Prep CSA Share Boxes, Load Harvest Boulder and Golden',
            date: '2022-05-29',
            time: '8am',
            color: 'bg-green-400',
            height: 'h-16'
        },
        {
            id: 2,
            title: 'Identify Joe Stopping by for Treatment Sprayer',
            date: '2022-05-30',
            time: '10am',
            color: 'bg-green-400',
            height: 'h-20'
        },
        {
            id: 3,
            title: 'Prep CSA Share Boxes, Load Harvest Boulder and Golden',
            date: '2022-05-31',
            time: '9am',
            color: 'bg-yellow-400',
            height: 'h-16'
        },
        {
            id: 4,
            title: 'BOG Progress Report',
            date: '2022-05-31',
            time: '9am',
            color: 'bg-pink-400',
            height: 'h-12'
        },
        {
            id: 5,
            title: 'Prep CSA Share Boxes, Load Harvest Boulder and Golden',
            date: '2022-06-01',
            time: '8am',
            color: 'bg-yellow-400',
            height: 'h-16'
        },
        {
            id: 6,
            title: 'Prep CSA Share Boxes, Load Harvest Boulder and Golden',
            date: '2022-06-02',
            time: '8am',
            color: 'bg-yellow-400',
            height: 'h-16'
        },
        {
            id: 7,
            title: 'Plan Building, Wait For Possible Rain, Lunch at Denver Pepper Kitchen',
            date: '2022-06-03',
            time: '7am',
            color: 'bg-purple-400',
            height: 'h-32'
        }
    ];

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = ['all-day', '7am', '8am', '9am', '10am', '11am', '12pm'];

    // Get the week dates
    const getWeekDates = () => {
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - day);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            weekDates.push(date);
        }
        return weekDates;
    };

    const formatDate = (date) => {
        return date.getDate();
    };

    const formatDateKey = (date) => {
        return date.toISOString().split('T')[0];
    };

    const getEventsForDate = (dateKey) => {
        return events.filter(event => event.date === dateKey);
    };

    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction * 7));
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date(2022, 4, 29)); // May 29, 2022 to match the image
    };

    const weekDates = getWeekDates();
    const startDate = weekDates[0];
    const endDate = weekDates[6];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                        <p className="text-sm text-gray-600">2.5 Acre <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">Active</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                            <Grid3X3 size={16} />
                        </button>
                    </div>
                </div>

                {/* Calendar Controls */}
                <div className="flex items-center justify-between mb-6">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Plus size={16} />
                        <span>New Event</span>
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => navigateWeek(-1)}
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => navigateWeek(1)}
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                <ChevronRight size={16} />
                            </button>
                            <button
                                onClick={goToToday}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                            >
                                Today
                            </button>
                        </div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            May 29 — Jun 4 2022
                        </h2>

                        <div className="flex items-center space-x-1">
                            {['Month', 'Week', 'Day'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-3 py-1 text-sm rounded-md ${viewMode === mode
                                            ? 'bg-gray-200 text-gray-800'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-4 bg-gray-50 border-r border-gray-200"></div>
                        {weekDates.map((date, index) => (
                            <div key={index} className="p-4 bg-gray-50 text-center border-r border-gray-200 last:border-r-0">
                                <div className="text-sm font-medium text-gray-600">
                                    {weekdays[index]} {formatDate(date)}/{date.getMonth() + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Time Slots */}
                    {timeSlots.map((timeSlot, timeIndex) => (
                        <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
                            <div className="p-4 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 font-medium">
                                {timeSlot}
                            </div>
                            {weekDates.map((date, dayIndex) => {
                                const dateKey = formatDateKey(date);
                                const dayEvents = getEventsForDate(dateKey).filter(event =>
                                    event.time === timeSlot || (timeSlot === 'all-day' && !timeSlots.slice(1).includes(event.time))
                                );

                                return (
                                    <div key={dayIndex} className="relative p-2 border-r border-gray-200 last:border-r-0 min-h-16">
                                        {dayEvents.map((event, eventIndex) => (
                                            <div
                                                key={event.id}
                                                className={`${event.color} text-white text-xs p-2 rounded mb-1 ${event.height} overflow-hidden cursor-pointer hover:opacity-90 transition-opacity`}
                                            >
                                                <div className="font-medium leading-tight">
                                                    {event.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

