import { Dropdown } from 'flowbite-react';
import { HiEllipsisVertical } from 'react-icons/hi2';

const FriendDropdown = () => {
	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={
				<HiEllipsisVertical
					className='fixed right-8 hidden group-hover:block group-hover:bg-white rounded'
					size='22'
				/>
			}
			size='sm'
		>
			<Dropdown.Item className='text-gray-700'>메시지 보내기</Dropdown.Item>
			<Dropdown.Item className='text-gray-700'>게임 초대하기</Dropdown.Item>
			<Dropdown.Item className='text-red-500'>친구 끊기</Dropdown.Item>
			<Dropdown.Item className='text-red-500'>차단하기</Dropdown.Item>
		</Dropdown>
	);
};

export default FriendDropdown;
