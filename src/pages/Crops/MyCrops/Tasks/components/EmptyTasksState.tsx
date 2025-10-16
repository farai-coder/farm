import React from 'react';

interface EmptyTasksStateProps {
    onAddTask: () => void;
}

export const EmptyTasksState: React.FC<EmptyTasksStateProps> = ({ onAddTask }) => (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 flex flex-col items-center w-full max-w-8xl">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 text-center">Nothing to do yet?</h3>
            <p className="text-gray-600 mb-4 sm:mb-5 text-center text-sm sm:text-base">Add a new task and it will show up here.</p>
            <button
                onClick={onAddTask}
                className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-green-700 transition-colors"
            >
                Add Your First Task
            </button>
        </div>
    </div>
);
