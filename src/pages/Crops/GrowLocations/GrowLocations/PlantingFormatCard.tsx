import React from 'react';

interface PlantingFormatCardProps {
    title: string;
    description: string;
    icon: 'beds' | 'cover' | 'row' | 'hydroponic' | 'pots' | 'tables' | 'other';
    isSelected: boolean;
    onClick: () => void;
}

export const PlantingFormatCard: React.FC<PlantingFormatCardProps> = ({
    title,
    description,
    icon,
    isSelected,
    onClick
}) => {
    const renderIcon = () => {
        switch (icon) {
            case 'beds':
                return (
                    <div className="w-6 h-6 bg-gray-800 rounded mr-3 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-px">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                            ))}
                        </div>
                    </div>
                );
            case 'cover':
                return (
                    <div className="w-6 h-6 bg-green-600 rounded mr-3 flex items-center justify-center">
                        <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
                    </div>
                );
            case 'row':
                return (
                    <div className="w-6 h-6 bg-amber-600 rounded mr-3 flex items-center justify-center">
                        <div className="space-y-1">
                            <div className="w-4 h-0.5 bg-white"></div>
                            <div className="w-4 h-0.5 bg-white"></div>
                            <div className="w-4 h-0.5 bg-white"></div>
                        </div>
                    </div>
                );
            case 'hydroponic':
                return (
                    <div className="w-6 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center">
                        <div className="space-y-0.5">
                            <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                            <div className="w-4 h-px bg-white"></div>
                            <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'pots':
                return (
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                        <div className="relative">
                            <div className="w-5 h-4 bg-gray-700 rounded-b-lg"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-600 rounded-t"></div>
                        </div>
                    </div>
                );
            case 'tables':
                return (
                    <div className="w-6 h-6 bg-gray-700 rounded mr-3 flex items-center justify-center">
                        <div className="space-y-1">
                            <div className="w-4 h-1 bg-white rounded"></div>
                            <div className="flex justify-between">
                                <div className="w-0.5 h-2 bg-white rounded"></div>
                                <div className="w-0.5 h-2 bg-white rounded"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'other':
                return (
                    <div className="w-6 h-6 bg-purple-600 rounded mr-3 flex items-center justify-center">
                        <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                    </div>
                );
        }
    };

    return (
        <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${isSelected
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            onClick={onClick}
        >
            <div className="flex items-center mb-2">
                {renderIcon()}
                <span className="font-medium">{title}</span>
            </div>
            <p className="text-xs text-gray-600">{description}</p>
        </div>
    );
};