import React, { useState } from 'react';
import { Plus, List, LayoutGrid, Search, ChevronDown, X, Circle, User, Calendar } from 'lucide-react';

export const Tasks = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'board'
    const [selectedUser, setSelectedUser] = useState('All Users');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [tasks, setTasks] = useState([]); // Start empty to show empty state
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);

    const sampleTasks = [
        {
            id: 1,
            title: 'Zhyu',
            description: 'Rephryen',
            associatedTo: '',
            dueDate: 'Sep. 22, 2025',
            priority: 'Highest',
            status: 'To Do',
            assignee: 'Farai',
            avatar: 'F'
        }
    ];

    // Group tasks by status for board view
    const groupedTasks = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Done': tasks.filter(task => task.status === 'Done')
    };

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

    // Color options array
    const colorOptions = [
        '#9ca3af', '#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4',
        '#10b981', '#84cc16', '#eab308', '#f97316', '#ef4444', '#dc2626',
        '#7c2d12', '#374151'
    ];

    const users = ['All Users', 'Chris Doe', 'John Smith', 'Sarah Johnson'];

    const ListView = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                            <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Associated To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due
                            <span className="ml-1">▲</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                <div className="text-xs text-gray-500">{task.description}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{task.associatedTo}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{task.dueDate}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    {task.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{task.status}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm mr-2">
                                        {task.avatar}
                                    </div>
                                    <span className="text-sm text-gray-900">{task.assignee}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-gray-400 hover:text-gray-600 p-1">⋯</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700">Displaying {tasks.length} record{tasks.length !== 1 ? 's' : ''}</p>
            </div>
        </div>
    );

    const BoardView = () => (
        <div className="grid grid-cols-3 gap-6">
            {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                <div key={status} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800 flex items-center">
                            {status.toUpperCase()}
                            <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                                {statusTasks.length}
                            </span>
                        </h3>
                        {status === 'Done' && (
                            <div className="flex items-center text-green-600">
                                <span className="text-sm">ALL COMPLETED</span>
                                <div className="ml-2 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        {statusTasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-800 mb-2">{task.title}</h4>
                                <div className="text-xs text-gray-500 mb-3">{task.category}</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">{task.assignee.split(' ')[0]}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{task.due}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
    
    const EmptyTasksState = ({ onAddTask }) => (
        <div className="flex flex-col items-center justify-center py-20">
            {/* Dotted rectangle containing all the content - made wider */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center w-full max-w-6xl">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Nothing to do yet?</h3>
                <p className="text-gray-600 mb-5 text-center">Add a new task and it will show up here.</p>
                <p className="text-sm text-gray-500 text-center">
                    Need help? Check out this <span className="text-blue-600 cursor-pointer hover:underline">Getting Started Guide</span>.
                </p>
            </div>
        </div>
    );
    
    // New Task Modal Component
    const NewTaskModal = () => {
        const handleSubmit = (e) => {
            e.preventDefault();

            // Create a new task object with a unique ID
            const taskToAdd = {
                id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
                title: newTask.title,
                description: newTask.description,
                associatedTo: newTask.associatedTo,
                dueDate: newTask.dueDate,
                priority: newTask.priority,
                status: newTask.status,
                assignee: newTask.assignedTo,
                avatar: newTask.assignedTo.charAt(0)
            };

            // Add the new task to the tasks array
            setTasks([...tasks, taskToAdd]);

            // Close the modal and reset the form
            setShowNewTaskModal(false);
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
                                    required
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
                                    <option value="Done">Done</option>
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
                                    <option value="Highest">Highest</option>
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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Tasks: All Users</h1>
                    <div className="flex items-center space-x-3">
                        {/* View Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${viewMode === 'list'
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                <span className="text-sm font-medium">List View</span>
                            </button>
                            <button
                                onClick={() => setViewMode('board')}
                                className={`p-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${viewMode === 'board'
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                <span className="text-sm font-medium">Board View</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls */}

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowNewTaskModal(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                        >
                            Add Task
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm border border-gray-300 rounded-md">
                            Use Template
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-2">⋯</button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search Tasks"
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                            <option>All Users</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                            <option>All</option>
                        </select>
                    </div>
                </div>
                {showNewTaskModal && <NewTaskModal />}
                {/* Content */}
                {tasks.length === 0 ? (
                    <EmptyTasksState onAddTask={() => setShowNewTaskModal(true)} />
                ) : (
                    viewMode === 'list' ? <ListView /> : <BoardView />
                )}
            </div>
        </div>
    );
};