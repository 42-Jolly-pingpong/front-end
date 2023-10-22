import FriendUnfriendModal from 'components/friend/sidebar/modal/friend-unfriend-modal';
import { Dropdown, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import User from 'ts/interfaces/user.model';

interface FriendInfoProps {
	user: User;
}

const FriendDropdown: React.FC<FriendInfoProps> = ({ user }) => {
	const [unfriendModalState, setUnfriendModalState] = useState(false);
	const [bannedModalState, setBannedModalState] = useState(false);

	const handleUnfriend = () => {
		setUnfriendModalState(true);
	};

	const handleBanned = () => {
		setBannedModalState(true);
	};

	const handleClose = () => {
		setUnfriendModalState(false);
		setBannedModalState(false);
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
			<FriendUnfriendModal
				show={unfriendModalState}
				onClose={handleClose}
				user={user}
			/>

			<Modal show={bannedModalState} onClose={handleClose} user={user} />
		</Dropdown>
	);
};

export default FriendDropdown;
