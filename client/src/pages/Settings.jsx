import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Settings = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchUser = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                    {user ? (
                        isEditing ? (
                            <EditProfileForm
                                user={user}
                                onUpdate={(updatedUser) => {
                                    setUser(updatedUser);
                                    setIsEditing(false);
                                }}
                            />
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user.age}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">@{user.username}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user.email}</p>
                                </div>
                            </div>
                        )
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </motion.div>

                {/* Appearance Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg md:col-span-2"
                >
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Security</h2>
                    <ChangePasswordForm />
                </motion.div>
            </div>
        </div>
    );
};

const EditProfileForm = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        age: user.age,
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const { name, email, age } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            const { data } = await api.put('/auth/profile', formData);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            onUpdate(data);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {message.text && (
                <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {message.text}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Save Changes'}
            </button>
        </form>
    );
};

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (newPassword !== confirmNewPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
            return;
        }

        setLoading(true);
        try {
            await api.put('/auth/password', { currentPassword, newPassword });
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update password' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            {message.text && (
                <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {message.text}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Change Password'}
            </button>
        </form>
    );
};

export default Settings;
