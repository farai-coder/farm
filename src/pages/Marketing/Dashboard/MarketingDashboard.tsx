import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MarketDashboardPage = () => {
    // Sample data for the charts
    const salesOverTimeData = [
        { month: 'Jan', value: 1200 },
        { month: 'Feb', value: 1800 },
        { month: 'Mar', value: 900 },
        { month: 'Apr', value: 2100 },
        { month: 'May', value: 1600 },
        { month: 'Jun', value: 3200 },
        { month: 'Jul', value: 2800 },
        { month: 'Aug', value: 2400 },
        { month: 'Sep', value: 3100 },
        { month: 'Oct', value: 2700 },
        { month: 'Nov', value: 2200 },
        { month: 'Dec', value: 1900 }
    ];

    const totalOrdersData = [
        { month: 'Jan', value: 8 },
        { month: 'Feb', value: 12 },
        { month: 'Mar', value: 6 },
        { month: 'Apr', value: 15 },
        { month: 'May', value: 10 },
        { month: 'Jun', value: 22 },
        { month: 'Jul', value: 18 },
        { month: 'Aug', value: 16 },
        { month: 'Sep', value: 24 },
        { month: 'Oct', value: 20 },
        { month: 'Nov', value: 14 },
        { month: 'Dec', value: 11 }
    ];

    const averageOrderValueData = [
        { month: 'Jan', value: 150 },
        { month: 'Feb', value: 150 },
        { month: 'Mar', value: 150 },
        { month: 'Apr', value: 140 },
        { month: 'May', value: 160 },
        { month: 'Jun', value: 145 },
        { month: 'Jul', value: 155 },
        { month: 'Aug', value: 150 },
        { month: 'Sep', value: 129 },
        { month: 'Oct', value: 135 },
        { month: 'Nov', value: 157 },
        { month: 'Dec', value: 172 }
    ];

    // Sample product data
    const topSellingProducts = [
        { name: 'Blueberries', revenue: '$3,592.54' },
        { name: 'Other Products', revenue: '$1,244.73' },
        { name: '5 Spring Olive Sauce', revenue: '$1,233.00' },
        { name: 'Homera insanity peppers', revenue: '$399.98' },
        { name: 'Artichokes', revenue: '$285.00' }
    ];

    // Sample recent orders
    const recentOrders = [
        { customer: 'Bobby Edwards', amount: '$9.99', date: 'Apr 16, 2020' },
        { customer: 'Jackson Aprille', amount: '$11.99', date: 'Apr 15, 2020' },
        { customer: 'Ashton Fifteenth', amount: '$10.69', date: 'Apr 14, 2020' },
        { customer: 'Silver Daniels', amount: '$13.87', date: 'Apr 13, 2020' },
        { customer: 'Brenden Aprille', amount: '$9.99', date: 'Apr 12, 2020' },
        { customer: 'Brenden Aprille', amount: '$6.99', date: 'Apr 11, 2020' }
    ];

    // Sample top customers
    const topCustomers = [
        { name: 'Bob Supplier', amount: '$2,000.00' },
        { name: 'Harry Benjoon', amount: '$1,298.90' },
        { name: 'Tony Bourdillon', amount: '$728.24' },
        { name: 'Aimie Aprille', amount: '$363.17' },
        { name: 'Chris Boxton', amount: '$306.78' },
        { name: 'Brenden Aprille', amount: '$443.64' }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Market Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Dates:</span>
                    <div className="flex items-center space-x-2">
                        <input
                            type="date"
                            defaultValue="2019-01-01"
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                            type="date"
                            defaultValue="2019-12-31"
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <i className="fas fa-chart-bar text-gray-600"></i>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900">$11,388.97</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <i className="fas fa-shopping-cart text-gray-600"></i>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
                    <p className="text-3xl font-bold text-gray-900">324</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <i className="fas fa-users text-gray-600"></i>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Unique Customers</h3>
                    <p className="text-3xl font-bold text-gray-900">77</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Sales Over Time */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">SALES OVER TIME ($)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={salesOverTimeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">TOTAL ORDERS</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={totalOrdersData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Average Order Value */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">AVERAGE ORDER VALUE ($)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={averageOrderValueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Data Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Selling Products */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700">TOP SELLERS</h3>
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            {topSellingProducts.map((product, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-900">{product.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{product.revenue}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700">RECENT ORDERS</h3>
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            {recentOrders.map((order, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                        <p className="text-xs text-gray-500">{order.date}</p>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{order.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Customers */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700">TOP CUSTOMERS</h3>
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            {topCustomers.map((customer, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-900">{customer.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{customer.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

