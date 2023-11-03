import { BsRocketTakeoff } from 'react-icons/bs';

const ProfileNoGameHistory = () => {
	return (
		<div className='flex flex-col items-center justify-center pt-4'>
			<div className='flex w-16 h-16 border-2 border-black rounded-full items-center'>
				<BsRocketTakeoff size='48' className='flex pl-1' />
			</div>
			<div className='font-extrabold text-3xl pt-6'>경기 전적 없음</div>
		</div>
	);
};

export default ProfileNoGameHistory;
