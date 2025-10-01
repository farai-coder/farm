import React from 'react';

interface NotesTabProps {
    handleNewNote: () => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({ handleNewNote }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">Notes</h3>
                <button
                    className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    onClick={handleNewNote}
                >
                    Add Note
                </button>
            </div>
            <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-yellow-800">Storage Instructions</span>
                        <span className="text-xs text-yellow-600">2024-03-15</span>
                    </div>
                    <p className="text-sm text-yellow-700">Store in cool, dry place. Check for spoilage weekly.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-blue-800">Quality Note</span>
                        <span className="text-xs text-blue-600">2024-03-12</span>
                    </div>
                    <p className="text-sm text-blue-700">Last batch had excellent quality. Consider reordering from same supplier.</p>
                </div>
            </div>
        </div>
    );
};