// src/components/auth/PasswordResetConfirm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../api/services/auth';

const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await AuthService.passwordChange(
        uidb64,
        token,
        formData.newPassword,
        formData.confirmPassword
      );
      setMessage('Password reset successfully. You can now login with your new password.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Password reset failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 animate-fade-in-up">
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-2xl p-10 w-full max-w-md">
            <h2 className="text-2xl font-extrabold text-center text-yellow-700 mb-6">Set New Password</h2>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-yellow-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />
                </div>
                <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-yellow-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />
                </div>
                <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-semibold transition duration-300">Reset Password</button>
            </form>
        </div>
    </div>
  );
};

export default PasswordResetConfirm;