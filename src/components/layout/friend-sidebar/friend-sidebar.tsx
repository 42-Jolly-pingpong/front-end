import { useRecoilState, useRecoilValue } from 'recoil';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import FriendSidebarNormal from 'components/layout/friend-sidebar/friend-sidebar-normal';
import { userState } from 'ts/states/user-state';
import { useEffect } from 'react';
import { socket } from 'socket/socket';
import {
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';
import { Card } from 'flowbite-react';
import FriendSidebarHeader from './field/friend-sidebar-header';
import FriendListEmpty from './item/friend-list-empty';

const FriendSidebar = () => {
	const [userFrieds, setUserFriendsState] = useRecoilState(userFriendsState);
	const user = useRecoilValue(userState);

	const updateFriendList = async () => {
		if (user) {
			const friends = await getFriendList(user.id);
			const requestFriends = await getFriendRequestList(user.id);
			const blockedFriends = await getBlockedList(user.id);
			setUserFriendsState({ friends, requestFriends, blockedFriends });
		}
	};

	useEffect(() => {
		socket.on('reload', updateFriendList);

		return () => {
			socket.off('reload');
		};
	}, []);

	return (
		<Card className='fixed flex flex-col right-0 h-full'>
			<FriendSidebarHeader />
			{userFrieds.friends!.length + userFrieds.requestFriends!.length > 0 ? (
				<FriendSidebarNormal />
			) : (
				<FriendListEmpty />
			)}
		</Card>
	);
};

export default FriendSidebar;
