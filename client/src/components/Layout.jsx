import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
    FaHome,
    FaCalendarAlt,
    FaStar,
    FaChartLine,
    FaBell,
    FaCog,
    FaInfoCircle,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const { darkMode, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', name: 'Home', icon: <FaHome /> },
        { path: '/schedule', name: 'Schedule', icon: <FaCalendarAlt /> },
        { path: '/important', name: 'Important', icon: <FaStar /> },
        { path: '/progress', name: 'Progress', icon: <FaChartLine /> },
        { path: '/notifications', name: 'Notifications', icon: <FaBell /> },
        { path: '/settings', name: 'Settings', icon: <FaCog /> },
        { path: '/about', name: 'About', icon: <FaInfoCircle /> },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Mobile Burger Menu */}
            <div className="md:hidden fixed top-0 left-0 w-full p-4 z-50 flex justify-between items-center bg-opacity-90 backdrop-blur-sm bg-white dark:bg-gray-900 shadow-md">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">ToDo Scheduler</h1>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="text-xl focus:outline-none text-gray-600 dark:text-gray-300">
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                    <button onClick={toggleSidebar} className="text-2xl focus:outline-none text-gray-600 dark:text-gray-300">
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || window.innerWidth >= 768) && (
                    <motion.aside
                        initial={{ x: -250 }}
                        animate={{ x: 0 }}
                        exit={{ x: -250 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className={`fixed md:static top-0 left-0 h-full w-64 z-40 transform 
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              bg-gray-900 text-white shadow-xl flex flex-col justify-between p-6 pt-20 md:pt-6`}
                    >
                        <div>
                            <h1 className="text-2xl font-bold mb-8 text-white hidden md:block">
                                ToDo Scheduler
                            </h1>
                            <nav className="space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200
                      ${location.pathname === item.path
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
                            >
                                <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
                            </button>
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-red-900/50 text-red-200 hover:bg-red-900 transition-colors"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 p-6 pt-20 md:pt-6 overflow-y-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
