import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, MoreVertical } from 'lucide-react';
import NewTypeModal from './InventoryModal';
import { useNavigate } from 'react-router-dom';

interface HarvestRecord {
    id: number;
    date: string;
    harvested: string;
    yieldRate: string;
    harvestedFrom: string;
    estValue: string;
    addedToInventory: string;
    loss: string;
    enteredBy: string;
    traceNumber: string;
}

interface HarvestTableProps {
    harvestHistory: HarvestRecord[];
}

export const HarvestTable: React.FC<HarvestTableProps> = ({ harvestHistory }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const handleAddToInventory = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleMenuClick = (recordId: number) => {
        setActiveDropdown(activeDropdown === recordId ? null : recordId);
    };

    const handleEdit = (recordId: number) => {
        setActiveDropdown(null);
        window.location.href = '/crops/my-crops/details';
    };

    const handleDelete = (recordId: number) => {
        setActiveDropdown(null);
        // Add delete logic here
        console.log('Delete record:', recordId);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Added mt-4 for margin top - you can adjust this value as needed */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Harvested</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">From</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Value</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Inventory</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Loss</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Entered By</th>
                                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Trace #</th>
                                <th className="px-2 sm:px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {harvestHistory.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">{record.date}</span>
                                            <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium text-xs">{record.harvested}</span>
                                            <span className="bg-gray-100 text-gray-600 px-1 py-0.5 rounded text-xs flex-shrink-0">{record.yieldRate}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 hidden sm:block">(14% Yield)</div>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900">{record.harvestedFrom}</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900">{record.estValue}</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                        {record.addedToInventory === 'Add to Inventory' ? (
                                            <span
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs"
                                                onClick={handleAddToInventory}
                                            >
                                                {record.addedToInventory}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-900">
                                                {record.addedToInventory}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">{record.loss}</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">{record.enteredBy}</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">{record.traceNumber}</span>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap relative">
                                        <button
                                            className="text-gray-400 hover:text-gray-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMenuClick(record.id);
                                            }}
                                        >
                                            <MoreVertical size={14} />
                                        </button>

                                        {activeDropdown === record.id && (
                                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => navigate('/crops/my-crops/details')}
                                                        className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Edit size={14} className="text-green-600 mr-2" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(record.id)}
                                                        className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Trash2 size={14} className="text-green-600 mr-2" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-700">Displaying 1 record</p>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <NewTypeModal closeModal={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
};