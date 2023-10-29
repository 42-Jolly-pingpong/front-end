import FriendBannedModal from 'components/layout/friend-sidebar/modal/friend-banned-modal';
import FriendUnfriendModal from 'components/layout/friend-sidebar/modal/friend-unfriend-modal';
import { useRecoilValue } from 'recoil';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';
import { friendSidebarModalState } from 'ts/states/friend/friend-sidebar-modal-state';

const FriendModal = () => {
	const modalStatus = useRecoilValue(friendSidebarModalState);

	if (modalStatus.type === FriendSidebarModalStatus.UNFRIEND) {
		return <FriendUnfriendModal />;
	} else if (modalStatus.type === FriendSidebarModalStatus.BANNED) {
		return <FriendBannedModal />;
	}
	return; // 이후에 다른 케이스 없는지 보고 삭제 예정
};

export default FriendModal;
