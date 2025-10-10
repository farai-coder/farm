import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess('Password reset instructions have been sent to your email.');
            console.log('Password reset request for:', email);
        } catch (error) {
            setError('Unable to send reset instructions. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackToSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded mr-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Drayce Farm</h1>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-gray-800">Forgot your password?</h1>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-envelope text-gray-400"></i>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 text-gray-900"
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || success !== ''}
                                className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium rounded-lg transition duration-200"
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Sending Instructions...
                                    </>
                                ) : success ? (
                                    'Instructions Sent!'
                                ) : (
                                    'Send me reset password instructions'
                                )}
                            </button>
                        </form>

                        <div className="text-center">
                            <button
                                onClick={handleBackToSignIn}
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};