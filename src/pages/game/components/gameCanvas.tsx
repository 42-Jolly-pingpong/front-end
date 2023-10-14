import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket/socket';
import PlayerInfo from 'ts/interfaces/playerInfo.model';
import Size from 'ts/interfaces/Size';

interface GameCanvasProps {
	playerInfo: PlayerInfo;
}

function GameCanvas({ playerInfo }: GameCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [initialPositions, setInitialPositions] = useState(null);
	const [canvasSize, setCanvasSize] = useState<Size>({
		width: window.innerWidth * 0.7,
		height: window.innerHeight * 0.8,
	});
	const [paddleSize, setPaddleSize] = useState<Size>({
		width: canvasSize.width * 0.02,
		height: canvasSize.height * 0.2,
	});

	useEffect(() => {
		const canvas = canvasRef.current;

		if (canvas) {
			setCanvas(canvas);
			const ctx = canvas.getContext('2d');
			if (ctx) {
				setContext(ctx);
			}
		}
		socket.on('getGameData', (event) => {
			const data = event;
			setInitialPositions(data);
		});
		if (playerInfo.position == 1) {
			socket.emit('getGameData', playerInfo.roomName);
		}
	}, []);

	useEffect(() => {
		function canvasResize() {
			setCanvasSize((prevSize: Size) => ({
				...prevSize,
				height: window.innerHeight * 0.7,
				width: window.innerWidth * 0.7,
			}));
		}
		canvasResize();
		window.addEventListener('resize', canvasResize);
		return () => {
			window.removeEventListener('resize', canvasResize);
		};
	}, []);

	useEffect(() => {
		setPaddleSize((prevSize: Size) => ({
			...prevSize,
			height: canvasSize.height * 0.2,
			width: canvasSize.width * 0.02,
		}));
	}, [canvasSize])

	useEffect(() => {
		const drawCanvas = () => {
			if (initialPositions) {
				console.log('그리기');
				const { ball, player1, player2 } = initialPositions;
				// 백그라운드
				context.fillStyle = 'black';
				context.fillRect(0, 0, canvas.width, canvas.height);

				// 공
				context.fillStyle = 'red';
				const ballX = (ball.x / 100) * canvas.width;
				const ballY = (ball.y / 100) * canvas.height;
				context.beginPath();
				context.arc(ballX, ballY, 10, 0, 2 * Math.PI);
				context.fill();

				// 플레이어1
				const player1X = (player1.x / 100) * canvasSize.width;
				const player1Y = (player1.y / 100) * canvasSize.height;
				context.fillStyle = 'blue';
				context.fillRect(
					player1X - paddleSize.width / 2,
					player1Y - paddleSize.height / 2,
					paddleSize.width,
					paddleSize.height
				);

				// 플레이어2
				const player2X = (player2.x / 100) * canvasSize.width;
				const player2Y = (player2.y / 100) * canvasSize.height;
				context.fillStyle = 'green';
				context.fillRect(
					player2X - paddleSize.width / 2,
					player2Y - paddleSize.height / 2,
					paddleSize.width,
					paddleSize.height
				);
			}
		};
		drawCanvas();
	}, [initialPositions, canvasSize, paddleSize]);

	return (
		<canvas
			ref={canvasRef}
			width={canvasSize.width}
			height={canvasSize.height}
			className='absolute border-2 border-black'
		></canvas>
	);
}

export default GameCanvas;
