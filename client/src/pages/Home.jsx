import { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
                <p className="text-gray-600 dark:text-gray-400">Here's an overview of your day.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-2xl shadow-md"
                >
                    <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">Pending Tasks</h3>
                    <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-300 mt-2">{pendingTasks.length}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-green-100 dark:bg-green-900 p-6 rounded-2xl shadow-md"
                >
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">Completed</h3>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-300 mt-2">{completedTasks.length}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-purple-100 dark:bg-purple-900 p-6 rounded-2xl shadow-md"
                >
                    <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">Total Progress</h3>
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-300 mt-2">
                        {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                    </p>
                </motion.div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Tasks</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="space-y-3">
                        {tasks.slice(0, 5).map(task => (
                            <li key={task._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                    {task.title}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${task.isImportant ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>
                                    {task.isImportant ? 'Important' : 'Normal'}
                                </span>
                            </li>
                        ))}
                        {tasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
