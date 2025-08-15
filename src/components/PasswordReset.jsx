// src/components/auth/PasswordResetRequest.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../api/services/auth';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await AuthService.passwordReset(email);
      setMessage('If this email exists, you will receive a password reset link');
    } catch (err) {
      setError(err.message || 'Password reset request failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 animate-fade-in-up">
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-2xl p-10 w-full max-w-md">
            <h2 className="text-2xl font-extrabold text-center text-yellow-700 mb-6">Reset Password</h2>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-yellow-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />
                <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-semibold transition duration-300">Request Reset Link</button>
            </form>
        </div>
    </div>
  );
};

export default PasswordResetRequest;