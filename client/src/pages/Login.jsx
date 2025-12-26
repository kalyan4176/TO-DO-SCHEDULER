import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { username, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ username, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Dynamic Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

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
                        <FaLock className="text-3xl text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-400 text-lg font-medium">
                        Sign in to continue your journey
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
                    <div className="space-y-5">
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
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/10 rounded bg-white/5"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                Forgot password?
                            </a>
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
                                <span>Signing In...</span>
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-gray-400 font-medium">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
