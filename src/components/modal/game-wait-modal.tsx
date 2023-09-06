import { useEffect, useState } from 'react';
import XButton from 'components/button/x-button';
import BackDrop from 'components/modal/utils/backdrop';

const GameWaitModal = () => {
	const [timeValue, setTimeValue] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeValue((t) => t + 1);
		}, 1000);

		return () => {
			clearInterval(timer);
			console.log('hi');
		};
	}, []);

	useEffect(() => {
		return () => {
			console.log('modal closed');
		};
	}, []);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
			2,
			'0'
		)}`;
	};

	return (
		<dialog id='gameWaitModal' className='modal'>
			<form method='dialog' className='modal-box'>
				<XButton />
				<div className='font-bold mb-1'> Finding a Match... </div>
				<div className='loading loading-dots loading-lg'></div>
				<div> {formatTime(timeValue)} </div>
			</form>
			<BackDrop />
		</dialog>
	);
};

export default GameWaitModal;
