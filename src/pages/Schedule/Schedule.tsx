import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const SchedulePage = () => {
    const localizer = momentLocalizer(moment);
    const [currentView, setCurrentView] = useState(Views.MONTH);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [activeTab, setActiveTab] = useState('calendar');
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);

    const events = [
        {
            id: 1,
            title: 'Farmers Market',
            start: new Date(2023, 8, 15, 8, 0),
            end: new Date(2023, 8, 15, 14, 0),
            type: 'event',
            assignedTo: 'Sarah Johnson',
            status: 'confirmed',
            location: 'Downtown Market',
            description: 'Sell produce at the weekly farmers market',
        },
        {
            id: 2,
            title: 'Vet Visit',
            start: new Date(2023, 8, 18, 10, 0),
            end: new Date(2023, 8, 18, 12, 0),
            type: 'event',
            assignedTo: 'Dr. Miller',
            status: 'scheduled',
            location: 'North Pasture',
            description: 'Annual checkup and vaccinations for cattle herd',
        },
        {
            id: 3,
            title: 'Harvest Tomatoes',
            start: new Date(2023, 8, 20, 9, 0),
            end: new Date(2023, 8, 20, 12, 0),
            type: 'task',
            assignedTo: 'Farm Team A',
            status: 'pending',
            location: 'Greenhouse 2',
            description: 'Harvest ripe tomatoes and prepare for distribution',
            priority: 'high',
        },
    ];

    const tasks = [
        {
            id: 101,
            title: 'Irrigation System Check',
            dueDate: new Date(2023, 8, 16),
            assignedTo: 'Michael Chen',
            status: 'in-progress',
            priority: 'medium',
        },
        {
            id: 102,
            title: 'Plant Winter Cover Crop',
            dueDate: new Date(2023, 8, 25),
            assignedTo: 'Farm Team B',
            status: 'pending',
            priority: 'high',
        },
    ];

    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: moment().format('DD/MM/YYYY'),
        startTime: '12 AM',
        endDate: moment().format('DD/MM/YYYY'),
        endTime: '1 AM',
        assignedTo: 'Farai',
        repeats: 'Does not repeat',
        description: '',
        color: '#3b82f6'
    });

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'To Do',
        assignedTo: 'Farai',
        priority: '',
        dueDate: '',
        repeats: 'Does not repeat',
        taskColor: '#3b82f6'
    });

    const colorOptions = [
        '#9ca3af', '#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4',
        '#10b981', '#84cc16', '#eab308', '#f97316'
    ];

    const EventModal = ({ event, onClose }) => {
        if (!event) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">{event.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                            ×
                        </button>
                    </div>
                    <div className="space-y-3 text-sm">
                        <p><span className="font-medium">Type:</span> {event.type}</p>
                        <p><span className="font-medium">When:</span> {moment(event.start).format('MMM D, YYYY h:mm A')}</p>
                        <p><span className="font-medium">Assigned to:</span> {event.assignedTo}</p>
                        <p><span className="font-medium">Location:</span> {event.location}</p>
                        <p><span className="font-medium">Description:</span> {event.description}</p>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-2">
                        <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">Edit</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Log Time</button>
                    </div>
                </div>
            </div>
        );
    };

    const TaskCard = ({ task }) => (
        <div className="bg-white border rounded-lg p-3 mb-3 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                    }`}>
                    {task.status}
                </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">Due: {moment(task.dueDate).format('MMM D, YYYY')}</p>
            <p className="text-xs mb-2">Assigned: {task.assignedTo}</p>
            <div className="flex gap-2 mt-3">
                <button className="text-blue-600 text-xs hover:underline">View</button>
                <button className="px-3 py-1 bg-gray-100 rounded-md text-xs">Log Time</button>
            </div>
        </div>
    );

    const NewEventModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('New Event:', newEvent);
            setShowNewEventModal(false);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">New Event</h2>
                        <button onClick={() => setShowNewEventModal(false)} className="text-gray-500 text-2xl leading-none">×</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="Event title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <input
                                    type="text"
                                    value={newEvent.startDate}
                                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Time</label>
                                <select
                                    value={newEvent.startTime}
                                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                >
                                    {['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'].map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Assigned To</label>
                            <select
                                value={newEvent.assignedTo}
                                onChange={(e) => setNewEvent({ ...newEvent, assignedTo: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                            >
                                <option>Farai</option>
                                <option>Sarah</option>
                                <option>Michael</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                placeholder="Event description..."
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                className="w-full p-3 border rounded-md text-sm"
                                rows="3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Color</label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((color, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setNewEvent({ ...newEvent, color })}
                                        className={`w-8 h-8 rounded-full border-2 ${newEvent.color === color ? 'border-gray-900' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button type="button" onClick={() => setShowNewEventModal(false)} className="flex-1 px-4 py-2 border rounded-md text-sm">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const NewTaskModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('New Task:', newTask);
            setShowNewTaskModal(false);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">New Task</h2>
                        <button onClick={() => setShowNewTaskModal(false)} className="text-gray-500 text-2xl leading-none">×</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="Task title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <select
                                    value={newTask.status}
                                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                >
                                    <option>To Do</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Priority</label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                >
                                    <option value="">Select</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                placeholder="Task description..."
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                className="w-full p-3 border rounded-md text-sm"
                                rows="3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Task Color</label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((color, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setNewTask({ ...newTask, taskColor: color })}
                                        className={`w-8 h-8 rounded-full border-2 ${newTask.taskColor === color ? 'border-gray-900' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button type="button" onClick={() => setShowNewTaskModal(false)} className="flex-1 px-4 py-2 border rounded-md text-sm">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <style>{`
                .rbc-calendar { min-height: 400px !important; }
                .rbc-month-view { font-size: 12px; }
                .rbc-header { padding: 8px 3px; font-size: 11px; }
                .rbc-event { padding: 2px 4px; font-size: 11px; }
                @media (min-width: 640px) {
                    .rbc-month-view { font-size: 14px; }
                    .rbc-header { padding: 10px 5px; font-size: 13px; }
                    .rbc-event { padding: 3px 5px; font-size: 12px; }
                }
            `}</style>

            <div className="p-3 sm:p-6">
                <div className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Schedule</h1>
                    <p className="text-sm text-gray-600">Manage your farm schedule</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="border-b p-3">
                        <div className="flex flex-col sm:flex-row justify-between gap-3">
                            <div className="flex gap-2 overflow-x-auto">
                                <button
                                    className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${activeTab === 'calendar' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
                                    onClick={() => setActiveTab('calendar')}
                                >
                                    Calendar
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${activeTab === 'timesheets' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
                                    onClick={() => setActiveTab('timesheets')}
                                >
                                    Timesheets
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowNewEventModal(true)}
                                    className="flex-1 sm:flex-initial px-4 py-2 bg-green-600 text-white rounded-md text-sm"
                                >
                                    New Event
                                </button>
                                <button
                                    onClick={() => setShowNewTaskModal(true)}
                                    className="flex-1 sm:flex-initial px-4 py-2 border text-gray-700 rounded-md text-sm"
                                >
                                    New Task
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 sm:p-4">
                        {activeTab === 'calendar' && (
                            <div style={{ height: '500px' }}>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    views={['month', 'week', 'day']}
                                    view={currentView}
                                    onView={setCurrentView}
                                    onSelectEvent={(event) => {
                                        setSelectedEvent(event);
                                        setShowEventModal(true);
                                    }}
                                    eventPropGetter={(event) => ({
                                        style: {
                                            backgroundColor: event.type === 'task' ? '#f59e0b' : '#3b82f6'
                                        }
                                    })}
                                />
                            </div>
                        )}

                        {activeTab === 'timesheets' && (
                            <div>
                                <h2 className="text-lg font-medium mb-4">Time Tracking</h2>
                                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                    <p className="text-sm text-gray-600">No timesheets pending approval</p>
                                </div>
                                <h3 className="font-medium mb-3 text-sm">Recent Time Entries</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Task</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Person</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Hours</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            <tr className="border-t">
                                                <td className="px-3 py-2 text-xs">Sep 14</td>
                                                <td className="px-3 py-2 text-xs">Harvest Tomatoes</td>
                                                <td className="px-3 py-2 text-xs">Sarah</td>
                                                <td className="px-3 py-2 text-xs">3.5</td>
                                                <td className="px-3 py-2 text-xs text-green-600">Approved</td>
                                            </tr>
                                            <tr className="border-t">
                                                <td className="px-3 py-2 text-xs">Sep 13</td>
                                                <td className="px-3 py-2 text-xs">Irrigation Repair</td>
                                                <td className="px-3 py-2 text-xs">Michael</td>
                                                <td className="px-3 py-2 text-xs">2.0</td>
                                                <td className="px-3 py-2 text-xs text-green-600">Approved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showNewEventModal && <NewEventModal />}
            {showNewTaskModal && <NewTaskModal />}
            {showEventModal && <EventModal event={selectedEvent} onClose={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
            }} />}
        </div>
    );
};