import { BsRocketTakeoff } from 'react-icons/bs';

const ProfileNoBlockedList = () => {
	return (
		<div className='flex flex-col items-center justify-center pt-4'>
			<div className='flex w-16 h-16 border-2 border-black rounded-full items-center'>
				<BsRocketTakeoff size='48' className='flex pl-1' />
			</div>
			<div className='font-extrabold text-3xl py-6'>빈 차단 목록</div>
			<div className='text-sm'>누군가를 차단하면 여기에 표시됩니다.</div>
		</div>
	);
};

export default ProfileNoBlockedList;
