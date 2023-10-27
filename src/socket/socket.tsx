import io from 'socket.io-client';
export const socket = io('localhost:4242/game', {
	autoConnect: false,
});
