import React from 'react';

interface ActionButtonsProps {
    onCancel: () => void;
    onSave: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
            <button
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm md:text-base order-2 sm:order-1"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm md:text-base order-1 sm:order-2"
            >
                Save
            </button>
        </div>
    );
};
