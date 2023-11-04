import { useRecoilState, useRecoilValue } from 'recoil';
import FriendSidebarEmpty from 'components/layout/friend-sidebar/friend-sidebar-empty';
import FriendSidebarNormal from 'components/layout/friend-sidebar/friend-sidebar-normal';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { userState } from 'ts/states/user-state';
import { useEffect } from 'react';
import { socket } from 'socket/socket';
import { getBlockedList, getFriendList, getFriendRequestList } from 'api/friend-api';

const FriendSidebar = () => {
	const [userFrieds, setUserFriendsState] = useRecoilState(userFriendsState);
	const user = useRecoilValue(userState)

	const updateFriendList = async () => {
		if (user) {
			const friends = await getFriendList(user.id);
			const requestFriends = await getFriendRequestList(user.id);
			const blockedFriends = await getBlockedList(user.id);
			setUserFriendsState({ friends, requestFriends, blockedFriends });
		}
	};

	useEffect(() => {
		socket.on('reload', updateFriendList)

		return () => {
			socket.off('reload')
		}
	}, [])


	if (userFrieds.friends!.length + userFrieds.requestFriends!.length > 0) {
		return <FriendSidebarNormal />;
	}
	return <FriendSidebarEmpty />;
};

export default FriendSidebar;
