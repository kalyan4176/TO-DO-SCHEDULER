import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaCalendar } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, age, username, email, password, confirmPassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateForm = () => {
        if (username.length < 3) return 'Username must be at least 3 characters';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Invalid email address';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain a number';
        if (password !== confirmPassword) return 'Passwords do not match';
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await signup({
                name,
                age,
                username,
                email,
                password,
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Dynamic Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 relative z-10"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 mb-6 shadow-lg shadow-indigo-500/20"
                    >
                        <FaUser className="text-3xl text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-400 text-lg font-medium">
                        Join us to organize your life
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-2xl text-center backdrop-blur-md text-sm font-medium"
                    >
                        {error}
                    </motion.div>
                )}

                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div className="group relative">
                            <FaUser className="absolute top-4 left-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Full Name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="group relative">
                            <FaCalendar className="absolute top-4 left-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                name="age"
                                type="number"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Age"
                                value={age}
                                onChange={onChange}
                            />
                        </div>

                        <div className="group relative">
                            <FaUser className="absolute top-4 left-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Username"
                                value={username}
                                onChange={onChange}
                            />
                        </div>

                        <div className="group relative">
                            <FaEnvelope className="absolute top-4 left-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Email address"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="group relative">
                            <FaLock className="absolute top-4 left-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="group relative">
                            <FaLock className="absolute top-4 left-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-500/20"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-gray-400 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
