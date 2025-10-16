// Legend.tsx
import React from 'react';
import { AREA_TYPES } from './type';

export const Legend: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Place Types</h4>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {AREA_TYPES.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};