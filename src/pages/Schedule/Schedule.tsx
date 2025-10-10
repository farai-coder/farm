import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../authentication/AuthProvider'; // Adjust the import path as needed

export const SchedulePage = () => {
    const localizer = momentLocalizer(moment);
    const [currentView, setCurrentView] = useState(Views.MONTH);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [activeTab, setActiveTab] = useState('calendar');
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showNewTimesheetModal, setShowNewTimesheetModal] = useState(false);
    const [selectedItemForLogging, setSelectedItemForLogging] = useState(null);

    const { farmId, userId } = useAuth();

    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([
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
    ]);

    const [timesheets, setTimesheets] = useState([
        {
            id: 1,
            date: new Date(2023, 8, 14),
            task: 'Harvest Tomatoes',
            person: 'Sarah',
            hours: 3.5,
            status: 'approved',
            notes: 'Completed tomato harvest in greenhouse 2'
        },
        {
            id: 2,
            date: new Date(2023, 8, 13),
            task: 'Irrigation Repair',
            person: 'Michael',
            hours: 2.0,
            status: 'approved',
            notes: 'Fixed leak in north pasture irrigation'
        }
    ]);

    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: moment().format('YYYY-MM-DD'),
        startTime: '08:00',
        endDate: moment().format('YYYY-MM-DD'),
        endTime: '09:00',
        assignedTo: 'Farai',
        repeats: 'Does not repeat',
        description: '',
        color: '#3b82f6',
        location: ''
    });

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'To Do',
        assignedTo: 'Farai',
        priority: '',
        dueDate: moment().format('YYYY-MM-DD'),
        repeats: 'Does not repeat',
        taskColor: '#3b82f6'
    });

    const [newTimesheet, setNewTimesheet] = useState({
        date: moment().format('YYYY-MM-DD'),
        task: '',
        person: 'Farai',
        hours: '',
        status: 'pending',
        notes: ''
    });

    const colorOptions = [
        '#9ca3af', '#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4',
        '#10b981', '#84cc16', '#eab308', '#f97316'
    ];

    // Get farm ID from auth context
    const getFarmId = () => {
        return farmId;
    };

    // Fetch events from API
    const fetchEvents = async () => {
        try {
            const farmId = getFarmId();
            const response = await fetch(`http://localhost:8000/v1/operations/calendar/events?farm_id=${farmId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });

            if (response.ok) {
                const apiEvents = await response.json();

                // Transform API events to calendar format
                const transformedEvents = apiEvents.map(apiEvent => ({
                    id: apiEvent.id,
                    title: apiEvent.title,
                    start: new Date(apiEvent.start_time),
                    end: new Date(apiEvent.end_time),
                    type: 'event',
                    assignedTo: apiEvent.assigned_to_user_id,
                    status: 'scheduled',
                    location: apiEvent.location || 'Farm',
                    description: apiEvent.description,
                    color: '#3b82f6'
                }));

                setEvents(transformedEvents);
            } else {
                console.error('Failed to fetch events');
                // Fallback to sample events if API fails
                setEvents([
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
                ]);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Function to create new event via API
    const createNewEvent = async (eventData) => {
        try {
            const startDateTime = new Date(`${eventData.startDate}T${eventData.startTime}`);
            const endDateTime = new Date(`${eventData.endDate}T${eventData.endTime}`);

            const apiEventData = {
                farm_id: farmId,
                assigned_to_user_id: userId,
                title: eventData.title,
                event_type: 'Meeting',
                location: eventData.location || '',
                description: eventData.description || '',
                start_date: eventData.startDate,
                end_date: eventData.endDate,
                start_time: startDateTime.toISOString(),
                end_time: endDateTime.toISOString()
            };

            const response = await fetch('http://localhost:8000/v1/operations/events', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiEventData)
            });

            if (response.ok) {
                const createdEvent = await response.json();

                // Add the new event to local state
                const newEventObj = {
                    id: createdEvent.id || Date.now(),
                    title: eventData.title,
                    start: startDateTime,
                    end: endDateTime,
                    type: 'event',
                    assignedTo: eventData.assignedTo,
                    status: 'scheduled',
                    location: eventData.location || 'Farm',
                    description: eventData.description,
                    color: eventData.color
                };

                setEvents(prevEvents => [...prevEvents, newEventObj]);
                setShowNewEventModal(false);
                setNewEvent({
                    title: '',
                    startDate: moment().format('YYYY-MM-DD'),
                    startTime: '08:00',
                    endDate: moment().format('YYYY-MM-DD'),
                    endTime: '09:00',
                    assignedTo: 'Farai',
                    repeats: 'Does not repeat',
                    description: '',
                    color: '#3b82f6',
                    location: ''
                });
            } else {
                console.error('Failed to create event');
                // Fallback to local creation if API fails
                createEventLocally(eventData);
            }
        } catch (error) {
            console.error('Error creating event:', error);
            // Fallback to local creation if API fails
            createEventLocally(eventData);
        }
    };

    // Fallback function for local event creation
    const createEventLocally = (eventData) => {
        const startDateTime = new Date(`${eventData.startDate}T${eventData.startTime}`);
        const endDateTime = new Date(`${eventData.endDate}T${eventData.endTime}`);

        const newEventObj = {
            id: Date.now(),
            title: eventData.title,
            start: startDateTime,
            end: endDateTime,
            type: 'event',
            assignedTo: eventData.assignedTo,
            status: 'scheduled',
            location: eventData.location || 'Farm',
            description: eventData.description,
            color: eventData.color
        };

        setEvents(prevEvents => [...prevEvents, newEventObj]);
        setShowNewEventModal(false);
        setNewEvent({
            title: '',
            startDate: moment().format('YYYY-MM-DD'),
            startTime: '08:00',
            endDate: moment().format('YYYY-MM-DD'),
            endTime: '09:00',
            assignedTo: 'Farai',
            repeats: 'Does not repeat',
            description: '',
            color: '#3b82f6',
            location: ''
        });
    };

    // Function to create new task
    const createNewTask = (taskData) => {
        const dueDate = new Date(taskData.dueDate);

        const newTaskObj = {
            id: Date.now(),
            title: taskData.title,
            dueDate: dueDate,
            assignedTo: taskData.assignedTo,
            status: taskData.status.toLowerCase().replace(' ', '-'),
            priority: taskData.priority.toLowerCase(),
            description: taskData.description,
            taskColor: taskData.taskColor
        };

        setTasks(prevTasks => [...prevTasks, newTaskObj]);

        const taskEvent = {
            id: Date.now() + 1,
            title: taskData.title,
            start: new Date(dueDate.setHours(9, 0, 0, 0)),
            end: new Date(dueDate.setHours(12, 0, 0, 0)),
            type: 'task',
            assignedTo: taskData.assignedTo,
            status: taskData.status.toLowerCase().replace(' ', '-'),
            location: 'Farm',
            description: taskData.description,
            priority: taskData.priority.toLowerCase(),
            color: taskData.taskColor
        };

        setEvents(prevEvents => [...prevEvents, taskEvent]);
        setShowNewTaskModal(false);
        setNewTask({
            title: '',
            description: '',
            status: 'To Do',
            assignedTo: 'Farai',
            priority: '',
            dueDate: moment().format('YYYY-MM-DD'),
            repeats: 'Does not repeat',
            taskColor: '#3b82f6'
        });
    };

    // Function to create new timesheet
    const createNewTimesheet = (timesheetData) => {
        const newTimesheetObj = {
            id: Date.now(),
            date: new Date(timesheetData.date),
            task: timesheetData.task,
            person: timesheetData.person,
            hours: parseFloat(timesheetData.hours),
            status: timesheetData.status,
            notes: timesheetData.notes
        };

        setTimesheets(prev => [...prev, newTimesheetObj]);
        setShowNewTimesheetModal(false);
        setNewTimesheet({
            date: moment().format('YYYY-MM-DD'),
            task: '',
            person: 'Farai',
            hours: '',
            status: 'pending',
            notes: ''
        });
    };

    // Function to handle log time button click
    const handleLogTimeClick = (item) => {
        setSelectedItemForLogging(item);
        setNewTimesheet({
            date: moment().format('YYYY-MM-DD'),
            task: item.title,
            person: item.assignedTo || 'Farai',
            hours: '',
            status: 'pending',
            notes: `Time spent on ${item.type}: ${item.title}`
        });
        setShowNewTimesheetModal(true);
    };

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

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
                        <button
                            onClick={() => {
                                handleLogTimeClick(event);
                                setShowEventModal(false);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                        >
                            Log Time
                        </button>
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
                <button
                    onClick={() => handleLogTimeClick(task)}
                    className="px-3 py-1 bg-gray-100 rounded-md text-xs"
                >
                    Log Time
                </button>
            </div>
        </div>
    );

    const NewEventModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            createNewEvent(newEvent);
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
                                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={newEvent.startDate}
                                    onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Time</label>
                                <input
                                    type="time"
                                    value={newEvent.startTime}
                                    onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">End Date</label>
                                <input
                                    type="date"
                                    value={newEvent.endDate}
                                    onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">End Time</label>
                                <input
                                    type="time"
                                    value={newEvent.endTime}
                                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Assigned To</label>
                            <select
                                value={newEvent.assignedTo}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, assignedTo: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            >
                                <option>Farai</option>
                                <option>Sarah</option>
                                <option>Michael</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <input
                                type="text"
                                placeholder="Event location"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                placeholder="Event description..."
                                value={newEvent.description}
                                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
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
                                        onClick={() => setNewEvent(prev => ({ ...prev, color }))}
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
            createNewTask(newTask);
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
                                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <select
                                    value={newTask.status}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
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
                                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Due Date</label>
                            <input
                                type="date"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Assigned To</label>
                            <select
                                value={newTask.assignedTo}
                                onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            >
                                <option>Farai</option>
                                <option>Sarah</option>
                                <option>Michael</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                placeholder="Task description..."
                                value={newTask.description}
                                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
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
                                        onClick={() => setNewTask(prev => ({ ...prev, taskColor: color }))}
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

    const NewTimesheetModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            createNewTimesheet(newTimesheet);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">New Timesheet Entry</h2>
                        <button onClick={() => setShowNewTimesheetModal(false)} className="text-gray-500 text-2xl leading-none">×</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Date</label>
                            <input
                                type="date"
                                value={newTimesheet.date}
                                onChange={(e) => setNewTimesheet(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Task</label>
                            <input
                                type="text"
                                placeholder="Task description"
                                value={newTimesheet.task}
                                onChange={(e) => setNewTimesheet(prev => ({ ...prev, task: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Person</label>
                                <select
                                    value={newTimesheet.person}
                                    onChange={(e) => setNewTimesheet(prev => ({ ...prev, person: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                >
                                    <option>Farai</option>
                                    <option>Sarah</option>
                                    <option>Michael</option>
                                    <option>Farm Team A</option>
                                    <option>Farm Team B</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Hours</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0.5"
                                    max="24"
                                    placeholder="Hours worked"
                                    value={newTimesheet.hours}
                                    onChange={(e) => setNewTimesheet(prev => ({ ...prev, hours: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Notes</label>
                            <textarea
                                placeholder="Additional notes about the work done..."
                                value={newTimesheet.notes}
                                onChange={(e) => setNewTimesheet(prev => ({ ...prev, notes: e.target.value }))}
                                className="w-full p-3 border rounded-md text-sm"
                                rows="3"
                            />
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button type="button" onClick={() => setShowNewTimesheetModal(false)} className="flex-1 px-4 py-2 border rounded-md text-sm">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm">
                                Create Timesheet
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
                                            backgroundColor: event.color || (event.type === 'task' ? '#f59e0b' : '#3b82f6')
                                        }
                                    })}
                                />
                            </div>
                        )}

                        {activeTab === 'timesheets' && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium">Time Tracking</h2>
                                    <button
                                        onClick={() => setShowNewTimesheetModal(true)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
                                    >
                                        New Timesheet
                                    </button>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                    <p className="text-sm text-gray-600">
                                        {timesheets.filter(ts => ts.status === 'pending').length} timesheets pending approval
                                    </p>
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
                                            {timesheets.map(timesheet => (
                                                <tr key={timesheet.id} className="border-t">
                                                    <td className="px-3 py-2 text-xs">{moment(timesheet.date).format('MMM D')}</td>
                                                    <td className="px-3 py-2 text-xs">{timesheet.task}</td>
                                                    <td className="px-3 py-2 text-xs">{timesheet.person}</td>
                                                    <td className="px-3 py-2 text-xs">{timesheet.hours}</td>
                                                    <td className={`px-3 py-2 text-xs ${timesheet.status === 'approved' ? 'text-green-600' :
                                                        timesheet.status === 'pending' ? 'text-yellow-600' :
                                                            'text-red-600'
                                                        }`}>
                                                        {timesheet.status}
                                                    </td>
                                                </tr>
                                            ))}
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
            {showNewTimesheetModal && <NewTimesheetModal />}
            {showEventModal && <EventModal event={selectedEvent} onClose={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
            }} />}
        </div>
    );
};