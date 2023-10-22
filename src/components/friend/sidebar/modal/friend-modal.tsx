import FriendBannedModal from 'components/friend/sidebar/modal/friend-banned-modal';
import FriendUnfriendModal from 'components/friend/sidebar/modal/friend-unfriend-modal';
import { useRecoilValue } from 'recoil';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';
import { friendSidebarModalState } from 'ts/states/friend/friend-sidebar-modal-state';

const FriendModal = () => {
	const modalStatus = useRecoilValue(friendSidebarModalState);

	switch (modalStatus.type) {
		case FriendSidebarModalStatus.UNFRIEND:
			return <FriendUnfriendModal />;
		case FriendSidebarModalStatus.BANNED:
			return <FriendBannedModal />;
		default:
			return;
	}
};

export default FriendModal;
