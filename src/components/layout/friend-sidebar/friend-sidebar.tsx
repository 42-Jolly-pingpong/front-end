import { useRecoilValue } from 'recoil';
import FriendSidebarEmpty from 'components/layout/friend-sidebar/friend-sidebar-empty';
import FriendSidebarNormal from 'components/layout/friend-sidebar/friend-sidebar-normal';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const FriendSidebar = () => {
	const userFrieds = useRecoilValue(userFriendsState);

	if (userFrieds.friends!.length + userFrieds.requestFriends!.length > 0) {
		return <FriendSidebarNormal />;
	}
	return <FriendSidebarEmpty />;
};

export default FriendSidebar;
