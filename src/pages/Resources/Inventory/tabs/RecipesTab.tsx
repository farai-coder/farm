import React from 'react';
import { Recipe } from '../types/inventory';

interface RecipesTabProps {
    showRecipeModal: boolean;
    setShowRecipeModal: (show: boolean) => void;
    recipes: Recipe[];
}

export const RecipesTab: React.FC<RecipesTabProps> = ({
    showRecipeModal,
    setShowRecipeModal,
    recipes
}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">Recipes</h3>
                <button
                    className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    onClick={() => setShowRecipeModal(true)}
                >
                    Add Recipe
                </button>
            </div>
            {recipes.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                    <div className="text-gray-500 mb-2">No recipes available</div>
                    <div className="text-gray-400 text-sm">Add recipes that use this inventory item.</div>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipe Name</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Makes</th>
                                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recipes.map((recipe) => (
                                    <tr key={recipe.id} className="hover:bg-gray-50">
                                        <td className="px-4 sm:px-6 py-4 text-sm font-medium text-blue-600">{recipe.name}</td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{recipe.makes} {recipe.unit}</td>
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                            <button className="text-red-600 hover:text-red-800">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};