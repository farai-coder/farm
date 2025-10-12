import React from 'react';

interface Step2MapLocationProps {
    formData: any;
    handleInputChange: (field: string, value: any) => void;
}

export const Step2MapLocation: React.FC<Step2MapLocationProps> = ({
    formData,
    handleInputChange,
}) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Area/Size (Ha) <span className="text-blue-500">ⓘ</span>
            </label>
            <input
                type="number"
                step="0.1"
                value={formData.areaSize}
                onChange={(e) => handleInputChange('areaSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Land Value</label>
            <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                    type="number"
                    step="0.01"
                    value={formData.estimatedLandValue}
                    onChange={(e) => handleInputChange('estimatedLandValue', parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as 'Active' | 'Inactive')}
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
                onChange={(e) => handleInputChange('lightProfile', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
                <option value="">Select Light Profile</option>
                <option value="Full Sun">Full Sun</option>
                <option value="Partial Sun">Partial Sun</option>
                <option value="Shade">Shade</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Grazing Rest Days <span className="text-blue-500">ⓘ</span>
            </label>
            <input
                type="number"
                value={formData.grazingRestDays}
                onChange={(e) => handleInputChange('grazingRestDays', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
        </div>
    </div>
);
