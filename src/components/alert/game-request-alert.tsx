import { Button, Progress } from 'flowbite-react';
import AlertLogo from 'images/alarm-icon.jpg';
import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';

// reusable하게 분리한다면?
// params : 기다릴 시간, 메시지 내용, | 보낸사람, 받은사람?

const GameRequestAlert = () => {
	const [match, setMatch] = useState(false);
	const [cancel, setCancel] = useState(false);
	const [progressValue, setProgressValue] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgressValue((prev) => {
				const value = prev + 1;
				if (value >= 100) {
					clearInterval(timer);
					setMatch(true);
				}
				return value;
			});
		}, 20);
	}, []);

	const handleMatch = () => {
		setMatch(true);
	};

	const handleCancel = () => {
		setCancel(true);
	};

	return (
		<>
			{!match && !cancel && (
				<div className='fixed z-50 flex justify-center w-full h-full mt-6'>
					<div className='fixed w-11/12 border rounded bg-white '>
						<div className='flex flex-row p-4 justify-between'>
							<div className='flex items-center '>
								<div>
									<img src={AlertLogo} />
								</div>
								<div className='pl-2 text-gray-500'>
									yujelee 님이 게임 요청을 보냈어요!
								</div>
							</div>
							<div className='flex items-center'>
								<Button
									onClick={handleMatch}
									className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
								>
									승낙하기
								</Button>
								<HiX
									onClick={handleCancel}
									className='h-4 w-4 cursor-pointer ml-4'
								/>
							</div>
						</div>
						<Progress progress={progressValue} color='indigo' />
					</div>
				</div>
			)}
		</>
	);
};

export default GameRequestAlert;
