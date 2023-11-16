import { io } from 'socket.io-client';

export const chatSocket = io(
	`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'}/chat`,
	{
		autoConnect: false,
	}
);
