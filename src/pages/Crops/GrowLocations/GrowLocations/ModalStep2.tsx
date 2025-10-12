import React from 'react';

interface ModalStep2Props {
    formData: {
        areaSize: string;
        estimatedLandValue: number;
        status: 'Active' | 'Inactive';
        lightProfile: string;
        grazingRestDays: string;
        description: string;
    };
    onInputChange: (field: string, value: any) => void;
}

export const ModalStep2: React.FC<ModalStep2Props> = ({ formData, onInputChange }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area Size</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="0.00"
                            value={formData.areaSize}
                            onChange={(e) => onInputChange('areaSize', e.target.value)}
                            className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">Acres</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Land Value</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={formData.estimatedLandValue}
                            onChange={(e) => onInputChange('estimatedLandValue', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => onInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Light Profile</label>
                    <select
                        value={formData.lightProfile}
                        onChange={(e) => onInputChange('lightProfile', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Select Light Profile</option>
                        <option value="Full Sun">Full Sun</option>
                        <option value="Partial Sun">Partial Sun</option>
                        <option value="Partial Shade">Partial Shade</option>
                        <option value="Full Shade">Full Shade</option>
                        <option value="Artificial Light">Artificial Light</option>
                        <option value="Greenhouse">Greenhouse</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grazing Rest Days</label>
                <div className="relative">
                    <input
                        type="number"
                        placeholder="0"
                        value={formData.grazingRestDays}
                        onChange={(e) => onInputChange('grazingRestDays', e.target.value)}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">Days</span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    placeholder="Add any additional details about this location..."
                    value={formData.description}
                    onChange={(e) => onInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
            </div>
        </div>
    );
};