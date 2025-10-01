import React from 'react';
import { Photo } from '../types/inventory';

interface PhotosTabProps {
    handleUploadPhoto: () => void;
    photos: Photo[];
    handleDeletePhoto: (photoId: number) => void;
}

export const PhotosTab: React.FC<PhotosTabProps> = ({
    handleUploadPhoto,
    photos,
    handleDeletePhoto
}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">Photos</h3>
                <button
                    className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    onClick={handleUploadPhoto}
                >
                    Add Attachment
                </button>
            </div>
            <div className="text-sm text-gray-600 mb-4">
                1 / 100 images (Max 10MBs each)
            </div>

            {photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative group">
                            <div className="border border-gray-200 rounded-lg p-2 bg-white">
                                <div className="relative">
                                    <img
                                        src={photo.url}
                                        alt={photo.name}
                                        className="w-full h-20 sm:h-24 object-cover rounded"
                                    />
                                    <button
                                        onClick={() => handleDeletePhoto(photo.id)}
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="text-xs">⋮</span>
                                    </button>
                                </div>
                                <div className="mt-2 text-xs text-gray-600">
                                    <div className="font-medium truncate">{photo.name}</div>
                                    <div>{photo.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                    <div className="text-gray-500 mb-2">No photos uploaded</div>
                    <div className="text-gray-400 text-sm">Add photos of this inventory item for reference.</div>
                </div>
            )}
        </div>
    );
};