import React, { useState } from "react";

export const EquipmentFiles = () => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles = Array.from(selected).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Equipment Files
      </h2>
      <p className="text-gray-600 mb-4">
        Store manuals, warranties, and other documents.
      </p>

      {/* Upload button */}
      <label className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer">
        + Add File
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Files list */}
      {files.length === 0 ? (
        <p className="text-gray-500 mt-6">No files uploaded yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex justify-between items-center border rounded-md p-3"
            >
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {file.name}
              </a>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
