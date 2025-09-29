import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const SchedulePage = () => {
    const localizer = momentLocalizer(moment);
    const [currentView, setCurrentView] = useState(Views.MONTH);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [activeTab, setActiveTab] = useState('calendar');
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);

    // Sample events data
    const events = [
        {
            id: 1,
            title: 'Farmers Market - Downtown',
            start: new Date(2023, 8, 15, 8, 0),
            end: new Date(2023, 8, 15, 14, 0),
            type: 'event',
            assignedTo: 'Sarah Johnson',
            status: 'confirmed',
            location: 'Downtown Market',
            description: 'Sell produce at the weekly farmers market',
            associatedResources: ['Northwest Field A', 'Farm Stand'],
        },
        {
            id: 2,
            title: 'Vet Visit - Cattle Herd',
            start: new Date(2023, 8, 18, 10, 0),
            end: new Date(2023, 8, 18, 12, 0),
            type: 'event',
            assignedTo: 'Dr. Miller',
            status: 'scheduled',
            location: 'North Pasture',
            description: 'Annual checkup and vaccinations for cattle herd',
            associatedResources: ['Cattle Herd B'],
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
            associatedResources: ['Greenhouse 2', 'Tomato Plants'],
            priority: 'high',
        },
        {
            id: 4,
            title: 'Weekly Team Meeting',
            start: new Date(2023, 8, 22, 9, 0),
            end: new Date(2023, 8, 22, 10, 0),
            type: 'event',
            assignedTo: 'All Staff',
            status: 'confirmed',
            location: 'Main Office',
            description: 'Weekly operations meeting',
            recurrence: 'weekly',
        },
    ];

    // Sample tasks data
    const tasks = [
        {
            id: 101,
            title: 'Irrigation System Check',
            dueDate: new Date(2023, 8, 16),
            assignedTo: 'Michael Chen',
            status: 'in-progress',
            priority: 'medium',
            estimatedHours: 2,
            actualHours: null,
            description: 'Check all irrigation lines for leaks and proper function',
            associatedResources: ['North Field Irrigation'],
        },
        {
            id: 102,
            title: 'Plant Winter Cover Crop',
            dueDate: new Date(2023, 8, 25),
            assignedTo: 'Farm Team B',
            status: 'pending',
            priority: 'high',
            estimatedHours: 6,
            actualHours: null,
            description: 'Plant winter rye in prepared fields',
            associatedResources: ['Northwest Field A', 'East Field'],
        },
    ];


    // Form states for new event
    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: moment().format('DD/MM/YYYY'),
        startTime: '12 AM',
        startMinutes: '00',
        endDate: moment().format('DD/MM/YYYY'),
        endTime: '1 AM',
        endMinutes: '00',
        allDay: false,
        assignedTo: 'Farai',
        invitedUsers: [],
        repeats: 'Does not repeat',
        description: '',
        associatedTo: '',
        color: '#3b82f6'
    });

    // Form states for new task
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'To Do',
        assignedTo: 'Farai',
        additionalCollaborators: [],
        priority: '',
        dueDate: '',
        repeats: 'Does not repeat',
        hoursSpent: '',
        associatedTo: '',
        taskColor: '#3b82f6'
    });

    // 2. ADD THIS COLOR OPTIONS ARRAY
    const colorOptions = [
        '#9ca3af', '#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4',
        '#10b981', '#84cc16', '#eab308', '#f97316', '#ef4444', '#dc2626',
        '#7c2d12', '#374151'
    ];

    const EventModal = ({ event, onClose }) => {
        if (!event) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{event.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>
                    <div className="space-y-3">
                        <p><span className="font-medium">Type:</span> {event.type}</p>
                        <p><span className="font-medium">When:</span> {moment(event.start).format('MMMM D, YYYY h:mm A')} - {moment(event.end).format('h:mm A')}</p>
                        <p><span className="font-medium">Assigned to:</span> {event.assignedTo}</p>
                        <p><span className="font-medium">Location:</span> {event.location}</p>
                        <p><span className="font-medium">Description:</span> {event.description}</p>
                        {event.associatedResources && (
                            <p><span className="font-medium">Resources:</span> {event.associatedResources.join(', ')}</p>
                        )}
                        {event.recurrence && (
                            <p><span className="font-medium">Repeats:</span> {event.recurrence}</p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-gray-200 rounded-md">Edit</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Log Time</button>
                    </div>
                </div>
            </div>
        );
    };

    const TaskCard = ({ task }) => (
        <div className="bg-white border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600">Due: {moment(task.dueDate).format('MMM D, YYYY')}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {task.status}
                </span>
            </div>
            <div className="mt-2 text-sm">
                <p>Assigned to: {task.assignedTo}</p>
                <p>Priority: <span className={
                    task.priority === 'high' ? 'text-red-600' :
                        task.priority === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                }>{task.priority}</span></p>
            </div>
            <div className="mt-3 flex justify-between items-center">
                <button className="text-blue-600 text-sm hover:underline">View Details</button>
                <button className="px-3 py-1 bg-gray-100 rounded-md text-sm">Log Time</button>
            </div>
        </div>
    );

    // Custom component to highlight today's date with blueish color
    const CustomDay = ({ date, ...props }) => {
        const isToday = moment(date).isSame(moment(), 'day');
        return (
            <div
                {...props}
                style={isToday ? {
                    backgroundColor: '#e0f2fe',
                    borderRadius: '4px',
                    ...props.style
                } : props.style}
            />
        );
    };

    // 3. ADD THESE MODAL COMPONENTS INSIDE YOUR MAIN COMPONENT

    // New Event Modal Component
    const NewEventModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('New Event:', newEvent);
            setShowNewEventModal(false);
            // Reset form
            setNewEvent({
                title: '',
                startDate: moment().format('DD/MM/YYYY'),
                startTime: '12 AM',
                startMinutes: '00',
                endDate: moment().format('DD/MM/YYYY'),
                endTime: '1 AM',
                endMinutes: '00',
                allDay: false,
                assignedTo: 'Farai',
                invitedUsers: [],
                repeats: 'Does not repeat',
                description: '',
                associatedTo: '',
                color: '#3b82f6'
            });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">New Event</h2>
                        <button onClick={() => setShowNewEventModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    placeholder="Example: Vet Appointment"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                                <select
                                    value={newEvent.assignedTo}
                                    onChange={(e) => setNewEvent({ ...newEvent, assignedTo: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="Farai">Farai</option>
                                    <option value="Sarah">Sarah</option>
                                    <option value="Michael">Michael</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Starting</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newEvent.startDate}
                                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <select
                                    value={newEvent.startTime}
                                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    {['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'].map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <select
                                    value={newEvent.startMinutes}
                                    onChange={(e) => setNewEvent({ ...newEvent, startMinutes: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newEvent.allDay}
                                        onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                                        className="mr-2"
                                    />
                                    All Day
                                </label>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Mountain Time (US & Canada)</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ending</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newEvent.endDate}
                                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <select
                                    value={newEvent.endTime}
                                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    {['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'].map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <select
                                    value={newEvent.endMinutes}
                                    onChange={(e) => setNewEvent({ ...newEvent, endMinutes: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Invited Users</label>
                                <div className="flex items-center">
                                    <button type="button" className="text-gray-400 hover:text-gray-600">
                                        <i className="fas fa-plus-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Repeats</label>
                                <select
                                    value={newEvent.repeats}
                                    onChange={(e) => setNewEvent({ ...newEvent, repeats: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="Does not repeat">Does not repeat</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <div className="border border-gray-300 rounded-md">
                                <div className="flex items-center space-x-2 p-2 border-b border-gray-200">
                                    <select className="text-sm border-none">
                                        <option>Normal</option>
                                    </select>
                                    <button type="button" className="p-1"><strong>B</strong></button>
                                    <button type="button" className="p-1"><em>I</em></button>
                                    <button type="button" className="p-1"><u>U</u></button>
                                    <button type="button" className="p-1"><s>S</s></button>
                                    <button type="button" className="p-1">A</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">🔗</button>
                                </div>
                                <textarea
                                    placeholder="Add some details or a description..."
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="w-full p-3 border-none focus:outline-none resize-none"
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="button" className="text-blue-600 hover:text-blue-800">
                                <i className="fas fa-paperclip mr-2"></i>Add Attachment
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Associated To</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Find Animal, Equipment"
                                    value={newEvent.associatedTo}
                                    onChange={(e) => setNewEvent({ ...newEvent, associatedTo: e.target.value })}
                                    className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((color, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setNewEvent({ ...newEvent, color: color })}
                                        className={`w-6 h-6 rounded-full border-2 ${newEvent.color === color ? 'border-gray-900' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowNewEventModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    // New Task Modal Component
    const NewTaskModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('New Task:', newTask);
            setShowNewTaskModal(false);
            // Reset form
            setNewTask({
                title: '',
                description: '',
                status: 'To Do',
                assignedTo: 'Farai',
                additionalCollaborators: [],
                priority: '',
                dueDate: '',
                repeats: 'Does not repeat',
                hoursSpent: '',
                associatedTo: '',
                taskColor: '#3b82f6'
            });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">New Task</h2>
                        <button onClick={() => setShowNewTaskModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    placeholder="Example: Plow field"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={newTask.status}
                                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <div className="border border-gray-300 rounded-md">
                                <div className="flex items-center space-x-2 p-2 border-b border-gray-200">
                                    <select className="text-sm border-none">
                                        <option>Normal</option>
                                    </select>
                                    <button type="button" className="p-1"><strong>B</strong></button>
                                    <button type="button" className="p-1"><em>I</em></button>
                                    <button type="button" className="p-1"><u>U</u></button>
                                    <button type="button" className="p-1"><s>S</s></button>
                                    <button type="button" className="p-1">A</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">≡</button>
                                    <button type="button" className="p-1">🔗</button>
                                </div>
                                <textarea
                                    placeholder="What needs to be done? Add some details or a description..."
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full p-3 border-none focus:outline-none resize-none"
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                                <select
                                    value={newTask.assignedTo}
                                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="Farai">Farai</option>
                                    <option value="Sarah">Sarah</option>
                                    <option value="Michael">Michael</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="">Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Collaborators</label>
                            <div className="flex items-center">
                                <button type="button" className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-plus-circle"></i>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                                <input
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <div className="text-xs text-blue-600 mt-1">
                                    <i className="fas fa-clock mr-1"></i>Set Start Date/Time
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Repeats</label>
                                <select
                                    value={newTask.repeats}
                                    onChange={(e) => setNewTask({ ...newTask, repeats: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="Does not repeat">Does not repeat</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hours Spent</label>
                            <input
                                type="number"
                                value={newTask.hoursSpent}
                                onChange={(e) => setNewTask({ ...newTask, hoursSpent: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button type="button" className="text-blue-600 hover:text-blue-800">
                                <i className="fas fa-list mr-2"></i>Add Checklist Item
                            </button>
                            <button type="button" className="text-blue-600 hover:text-blue-800">
                                <i className="fas fa-map-marker-alt mr-2"></i>Add Map Location
                            </button>
                        </div>

                        <div>
                            <button type="button" className="text-blue-600 hover:text-blue-800">
                                <i className="fas fa-paperclip mr-2"></i>Add Attachment
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Associated To</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Find Animal, Equipment"
                                    value={newTask.associatedTo}
                                    onChange={(e) => setNewTask({ ...newTask, associatedTo: e.target.value })}
                                    className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Task Color</label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((color, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setNewTask({ ...newTask, taskColor: color })}
                                        className={`w-6 h-6 rounded-full border-2 ${newTask.taskColor === color ? 'border-gray-900' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowNewTaskModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Schedule</h1>
                <p className="text-gray-600">Manage your farm schedule and activities</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'calendar' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('calendar')}
                            >
                                Calendar
                            </button>
                         
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'timesheets' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('timesheets')}
                            >
                                Timesheets
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowNewEventModal(true)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                            >
                                New Event
                            </button>
                            <button
                                onClick={() => setShowNewTaskModal(true)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                            >
                                New Task
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {activeTab === 'calendar' && (
                        <div className="h-96">
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
                                eventPropGetter={(event) => {
                                    let backgroundColor = event.type === 'task' ? '#f59e0b' : '#3b82f6';
                                    if (event.status === 'completed') backgroundColor = '#10b981';
                                    return { style: { backgroundColor } };
                                }}
                                components={{
                                    dayWrapper: CustomDay,
                                }}
                            />
                        </div>
                    )}

                    {activeTab === 'tasks' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h2 className="font-medium text-gray-700 mb-3">To Do</h2>
                                {tasks.filter(t => t.status === 'pending').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                            <div>
                                <h2 className="font-medium text-gray-700 mb-3">In Progress</h2>
                                {tasks.filter(t => t.status === 'in-progress').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                            <div>
                                <h2 className="font-medium text-gray-700 mb-3">Completed</h2>
                                {tasks.filter(t => t.status === 'completed').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'timesheets' && (
                        <div className="p-4">
                            <h2 className="text-lg font-medium mb-4">Time Tracking</h2>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-gray-600">No timesheets pending approval</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="font-medium mb-3">Recent Time Entries</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Person</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Sep 14, 2023</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Harvest Tomatoes</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Sarah Johnson</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">3.5</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Approved</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Sep 13, 2023</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Irrigation Repair</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Michael Chen</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">2.0</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Approved</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showNewEventModal && <NewEventModal />}
            {showNewTaskModal && <NewTaskModal />}

            {showEventModal && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => {
                        setShowEventModal(false);
                        setSelectedEvent(null);
                    }}
                />
            )}
        </div>
    );
};