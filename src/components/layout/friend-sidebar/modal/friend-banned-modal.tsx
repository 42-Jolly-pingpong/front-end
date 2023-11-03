import { useRecoilState, useRecoilValue } from 'recoil';
import { Modal } from 'flowbite-react';
import NormalButton from 'components/button/normal-button';
import YellowButton from 'components/button/yellow-button';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { friendSidebarModalState } from 'ts/states/friend/friend-sidebar-modal-state';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';
import {
	addBlockedFriend,
	getBlockedList,
	getFriendList,
} from 'api/friend-api';

const FriendBannedModal = () => {
	const user = useRecoilValue(userState);
	const [modalState, setModalState] = useRecoilState(friendSidebarModalState);
	const [friendsState, setFriendsState] = useRecoilState(userFriendsState);

	const handleBanned = async () => {
		await addBlockedFriend(modalState.friend!.id);
		const friends = await getFriendList(user!.id);
		const blockedFriends = await getBlockedList(user!.id);
		setFriendsState({ ...friendsState, friends, blockedFriends });
		setModalState({ type: FriendSidebarModalStatus.CLOSE, friend: null });
	};

	const handleClose = () => {
		setModalState({ type: FriendSidebarModalStatus.CLOSE, friend: null });
	};

	return (
		<Modal size='md' show={true} onClose={handleClose} dismissible>
			<Modal.Header className='border-none'>
				<div className=' text-xl font-bold mt-1 ml-1 mb-0'>
					{modalState.friend?.nickname} 님을 차단하시겠습니까?
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className='text-base text-gray-500 pb-4'>
					본인 프로필 차단 목록에서 해제할 수 있습니다.
				</div>
				<div className='flex flex-row justify-end items-center pt-10'>
					<NormalButton size='xs' onClick={handleClose}>
						<div className='p-1'>취소</div>
					</NormalButton>
					<div className='px-1.5'></div>
					<YellowButton size='xs' onClick={handleBanned}>
						<div className='p-1'>차단하기</div>
					</YellowButton>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default FriendBannedModal;
