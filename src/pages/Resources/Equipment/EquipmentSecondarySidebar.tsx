import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EquipmentSecondarySidebarProps {
    activeSubmenu: string;
    setActiveSubmenu: (tabId: string) => void;
}

interface MenuItem {
    id: string;
    label: string;
    icon: string;
}

// Equipment Secondary Sidebar Component
export const EquipmentSecondarySidebar: React.FC<EquipmentSecondarySidebarProps> = ({
    activeSubmenu,
    setActiveSubmenu
}) => {
    const navigate = useNavigate();

    const equipmentMenuItems: MenuItem[] = [
        { id: 'details', label: 'Details', icon: 'fa-info-circle' },
        { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-alt' },
        { id: 'tasks', label: 'Tasks', icon: 'fa-tasks' },
        { id: 'notes', label: 'Notes', icon: 'fa-sticky-note' },
        { id: 'maintenance', label: 'Maintenance', icon: 'fa-wrench' },
        { id: 'accounting', label: 'Accounting', icon: 'fa-calculator' },
        { id: 'photos', label: 'Photos', icon: 'fa-camera' },
        { id: 'files', label: 'Files', icon: 'fa-file-alt' },
        { id: 'custom-fields', label: 'Custom Fields', icon: 'fa-list' },
    ];

    const handleTabClick = (tabId: string) => {
        setActiveSubmenu(tabId);
        navigate(`/resources/equipment/${tabId}`);
    };

    return (
        <div className="bg-gray-50 w-48 flex-shrink-0 relative h-full border-r border-gray-200">
            <div className="py-4">
                {equipmentMenuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative flex items-center ${activeSubmenu === item.id
                            ? 'bg-white text-green-700 font-medium border-r-2 border-green-600'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};