import React, { useState, useEffect } from 'react';
import { Plus, List, LayoutGrid, Search, ChevronDown, X, Circle, User, Calendar } from 'lucide-react';
import { useAuth } from '../../authentication/AuthProvider'; // Adjust the import path as needed

const NewTaskModal = ({
    showNewTaskModal,
    setShowNewTaskModal,
    newTask,
    setNewTask,
    editingTask,
    setEditingTask,
    handleUpdateTask,
    tasks,
    setTasks,
    colorOptions
}) => {
    const { farmId, userId } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingTask) {
            handleUpdateTask(e);
            return;
        }

        try {
            const taskData = {
                farm_id: farmId,
                title: newTask.title,
                description: newTask.description,
                due_date: newTask.dueDate,
                priority: newTask.priority,
                assignee_user_id: userId,
                associated_area_id: 0,
                status: newTask.status,
                task_color: newTask.taskColor,
                assigned_to: newTask.assignedTo
            };

            console.log('Sending task data:', taskData); // Debug log

            const response = await fetch('http://localhost:8000/v1/operations/tasks', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response not OK:', response.status, errorText);
                throw new Error(`Failed to create task: ${response.status} ${errorText}`);
            }

            const createdTask = await response.json();
            console.log('Created task response:', createdTask); // Debug log

            // Add the created task to local state
            const taskToAdd = {
                id: createdTask.id,
                title: createdTask.title,
                description: createdTask.description,
                associatedTo: newTask.associatedTo,
                dueDate: createdTask.due_date,
                priority: createdTask.priority,
                status: createdTask.status,
                assignee: createdTask.assigned_to || newTask.assignedTo,
                avatar: (createdTask.assigned_to || newTask.assignedTo).charAt(0)
            };

            setTasks(prevTasks => [...prevTasks, taskToAdd]);
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
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        }
    };

    if (!showNewTaskModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-semibold">
                        {editingTask ? 'Edit Task' : 'New Task'}
                    </h2>
                    <button onClick={() => {
                        setShowNewTaskModal(false);
                        setEditingTask(null);
                    }} className="text-gray-500 hover:text-gray-700 text-2xl">
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                            <div className="flex items-center space-x-1 md:space-x-2 p-2 border-b border-gray-200 overflow-x-auto">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <input
                                type="date"
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

                    <div className="flex flex-wrap gap-2 md:gap-4">
                        <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                            <i className="fas fa-list mr-2"></i>Add Checklist Item
                        </button>
                        <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                            <i className="fas fa-map-marker-alt mr-2"></i>Add Map Location
                        </button>
                    </div>

                    <div>
                        <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
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
                            onClick={() => {
                                setShowNewTaskModal(false);
                                setEditingTask(null);
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 md:px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                        >
                            {editingTask ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const Tasks = () => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedUser, setSelectedUser] = useState('All Users');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
    const [showRowDropdown, setShowRowDropdown] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { farmId, userId } = useAuth();

    const sampleTasks = [
        {
            id: 1,
            title: 'Zhyu',
            description: 'Rephryen',
            associatedTo: '',
            dueDate: '2025-09-22',
            priority: 'Highest',
            status: 'To Do',
            assignee: 'Farai',
            avatar: 'F'
        }
    ];

    const groupedTasks = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Done': tasks.filter(task => task.status === 'Done')
    };

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

    const colorOptions = [
        '#9ca3af', '#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4',
        '#10b981', '#84cc16', '#eab308', '#f97316', '#ef4444', '#dc2626',
        '#7c2d12', '#374151'
    ];

    const users = ['All Users', 'Chris Doe', 'John Smith', 'Sarah Johnson'];

    // Fetch tasks on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            if (!farmId) {
                console.log('No farmId available');
                setIsLoading(false);
                return;
            }

            try {
                console.log('Fetching tasks for farm:', farmId);
                const response = await fetch(`http://localhost:8000/v1/operations/tasks?farm_id=${farmId}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.status}`);
                }

                const tasksData = await response.json();
                console.log('Fetched tasks data:', tasksData); // Debug log

                // Handle both array and object response formats
                let tasksArray = tasksData;
                if (tasksData && typeof tasksData === 'object' && !Array.isArray(tasksData)) {
                    // If it's an object, check for common properties that might contain the array
                    if (tasksData.tasks) {
                        tasksArray = tasksData.tasks;
                    } else if (tasksData.data) {
                        tasksArray = tasksData.data;
                    } else {
                        // If no common property found, create array from object values
                        tasksArray = Object.values(tasksData);
                    }
                }

                // Ensure we have an array
                if (!Array.isArray(tasksArray)) {
                    console.warn('Tasks data is not an array:', tasksArray);
                    tasksArray = [];
                }

                // Transform API data to match local state format
                const transformedTasks = tasksArray.map(task => ({
                    id: task.id,
                    title: task.title || 'Untitled Task',
                    description: task.description || '',
                    associatedTo: task.associated_area_id || '',
                    dueDate: task.due_date,
                    priority: task.priority || 'Medium',
                    status: task.status || 'To Do',
                    assignee: task.assigned_to || 'Farai',
                    avatar: (task.assigned_to || 'F').charAt(0)
                }));

                console.log('Transformed tasks:', transformedTasks); // Debug log
                setTasks(transformedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Fallback to sample tasks if API fails
                setTasks(sampleTasks);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [farmId]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return '';
        }
    };

    const handlePrint = () => {
        const printContent = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200');
        const printWindow = window.open('', '_blank');

        if (printWindow && printContent) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Tasks</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f9fafb; font-weight: bold; }
                            .priority-Highest { background-color: #fef2f2; color: #dc2626; }
                            .priority-High { background-color: #fff7ed; color: #ea580c; }
                            .priority-Medium { background-color: #f0f9ff; color: #0284c7; }
                            .priority-Low { background-color: #f0fdf4; color: #16a34a; }
                        </style>
                    </head>
                    <body>
                        <h1>Tasks List</h1>
                        ${printContent.outerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } else {
            // Fallback to regular print if table not found
            window.print();
        }
        setShowOptionsDropdown(false);
    };

    const handleImport = () => {
        console.log('Import functionality');
        setShowOptionsDropdown(false);
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tasks.json';
        link.click();
        URL.revokeObjectURL(url);
        setShowOptionsDropdown(false);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            status: task.status,
            assignedTo: task.assignee,
            additionalCollaborators: [],
            priority: task.priority,
            dueDate: task.dueDate,
            repeats: 'Does not repeat',
            hoursSpent: '',
            associatedTo: task.associatedTo,
            taskColor: '#3b82f6'
        });
        setShowNewTaskModal(true);
        setShowRowDropdown(null);
    };

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setShowRowDropdown(null);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        if (!editingTask) return;

        try {
            // If you have an update API endpoint, call it here
            // For now, we'll just update locally
            const updatedTask = {
                ...editingTask,
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                assignee: newTask.assignedTo,
                priority: newTask.priority,
                dueDate: newTask.dueDate,
                associatedTo: newTask.associatedTo,
                avatar: newTask.assignedTo.charAt(0)
            };

            setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
            setShowNewTaskModal(false);
            setEditingTask(null);
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
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    };

    const ListView = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                            <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Associated To</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Due
                            <span className="ml-1">▲</span>
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Priority</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Assignee</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-3 sm:px-6 py-4">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-3 sm:px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                <div className="text-xs text-gray-500">{task.description}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">{task.associatedTo}</td>
                            <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                                {formatDate(task.dueDate)}
                            </td>
                            <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${task.priority === 'Highest' ? 'bg-red-100 text-red-800' :
                                    task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                        task.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                    }`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">{task.status}</td>
                            <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm mr-2">
                                        {task.avatar}
                                    </div>
                                    <span className="text-sm text-gray-900">{task.assignee}</span>
                                </div>
                            </td>
                            <td className="px-3 sm:px-6 py-4 relative">
                                <button
                                    onClick={() => setShowRowDropdown(showRowDropdown === task.id ? null : task.id)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                                {showRowDropdown === task.id && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                        <div className="py-1">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="px-3 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700">Displaying {tasks.length} record{tasks.length !== 1 ? 's' : ''}</p>
            </div>
        </div>
    );

    const BoardView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                <div key={status} className="bg-gray-50 rounded-lg p-3 md:p-4">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h3 className="font-medium text-gray-800 flex items-center text-sm md:text-base">
                            {status.toUpperCase()}
                            <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                                {statusTasks.length}
                            </span>
                        </h3>
                        {status === 'Done' && (
                            <div className="flex items-center text-green-600">
                                <span className="text-xs md:text-sm">ALL COMPLETED</span>
                                <div className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4 bg-green-600 rounded-full flex items-center justify-center">
                                    <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 md:space-y-3">
                        {statusTasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-800 mb-1 md:mb-2">{task.title}</h4>
                                <div className="text-xs text-gray-500 mb-2 md:mb-3">{task.description}</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-300 rounded-full mr-1 md:mr-2"></div>
                                        <span className="text-xs text-gray-600">{task.assignee.split(' ')[0]}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{formatDate(task.dueDate)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const EmptyTasksState = ({ onAddTask }) => (
        <div className="flex flex-col items-center justify-center py-10 md:py-20">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 flex flex-col items-center w-full max-w-9xl mx-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 md:mb-3 text-center">Nothing to do yet?</h3>
                <p className="text-gray-600 mb-4 md:mb-5 text-center text-sm md:text-base">Add a new task and it will show up here.</p>
                <button
                    onClick={onAddTask}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                    Add Your First Task
                </button>
            </div>
        </div>
    );

    const OptionsDropdown = () => (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
                <button
                    onClick={handlePrint}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Print
                </button>
                <button
                    onClick={handleImport}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Import
                </button>
                <button
                    onClick={handleExport}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Export
                </button>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Tasks: All Users</h1>
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1 md:p-2 rounded-md transition-colors duration-200 flex items-center space-x-1 md:space-x-2 ${viewMode === 'list'
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <List className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="text-xs md:text-sm font-medium hidden sm:inline">List View</span>
                            </button>
                            <button
                                onClick={() => setViewMode('board')}
                                className={`p-1 md:p-2 rounded-md transition-colors duration-200 flex items-center space-x-1 md:space-x-2 ${viewMode === 'board'
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <LayoutGrid className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="text-xs md:text-sm font-medium hidden sm:inline">Board View</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <button
                            onClick={() => setShowNewTaskModal(true)}
                            className="bg-green-600 text-white px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium hover:bg-green-700 whitespace-nowrap transition-colors"
                        >
                            Add Task
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 px-2 md:px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-md whitespace-nowrap transition-colors">
                            Use Template
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}
                                className="text-gray-500 hover:text-gray-700 p-1 md:p-2 rounded hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            {showOptionsDropdown && <OptionsDropdown />}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
                        <input
                            type="text"
                            placeholder="Search Tasks"
                            className="px-3 md:px-4 py-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <select className="px-2 md:px-3 py-2 border border-gray-300 rounded-md text-xs md:text-sm">
                            <option>All Users</option>
                        </select>
                        <select className="px-2 md:px-3 py-2 border border-gray-300 rounded-md text-xs md:text-sm">
                            <option>All</option>
                        </select>
                    </div>
                </div>

                {showNewTaskModal && (
                    <NewTaskModal
                        showNewTaskModal={showNewTaskModal}
                        setShowNewTaskModal={setShowNewTaskModal}
                        newTask={newTask}
                        setNewTask={setNewTask}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                        handleUpdateTask={handleUpdateTask}
                        tasks={tasks}
                        setTasks={setTasks}
                        colorOptions={colorOptions}
                    />
                )}

                {tasks.length === 0 ? (
                    <EmptyTasksState onAddTask={() => setShowNewTaskModal(true)} />
                ) : (
                    viewMode === 'list' ? <ListView /> : <BoardView />
                )}
            </div>
        </div>
    );
};