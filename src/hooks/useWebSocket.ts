'use client'
import { IMessage } from '@/interfaces/chat.interfaces';
import { INotification } from '@/interfaces/notification.interfaces';
import { RootState } from '@/lib/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';

export const useWebSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const user = useSelector((state: RootState) => state.user.user);
    const [message, setMessage] = useState<IMessage>();

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
        console.log('Connecting to WebSocket server...', socketIo);

        setSocket(socketIo);

        // Handle connection
        socketIo.on('connect', () => {
            console.log('Connected to WebSocket server');
            socketIo.emit('subscribeToNotifications', {});
        });

        // Listen for notifications
        socketIo.on('notification', (data: INotification) => {
            console.log('Notifffffffffffff', data.message);
            setNotifications((prev) => [data, ...prev]);
        });

        // Listen for mesages from the server
        socketIo.on('websocket_chat_name', (data: {message: IMessage}) => {
            console.log('Messageeeeeeeeeeeeeeeeeeee', data.message);
            setMessage(data.message);
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

    return { socket, notifications, message, setMessage };
};