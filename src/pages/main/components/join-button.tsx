import { Button } from 'flowbite-react';

const JoinButton = () => {
	const handleGameStart = () => {
		console.log('게임 모달 하나 띄우기~');
	};

	return (
		<Button
			className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
			size='xl'
			onClick={handleGameStart}
		>
			<img src='images/fire.png' alt='fire' />
			<div className='font-bold mx-3'> Join Game</div>
			<img src='images/arrow-right.png' alt='arrow' />
		</Button>
	);
};

export default JoinButton;
