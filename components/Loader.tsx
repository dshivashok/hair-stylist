
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

const Loader: React.FC = () => {
    const [message, setMessage] = useState(LOADING_MESSAGES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                return LOADING_MESSAGES[nextIndex];
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-6 text-lg font-medium transition-opacity duration-500">{message}</p>
        </div>
    );
}

export default Loader;
