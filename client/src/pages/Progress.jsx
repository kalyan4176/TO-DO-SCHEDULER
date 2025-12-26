import { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const Progress = () => {
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        overdue: 0,
    });
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const fetchTasksAndStats = async () => {
        try {
            const { data } = await api.get('/tasks');
            const now = new Date();

            const completed = data.filter(task => task.status === 'completed').length;
            const pending = data.filter(task => task.status === 'pending').length;
            const overdue = data.filter(task => {
                const dueDate = new Date(task.date);
                return task.status === 'overdue' || (task.status !== 'completed' && dueDate < now);
            }).length;

            setStats({
                total: data.length,
                completed,
                pending,
                overdue,
            });
            setTasks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasksAndStats();
    }, []);

    const handleStatusUpdate = async (status) => {
        if (!selectedTask) return;

        try {
            await api.put(`/tasks/${selectedTask._id}`, { status });
            setShowStatusModal(false);
            setSelectedTask(null);
            // Refresh tasks and stats
            await fetchTasksAndStats();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const openStatusModal = (task) => {
        setSelectedTask(task);
        setShowStatusModal(true);
    };

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Loading progress...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Progress</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Tasks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                        <div className="text-blue-500 text-3xl">
                            <FaClock />
                        </div>
                    </div>
                </motion.div>

                {/* Completed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
                        </div>
                        <div className="text-green-500 text-3xl">
                            <FaCheckCircle />
                        </div>
                    </div>
                </motion.div>

                {/* Pending */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                        </div>
                        <div className="text-yellow-500 text-3xl">
                            <FaClock />
                        </div>
                    </div>
                </motion.div>

                {/* Overdue */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
                            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
                        </div>
                        <div className="text-red-500 text-3xl">
                            <FaExclamationCircle />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Completion Rate */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Completion Rate</h2>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300">
                                Progress
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-600 dark:text-indigo-400">
                                {completionRate}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            style={{ width: `${completionRate}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
                        ></div>
                    </div>
                </div>
            </motion.div>

            {/* Tasks List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">All Tasks</h2>
                {tasks.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No tasks scheduled yet.</p>
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                                    {task.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <FaClock className="text-indigo-500" />
                                            {new Date(task.date).toLocaleDateString()} | {task.startTime} - {task.endTime}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full ${task.status === 'completed'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                            : task.status === 'overdue'
                                                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                            }`}>
                                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openStatusModal(task)}
                                    className="ml-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                >
                                    Progress
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Status Update Modal */}
            {showStatusModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-md w-full mx-4"
                    >
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Update Task Status</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Update the status for: <strong>{selectedTask?.title}</strong>
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleStatusUpdate('completed')}
                                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <FaCheckCircle /> Completed
                            </button>
                            <button
                                onClick={() => handleStatusUpdate('pending')}
                                className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <FaClock /> Pending
                            </button>
                            <button
                                onClick={() => handleStatusUpdate('overdue')}
                                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <FaExclamationCircle /> Overdue
                            </button>
                            <button
                                onClick={() => {
                                    setShowStatusModal(false);
                                    setSelectedTask(null);
                                }}
                                className="w-full px-4 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Progress;
