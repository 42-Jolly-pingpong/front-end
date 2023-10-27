'use clinet';
import { Progress } from 'flowbite-react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface RoundInfo {
	round: number;
	turn: number;
	setIsWaitRound: React.Dispatch<React.SetStateAction<boolean>>;
}

function RoundInfo({ round, turn, setIsWaitRound }: RoundInfo) {
	const [value, setValue] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setValue((prev) => (prev += 1));
		}, 20);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (value === 100) setIsWaitRound(false);
	}, [value]);

	return (
		<div className='w-[264px] h-[197px] p-8 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-center inline-flex z-40'>
			<div className='flex-col justify-start items-center gap-2 flex'>
				<div className="text-center text-gray-900 text-xl font-extrabold font-['Inter'] leading-[30px]">
					Round {round}
				</div>
				<div className='w-16 h-16 p-2 bg-white rounded-[50px] justify-center items-center inline-flex'>
					<div className='w-12 h-12 relative flex-col justify-start items-center flex'>
						{turn === 1 ? (
							<FiArrowLeft size='50px' />
						) : (
							<FiArrowRight size='50px' />
						)}
					</div>
				</div>
				<div className="text-center text-gray-900 text-lg font-bold font-['Inter'] leading-normal">
					공 이동방향
				</div>
				<div className='w-[264px] h-1.5 flex-col  justify-start items-end inline-flex '>
					<div className='w-full p-1 h-1 rounded-full'>
						<Progress progress={value} color='yellow' />
					</div>
				</div>
				{/* <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
					<Progress color='yellow' progress={45}/>
				</div> */}
			</div>
		</div>
	);
}

export default RoundInfo;
