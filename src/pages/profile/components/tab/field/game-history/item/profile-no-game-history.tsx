import { BsRocketTakeoff } from 'react-icons/bs';

const ProfileNoGameHistory = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-6 mt-16'>
			<div className='w-16 h-16 p-2 rounded-full border-2 border-black justify-center items-center inline-flex'>
				<BsRocketTakeoff size='40' />
			</div>
			<div className='font-extrabold text-3xl'>경기 전적 없음</div>
			{/*
			// TODO: 동일 사용자일 때 경기 전적 없음 문구
			 <div className='font-sm'>
				누군가와 당신과 함께 경기를하면 전적이 표시됩니다.
			</div>
			*/}
		</div>
	);
};

export default ProfileNoGameHistory;
