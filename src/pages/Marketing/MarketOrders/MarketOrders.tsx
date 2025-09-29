import React, { useState } from 'react';

export const MarketOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);

    // Sample order data
    const orders = [
        {
            id: '119969',
            orderTotal: '$11.95',
            status: ['Pending', 'New'],
            statusColors: ['bg-orange-100 text-orange-800', 'bg-green-100 text-green-800'],
            customer: 'Jackie Aprille',
            email: 'jlacrosse@kbstreamplus.com',
            date: 'Jul. 09, 2020'
        },
        {
            id: '119881',
            orderTotal: '$10.99',
            status: ['Pending', 'New'],
            statusColors: ['bg-orange-100 text-orange-800', 'bg-green-100 text-green-800'],
            customer: 'Ryan Cheverny',
            email: 'rcheverni@kbstreamplus.com',
            date: 'Jul. 07, 2020'
        },
        {
            id: '119859',
            orderTotal: '$13.67',
            status: ['Pending', 'New', 'Review'],
            statusColors: ['bg-orange-100 text-orange-800', 'bg-green-100 text-green-800', 'bg-blue-100 text-blue-800'],
            customer: 'Sally Bernini',
            email: 'berninis@streamplus.com',
            date: 'Jul. 06, 2020'
        },
        {
            id: '119800',
            orderTotal: '$24.14',
            status: ['Complete', 'Paid'],
            statusColors: ['bg-green-100 text-green-800', 'bg-green-100 text-green-800'],
            customer: 'Amber Chang',
            email: 'amberchang@streamplus.com',
            date: 'Jul. 06, 2020'
        },
        {
            id: '119797',
            orderTotal: '$24.14',
            status: ['Complete', 'Paid'],
            statusColors: ['bg-green-100 text-green-800', 'bg-green-100 text-green-800'],
            customer: 'Aisha Shanaham',
            email: 'aisha.shanaham@streamplus.com',
            date: 'Jun. 28, 2020'
        },
        {
            id: '119788',
            orderTotal: '$34.85',
            status: ['Complete', 'Paid'],
            statusColors: ['bg-green-100 text-green-800', 'bg-green-100 text-green-800'],
            customer: 'Jackie Aprille',
            email: 'jlacrosse@kbstreamplus.com',
            date: 'Jun. 26, 2020'
        },
        {
            id: '119675',
            orderTotal: '$6.64',
            status: ['Pending', 'New'],
            statusColors: ['bg-orange-100 text-orange-800', 'bg-green-100 text-green-800'],
            customer: 'Bobby Aprille',
            email: 'bobbyaprille@kbstreamplus.com',
            date: 'Jun. 11, 2020'
        },
        {
            id: '119632',
            orderTotal: '$25.19',
            status: ['Complete', 'Paid'],
            statusColors: ['bg-green-100 text-green-800', 'bg-green-100 text-green-800'],
            customer: 'Al Bondy',
            email: 'albondy@streamplus.com',
            date: 'Jun. 11, 2020'
        },
        {
            id: '119596',
            orderTotal: '$49.99',
            status: ['Complete', 'Paid'],
            statusColors: ['bg-green-100 text-green-800', 'bg-green-100 text-green-800'],
            customer: 'Aisha Bonze',
            email: 'aisha@streamplus.com',
            date: 'Jun. 11, 2020'
        },
        {
            id: '119564',
            orderTotal: '$8.68',
            status: ['Complete', 'Delivered'],
            statusColors: ['bg-green-100 text-green-800', 'bg-red-100 text-red-800'],
            customer: 'Jackie Aprille',
            email: 'jlacrosse@kbstreamplus.com',
            date: 'Jun. 11, 2020'
        },
        {
            id: '119547',
            orderTotal: '$7.95',
            status: ['Complete', 'Paid'],
            statusColors: ['bg-green-100 text-green-800', 'bg-green-100 text-green-800'],
            customer: 'Bobby Beerout',
            email: 'bobbybeerout@kbstreamplus.com',
            date: 'Jun. 11, 2020'
        },
        {
            id: '119494',
            orderTotal: '$8.68',
            status: ['Pending', 'New', 'Review', 'Ready for Pick Up'],
            statusColors: ['bg-orange-100 text-orange-800', 'bg-green-100 text-green-800', 'bg-blue-100 text-blue-800', 'bg-gray-100 text-gray-800'],
            customer: 'A J',
            email: 'ajashworth@kbstreamplus.com',
            date: 'Jun. 11, 2020'
        }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedOrders(orders.map(order => order.id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOrder = (id) => {
        setSelectedOrders(prev => {
            if (prev.includes(id)) {
                return prev.filter(orderId => orderId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const filteredOrders = orders.filter(order =>
        order.id.includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isAllSelected = selectedOrders.length === filteredOrders.length;
    const isPartiallySelected = selectedOrders.length > 0 && selectedOrders.length < filteredOrders.length;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Orders/Invoices</h1>
                <div className="flex items-center space-x-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                        Create New
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
                            placeholder="Search..."
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
                    <span className="text-sm text-gray-600">Group: Order Status Multiple</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Filter ▼</button>
                </div>
            </div>

            {/* Orders Table */}
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
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date ▼
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => handleSelectOrder(order.id)}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.orderTotal}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            {order.status.map((status, index) => (
                                                <span
                                                    key={index}
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${order.statusColors[index]}`}
                                                >
                                                    {status}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                                            <div className="text-sm text-gray-500">{order.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.date}
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

