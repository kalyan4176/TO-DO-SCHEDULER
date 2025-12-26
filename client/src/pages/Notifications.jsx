import { useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Notifications = () => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        text: '',
    });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/notifications/send-email', emailData);
            setStatus('success');
            setEmailData({ to: '', subject: '', text: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Notifications</h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To (Email)</label>
                        <input
                            type="email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                            value={emailData.to}
                            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                            value={emailData.subject}
                            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                        <textarea
                            required
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                            value={emailData.text}
                            onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        <FaPaperPlane />
                        {status === 'sending' ? 'Sending...' : 'Send Notification'}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-600 text-center">Email sent successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-600 text-center">Failed to send email.</p>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default Notifications;
