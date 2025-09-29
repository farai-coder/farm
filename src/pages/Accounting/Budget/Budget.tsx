import React, { useState } from 'react';
import { Plus, X, MoreVertical, Printer } from 'lucide-react';

interface Budget {
    id: string;
    name: string;
    year: string;
    description: string;
    createdAt: Date;
}

interface BudgetCategory {
    id: string;
    name: string;
    type: 'income' | 'expense';
    monthlyValues: number[];
}

export const Budgeting: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);

    const [formData, setFormData] = useState({
        name: '2025 Budget',
        year: '2025',
        description: ''
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i - 2);

    const handleCreateBudget = () => {
        const newBudget: Budget = {
            id: Date.now().toString(),
            name: formData.name,
            year: formData.year,
            description: formData.description,
            createdAt: new Date()
        };

        setBudgets([...budgets, newBudget]);
        setSelectedBudget(newBudget);
        setShowModal(false);

        // Reset form
        setFormData({
            name: '2025 Budget',
            year: '2025',
            description: ''
        });

        // Initialize with empty categories
        setBudgetCategories([]);
    };

    const addIncomeCategory = () => {
        const newCategory: BudgetCategory = {
            id: `income-${Date.now()}`,
            name: 'New Income Category',
            type: 'income',
            monthlyValues: new Array(12).fill(0)
        };
        setBudgetCategories([...budgetCategories, newCategory]);
    };

    const addExpenseCategory = () => {
        const newCategory: BudgetCategory = {
            id: `expense-${Date.now()}`,
            name: 'New Expense Category',
            type: 'expense',
            monthlyValues: new Array(12).fill(0)
        };
        setBudgetCategories([...budgetCategories, newCategory]);
    };

    const updateCategoryValue = (categoryId: string, monthIndex: number, value: number) => {
        setBudgetCategories(categories =>
            categories.map(category =>
                category.id === categoryId
                    ? {
                        ...category,
                        monthlyValues: category.monthlyValues.map((val, idx) =>
                            idx === monthIndex ? value : val
                        )
                    }
                    : category
            )
        );
    };

    const calculateMonthlyTotals = (type: 'income' | 'expense') => {
        const categoryData = budgetCategories.filter(cat => cat.type === type);
        return months.map((_, monthIndex) =>
            categoryData.reduce((sum, category) => sum + category.monthlyValues[monthIndex], 0)
        );
    };

    const calculateTotal = (type: 'income' | 'expense') => {
        return calculateMonthlyTotals(type).reduce((sum, monthTotal) => sum + monthTotal, 0);
    };

    const calculateNetProfit = () => {
        const incomeByMonth = calculateMonthlyTotals('income');
        const expensesByMonth = calculateMonthlyTotals('expense');
        return months.map((_, monthIndex) => incomeByMonth[monthIndex] - expensesByMonth[monthIndex]);
    };

    // Empty State (No budgets created)
    if (budgets.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="px-6 py-4 bg-white border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-900">Budgeting</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                        New Budget
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-20">
                    {/* Dotted rectangle containing all the content */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center w-full max-w-2xl">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Nothing yet?</h3>
                        <p className="text-gray-600 mb-5 text-center">Add a budget and they'll show up here</p>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>Add Your First Budget</span>
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">New Budget</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Budget Year
                                    </label>
                                    <select
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleCreateBudget}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Budget Detail View
    if (selectedBudget) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        <button
                            onClick={() => setSelectedBudget(null)}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            Budgeting
                        </button>
                        <span>›</span>
                        <span>{selectedBudget.name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">{selectedBudget.name}</h1>
                            <span className="text-lg text-gray-600">{selectedBudget.year}</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                New Budget Category
                            </button>

                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <MoreVertical className="w-4 h-4" />
                            </button>

                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <Printer className="w-4 h-4" />
                            </button>

                            <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors text-sm">
                                Compare
                            </button>
                        </div>
                    </div>
                </div>

                {/* Budget Table */}
                <div className="p-6">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                                            Category
                                        </th>
                                        {months.map(month => (
                                            <th key={month} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {month}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Income Section */}
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-3 text-sm font-medium text-gray-900 flex items-center">
                                            INCOME
                                            <button
                                                onClick={addIncomeCategory}
                                                className="ml-2 text-blue-600 hover:text-blue-700"
                                                title="Add Income Category"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <span className="ml-auto text-blue-600 text-xs cursor-pointer">+ Add Income Category</span>
                                        </td>
                                        {months.map(() => (
                                            <td key={Math.random()} className="px-4 py-3"></td>
                                        ))}
                                        <td className="px-4 py-3"></td>
                                    </tr>

                                    {budgetCategories.filter(cat => cat.type === 'income').map(category => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-3 text-sm text-gray-900">{category.name}</td>
                                            {category.monthlyValues.map((value, monthIndex) => (
                                                <td key={monthIndex} className="px-4 py-3 text-center">
                                                    <input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) => updateCategoryValue(category.id, monthIndex, parseFloat(e.target.value) || 0)}
                                                        className="w-16 text-center border-0 bg-transparent focus:bg-white focus:border focus:border-blue-300 rounded px-1 py-1 text-sm"
                                                    />
                                                </td>
                                            ))}
                                            <td className="px-4 py-3 text-center text-sm font-medium">
                                                ${category.monthlyValues.reduce((sum, val) => sum + val, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Total Income */}
                                    <tr className="bg-gray-100 font-medium">
                                        <td className="px-6 py-3 text-sm text-gray-900">TOTAL INCOME</td>
                                        {calculateMonthlyTotals('income').map((monthTotal, index) => (
                                            <td key={index} className="px-4 py-3 text-center text-sm">
                                                ${monthTotal.toFixed(2)}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-center text-sm">
                                            ${calculateTotal('income').toFixed(2)}
                                        </td>
                                    </tr>

                                    {/* Expenses Section */}
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-3 text-sm font-medium text-gray-900 flex items-center">
                                            EXPENSES
                                            <button
                                                onClick={addExpenseCategory}
                                                className="ml-2 text-blue-600 hover:text-blue-700"
                                                title="Add Expense Category"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <span className="ml-auto text-blue-600 text-xs cursor-pointer">+ Add Expense Category</span>
                                        </td>
                                        {months.map(() => (
                                            <td key={Math.random()} className="px-4 py-3"></td>
                                        ))}
                                        <td className="px-4 py-3"></td>
                                    </tr>

                                    {budgetCategories.filter(cat => cat.type === 'expense').map(category => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-3 text-sm text-gray-900">{category.name}</td>
                                            {category.monthlyValues.map((value, monthIndex) => (
                                                <td key={monthIndex} className="px-4 py-3 text-center">
                                                    <input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) => updateCategoryValue(category.id, monthIndex, parseFloat(e.target.value) || 0)}
                                                        className="w-16 text-center border-0 bg-transparent focus:bg-white focus:border focus:border-blue-300 rounded px-1 py-1 text-sm"
                                                    />
                                                </td>
                                            ))}
                                            <td className="px-4 py-3 text-center text-sm font-medium">
                                                ${category.monthlyValues.reduce((sum, val) => sum + val, 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Total Expenses */}
                                    <tr className="bg-gray-100 font-medium">
                                        <td className="px-6 py-3 text-sm text-gray-900">TOTAL EXPENSES</td>
                                        {calculateMonthlyTotals('expense').map((monthTotal, index) => (
                                            <td key={index} className="px-4 py-3 text-center text-sm">
                                                ${monthTotal.toFixed(2)}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-center text-sm">
                                            ${calculateTotal('expense').toFixed(2)}
                                        </td>
                                    </tr>

                                    {/* Net Profit */}
                                    <tr className="bg-blue-50 font-semibold">
                                        <td className="px-6 py-3 text-sm text-gray-900">NET PROFIT</td>
                                        {calculateNetProfit().map((profit, index) => (
                                            <td key={index} className="px-4 py-3 text-center text-sm">
                                                ${profit.toFixed(2)}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-center text-sm">
                                            ${(calculateTotal('income') - calculateTotal('expense')).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Category Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Add Budget Category</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        addIncomeCategory();
                                        setShowModal(false);
                                    }}
                                    className="flex-1 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-center"
                                >
                                    <div className="text-green-600 font-medium">Income Category</div>
                                    <div className="text-sm text-gray-600 mt-1">Add revenue source</div>
                                </button>

                                <button
                                    onClick={() => {
                                        addExpenseCategory();
                                        setShowModal(false);
                                    }}
                                    className="flex-1 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-center"
                                >
                                    <div className="text-red-600 font-medium">Expense Category</div>
                                    <div className="text-sm text-gray-600 mt-1">Add cost item</div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Budget List View (if there are budgets but none selected)
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-6 py-4 bg-white border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Budgeting</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                    New Budget
                </button>
            </div>

            <div className="p-6">
                <div className="grid gap-4">
                    {budgets.map(budget => (
                        <div
                            key={budget.id}
                            onClick={() => setSelectedBudget(budget)}
                            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
                            <p className="text-gray-600">{budget.year}</p>
                            {budget.description && <p className="text-gray-500 mt-2">{budget.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
