import { Avatar } from 'flowbite-react';

const FriendNotFound = () => {
	return (
		<div className='flex flex-col h-full border-t pt-2 items-start'>
			<div className='flex items-center'>
				<Avatar size='sm' />
				<div className='text-sm font-bold text-gray-500 pl-2'>
					일치하는 항목 없음
				</div>
			</div>
		</div>
	);
};

export default FriendNotFound;
