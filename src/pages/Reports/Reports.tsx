import React, { useState } from 'react';
import { ChevronRight, Download, Calendar, DollarSign, TrendingUp, FileText, BarChart3, PieChart } from 'lucide-react';

export const StandardReports = () => {
    const [activeTab, setActiveTab] = useState('Accounting & Financials');

    const tabs = [
        'Accounting & Financials',
        'Livestock',
        'Plantings',
        'Orders & Market',
        'Resources',
        'User Activities'
    ];

    const reportSections = {
        'Accounting & Financials': {
            'Accounts Receivable': [
                { title: 'Accounts Receivable Due', icon: <Download size={16} /> },
                { title: 'Accounts Receivable Aging', icon: <Download size={16} /> }
            ],
            'Business Overview': [
                { title: 'Profit & Loss', icon: <TrendingUp size={16} /> },
                { title: 'Spending by Category', icon: <PieChart size={16} /> },
                { title: 'Tax Summary', icon: <FileText size={16} /> },
                { title: 'Profit & Loss by Month', icon: <BarChart3 size={16} /> },
                { title: 'IRS Schedule F Summary', icon: <FileText size={16} /> }
            ],
            'Financial Performance': [
                { title: 'Balance Sheet', icon: <FileText size={16} /> },
                { title: 'Crop Breakeven', icon: <TrendingUp size={16} /> },
                { title: 'Livestock Breakeven', icon: <TrendingUp size={16} /> },
                { title: 'Cash Flow Statement', icon: <BarChart3 size={16} /> },
                { title: 'Crop Transactions', icon: <Download size={16} /> },
                { title: 'Livestock Transactions', icon: <Download size={16} /> }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
           

            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Standard Reports</h1>

                    {/* Tab Navigation */}
                    <div className="flex items-center space-x-8 border-b border-gray-200 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-medium transition-colors ${activeTab === tab
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Reports Content */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-800">Accounting & Financials Reports</h2>

                        {Object.entries(reportSections['Accounting & Financials']).map(([sectionTitle, reports]) => (
                            <div key={sectionTitle}>
                                <h3 className="text-lg font-medium text-gray-700 mb-4">{sectionTitle}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                                    {reports.map((report, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-gray-400 group-hover:text-gray-600">
                                                        {report.icon}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                                                        {report.title}
                                                    </span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-12 text-center">
                        <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
                            <span className="text-sm">Want to do more with reporting?</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Build a custom report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

