import { useState, useEffect } from 'react';
import api from '../utils/api';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaRegStar } from 'react-icons/fa';

const Schedule = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        startTime: '',
        endTime: '',
        priority: 'medium',
    });

    useEffect(() => {
        const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start on Monday
        const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));
        setWeekDays(days);
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const taskData = {
                ...newTask,
                date: selectedDate,
            };
            await api.post('/tasks', taskData);
            setIsModalOpen(false);
            setNewTask({ title: '', startTime: '', endTime: '', priority: 'medium' });
            fetchTasks(); // Refresh tasks
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const toggleImportance = async (taskId, currentStatus) => {
        try {
            const updatedTask = { isImportant: !currentStatus };
            await api.put(`/tasks/${taskId}`, updatedTask);

            // Optimistic update
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, isImportant: !currentStatus } : task
            ));
        } catch (error) {
            console.error('Error updating task importance:', error);
            fetchTasks(); // Revert on error
        }
    };

    const tasksForSelectedDate = tasks.filter(task =>
        isSameDay(new Date(task.date), selectedDate)
    );

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Schedule</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    + Add Task
                </button>
            </div>

            {/* Week Calendar */}
            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all
              ${isSameDay(day, selectedDate)
                                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        <span className="text-xs font-medium uppercase">{format(day, 'EEE')}</span>
                        <span className="text-xl font-bold">{format(day, 'd')}</span>
                    </button>
                ))}
            </div>

            {/* Tasks List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg min-h-[400px]">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Tasks for {format(selectedDate, 'MMMM do')}
                </h2>

                <div className="space-y-4">
                    {tasksForSelectedDate.length > 0 ? (
                        tasksForSelectedDate.map((task) => (
                            <motion.div
                                key={task._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-l-4 border-indigo-500 group"
                            >
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {task.startTime} - {task.endTime}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => toggleImportance(task._id, task.isImportant)}
                                        className="text-2xl focus:outline-none transition-transform hover:scale-110"
                                        title={task.isImportant ? "Remove from Important" : "Mark as Important"}
                                    >
                                        {task.isImportant ? (
                                            <FaStar className="text-yellow-400" />
                                        ) : (
                                            <FaRegStar className="text-gray-400 hover:text-yellow-400" />
                                        )}
                                    </button>
                                    <span className={`px-3 py-1 text-xs rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {task.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No tasks scheduled for this day.</p>
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md m-4"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleAddTask} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Enter task title"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                                        <input
                                            type="time"
                                            required
                                            value={newTask.startTime}
                                            onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                                        <input
                                            type="time"
                                            required
                                            value={newTask.endTime}
                                            onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Add Task
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Schedule;
