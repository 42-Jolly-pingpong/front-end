import { useState } from 'react';
import AddFriendModal from './add-friend-modal';

const FriendMenu = () => {
	const [addFriendModal, setAddFriendModal] = useState(false);
	const [blockedFriendModal, setBlockedFriendModal] = useState(false);

	const onClickAddFriend = () => {
		setAddFriendModal(true);
	};

	return (
		<div className='flex justify-end'>
			<button className='btn btn-outline' onClick={onClickAddFriend}>
				+
			</button>
			<AddFriendModal state={addFriendModal} setState={setAddFriendModal} />
			<button className='btn btn-outline'>블락</button>
		</div>
	);
};

export default FriendMenu;
