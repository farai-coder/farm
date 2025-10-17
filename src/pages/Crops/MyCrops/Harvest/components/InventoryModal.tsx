interface NewTypeModalProps {
    closeModal: () => void;
    // Add any additional props you might need in the future
}

const NewTypeModal: React.FC<NewTypeModalProps> = ({ closeModal }) => {
    return (
        <>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Inventory Type</h2>
                        <div className="flex items-center mt-2 space-x-2 sm:space-x-4 overflow-x-auto">
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                                <span className="text-sm font-medium text-gray-800">Define Inventory Type</span>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
                                <span className="text-sm text-gray-500">Add Inventory to Warehouses</span>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                                <span className="text-sm text-gray-500">Complete</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <div className="px-4 sm:px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Type Name</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            placeholder="Seed, vaccine, grain, etc"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Variety</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Internal ID / SKU</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Electronic Id</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory Unit</label>
                    <div className="sm:col-span-2">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option>quantity</option>
                            <option>kilogram</option>
                            <option>pounds</option>
                            <option>gallons</option>
                            <option>bales</option>
                            <option>fluid ounces</option>
                            <option>quarts</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Estimated Value Per Unit</label>
                    <div className="sm:col-span-2 flex items-center space-x-2">
                        <span className="text-gray-500">$</span>
                        <input
                            type="number"
                            step="0.01"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Estimated Kg Per Unit</label>
                    <div className="sm:col-span-2 flex items-center space-x-2">
                        <input
                            type="number"
                            step="0.01"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500">kg</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Track Lots</label>
                    <div className="sm:col-span-2">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">Track individual inventory lots</span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Alert When Less Than</label>
                    <div className="sm:col-span-2 flex items-center space-x-2">
                        <input
                            type="number"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500">Units</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Email Inventory Alerts To</label>
                    <div className="sm:col-span-2">
                        <input
                            type="email"
                            placeholder="farai.rato@students.uz.ac.zw"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                    <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Description</label>
                    <div className="sm:col-span-2">
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default NewTypeModal;