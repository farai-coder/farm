import React, { useState } from 'react';

export const MarketProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Sample product data
    const products = [
        {
            id: 1,
            name: "A Storm's Out Sauce",
            available: 56.00,
            status: 'Available',
            statusColor: 'bg-yellow-100 text-yellow-800',
            category: '',
            price: '$7.95 - $5.50',
            image: '🌶️'
        },
        {
            id: 2,
            name: "Adobo BBQ Fish Sauce",
            available: 98.00,
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: 'Sauces',
            price: '$1.50 - $7.95',
            image: '🍯'
        },
        {
            id: 3,
            name: "Anna Teresa's Bulgarian Ajvar",
            available: 72.00,
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: 'Sauces',
            price: '$12.50 - $14.00',
            image: '🫙'
        },
        {
            id: 4,
            name: "Bison Chill",
            available: '',
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: '',
            price: '$22.99',
            image: '🥩'
        },
        {
            id: 5,
            name: "Blue bladeberries",
            available: 16.00,
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: '',
            price: '$9.00',
            image: '🫐'
        },
        {
            id: 6,
            name: "Blueberries",
            available: '',
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: 'Fruits and Fruit seeds',
            price: '$6.00',
            image: '🫐'
        },
        {
            id: 7,
            name: "Broccoli",
            available: 1472.00,
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: '',
            price: '$3.00',
            image: '🥦'
        },
        {
            id: 8,
            name: "Brussels",
            available: 322.00,
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: 'Vegetables and Vegetable Products',
            price: '$4.50',
            image: '🥬'
        },
        {
            id: 9,
            name: "Carolina Reaper Sauce",
            available: 11.00,
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: 'Sauces',
            price: '$11.95 - $11.95',
            image: '🌶️'
        },
        {
            id: 10,
            name: "Cascade Pricing",
            available: '',
            status: 'Hidden',
            statusColor: 'bg-gray-100 text-gray-800',
            category: '',
            price: '$15.00 - $15.00',
            image: '💰'
        },
        {
            id: 11,
            name: "Celeriac",
            available: 0.00,
            status: 'Back Ordered',
            statusColor: 'bg-red-100 text-red-800',
            category: 'CBD Products',
            price: '$5.50 - $0.00',
            image: '🥔'
        },
        {
            id: 12,
            name: "Cilantro 365",
            available: '',
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: '',
            price: '$6.50',
            image: '🌿'
        },
        {
            id: 13,
            name: "Coca Wine",
            available: '',
            status: 'Available',
            statusColor: 'bg-green-100 text-green-800',
            category: '',
            price: '$269.00',
            image: '🍷'
        }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(product => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (id) => {
        setSelectedProducts(prev => {
            if (prev.includes(id)) {
                return prev.filter(productId => productId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isAllSelected = selectedProducts.length === filteredProducts.length;
    const isPartiallySelected = selectedProducts.length > 0 && selectedProducts.length < filteredProducts.length;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                <div className="flex items-center space-x-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                        New Product
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Group: Status Multiple</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Filter ▼</button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        ref={input => {
                                            if (input) input.indeterminate = isPartiallySelected;
                                        }}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name ▲
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Available
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => handleSelectProduct(product.id)}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                                <span className="text-lg">{product.image}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.available || ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.statusColor}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
