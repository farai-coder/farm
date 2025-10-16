import React, { useState } from 'react';
import { ChevronLeft, MapPin, Eye, ArrowRight, Calendar, Users, BarChart3, FileText, Map, DollarSign, Image, File, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GrazingPage = () => {
    const [selectedTab, setSelectedTab] = useState('Details');
    const navigate = useNavigate();

    const tabs = [
        'Details', 'Plantings', 'Crop Plan', 'Planting History', 'Grazing',
        'Treatments', 'Nutrients', 'Schedule', 'Tasks', 'Notes', 'Map',
        'Accounting', 'Photos', 'Files'
    ];

    const sidebarItems = [
        { icon: Calendar, label: 'Schedule', active: false },
        { icon: Users, label: 'Tasks', active: false },
        { icon: Users, label: 'Livestock', active: true, hasSubmenu: true },
        { icon: Users, label: 'Plantings', active: false, hasSubmenu: true },
        { icon: Users, label: 'Resources', active: false, hasSubmenu: true },
        { icon: DollarSign, label: 'Accounting', active: false, hasSubmenu: true },
        { icon: Users, label: 'Market', active: false, hasSubmenu: true },
        { icon: Users, label: 'Contacts', active: false },
        { icon: Map, label: 'Farm Map', active: false },
        { icon: BarChart3, label: 'Climate', active: false, hasSubmenu: true },
        { icon: FileText, label: 'Reports', active: false, hasSubmenu: true },
    ];

    const livestockSubItems = [
        { label: 'Animals', active: false },
        { label: 'Livestock Groups', active: false },
        { label: 'Grazing', active: true },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
          

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
               
                
                {/* Content Area */}
                <div className="flex-1 flex">
                 

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                      

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => navigate('/crops/grow-locations')}
                                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors self-start"
                                >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Back to Grow Locations
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">tyyt</h1>
                                    <p className="text-gray-600">yt</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <ArrowRight className="w-4 h-4" />
                                    <span>Move into Location</span>
                                </button>
                            </div>
                        </div>

                        {/* Animals Actively Grazing Section */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs mr-3">
                                        0
                                    </div>
                                    Animals Actively Grazing
                                </h2>
                                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                                    <Eye className="w-4 h-4" />
                                    <span>View Animals</span>
                                </button>
                            </div>

                            
                        </div>

                        {/* Additional sections can be added here based on the selected tab */}
                        {selectedTab === 'Grazing' && (
                            <div className="mt-6 space-y-6">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Grazing History</h3>
                                    <div className="text-center py-8 text-gray-500">
                                        <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p>No grazing history recorded for this location yet.</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pasture Condition</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">--</div>
                                            <div className="text-sm text-gray-600">Grass Height</div>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">--</div>
                                            <div className="text-sm text-gray-600">Carrying Capacity</div>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">--</div>
                                            <div className="text-sm text-gray-600">Days Until Ready</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
