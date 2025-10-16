import React from 'react';

interface NewTask {
    title: string;
    description: string;
    status: string;
    assignedTo: string;
    additionalCollaborators: string[];
    priority: string;
    dueDate: string;
    repeats: string;
    hoursSpent: string;
    associatedTo: string;
    taskColor: string;
}

interface NewTaskModalProps {
    newTask: NewTask;
    setNewTask: React.Dispatch<React.SetStateAction<NewTask>>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    colorOptions: string[];
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
    newTask,
    setNewTask,
    onClose,
    onSubmit,
    colorOptions
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold">New Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        ×
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                            <div className="flex items-center space-x-1 sm:space-x-2 p-2 border-b border-gray-200 overflow-x-auto">
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
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

                    <div className="flex flex-wrap gap-3 sm:gap-4">
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

                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
