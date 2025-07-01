'use client'
import { INotification } from '@/interfaces/notification.interfaces';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// interface Notification {
//   id: string;
//   message: string;
//   type: string;
//   timestamp: string;
// }

export const useWebSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userFromStorage = localStorage.getItem('user')
            if (userFromStorage) {
                setUser(JSON.parse(userFromStorage))
            }
        }
    }, [])
    useEffect(() => {
        if (!user || !user.id) return
        const userId = user.id
        // Initialize WebSocket connection
        const socketIo = io(process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4600', {
            // Adjust URL to your NestJS server
            query: { userId },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            withCredentials: true
        });

        setSocket(socketIo);

        // Handle connection
        socketIo.on('connect', () => {
            console.log('Connected to WebSocket server');
            socketIo.emit('subscribeToNotifications', {});
        });

        // Listen for notifications
        socketIo.on('notification', (data: INotification) => {
            setNotifications((prev) => [data, ...prev]);
        });

        // Handle subscription confirmation
        socketIo.on('subscribed', (data: { message: string }) => {
            console.log(data.message);
        });

        // Handle connection errors
        socketIo.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        // Cleanup on unmount
        return () => {
            socketIo.disconnect();
            console.log('Disconnected from WebSocket server');
        };
    }, [user]);

    return { socket, notifications };
};