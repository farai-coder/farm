import React, { useState } from 'react';
import { Plus, Grid3X3, Search, Trash2, Download, Eye, ArrowLeft, X, Camera, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyImagesState } from './EmptyImagesState';

export const MyCropsImages = () => {
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [downloadLoading, setDownloadLoading] = useState(null);
    const [showAddImageModal, setShowAddImageModal] = useState(false);
    const [newImageData, setNewImageData] = useState({
        title: '',
        description: '',
        cropType: '',
        healthStatus: 'Healthy',
        location: '',
        tags: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    // Enhanced sample images data with additional information
    const images = [
        {
            id: 1,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 30, 2022',
            title: 'Green Tomatoes',
            description: 'Early stage tomato plants showing healthy green fruits. These tomatoes are approximately 2-3 weeks from harvest.',
            cropType: 'Tomatoes',
            healthStatus: 'Healthy',
            location: 'North Field',
            size: '2.4 MB',
            resolution: '4000x3000',
            tags: ['tomato', 'green', 'healthy', 'organic']
        },
        {
            id: 2,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 28, 2022',
            title: 'Red Peppers',
            description: 'Mature red bell peppers ready for harvest. Grown using organic farming methods.',
            cropType: 'Bell Peppers',
            healthStatus: 'Ready for Harvest',
            location: 'Greenhouse A',
            size: '3.1 MB',
            resolution: '4000x3000',
            tags: ['pepper', 'red', 'harvest', 'organic']
        },
        {
            id: 3,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 30, 2022',
            title: 'Leafy Vegetables',
            description: 'Mixed leafy greens including spinach and kale. These are grown in raised beds with drip irrigation.',
            cropType: 'Leafy Greens',
            healthStatus: 'Thriving',
            location: 'Raised Bed Section',
            size: '2.8 MB',
            resolution: '4000x3000',
            tags: ['greens', 'spinach', 'kale', 'healthy']
        },
        {
            id: 4,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 26, 2022',
            title: 'Hot Peppers',
            description: 'Various hot pepper varieties including habanero and jalapeño. These peppers are known for their high spice levels.',
            cropType: 'Hot Peppers',
            healthStatus: 'Flowering',
            location: 'South Field',
            size: '2.9 MB',
            resolution: '4000x3000',
            tags: ['pepper', 'hot', 'spicy', 'flowering']
        },
        {
            id: 5,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 25, 2022',
            title: 'Crop Rows',
            description: 'Aerial view of organized crop rows showing efficient farming layout and irrigation systems.',
            cropType: 'Mixed Crops',
            healthStatus: 'Good',
            location: 'Main Field',
            size: '4.2 MB',
            resolution: '4000x3000',
            tags: ['aerial', 'rows', 'irrigation', 'layout']
        },
        {
            id: 6,
            src: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww',
            date: 'Jan. 24, 2022',
            title: 'Red Tomatoes',
            description: 'Fully ripe red tomatoes ready for market. These tomatoes have excellent color and size consistency.',
            cropType: 'Tomatoes',
            healthStatus: 'Ready for Market',
            location: 'North Field',
            size: '3.5 MB',
            resolution: '4000x3000',
            tags: ['tomato', 'red', 'ripe', 'market-ready']
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

    const handleAddImage = () => {
        setShowAddImageModal(true);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewImageData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitImage = (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select an image file');
            return;
        }

        // Here you would typically upload the file to your server
        // and save the image data along with it
        console.log('New image data:', {
            file: selectedFile,
            ...newImageData,
            tags: newImageData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        });

        // Reset form and close modal
        setNewImageData({
            title: '',
            description: '',
            cropType: '',
            healthStatus: 'Healthy',
            location: '',
            tags: ''
        });
        setSelectedFile(null);
        setImagePreview(null);
        setShowAddImageModal(false);

        alert('Image added successfully! (This is a demo - in a real app, the image would be uploaded)');
    };

    const handleViewImage = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleDownloadImage = async (image) => {
        setDownloadLoading(image.id);

        try {
            // Simulate download process
            const response = await fetch(image.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Show success feedback
            console.log(`Downloaded: ${image.title}`);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        } finally {
            setDownloadLoading(null);
        }
    };

    const handleDeleteImage = (imageId, event) => {
        event.stopPropagation();
        if (window.confirm('Are you sure you want to delete this image?')) {
            console.log('Delete image:', imageId);
            // In a real app, you would remove the image from your state/backend
            alert('Image deleted! (This is a demo - in a real app, the image would be removed)');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    const closeAddImageModal = () => {
        setShowAddImageModal(false);
        setNewImageData({
            title: '',
            description: '',
            cropType: '',
            healthStatus: 'Healthy',
            location: '',
            tags: ''
        });
        setSelectedFile(null);
        setImagePreview(null);
    };

    // Return empty state if no images
    if (images.length === 0) {
        return <EmptyImagesState onAddImage={handleAddImage} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate('/crops/my-crops')}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
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
                            <Grid3X3 size={16} />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <button
                        onClick={handleAddImage}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                    >
                        <Plus size={16} />
                        <span>Add Image</span>
                    </button>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative group">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-40 sm:h-48 object-cover"
                                />

                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleViewImage(image)}
                                            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <Eye size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDownloadImage(image)}
                                            disabled={downloadLoading === image.id}
                                            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                                        >
                                            <Download size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteImage(image.id, e)}
                                            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <Trash2 size={14} className="text-red-600 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">{image.title}</h3>
                                        {image.date && (
                                            <p className="text-xs text-gray-500 mt-1">{image.date}</p>
                                        )}
                                        <p className="text-xs text-gray-600 mt-1 capitalize">{image.cropType}</p>
                                    </div>
                                    <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
                                        <button
                                            onClick={(e) => handleDeleteImage(image.id, e)}
                                            className="text-red-600 hover:text-red-800 p-1 transition-colors"
                                        >
                                            <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Image Modal */}
                {showAddImageModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Add New Crop Image</h2>
                                <button
                                    onClick={closeAddImageModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-600" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitImage} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                                <div className="space-y-6">
                                    {/* Image Upload Section */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Upload Image
                                        </label>
                                        <div className="flex flex-col items-center justify-center">
                                            {imagePreview ? (
                                                <div className="relative w-full max-w-xs">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-green-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedFile(null);
                                                            setImagePreview(null);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Camera className="w-8 h-8 mb-3 text-gray-400" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 10MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileSelect}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                                Image Title *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={newImageData.title}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Enter a descriptive title"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={newImageData.description}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Describe what's in the image..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Crop Type *
                                                </label>
                                                <select
                                                    id="cropType"
                                                    name="cropType"
                                                    value={newImageData.cropType}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                >
                                                    <option value="">Select crop type</option>
                                                    <option value="Tomatoes">Tomatoes</option>
                                                    <option value="Bell Peppers">Bell Peppers</option>
                                                    <option value="Hot Peppers">Hot Peppers</option>
                                                    <option value="Leafy Greens">Leafy Greens</option>
                                                    <option value="Root Vegetables">Root Vegetables</option>
                                                    <option value="Mixed Crops">Mixed Crops</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="healthStatus" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Health Status
                                                </label>
                                                <select
                                                    id="healthStatus"
                                                    name="healthStatus"
                                                    value={newImageData.healthStatus}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                >
                                                    <option value="Healthy">Healthy</option>
                                                    <option value="Thriving">Thriving</option>
                                                    <option value="Good">Good</option>
                                                    <option value="Flowering">Flowering</option>
                                                    <option value="Ready for Harvest">Ready for Harvest</option>
                                                    <option value="Ready for Market">Ready for Market</option>
                                                    <option value="Needs Attention">Needs Attention</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                                <MapPin size={14} className="inline mr-1" />
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={newImageData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="e.g., North Field, Greenhouse A"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                                Tags
                                            </label>
                                            <input
                                                type="text"
                                                id="tags"
                                                name="tags"
                                                value={newImageData.tags}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Enter tags separated by commas (e.g., tomato, organic, healthy)"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                                        >
                                            <Plus size={16} />
                                            <span>Add Image</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeAddImageModal}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Image Detail Modal */}
                {showModal && selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">{selectedImage.title}</h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-600" />
                                </button>
                            </div>

                            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
                                {/* Image Section */}
                                <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-50">
                                    <img
                                        src={selectedImage.src}
                                        alt={selectedImage.title}
                                        className="max-h-96 lg:max-h-full max-w-full object-contain rounded-lg"
                                    />
                                </div>

                                {/* Info Section */}
                                <div className="lg:w-1/2 p-6 overflow-y-auto">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                                            <p className="text-gray-800">{selectedImage.description}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Crop Type</h3>
                                                <p className="text-gray-800">{selectedImage.cropType}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Health Status</h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedImage.healthStatus === 'Healthy' || selectedImage.healthStatus === 'Thriving'
                                                        ? 'bg-green-100 text-green-800'
                                                        : selectedImage.healthStatus === 'Ready for Harvest' || selectedImage.healthStatus === 'Ready for Market'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {selectedImage.healthStatus}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                                                <p className="text-gray-800">{selectedImage.location}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Date Taken</h3>
                                                <p className="text-gray-800">{selectedImage.date}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">File Size</h3>
                                                <p className="text-gray-800">{selectedImage.size}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Resolution</h3>
                                                <p className="text-gray-800">{selectedImage.resolution}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedImage.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={() => handleDownloadImage(selectedImage)}
                                                disabled={downloadLoading === selectedImage.id}
                                                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                                            >
                                                {downloadLoading === selectedImage.id ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Downloading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download size={16} />
                                                        <span>Download</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Load More */}
                <div className="text-center mt-6 sm:mt-8">
                    <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors w-full sm:w-auto">
                        Load More Images
                    </button>
                </div>
            </div>
        </div>
    );
};