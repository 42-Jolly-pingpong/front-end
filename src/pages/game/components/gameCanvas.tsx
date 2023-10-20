import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket/socket';
import { GameInfo, GameInfoType } from 'ts/states/game/game-info.state';
import { useRecoilValue } from 'recoil';
import ObjectInfo from 'ts/interfaces/game/object-info.model';
import RoundInfo from './roundInfo';

const initialObjectInfo: ObjectInfo = {
	ball: { x: 0, y: 0, width: 0, height: 0 },
	player1: { x: 0, y: 0, width: 0, height: 0 },
	player2: { x: 0, y: 0, width: 0, height: 0 },
};

function GameCanvas() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [isWaitRound, setIsWaitRound] = useState<boolean>(false);
	const [turn, setTurn] = useState<number>(1);
	const [round, setRound] = useState<number>(1);
	const gameInfo: GameInfoType = useRecoilValue(GameInfo);

	const [ObjectInfo, setObjectInfo] = useState<ObjectInfo>(initialObjectInfo);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			setCanvas(canvas);
			const ctx = canvas.getContext('2d');
			if (ctx) {
				setContext(ctx);
			}
			canvas.width = 1000;
			canvas.height = 600;
		}

		socket.on('getGameData', (ball, player1, player2) => {
			const newObjectInfo: ObjectInfo = {
				ball: ball,
				player1: player1,
				player2: player2,
			};
			setObjectInfo(() => ({
				ball: newObjectInfo.ball,
				player1: newObjectInfo.player1,
				player2: newObjectInfo.player2,
			}));
		});

		socket.on('waitRound', (round, turn) => {
			setRound(round);
			setTurn(turn);
			setIsWaitRound(true);
		});


		return () => {
			socket.emit('exitGame', gameInfo.roomName, gameInfo.position);
		};
	}, []);

	useEffect(() => {
		if (!isWaitRound && gameInfo.position === 1)
			socket.emit('getGameData', gameInfo.roomName)
	}, [isWaitRound])

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				socket.emit(
					'movePaddle',
					gameInfo.roomName,
					gameInfo.position,
					event.key
				);
			}
		};
		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				socket.emit(
					'stopPaddle',
					gameInfo.roomName,
					gameInfo.position,
					event.key
				);
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		const drawCanvas = () => {
			// background
			if (context && canvas) {
				context.fillStyle = 'black';
				context.fillRect(0, 0, canvas.width, canvas.height);

				context.beginPath();
				context.setLineDash([9, 15]);
				context.moveTo(canvas.width / 2, canvas.height);
				context.lineTo(canvas.width / 2, 0);
				context.lineWidth = 10;
				context.strokeStyle = '#ffffff';
				context.stroke();

				context.fillStyle = '#ffffff';
				// ball
				context.fillRect(
					ObjectInfo.ball.x,
					ObjectInfo.ball.y,
					ObjectInfo.ball.width,
					ObjectInfo.ball.height
				);

				// player1
				context.fillRect(
					ObjectInfo.player1.x,
					ObjectInfo.player1.y,
					ObjectInfo.player1.width,
					ObjectInfo.player1.height
				);

				// player2
				context.fillRect(
					ObjectInfo.player2.x,
					ObjectInfo.player2.y,
					ObjectInfo.player2.width,
					ObjectInfo.player2.height
				);
			}
		};
		drawCanvas();
	}, [ObjectInfo]);

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<canvas
				ref={canvasRef}
				className='absolute border-2 border-white'
			></canvas>
			{isWaitRound ? (
				<RoundInfo round={round} turn={turn} setIsWaitRound={setIsWaitRound} />
			) : null}
		</div>
	);
}

export default GameCanvas;
