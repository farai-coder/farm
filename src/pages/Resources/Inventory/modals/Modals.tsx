import React from 'react';
import { X, Bold, Italic, Underline, List, AlignLeft, Link, MapPin, Paperclip } from 'lucide-react';
import { ModalType, Note } from '../types/inventory';

interface ModalsProps {
    showModal: boolean;
    modalType: ModalType;
    closeModal: () => void;
    openWarehouseModal?: () => void;
    showUploadModal?: boolean;
    handleCloseUploadModal?: () => void;
    handleFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showNewNoteModal?: boolean;
    handleCloseNewNoteModal?: () => void;
    handleSaveNote?: () => void;
    newNote?: Note;
    setNewNote?: (note: Note) => void;
    showRecipeModal?: boolean;
    setShowRecipeModal?: (show: boolean) => void;
}

interface ModalProps {
    closeModal: () => void;
}

interface AddInventoryModalProps extends ModalProps {
    openWarehouseModal: () => void;
}

interface AdjustModalProps extends ModalProps {
    openWarehouseModal: () => void;
}

interface NewNoteModalProps {
    handleCloseNewNoteModal: () => void;
    handleSaveNote: () => void;
    newNote: Note;
    setNewNote: (note: Note) => void;
}

interface RecipeModalProps {
    setShowRecipeModal: (show: boolean) => void;
}

interface UploadPhotoModalProps {
    handleCloseUploadModal: () => void;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddInventoryModal: React.FC<AddInventoryModalProps> = ({ closeModal, openWarehouseModal }) => {
    return (
        <>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Add Inventory</h2>
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
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory</label>
                    <div className="sm:col-span-2">
                        <span className="text-sm text-gray-900">Seed (Rye) - 0.00 Available</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Add</label>
                    <div className="sm:col-span-2 flex items-center space-x-2">
                        <input
                            type="number"
                            step="0.01"
                            defaultValue="0.00"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500 text-sm">quantity</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Date</label>
                    <div className="sm:col-span-2">
                        <input
                            type="date"
                            defaultValue="2025-09-28"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Warehouse</label>
                    <div className="sm:col-span-2">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option>Select warehouse</option>
                        </select>
                        <button
                            onClick={openWarehouseModal}
                            className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
                        >
                            + Add warehouse
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Source</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                    <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Reason</label>
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                    Save
                </button>
            </div>
        </>
    );
};

const WarehouseModal: React.FC<ModalProps> = ({ closeModal }) => {
    return (
        <>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Warehouse</h2>
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
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Name</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Internal ID</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Track Capacity</label>
                    <div className="sm:col-span-2 space-y-2">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="trackCapacity" defaultChecked className="text-blue-600" />
                            <span className="text-sm text-gray-700">In separate bins</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="trackCapacity" className="text-blue-600" />
                            <span className="text-sm text-gray-700">Only in this location</span>
                        </label>
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                    Save
                </button>
            </div>
        </>
    );
};

const RemoveModal: React.FC<ModalProps> = ({ closeModal }) => {
    return (
        <>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Use Inventory</h2>
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
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory</label>
                    <div className="sm:col-span-2">
                        <span className="text-sm text-gray-900">Seed (Rye) - 0.00 Available</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Remove</label>
                    <div className="sm:col-span-2 flex items-center space-x-2">
                        <input
                            type="number"
                            step="0.01"
                            defaultValue="0.00"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500 text-sm">quantity</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Date</label>
                    <div className="sm:col-span-2">
                        <input
                            type="date"
                            defaultValue="2025-09-28"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Warehouse</label>
                    <div className="sm:col-span-2">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option>Select warehouse</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <div></div>
                    <div className="sm:col-span-2">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">Exclude from usage calculations</span>
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                    <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Reason</label>
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                    Save
                </button>
            </div>
        </>
    );
};

const AdjustModal: React.FC<AdjustModalProps> = ({ closeModal, openWarehouseModal }) => {
    return (
        <>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Manually Adjust Inventory Amount</h2>
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
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Inventory</label>
                    <div className="sm:col-span-2">
                        <span className="text-sm text-gray-900">Seed (Rye) - 0.00 Available</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Available Inventory</label>
                    <div className="sm:col-span-2 flex items-center space-x-2">
                        <input
                            type="number"
                            step="0.01"
                            defaultValue="0.00"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500 text-sm">quantity</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Date</label>
                    <div className="sm:col-span-2">
                        <input
                            type="date"
                            defaultValue="2025-09-28"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Warehouse</label>
                    <div className="sm:col-span-2">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option>Select warehouse</option>
                        </select>
                        <button
                            onClick={openWarehouseModal}
                            className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
                        >
                            + Add warehouse
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 sm:text-right">Source</label>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                    <label className="text-sm font-medium text-gray-700 pt-2 sm:text-right">Reason</label>
                    <div className="sm:col-span-2">
                        <textarea
                            rows={3}
                            defaultValue="Manual Adjustment"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
                    Save
                </button>
            </div>
        </>
    );
};

const NewTypeModal: React.FC<ModalProps> = ({ closeModal }) => {
    return (
        <>
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">New Inventory Type</h2>
                        <div className="flex items-center mt-2 space-x-2 sm:space-x-4 overflow-x-auto">
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                                <span className="text-sm font-medium text-gray-800">Define Inventory Type</span>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">2</div>
                                <span className="text-sm text-gray-500">Add Inventory to Warehouses</span>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">✓</div>
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

const NewNoteModal: React.FC<NewNoteModalProps> = ({
    handleCloseNewNoteModal,
    handleSaveNote,
    newNote,
    setNewNote
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">New Note for Seed (Rre)</h2>
                    <button
                        onClick={handleCloseNewNoteModal}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="border border-gray-300 rounded-t-md">
                        <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
                            <select className="text-sm border-none bg-transparent">
                                <option>Normal</option>
                            </select>
                            <div className="border-l border-gray-300 h-6 mx-2"></div>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <Bold size={16} />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <Italic size={16} />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <Underline size={16} />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <span className="text-sm">S</span>
                            </button>
                            <div className="border-l border-gray-300 h-6 mx-2"></div>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <List size={16} />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <AlignLeft size={16} />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <span className="text-sm">≡</span>
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <span className="text-sm">⋯</span>
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                                <Link size={16} />
                            </button>
                        </div>
                        <textarea
                            placeholder="Add note or comment"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            rows={6}
                            className="w-full px-3 py-2 border-none resize-none focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="date"
                                value={newNote.date}
                                onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Keywords"
                                    value={newNote.keywords}
                                    onChange={(e) => setNewNote({ ...newNote, keywords: e.target.value })}
                                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="absolute right-2 top-2 text-gray-400">🏷️</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <select
                            value={newNote.assignTask}
                            onChange={(e) => setNewNote({ ...newNote, assignTask: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="">Assign Task</option>
                            <option value="task1">Task 1</option>
                            <option value="task2">Task 2</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="addToCalendar"
                            checked={newNote.addToCalendar}
                            onChange={(e) => setNewNote({ ...newNote, addToCalendar: e.target.checked })}
                            className="rounded"
                        />
                        <label htmlFor="addToCalendar" className="text-sm text-gray-700">
                            Add to Calendar
                        </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <button className="flex items-center space-x-1 hover:text-gray-800">
                            <MapPin size={16} />
                            <span>Add Map Location</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-800">
                            <Paperclip size={16} />
                            <span>Add Attachment</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                        onClick={handleCloseNewNoteModal}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveNote}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

const RecipeModal: React.FC<RecipeModalProps> = ({ setShowRecipeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Add New Recipe</h2>
                        <button
                            onClick={() => setShowRecipeModal(false)}
                            className="text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                <div className="px-4 sm:px-6 py-4 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter recipe name"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Makes</label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select unit</option>
                                <option value="quantity">quantity</option>
                                <option value="pounds">pounds</option>
                                <option value="gallons">gallons</option>
                                <option value="ounces">ounces</option>
                                <option value="liters">liters</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                        <textarea
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter recipe instructions..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                        <div className="border border-gray-300 rounded-md p-4">
                            <div className="text-center text-gray-500 py-4">
                                <p>No ingredients added yet</p>
                                <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                                    + Add ingredients
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        onClick={() => setShowRecipeModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setShowRecipeModal(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Recipe
                    </button>
                </div>
            </div>
        </div>
    );
};

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
    handleCloseUploadModal,
    handleFileUpload
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Upload Photo</h2>
                    <button
                        onClick={handleCloseUploadModal}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label
                            htmlFor="photo-upload"
                            className="cursor-pointer flex flex-col items-center"
                        >
                            <div className="text-gray-400 mb-2">📷</div>
                            <div className="text-sm text-gray-600 mb-1">Click to upload photos</div>
                            <div className="text-xs text-gray-500">Max 10MB each, 100 images total</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Modals: React.FC<ModalsProps> = ({
    showModal,
    modalType,
    closeModal,
    openWarehouseModal,
    showUploadModal,
    handleCloseUploadModal,
    handleFileUpload,
    showNewNoteModal,
    handleCloseNewNoteModal,
    handleSaveNote,
    newNote,
    setNewNote,
    showRecipeModal,
    setShowRecipeModal
}) => {

    const renderModalContent = (): React.ReactNode => {
        switch (modalType) {
            case 'add':
                return <AddInventoryModal closeModal={closeModal} openWarehouseModal={openWarehouseModal!} />;
            case 'warehouse':
                return <WarehouseModal closeModal={closeModal} />;
            case 'remove':
                return <RemoveModal closeModal={closeModal} />;
            case 'adjust':
                return <AdjustModal closeModal={closeModal} openWarehouseModal={openWarehouseModal!} />;
            case 'newType':
                return <NewTypeModal closeModal={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <>
            {showUploadModal && (
                <UploadPhotoModal
                    handleCloseUploadModal={handleCloseUploadModal!}
                    handleFileUpload={handleFileUpload!}
                />
            )}

            {showNewNoteModal && (
                <NewNoteModal
                    handleCloseNewNoteModal={handleCloseNewNoteModal!}
                    handleSaveNote={handleSaveNote!}
                    newNote={newNote!}
                    setNewNote={setNewNote!}
                />
            )}

            {showRecipeModal && (
                <RecipeModal setShowRecipeModal={setShowRecipeModal!} />
            )}

            {showModal && renderModalContent()}
        </>
    );
};