import React, { useState, useRef, useEffect } from 'react';
import { Plus, List, LayoutGrid, Search, ChevronDown, X, Circle, User, Calendar, Upload, Download, Printer, FileDown, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyTasksState } from './components/EmptyTasksState';
import { ListView } from './components/ListView';
import { BoardView } from './components/BoardView';
import { NewTaskModal } from './components/NewTaskModal';
import { Task, NewTask, GroupedTasks } from './type/task';

export const MyCropsTasks = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('list');
    const [selectedUser, setSelectedUser] = useState('All Users');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // State for row actions menu
    const [rowMenuOpen, setRowMenuOpen] = useState<number | null>(null);
    const rowMenuRef = useRef<HTMLDivElement>(null);

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

    const groupedTasks: GroupedTasks = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Done': tasks.filter(task => task.status === 'Done')
    };

    const [newTask, setNewTask] = useState<NewTask>({
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

    const menuItems = [
        { icon: Upload, label: 'Import', action: 'import' },
        { icon: Download, label: 'Export', action: 'export' },
        { icon: Printer, label: 'Print', action: 'print' },
        { icon: FileDown, label: 'Download', action: 'download' }
    ];

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
            if (rowMenuRef.current && !rowMenuRef.current.contains(event.target as Node)) {
                setRowMenuOpen(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const taskToAdd: Task = {
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

        setTasks([...tasks, taskToAdd]);

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

    const handleMenuAction = (action: string) => {
        console.log(`Menu action: ${action}`);
        setIsMenuOpen(false);
        // Handle different menu actions here
    };

    // Row actions handlers
    const handleEditTask = (taskId: number) => {
        console.log(`Edit task with id: ${taskId}`);
        setRowMenuOpen(null);
        // Add your edit logic here
    };

    const handleDeleteTask = (taskId: number) => {
        console.log(`Delete task with id: ${taskId}`);
        setRowMenuOpen(null);
        // Add your delete logic here
    };

    // Updated ListView component with row actions
    const ListViewWithActions = ({ tasks }: { tasks: Task[] }) => {
        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                        <div className="text-sm text-gray-500">{task.description}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-800 mr-2">
                                            {task.avatar}
                                        </div>
                                        <span className="text-sm text-gray-900">{task.assignee}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900">{task.dueDate}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.priority === 'Highest' ? 'bg-red-100 text-red-800' :
                                            task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === 'To Do' ? 'bg-gray-100 text-gray-800' :
                                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="relative" ref={rowMenuRef}>
                                        <button
                                            onClick={() => setRowMenuOpen(rowMenuOpen === task.id ? null : task.id)}
                                            className="text-gray-500 hover:text-gray-700 p-2 flex flex-col items-center justify-center h-8 w-8 space-y-0.5"
                                        >
                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                        </button>

                                        {/* Row Actions Modal */}
                                        {rowMenuOpen === task.id && (
                                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                                <button
                                                    onClick={() => handleEditTask(task.id)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4 mr-3 text-green-600" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-3 text-green-600" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/crops/my-crops')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to My Crops
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Tasks: All Users</h1>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 ${viewMode === 'list'
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                <span className="text-xs sm:text-sm font-medium hidden sm:inline">List View</span>
                                <span className="text-xs sm:text-sm font-medium sm:hidden">List</span>
                            </button>
                            <button
                                onClick={() => setViewMode('board')}
                                className={`p-2 rounded-md transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 ${viewMode === 'board'
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Board View</span>
                                <span className="text-xs sm:text-sm font-medium sm:hidden">Board</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                            onClick={() => setShowNewTaskModal(true)}
                            className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-green-700 whitespace-nowrap"
                        >
                            Add Task
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md whitespace-nowrap">
                            Use Template
                        </button>

                        {/* Three dots menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-500 hover:text-gray-700 p-2 flex flex-col items-center justify-center h-8 w-8 space-y-0.5"
                            >
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                    {menuItems.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <button
                                                key={item.action}
                                                onClick={() => handleMenuAction(item.action)}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            >
                                                <IconComponent className="w-4 h-4 mr-3 text-green-600" />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <input
                            type="text"
                            placeholder="Search Tasks"
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <select className="px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm">
                            <option>All Users</option>
                        </select>
                        <select className="px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm">
                            <option>All</option>
                        </select>
                    </div>
                </div>

                {showNewTaskModal && (
                    <NewTaskModal
                        newTask={newTask}
                        setNewTask={setNewTask}
                        onClose={() => setShowNewTaskModal(false)}
                        onSubmit={handleSubmit}
                        colorOptions={colorOptions}
                    />
                )}

                {tasks.length === 0 ? (
                    <EmptyTasksState onAddTask={() => setShowNewTaskModal(true)} />
                ) : (
                    viewMode === 'list' ? <ListViewWithActions tasks={tasks} /> : <BoardView groupedTasks={groupedTasks} />
                )}
            </div>
        </div>
    );
};