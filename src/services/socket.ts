import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://192.168.1.9:5000';

export const useSocket = (token: string | null) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!token) return;

        const newSocket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [token]);

    return socket;
};
