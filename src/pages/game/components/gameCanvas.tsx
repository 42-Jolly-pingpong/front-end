import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket/socket';
import PlayerInfo from 'ts/interfaces/playerInfo.model';
import Size from 'ts/interfaces/Size';

interface GameCanvasProps {
	playerInfo: PlayerInfo;
}

interface obj {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface GameInfo {
	ball: obj;
	player1: obj;
	player2: obj;
}

const initialGameInfo: GameInfo = {
	ball: { x: 0, y: 0, width: 0, height: 0 },
	player1: { x: 0, y: 0, width: 0, height: 0 },
	player2: { x: 0, y: 0, width: 0, height: 0 },
};

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
	const [gameInfo, setGameInfo] = useState<GameInfo>(initialGameInfo);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			setCanvas(canvas);
			const ctx = canvas.getContext('2d');
			if (ctx) {
				console.log('등록')
				setContext(ctx);
			}
			canvas.width = 1400;
			canvas.height = 1000;
		}

		socket.on('getGameData', (ball, player1, player2) => {
			const newGameInfo: GameInfo = {
				ball: ball,
				player1: player1,
				player2: player2,
			};
			setGameInfo(() => ({
				ball: newGameInfo.ball,
				player1: newGameInfo.player1,
				player2: newGameInfo.player2
			}));
		});
		if (playerInfo.position == 1) {
			socket.emit('getGameData', playerInfo.roomName);
		}
		console.log(playerInfo.position);
	}, []);
	// useEffect(() => {
	// 	function canvasResize() {
	// 		setCanvasSize((prevSize: Size) => ({
	// 			...prevSize,
	// 			height: window.innerHeight * 0.7,
	// 			width: window.innerWidth * 0.7,
	// 		}));
	// 	}
	// 	canvasResize();
	// 	window.addEventListener('resize', canvasResize);
	// 	return () => {
	// 		window.removeEventListener('resize', canvasResize);
	// 	};
	// }, []);

	useEffect(() => {
		setPaddleSize((prevSize: Size) => ({
			...prevSize,
			height: canvasSize.height * 0.2,
			width: canvasSize.width * 0.02,
		}));
	}, [canvasSize]);

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			socket.emit(
				'movePaddle',
				playerInfo.roomName,
				playerInfo.position,
				event.key
			);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		const drawCanvas = () => {
			// background
			if (context !== null) {
				context.fillStyle = 'black';
				context.fillRect(0, 0, canvas.width, canvas.height);
	
				context.fillStyle = '#ffffff';
				// ball
				context.fillRect(
					gameInfo.ball.x,
					gameInfo.ball.y,
					gameInfo.ball.width,
					gameInfo.ball.height
				);
	
				// player1
				context.fillRect(
					gameInfo.player1.x,
					gameInfo.player1.y,
					gameInfo.player1.width,
					gameInfo.player1.height
				);
	
				// player2
				context.fillRect(
					gameInfo.player2.x,
					gameInfo.player2.y,
					gameInfo.player2.width,
					gameInfo.player2.height
				);
			}
		};
		drawCanvas();
	}, [gameInfo]);

	return (
		<canvas ref={canvasRef} className='absolute border-2 border-black'></canvas>
	);
}

export default GameCanvas;
