import { Avatar } from 'flowbite-react';

const FriendInfo = () => {
	return (
		<div className='flex flex-row items-center p-2'>
			<Avatar img='/images/jollypong3.jpeg' />
			<div className='text-sm font-bold pl-2'>sunhwang</div>
			<div className='ml-2 w-2 h-2 bg-emerald-600 rounded-full' />
		</div>
	);
};

export default FriendInfo;
