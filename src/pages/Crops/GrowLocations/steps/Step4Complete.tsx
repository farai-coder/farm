import React from 'react';

export const Step4Complete: React.FC = () => (
    <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
            <i className="fas fa-check text-2xl text-white"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Great! Field added!</h3>
        <p className="text-gray-500 mb-6">
            Map your field to calculate it's area. Then 'Add Plantings'
        </p>
        <div className="space-x-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
                Let's do this! Map field
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                Maybe later. Add Plantings
            </button>
        </div>
    </div>
);
