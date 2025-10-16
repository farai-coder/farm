import React from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    associatedTo: string;
    dueDate: string;
    priority: string;
    status: string;
    assignee: string;
    avatar: string;
}

interface ListViewProps {
    tasks: Task[];
}

export const ListView: React.FC<ListViewProps> = ({ tasks }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                            <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Associated To</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Due
                            <span className="ml-1">▲</span>
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Priority</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Assignee</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-4 sm:px-6 py-4">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                <div className="text-xs text-gray-500">{task.description}</div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">{task.associatedTo}</td>
                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">{task.dueDate}</td>
                            <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    {task.priority}
                                </span>
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">{task.status}</td>
                            <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm mr-2">
                                        {task.avatar}
                                    </div>
                                    <span className="text-sm text-gray-900">{task.assignee}</span>
                                </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                                <button className="text-gray-400 hover:text-gray-600 p-1">⋯</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">Displaying {tasks.length} record{tasks.length !== 1 ? 's' : ''}</p>
        </div>
    </div>
);
