import React, { useState } from "react";

interface Field {
  id: number;
  enabled: boolean;
  name: string;
  showOn: string;
  type: string;
  description: string;
}

export const CustomFields = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);

  // shared form state
  const [form, setForm] = useState<Field>({
    id: Date.now(),
    enabled: true,
    name: "",
    showOn: "Animal",
    type: "text",
    description: "",
  });

  const resetForm = () => {
    setForm({
      id: Date.now(),
      enabled: true,
      name: "",
      showOn: "Animal",
      type: "text",
      description: "",
    });
    setEditingField(null);
    setIsAdding(false);
  };

  const handleCreate = () => {
    if (editingField) {
      // update existing
      setFields((prev) =>
        prev.map((f) => (f.id === editingField.id ? { ...form } : f))
      );
    } else {
      // add new
      setFields([...fields, { ...form, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleEdit = (field: Field) => {
    setForm(field);
    setEditingField(field);
    setIsAdding(true);
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Custom Fields
      </h2>

      {!isAdding ? (
        <>
          <button
            onClick={() => setIsAdding(true)}
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Custom Field
          </button>

          {/* Table */}
          {fields.length === 0 ? (
            <p className="text-gray-500">No custom fields created yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Field Type</th>
                    <th className="px-4 py-2 text-left">Show On</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field) => (
                    <tr key={field.id} className="border-t">
                      <td className="px-4 py-2 text-blue-600 cursor-pointer">
                        {field.name}
                      </td>
                      <td className="px-4 py-2">{field.type}</td>
                      <td className="px-4 py-2">{field.showOn}</td>
                      <td className="px-4 py-2">
                        {field.enabled ? (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            Enabled
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            Disabled
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => handleEdit(field)}
                          className="text-blue-600 hover:underline mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(field.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                {fields.length} / 10 Custom Fields
              </p>
            </div>
          )}
        </>
      ) : (
        // Add/Edit Form
        <div className="space-y-6 max-w-xl">
          {/* Toggle */}
          <div className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <span className="text-sm font-medium text-gray-700">
              {form.enabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Show On */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show On
            </label>
            <select
              value={form.showOn}
              onChange={(e) => setForm({ ...form, showOn: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option>Animal</option>
              <option>Livestock</option>
              <option>Crops</option>
              <option>Equipment</option>
              <option>Plantings</option>
            </select>
          </div>

          {/* Field Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="yesno">Yes/No</option>
              <option value="dropdown">Dropdown</option>
              <option value="multiselect">Multi-Select</option>
              <option value="paragraph">Paragraph</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Helper Text
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingField ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
