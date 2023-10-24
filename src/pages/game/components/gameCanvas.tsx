import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket/socket';
import { gameInfoState, GameInfoType } from 'ts/states/game/game-info.state';
import { useRecoilValue } from 'recoil';
import ObjectInfo from 'ts/interfaces/game/object-info.model';
import RoundInfo from './roundInfo';

const initialObjectInfo: ObjectInfo = {
	ball: { x: 0, y: 0, width: 0, height: 0 },
	player1: { x: 0, y: 0, width: 0, height: 0, score: 0 },
	player2: { x: 0, y: 0, width: 0, height: 0, score: 0 },
};

function GameCanvas() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [isWaitRound, setIsWaitRound] = useState<boolean>(false);
	const [turn, setTurn] = useState<number>(1);
	const [round, setRound] = useState<number>(1);
	const gameInfo: GameInfoType = useRecoilValue(gameInfoState);

	const [objectInfo, setObjectInfo] = useState<ObjectInfo>(initialObjectInfo);

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
			socket.emit('playerDesertion', gameInfo.roomName, gameInfo.position);
		};
	}, []);

	useEffect(() => {
		if (!isWaitRound && gameInfo.position === 1)
			socket.emit('getGameData', gameInfo.roomName);
	}, [isWaitRound]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				socket.emit(
					'movePlayer',
					gameInfo.roomName,
					gameInfo.position,
					event.key
				);
			}
		};
		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				socket.emit(
					'stopPlayer',
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

				context.fillStyle = '#FCB404';
				// ball
				context.fillRect(
					objectInfo.ball.x,
					objectInfo.ball.y,
					objectInfo.ball.width,
					objectInfo.ball.height
				);
				context.fillStyle = '#ffffff';
				// player1
				context.fillRect(
					objectInfo.player1.x,
					objectInfo.player1.y,
					objectInfo.player1.width,
					objectInfo.player1.height
				);

				// player2
				context.fillRect(
					objectInfo.player2.x,
					objectInfo.player2.y,
					objectInfo.player2.width,
					objectInfo.player2.height
				);
				
				// score
				context.font = '80px Inter New';
				context.textAlign = 'center';

				context.fillText(objectInfo.player1.score.toLocaleString('en-US', {
					minimumIntegerDigits: 2,
					useGrouping: false,
				}), canvas.width / 2 - 60, 70);
				context.fillText(objectInfo.player2.score.toLocaleString('en-US', {
					minimumIntegerDigits: 2,
					useGrouping: false,
				}), canvas.width / 2 + 60, 70);
			}
		};
		drawCanvas();
	}, [objectInfo]);

	return (
		<div className='flex flex-col items-center justify-center h-[610px]'>
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
