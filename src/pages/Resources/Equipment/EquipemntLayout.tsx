import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { EquipmentDetails } from './EquipmentDetails';
import { EquipmentSchedule } from './EquipmentSchedule';
import { EquipmentTasks } from './EquipmentTasks';
import { EquipmentNotes } from './EquipmentNotes';
import { EquipmentMaintenance } from './EquipmentMaintenance';
import { EquipmentAccounting } from './EquipmentAccounting';
import { Photos } from "../Photos/Photos";
import { EquipmentFiles } from "../Files/Files";
import { CustomFields } from "../CustomFields/CustomFields";

// Equipment Secondary Sidebar Component
const EquipmentSecondarySidebar: React.FC<{
    activeSubmenu: string;
    setActiveSubmenu: (submenu: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}> = ({
    activeSubmenu,
    setActiveSubmenu,
    isOpen,
    setIsOpen
}) => {
        const navigate = useNavigate();
        const location = useLocation();

        const equipmentMenuItems = [
            { id: 'details', label: 'Details', path: '/resources/equipment/details' },
            { id: 'schedule', label: 'Schedule', path: '/resources/equipment/schedule' },
            { id: 'tasks', label: 'Tasks', path: '/resources/equipment/tasks' },
            { id: 'notes', label: 'Notes', path: '/resources/equipment/notes' },
            { id: 'maintenance', label: 'Maintenance', path: '/resources/equipment/maintenance' },
            { id: 'accounting', label: 'Accounting', path: '/resources/equipment/accounting' },
            { id: 'photos', label: 'Photos', path: '/resources/equipment/photos' },
            { id: 'files', label: 'Files', path: '/resources/equipment/files' },
            { id: 'custom-fields', label: 'Custom Fields', path: '/resources/equipment/custom-fields' },
        ];

        React.useEffect(() => {
            const currentPath = location.pathname;
            const activeItem = equipmentMenuItems.find(item => currentPath.includes(item.id));
            if (activeItem) {
                setActiveSubmenu(activeItem.id);
            }
        }, [location.pathname, setActiveSubmenu]);

        const handleMenuClick = (item: typeof equipmentMenuItems[0]) => {
            navigate(item.path);
            setActiveSubmenu(item.id);
            setIsOpen(false);
        };

        return (
            <>
                {/* Desktop Sidebar */}
                <div className="hidden md:block bg-gray-50 w-48 flex-shrink-0 relative h-full">
                    <div className="absolute right-0 top-0 h-screen w-px bg-gray-200"></div>
                    <div className="py-4">
                        {equipmentMenuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item)}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative ${activeSubmenu === item.id
                                    ? 'bg-white text-green-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                {item.label}
                                {activeSubmenu === item.id && (
                                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-600"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div
                    className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-16' : '-translate-y-full'
                        }`}
                >
                    <div className="h-full w-full flex flex-col">
                        {/* Mobile Drawer Header */}
                        <div className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 flex-shrink-0">
                            <span className="text-lg font-semibold text-gray-800">Equipment Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
                            {equipmentMenuItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleMenuClick(item)}
                                    className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${activeSubmenu === item.id
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-sm font-medium truncate">{item.label}</span>
                                    {activeSubmenu === item.id && (
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </>
        );
    };

// Main Equipment Layout Component
export const EquipmentLayout: React.FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();
    const [activeSubmenu, setActiveSubmenu] = useState<string>('details');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (!tab) {
            navigate('/resources/equipment', { replace: true });
            return;
        }
        setActiveSubmenu(tab);
    }, [tab, navigate]);

    if (!tab) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch (activeSubmenu) {
            case 'details':
                return <EquipmentDetails />;
            case 'schedule':
                return <EquipmentSchedule />;
            case 'tasks':
                return <EquipmentTasks />;
            case 'notes':
                return <EquipmentNotes />;
            case 'maintenance':
                return <EquipmentMaintenance />;
            case 'accounting':
                return <EquipmentAccounting />;
            case 'photos':
                return <Photos />;
            case 'files':
                return <EquipmentFiles />;
            case 'custom-fields':
                return <CustomFields />;
            default:
                return <EquipmentDetails />;
        }
    };

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden fixed top-20 left-4 z-30 text-gray-700 p-2 rounded-md bg-gray-100 hover:bg-gray-500 transition-colors duration-200"
            >
                <i className="fas fa-bars text-base"></i>
            </button>

            <div className="flex min-h-screen bg-gray-50">
                <EquipmentSecondarySidebar
                    activeSubmenu={activeSubmenu}
                    setActiveSubmenu={setActiveSubmenu}
                    isOpen={isDrawerOpen}
                    setIsOpen={setIsDrawerOpen}
                />
                {renderContent()}
            </div>
        </>
    );
};