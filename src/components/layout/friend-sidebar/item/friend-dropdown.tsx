import { useRecoilState } from 'recoil';
import { Dropdown } from 'flowbite-react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import User from 'ts/interfaces/user.model';
import { friendSidebarModalState } from 'ts/states/friend/friend-sidebar-modal-state';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';

interface FriendInfoProps {
	user: User;
}

const FriendDropdown: React.FC<FriendInfoProps> = ({ user }) => {
	const [, setModalState] = useRecoilState(friendSidebarModalState);

	const handleUnfriend = async () => {
		console.log('unfriend가 클릭되었음');
		setModalState({ type: FriendSidebarModalStatus.UNFRIEND, friend: user });
	};

	const handleBanned = async () => {
		console.log('banned가 클릭되었음');
		setModalState({ type: FriendSidebarModalStatus.BANNED, friend: user });
	};

	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={
				<HiEllipsisVertical
					className='mr-2 hidden group-hover:block group-hover:bg-white rounded'
					size='22'
				/>
			}
			size='sm'
		>
			<Dropdown.Item className='text-gray-700'>메시지 보내기</Dropdown.Item>
			<Dropdown.Item className='text-gray-700'>게임 초대하기</Dropdown.Item>
			<Dropdown.Item className='text-red-500' onClick={handleUnfriend}>
				친구 끊기
			</Dropdown.Item>
			<Dropdown.Item className='text-red-500' onClick={handleBanned}>
				차단하기
			</Dropdown.Item>
		</Dropdown>
	);
};

export default FriendDropdown;
