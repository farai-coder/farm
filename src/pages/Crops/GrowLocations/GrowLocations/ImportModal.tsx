import React from 'react';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImportJSON: () => void;
    onImportCSV: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
    isOpen,
    onClose,
    onImportJSON,
    onImportCSV
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Import Grow Locations</h2>
                </div>

                <div className="px-6 py-6">
                    <p className="text-gray-600 mb-6">
                        Choose a file format to import your grow locations data.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                onImportJSON();
                                onClose();
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200"
                        >
                            <i className="fas fa-file-code text-2xl text-gray-600"></i>
                            <div className="text-left">
                                <div className="font-medium text-gray-900">Import from JSON</div>
                                <div className="text-sm text-gray-500">Import locations from a JSON file</div>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                onImportCSV();
                                onClose();
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200"
                        >
                            <i className="fas fa-file-csv text-2xl text-gray-600"></i>
                            <div className="text-left">
                                <div className="font-medium text-gray-900">Import from CSV</div>
                                <div className="text-sm text-gray-500">Import locations from a CSV file</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
