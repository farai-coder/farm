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

interface GroupedTasks {
    'To Do': Task[];
    'In Progress': Task[];
    'Done': Task[];
}

interface BoardViewProps {
    groupedTasks: GroupedTasks;
}

export const BoardView: React.FC<BoardViewProps> = ({ groupedTasks }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
            <div key={status} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-medium text-gray-800 flex items-center text-sm sm:text-base">
                        {status.toUpperCase()}
                        <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                            {statusTasks.length}
                        </span>
                    </h3>
                    {status === 'Done' && (
                        <div className="flex items-center text-green-600">
                            <span className="text-xs sm:text-sm hidden sm:inline">ALL COMPLETED</span>
                            <div className="ml-1 sm:ml-2 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                    {statusTasks.map((task) => (
                        <div key={task.id} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-800 mb-1 sm:mb-2">{task.title}</h4>
                            <div className="text-xs text-gray-500 mb-2 sm:mb-3">{task.description}</div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-5 h-5 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
                                    <span className="text-xs text-gray-600 truncate">{task.assignee.split(' ')[0]}</span>
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{task.dueDate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
