import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Grid3X3, User, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export const GrowLocationTasks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    // Sample task data matching the image
    const tasks = [
        {
            id: 1,
            title: 'Start Internm Pepper Seeds',
            dueDate: 'Mar. 01, 2022',
            priority: 'urgent',
            status: 'In Progress',
            assignee: 'Chris',
            avatar: 'C',
            completed: false
        },
        {
            id: 2,
            title: 'Till Northwest Field A',
            dueDate: 'Apr. 01, 2022',
            priority: 'high',
            status: 'To Do',
            assignee: 'Reed',
            avatar: 'R',
            completed: false
        },
        {
            id: 3,
            title: 'Plant Peppers in Beds',
            dueDate: 'Apr. 15, 2022',
            priority: 'high',
            status: 'To Do',
            assignee: 'Dennis',
            avatar: 'D',
            completed: false
        },
        {
            id: 4,
            title: 'Harvest Peppers',
            dueDate: 'Jul. 20, 2022',
            priority: 'medium',
            status: 'To Do',
            assignee: 'Greg',
            avatar: 'G',
            completed: false
        },
        {
            id: 5,
            title: 'Retreat Insect',
            dueDate: 'Aug. 10, 2022',
            priority: 'low',
            status: 'Backlogged',
            assignee: 'Adriana',
            avatar: 'A',
            completed: false
        }
    ];

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTaskSelect = (taskId: number) => {
        const newSelected = new Set(selectedTasks);
        if (newSelected.has(taskId)) {
            newSelected.delete(taskId);
        } else {
            newSelected.add(taskId);
        }
        setSelectedTasks(newSelected);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'To Do': return 'bg-gray-100 text-gray-800';
            case 'Backlogged': return 'bg-green-100 text-green-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getAvatarColor = (name: 'Chris' | 'Reed' | 'Dennis' | 'Greg' | 'Adriana') => {
        const colors = {
            'Chris': 'bg-blue-500',
            'Reed': 'bg-gray-600',
            'Dennis': 'bg-purple-500',
            'Greg': 'bg-yellow-500',
            'Adriana': 'bg-green-500'
        };
        return colors[name] || 'bg-gray-500';
    };

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

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Plus size={16} />
                        <span>New Task</span>
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 pl-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Tasks Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedTasks(new Set(tasks.map(t => t.id)));
                                                } else {
                                                    setSelectedTasks(new Set());
                                                }
                                            }}
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assignee
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTasks.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedTasks.has(task.id)}
                                                onChange={() => handleTaskSelect(task.id)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-1 h-6 rounded ${getPriorityColor(task.priority)}`}></div>
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                    {task.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {task.dueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                                                <span className="text-sm text-gray-900 capitalize">{task.priority}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(task.assignee as "Dennis" | "Greg" | "Adriana" | "Chris" | "Reed")}`}>
                                                    {task.avatar}
                                                </div>
                                                <span className="text-sm text-gray-900">{task.assignee}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-700">Displaying all 5 activities</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
