import React, { useState } from 'react';
import { Plus, Search, Filter, Grid3X3, MoreHorizontal } from 'lucide-react';

export const GrowLocationNotes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    // Sample notes data matching the image
    const notes = [
        {
            id: 1,
            date: 'Sep. 28, 2021',
            timeAgo: '4 months ago',
            content: 'Dennis Coles and Robert Diggs stopped by to examine the proposed greenhouse construction site',
            category: 'Planning',
            createdBy: 'Chris'
        },
        {
            id: 2,
            date: 'Aug. 23, 2021',
            timeAgo: '5 months ago',
            content: 'It was very early the third week of August - seeing some issues with nutrient uptake and over-watering with the pepper plants',
            category: 'Treatment',
            createdBy: 'Chris'
        },
        {
            id: 3,
            date: 'Jul. 07, 2021',
            timeAgo: '7 months ago',
            content: 'Inferno peppers are sprouting earlier this year - possibly from the GroBig application?',
            category: 'Observation',
            createdBy: 'Chris'
        }
    ];

    const filteredNotes = notes.filter(note =>
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Planning': return 'bg-blue-500';
            case 'Treatment': return 'bg-green-500';
            case 'Observation': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">Northwest Field A (CSA Shares)</h1>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                            <p className="text-sm text-gray-600">2.5 Acre</p>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Active</span>
                        </div>
                    </div>
                    <div className="flex items-center self-end sm:self-auto">
                        <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                            <Grid3X3 size={16} />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto order-2 sm:order-1">
                        <Plus size={16} />
                        <span>New Note</span>
                    </button>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 order-1 sm:order-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Notes"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 pl-4 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
                            >
                                <Filter size={16} />
                                <span>Filter</span>
                            </button>

                            {filterOpen && (
                                <div className="absolute right-0 left-0 sm:left-auto mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                    <div className="py-1">
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            All Categories
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Planning
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Treatment
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Observation
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notes List */}
                <div className="space-y-4">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                        <span className="text-sm font-medium text-gray-900 break-words">{note.date}</span>
                                        <span className="text-sm text-gray-500 hidden sm:inline">{note.timeAgo}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-block w-2 h-2 rounded-full ${getCategoryColor(note.category)}`}></span>
                                            <span className="text-xs text-gray-500 uppercase tracking-wide break-words">{note.category}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-3 break-words">
                                        {note.content}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm text-gray-500 sm:hidden">{note.timeAgo}</span>
                                        <span className="text-sm text-gray-500 hidden sm:inline">Created by {note.createdBy}</span>
                                        <span className="text-sm text-gray-500 sm:hidden">• {note.createdBy}</span>
                                    </div>
                                </div>

                                <div className="ml-2 sm:ml-4 flex-shrink-0">
                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredNotes.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
                        <p className="text-gray-600 mb-4 px-4">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first note.'}
                        </p>
                        {!searchTerm && (
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                                Create First Note
                            </button>
                        )}
                    </div>
                )}

                {/* Footer */}
                {filteredNotes.length > 0 && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Showing {filteredNotes.length} of {notes.length} notes
                    </div>
                )}
            </div>
        </div>
    );
};