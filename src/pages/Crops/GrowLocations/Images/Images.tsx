import React, { useState } from 'react';
import { Plus, Grid3X3, Search, Trash2, Download, Eye } from 'lucide-react';

export const GrowLocationImages = () => {
    const [selectedImages, setSelectedImages] = useState(new Set());

    // Sample images data matching the layout in the screenshot
    const images = [
        {
            id: 1,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 30, 2022',
            title: 'Green Tomatoes'
        },
        {
            id: 2,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 28, 2022',
            title: 'Red Peppers'
        },
        {
            id: 3,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 30, 2022',
            title: 'Leafy Vegetables'
        },
        {
            id: 4,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 26, 2022',
            title: 'Hot Peppers'
        },
        {
            id: 5,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: '',
            title: 'Crop Rows'
        },
        {
            id: 6,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: '',
            title: 'Red Tomatoes'
        }
    ];

    const handleImageSelect = (imageId) => {
        const newSelected = new Set(selectedImages);
        if (newSelected.has(imageId)) {
            newSelected.delete(imageId);
        } else {
            newSelected.add(imageId);
        }
        setSelectedImages(newSelected);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                        <p className="text-sm text-gray-600">2.5 Acre <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">Active</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                            <Grid3X3 size={16} />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Plus size={16} />
                        <span>Add Image</span>
                    </button>

                    <div className="text-sm text-gray-600">
            // 100 Images (Max 10 MBs each)
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative group">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                            <Eye size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                            <Download size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                            <Trash2 size={16} className="text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">{image.title}</h3>
                                        {image.date && (
                                            <p className="text-xs text-gray-500 mt-1">{image.date}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 p-1">
                                            <Search size={14} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 p-1">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                        Load More Images
                    </button>
                </div>
            </div>
        </div>
    );
};
