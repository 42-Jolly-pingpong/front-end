import { BiUser } from 'react-icons/bi';

const ProfileNoFriend = () => {
	return (
		<div className='flex flex-col items-center justify-center pt-4'>
			<div className='flex w-16 h-16 border-2 border-black rounded-full items-center'>
				<BiUser size='48' className='flex pl-3' />
			</div>
			<div className='font-extrabold text-3xl pt-6'>빈 친구 목록</div>
		</div>
	);
};

export default ProfileNoFriend;
