import { useRecoilState, useRecoilValue } from 'recoil';
import { Modal } from 'flowbite-react';
import NormalButton from 'components/button/normal-button';
import YellowButton from 'components/button/yellow-button';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';
import { friendSidebarModalState } from 'ts/states/friend/friend-sidebar-modal-state';
import { deleteFriend, getFriendList } from 'api/friend-api';
import { friendSidebarListState } from 'ts/states/friend/friend-sidebar-list-state';
import { FriendListStatus } from 'ts/enums/friend/friendlist-status.enum';
import { userState } from 'ts/states/user-state';

const FriendUnfriendModal = () => {
	const [modalState, setModalState] = useRecoilState(friendSidebarModalState);
	const [, setFriendListState] = useRecoilState(friendSidebarListState);
	const user = useRecoilValue(userState);

	const handleUnfriend = async () => {
		await deleteFriend(modalState.friend!.id);
		setModalState({ type: FriendSidebarModalStatus.CLOSE, friend: null });
		setFriendListState({
			friends: await getFriendList(user!.id),
			status: FriendListStatus.DEFAULT,
		});
	};
	const handleClose = () => {
		setModalState({ type: FriendSidebarModalStatus.CLOSE, friend: null });
	};

	return (
		<Modal size='md' show={true} onClose={handleClose} dismissible>
			<Modal.Header className='border-none'>
				<div className=' text-xl font-bold mt-1 ml-1 mb-0'>
					{modalState.friend?.nickname} 님과 친구를 끊으시겠습니까?
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className='text-base text-gray-500 pb-4'>
					이 사용자에게 친구 요청을 다시 보낼 수 있습니다.
				</div>
				<div className='flex flex-row justify-end items-center pt-10'>
					<NormalButton size='xs' onClick={handleClose}>
						<div className='p-1'>취소</div>
					</NormalButton>
					<div className='px-1.5'></div>
					<YellowButton size='xs' onClick={handleUnfriend}>
						<div className='p-1'>친구 끊기</div>
					</YellowButton>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default FriendUnfriendModal;
