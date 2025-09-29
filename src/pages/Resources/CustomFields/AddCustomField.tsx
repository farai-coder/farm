import React from "react";

interface AddCustomFieldProps {
  onCancel: () => void;
  onCreate: () => void;
}

export const AddCustomField: React.FC<AddCustomFieldProps> = ({ onCancel, onCreate }) => {
  return (
    <div className="flex-1 p-6 bg-white overflow-y-auto max-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Custom Field</h2>

      {/* 🔹 Farmbrite documentation text */}
      <div className="prose prose-sm text-gray-700 mb-6">
        <p>
          Farmbrite has many customizable features to help meet the needs of your
          agricultural business. There are all types of settings, configurations,
          and options to tailor it to your requirements. Along with those, you'll
          also be able to create custom fields to track the data that is unique to
          your operation to further customize the software. You can even filter
          the custom fields to only show up on animals and crops that meet specific
          criteria. Perhaps you have a measurement that is specific to a certain
          animal type, or a need to track a unique attribute on a crop harvest that
          only applies to specific crop types. You'll have many options to get just
          what you're looking for.
        </p>

        <p className="font-semibold">
          Note: Custom fields are only available on Farmbrite's Performance and Premium Plans.
        </p>

        <h4>You can create custom fields for:</h4>
        <ul>
          <li>Livestock</li>
          <li>Livestock Treatments</li>
          <li>Livestock Yields</li>
          <li>Livestock Measurements</li>
          <li>Equipment</li>
          <li>Crop Types</li>
          <li>Plantings</li>
          <li>Planting Treatments</li>
          <li>Planting Harvests</li>
          <li>Grow Location Treatments</li>
        </ul>
      </div>

      {/* 🔹 Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 block w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Show On</label>
          <select className="mt-1 block w-full border rounded-md px-3 py-2">
            <option>Equipment</option>
            <option>Livestock</option>
            <option>Crop</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Field Type</label>
          <select className="mt-1 block w-full border rounded-md px-3 py-2">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="yesno">Yes/No</option>
            <option value="dropdown">Dropdown</option>
            <option value="multiselect">Multi-Select</option>
            <option value="paragraph">Paragraph</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description / Helper Text</label>
          <textarea className="mt-1 block w-full border rounded-md px-3 py-2" rows={3} />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
