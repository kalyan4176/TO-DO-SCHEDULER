import { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Important = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data.filter(task => task.isImportant));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaStar className="text-yellow-500" /> Important Tasks
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task, index) => (
                    <motion.div
                        key={task._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-t-4 border-yellow-500"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{task.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                {new Date(task.date).toLocaleDateString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {task.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
                {tasks.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center py-10">No important tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default Important;
