import { Avatar } from 'flowbite-react';

const FriendNotFound = () => {
	return (
		<div className='flex items-center px-4 py-3 border-t'>
			<Avatar size='sm' />
			<div className='text-sm font-bold text-gray-500 pl-2'>
				일치하는 항목 없음
			</div>
		</div>
	);
};

export default FriendNotFound;
