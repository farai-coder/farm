import React, { useState } from 'react';
import { Plus, Search, Filter, Grid3X3, MoreHorizontal, X, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GrowLocationNotes = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [notes, setNotes] = useState([
        // {
        //     id: 1,
        //     date: 'Sep. 28, 2021',
        //     timeAgo: '4 months ago',
        //     content: 'Dennis Coles and Robert Diggs stopped by to examine the proposed greenhouse construction site',
        //     category: 'Planning',
        //     createdBy: 'Chris'
        // },
        // {
        //     id: 2,
        //     date: 'Aug. 23, 2021',
        //     timeAgo: '5 months ago',
        //     content: 'It was very early the third week of August - seeing some issues with nutrient uptake and over-watering with the pepper plants',
        //     category: 'Treatment',
        //     createdBy: 'Chris'
        // },
        // {
        //     id: 3,
        //     date: 'Jul. 07, 2021',
        //     timeAgo: '7 months ago',
        //     content: 'Inferno peppers are sprouting earlier this year - possibly from the GroBig application?',
        //     category: 'Observation',
        //     createdBy: 'Chris'
        // }
    ]);

    const [newNote, setNewNote] = useState({
        content: '',
        category: 'Observation'
    });

    // State for note actions
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);

    // Filter notes based on search term and category filter
    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Planning': return 'bg-blue-500';
            case 'Treatment': return 'bg-green-500';
            case 'Observation': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    const handleAddNote = () => {
        if (!newNote.content.trim()) return;

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const timeAgo = 'Just now';

        const note = {
            id: notes.length + 1,
            date: formattedDate,
            timeAgo,
            content: newNote.content,
            category: newNote.category,
            createdBy: 'You'
        };

        setNotes([note, ...notes]);
        setNewNote({ content: '', category: 'Observation' });
        setModalOpen(false);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setFilterOpen(false);
    };

    // Note actions handlers
    const handleMenuClick = (noteId, event) => {
        event.stopPropagation();
        setMenuOpen(menuOpen === noteId ? null : noteId);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setActionModalOpen(true);
        setMenuOpen(null);
    };

    const handleDeleteNote = (note) => {
        if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
            setNotes(notes.filter(n => n.id !== note.id));
        }
        setMenuOpen(null);
    };

    const handleUpdateNote = () => {
        if (!selectedNote.content.trim()) return;

        setNotes(notes.map(note =>
            note.id === selectedNote.id ? selectedNote : note
        ));
        setActionModalOpen(false);
        setSelectedNote(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => navigate('/crops/grow-locations')}
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors self-start"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Grow Locations
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">Northwest Field A (CSA Shares)</h1>
                            <div className="flex items-center flex-wrap gap-2 mt-1">
                                <p className="text-sm text-gray-600">2.5 Acre</p>
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Active</span>
                            </div>
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
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto order-2 sm:order-1"
                    >
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
                                        <button
                                            onClick={() => handleCategoryFilter('All')}
                                            className={`w-full text-left px-4 py-2 text-sm ${selectedCategory === 'All' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            All Categories
                                        </button>
                                        <button
                                            onClick={() => handleCategoryFilter('Planning')}
                                            className={`w-full text-left px-4 py-2 text-sm ${selectedCategory === 'Planning' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Planning
                                        </button>
                                        <button
                                            onClick={() => handleCategoryFilter('Treatment')}
                                            className={`w-full text-left px-4 py-2 text-sm ${selectedCategory === 'Treatment' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Treatment
                                        </button>
                                        <button
                                            onClick={() => handleCategoryFilter('Observation')}
                                            className={`w-full text-left px-4 py-2 text-sm ${selectedCategory === 'Observation' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Observation
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {notes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 px-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center w-full max-w-8xl">
                            <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">No notes found</h3>
                            <p className="text-gray-600 mb-6 text-center max-w-md">
                                No notes available to display. Create your first note to start tracking observations and activities.
                            </p>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-base font-medium transition-colors"
                            >
                                Create your first note
                            </button>
                        </div>
                    </div>
                )}

                {/* Notes List */}
                {notes.length > 0 && (
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

                                    <div className="ml-2 sm:ml-4 flex-shrink-0 relative">
                                        <button
                                            onClick={(e) => handleMenuClick(note.id, e)}
                                            className="text-gray-400 hover:text-gray-600 p-1 flex flex-col items-center"
                                        >
                                            <div className="w-1 h-1 bg-current rounded-full mb-0.5"></div>
                                            <div className="w-1 h-1 bg-current rounded-full mb-0.5"></div>
                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {menuOpen === note.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleEditNote(note)}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                                                    >
                                                        <Edit size={16} className="mr-3 text-green-600" />
                                                        Edit Note
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteNote(note)}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                    >
                                                        <Trash2 size={16} className="mr-3 text-green-600" />
                                                        Delete Note
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Search Results State */}
                {notes.length > 0 && filteredNotes.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
                        <p className="text-gray-600 mb-4 px-4">
                            {searchTerm ? 'Try adjusting your search terms.' : 'No notes match the selected filter.'}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}

                {/* Footer */}
                {notes.length > 0 && filteredNotes.length > 0 && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Showing {filteredNotes.length} of {notes.length} notes
                    </div>
                )}

                {/* Add Note Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Add New Note</h2>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={newNote.category}
                                        onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="Observation">Observation</option>
                                        <option value="Planning">Planning</option>
                                        <option value="Treatment">Treatment</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Note Content
                                    </label>
                                    <textarea
                                        value={newNote.content}
                                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                        placeholder="Enter your note here..."
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddNote}
                                    disabled={!newNote.content.trim()}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Add Note
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Note Modal */}
                {actionModalOpen && selectedNote && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Edit Note</h2>
                                <button
                                    onClick={() => setActionModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={selectedNote.category}
                                        onChange={(e) => setSelectedNote({ ...selectedNote, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="Observation">Observation</option>
                                        <option value="Planning">Planning</option>
                                        <option value="Treatment">Treatment</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Note Content
                                    </label>
                                    <textarea
                                        value={selectedNote.content}
                                        onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                                        placeholder="Enter your note here..."
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={() => setActionModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateNote}
                                    disabled={!selectedNote.content.trim()}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};