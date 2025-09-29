import React, { useState } from "react";
import { FaEllipsisV, FaTrashAlt, FaImage } from "react-icons/fa";

export const Photos = () => {
  const [photos, setPhotos] = useState<
    { url: string; name: string; size: string; date: string }[]
  >([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`, // file size in KB
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDelete = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setMenuOpen(null);
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Equipment Photos
      </h2>
      <p className="text-gray-600 mb-4">
        Upload and manage photos of this equipment.
      </p>

      {/* Upload button */}
      <label className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer">
        + Add Image
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* No photos */}
      {photos.length === 0 ? (
        <p className="text-gray-500 mt-6">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="relative bg-white border rounded-md shadow-sm p-2 hover:shadow-md transition"
            >
              {/* Image with thumbnail style */}
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-[120px] object-contain mx-auto border rounded cursor-pointer"
                onClick={() => setSelectedPhoto(photo.url)}
              />

              {/* File info */}
              <div className="text-center mt-2 text-xs text-gray-600">
                <p className="truncate">{photo.name}</p>
                <p>
                  {photo.size} • {photo.date}
                </p>
              </div>

              {/* Three dots button */}
              <button
                onClick={() => setMenuOpen(menuOpen === i ? null : i)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <FaEllipsisV className="text-gray-600" />
              </button>

              {/* Dropdown menu */}
              {menuOpen === i && (
                <div className="absolute top-10 right-2 bg-white border rounded-md shadow-md w-36 z-10">
                  <button
                    onClick={() => setSelectedPhoto(photo.url)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                  >
                    <FaImage className="text-blue-600" /> View Photo
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-red-600"
                  >
                    <FaTrashAlt /> Delete Photo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✕
            </button>
            <img
              src={selectedPhoto}
              alt="Full view"
              className="w-full max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};
