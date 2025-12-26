import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center"
            >
                <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">ToDo Scheduler</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    A premium task management solution designed to help you organize your day, track your progress, and achieve your goals.
                </p>

                <div className="text-left space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>Weekly Scheduling with intuitive calendar view</li>
                        <li>Priority tracking for important tasks</li>
                        <li>Visual progress analytics with charts</li>
                        <li>Email notifications and reminders</li>
                        <li>Secure authentication and data protection</li>
                        <li>Beautiful Dark & Light modes</li>
                    </ul>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500">
                        Version 1.0.0 | Developed with MERN Stack
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
