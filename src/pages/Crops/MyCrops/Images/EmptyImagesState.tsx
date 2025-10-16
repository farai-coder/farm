import React from 'react';
import { Plus, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyImagesStateProps {
    onAddImage: () => void;
}

export const EmptyImagesState: React.FC<EmptyImagesStateProps> = ({ onAddImage }) => {

    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate('/crops/my-crops')}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to My Crops
                    </button>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Crop Images</h1>
                    </div>
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <button
                        onClick={onAddImage}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                    >
                        <Plus size={16} />
                        <span>Add Image</span>
                    </button>
                </div>

                {/* Empty State Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 flex flex-col items-center w-full max-w-8xl">
                            <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                                <Image className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">No images yet?</h3>
                            <p className="text-gray-600 mb-6 text-center max-w-md">
                                Upload your first crop image to get started with visual documentation.
                            </p>
                            <button
                                onClick={onAddImage}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                            >
                                Add your first image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};