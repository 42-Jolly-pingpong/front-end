import { useRecoilValue } from 'recoil';
import { FriendListStatus } from 'ts/enums/friend/friendlist-status.enum';
import { friendSidebarListState } from 'ts/states/friend/friend-sidebar-list-state';
import FriendSidebarEmpty from 'components/friend/sidebar/friend-sidebar-empty';
import FriendSidebarNormal from 'components/friend/sidebar/friend-sidebar-normal';

const FriendSidebar = () => {
	const friendListState = useRecoilValue(friendSidebarListState);

	if (friendListState.status === FriendListStatus.EMPTY) {
		return <FriendSidebarEmpty />;
	}
	return <FriendSidebarNormal />;
};

export default FriendSidebar;
