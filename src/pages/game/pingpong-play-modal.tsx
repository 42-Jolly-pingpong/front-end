import { useEffect, useRef, useState } from 'react';

function gamePlayModal() {
	const canvasRef = useRef(null);
	const [ball, setBall] = useState({ x: 400, y: 200, speedX: 5, speedY: 5 });
	const [paddleY, setPaddleY] = useState(100);
	const [score, setScore] = useState(0);

	useEffect(() => {
		const canvas = canvasRef.current; // useRef로 생성한 참조를 이용하여 canvas 요소에 접근
		const context = canvas.getContext('2d');

		const moveBall = () => {
			const newBallX = ball.x + ball.speedX;
			const newBallY = ball.y + ball.speedY;

			if (newBallX < 30 && newBallY > paddleY && newBallY < paddleY + 100) {
				setBall({ ...ball, speedX: -ball.speedX });
				setScore(score + 1);
			}

			if (newBallY <= 0 || newBallY >= canvas.height) {
				setBall({ ...ball, speedY: -ball.speedY });
			}

			if (newBallX <= 0) {
				clearInterval(gameLoop);
			} else {
				setBall({ ...ball, x: newBallX, y: newBallY });
			}
		};

		const gameLoop = setInterval(moveBall, 16);

		return () => {
			clearInterval(gameLoop);
		};
	}, [ball, paddleY, score]);

	const handleMouseMove = (event) => {
		const mouseY = event.nativeEvent.offsetY; // offsetY 대신 nativeEvent.offsetY를 사용
		setPaddleY(mouseY);
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-4xl mb-4'>Ping Pong Game</h1>
			<p className='text-xl mb-2'>Score: {score}</p>
			<div className='w-800 h-400 relative'>
				<canvas
					ref={canvasRef} // useRef로 생성한 참조를 ref 속성에 할당
					onMouseMove={handleMouseMove}
					className='absolute border-2 border-black'
					width='800'
					height='400'
				></canvas>
			</div>
		</div>
	);
}

export default gamePlayModal;
