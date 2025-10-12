import React from 'react';

export const ModalStep3: React.FC = () => {
    return (
        <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-seedling text-2xl text-green-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Add Plantings</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                This step allows you to add plantings to your grow location. You can skip this for now and add plantings later.
            </p>
            <div className="text-sm text-gray-600">
                <p>Next: Add Plantings →</p>
            </div>
        </div>
    );
};
