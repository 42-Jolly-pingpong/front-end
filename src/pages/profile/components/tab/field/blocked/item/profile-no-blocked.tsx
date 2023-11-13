import { FiUser } from 'react-icons/fi';

const ProfileNoBlocked = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-6 mt-16'>
			<div className='w-16 h-16 p-2 rounded-full border-2 border-black justify-center items-center inline-flex'>
				<FiUser size='40' />
			</div>
			<div className='font-extrabold text-3xl'>빈 차단 목록</div>
			<div className='text-sm'>누군가를 차단하면 여기에 표시됩니다.</div>
		</div>
	);
};

export default ProfileNoBlocked;
