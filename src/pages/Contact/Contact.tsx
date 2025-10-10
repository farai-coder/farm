import React, { useState, useEffect } from 'react';
import { Plus, Search, X, ChevronDown, MoreVertical, Edit, Trash2 } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from '../../authentication/AuthProvider'; // Adjust the import path as needed

export const ContactsPage = () => {
    const [showNewContactModal, setShowNewContactModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMenu, setActiveMenu] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactType: '',
        website: '',
        primaryPhone: '',
        mobilePhone: '',
        fax: '',
        company: '',
        address: '',
        city: '',
        country: '',
        stateProvince: '',
        postalCode: '',
        description: ''
    });

    // Get farmId from useAuth hook
    const { farmId } = useAuth();

    const contactTypes = [
        'Buyer',
        'Contractor',
        'Customer',
        'Employee',
        'Veterinarian',
        'Supplier',
        'Wholesale Customer',
        'Other'
    ];

    const countries = [
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'Other'
    ];

    const stateProvinces = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

    // Form validation
    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.contactType) {
            errors.contactType = 'Contact type is required';
        }

        if (!formData.primaryPhone.trim()) {
            errors.primaryPhone = 'Primary phone is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Fetch contacts from API
    const fetchContacts = async () => {
        if (!farmId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8000/v1/contacts/?farm_id=${farmId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch contacts: ${response.status}`);
            }

            const contactsData = await response.json();
            setContacts(contactsData);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create new contact
    const createContact = async (contactData) => {
        try {
            const response = await fetch('http://localhost:8000/v1/contacts/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...contactData,
                    farmId: farmId
                }),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Contact already exists');
                }
                throw new Error(`Failed to create contact: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (err) {
            throw err;
        }
    };

    // Load contacts on component mount
    useEffect(() => {
        fetchContacts();
    }, [farmId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePhoneChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setError(null);
            await createContact(formData);

            // Refresh contacts list
            await fetchContacts();

            setShowNewContactModal(false);
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                contactType: '',
                website: '',
                primaryPhone: '',
                mobilePhone: '',
                fax: '',
                company: '',
                address: '',
                city: '',
                country: '',
                stateProvince: '',
                postalCode: '',
                description: ''
            });
            setFormErrors({});
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        setShowNewContactModal(false);
        setError(null);
        setFormErrors({});
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            contactType: '',
            website: '',
            primaryPhone: '',
            mobilePhone: '',
            fax: '',
            company: '',
            address: '',
            city: '',
            country: '',
            stateProvince: '',
            postalCode: '',
            description: ''
        });
    };

    const handleEdit = (contact) => {
        // Pre-fill the form with contact data
        setFormData({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            contactType: contact.contactType,
            website: contact.website || '',
            primaryPhone: contact.primaryPhone,
            mobilePhone: contact.mobilePhone || '',
            fax: contact.fax || '',
            company: contact.company || '',
            address: contact.address || '',
            city: contact.city || '',
            country: contact.country || '',
            stateProvince: contact.stateProvince || '',
            postalCode: contact.postalCode || '',
            description: contact.description || ''
        });

        // Open the modal for editing
        setShowNewContactModal(true);
        setActiveMenu(null);
        setFormErrors({});
    };

    const handleDelete = async (contactId) => {
        // Note: You'll need to implement a DELETE API endpoint
        // For now, just remove from local state
        setContacts(contacts.filter(contact => contact.id !== contactId));
        setActiveMenu(null);
    };

    const toggleMenu = (contactId) => {
        setActiveMenu(activeMenu === contactId ? null : contactId);
    };

    const handlePrint = () => {
        const printContent = `
            <html>
                <head>
                    <title>Contacts List</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f5f5f5; font-weight: bold; }
                        .header { text-align: center; margin-bottom: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Contacts List</h1>
                        <p>Generated on ${new Date().toLocaleDateString()}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredContacts.map(contact => `
                                <tr>
                                    <td>${contact.lastName}, ${contact.firstName}</td>
                                    <td>${contact.contactType}</td>
                                    <td>${contact.company}</td>
                                    <td>${contact.email}</td>
                                    <td>${contact.primaryPhone}</td>
                                    <td>${contact.city}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const filteredContacts = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Empty Contacts State Component
    const EmptyContactsState = ({ onAddContact }) => (
        <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 flex flex-col items-center w-full max-w-12xl mx-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">No contacts yet?</h3>
                <p className="text-gray-600 mb-5 text-center text-sm md:text-base">Add a new contact and it will show up here.</p>
                <button
                    onClick={onAddContact}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Your First Contact</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Contacts</h1>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 md:mb-6 gap-3">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* New Contact Button */}
                        <button
                            onClick={() => setShowNewContactModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">New Contact</span>
                            <span className="sm:hidden">New</span>
                        </button>

                        {/* Print Button */}
                        <button
                            onClick={handlePrint}
                            className="text-gray-600 hover:text-gray-800 p-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14H4v-3h1v3zm1 0v2h8v-2H6z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center">
                        {/* Search */}
                        <div className="relative w-full sm:w-auto">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 pl-4 py-2 w-full sm:w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                )}

                {/* Contacts Table or Empty State */}
                {!loading && contacts.length === 0 ? (
                    <EmptyContactsState onAddContact={() => setShowNewContactModal(true)} />
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                        {/* Table Header - Hidden on mobile */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600 min-w-[1000px]">
                            <div className="col-span-2">NAME</div>
                            <div className="col-span-2">TYPE</div>
                            <div className="col-span-2">COMPANY</div>
                            <div className="col-span-2">EMAIL</div>
                            <div className="col-span-2">PHONE</div>
                            <div className="col-span-1">CITY</div>
                            <div className="col-span-1 text-right">ACTIONS</div>
                        </div>

                        {/* Contact Rows */}
                        <div className="divide-y divide-gray-200">
                            {filteredContacts.map((contact) => (
                                <div key={contact.id}>
                                    {/* Desktop View */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 min-w-[1000px]">
                                        <div className="col-span-2">
                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                {contact.lastName}, {contact.firstName}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-sm text-gray-600 truncate">{contact.contactType}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-sm text-gray-600 truncate">{contact.company}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-sm text-blue-600 hover:text-blue-800 truncate">{contact.email}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-sm text-gray-600 truncate">{contact.primaryPhone}</span>
                                        </div>
                                        <div className="col-span-1">
                                            <span className="text-sm text-gray-600 truncate">{contact.city}</span>
                                        </div>
                                        <div className="col-span-1 relative flex justify-end">
                                            <button
                                                onClick={() => toggleMenu(contact.id)}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {activeMenu === contact.id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                                    <button
                                                        onClick={() => handleEdit(contact)}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(contact.id)}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile View - Card Layout */}
                                    <div className="md:hidden p-4 hover:bg-gray-50 transition-colors duration-150 relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                    {contact.lastName}, {contact.firstName}
                                                </div>
                                                <div className="text-xs text-gray-500">{contact.contactType}</div>
                                            </div>
                                            <button
                                                onClick={() => toggleMenu(contact.id)}
                                                className="text-gray-400 hover:text-gray-600 p-1 ml-2"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {contact.company && (
                                            <div className="text-sm text-gray-600 mb-1">{contact.company}</div>
                                        )}

                                        {contact.email && (
                                            <div className="text-sm text-blue-600 hover:text-blue-800 mb-1 break-all">{contact.email}</div>
                                        )}

                                        <div className="flex flex-wrap gap-x-3 text-sm text-gray-600">
                                            {contact.primaryPhone && <span>{contact.primaryPhone}</span>}
                                            {contact.city && <span>• {contact.city}</span>}
                                        </div>

                                        {/* Mobile Dropdown Menu */}
                                        {activeMenu === contact.id && (
                                            <div className="absolute right-4 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                                <button
                                                    onClick={() => handleEdit(contact)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* New Contact Modal */}
                {showNewContactModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800">New Contact</h2>
                                <button
                                    onClick={handleCancel}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>

                            {/* Error Message in Modal */}
                            {error && (
                                <div className="mx-4 md:mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Modal Body */}
                            <div className="p-4 md:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${formErrors.firstName ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                        {formErrors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${formErrors.lastName ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                        {formErrors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${formErrors.email ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                        {formErrors.email && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                                        )}
                                    </div>

                                    {/* Contact Type */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="contactType"
                                            value={formData.contactType}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${formErrors.contactType ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select a contact type...</option>
                                            {contactTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        {formErrors.contactType && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.contactType}</p>
                                        )}
                                    </div>

                                    {/* Website */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Website <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="http://www.example.com"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Primary Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Primary Phone <span className="text-red-500">*</span>
                                        </label>
                                        <div className={`react-phone-input ${formErrors.primaryPhone ? 'border-red-300 rounded-md border' : ''}`}>
                                            <PhoneInput
                                                country={'zw'}
                                                value={formData.primaryPhone}
                                                onChange={(phone) => handlePhoneChange(phone, 'primaryPhone')}
                                                inputClass={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${formErrors.primaryPhone ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                containerClass="react-phone-input"
                                                buttonClass="react-phone-input__button"
                                            />
                                        </div>
                                        {formErrors.primaryPhone && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.primaryPhone}</p>
                                        )}
                                    </div>

                                    {/* Mobile Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Phone <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <PhoneInput
                                            country={'zw'}
                                            value={formData.mobilePhone}
                                            onChange={(phone) => handlePhoneChange(phone, 'mobilePhone')}
                                            inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            containerClass="react-phone-input"
                                            buttonClass="react-phone-input__button"
                                        />
                                    </div>

                                    {/* Fax */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fax <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <PhoneInput
                                            country={'zw'}
                                            value={formData.fax}
                                            onChange={(phone) => handlePhoneChange(phone, 'fax')}
                                            inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            containerClass="react-phone-input"
                                            buttonClass="react-phone-input__button"
                                        />
                                    </div>

                                    {/* Company */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Country <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            placeholder="Enter country"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* State/Province */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State/Province <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="stateProvince"
                                            value={formData.stateProvince}
                                            onChange={handleInputChange}
                                            placeholder="Enter state or province"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Postal Code */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Postal Code <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 p-4 md:p-6 border-t border-gray-200">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};