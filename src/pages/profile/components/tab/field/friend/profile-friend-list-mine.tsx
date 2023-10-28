import {
	acceptFriendRequest,
	deleteFriend,
	denyFriendRequest,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';
import ProfileFriendItemMine from 'pages/profile/components/tab/field/friend/item/profile-friend-item-mine';
import ProfileFriendRequestItem from 'pages/profile/components/tab/field/friend/item/profile-friend-request-item';
import ProfileNoFriend from 'pages/profile/components/tab/field/friend/item/profile-no-friend';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import User from 'ts/interfaces/user.model';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const ProfileFriendListMine = () => {
	const user = useRecoilValue(userState);
	const [friendsState, setFriendsState] = useRecoilState(userFriendsState);
	const friends = friendsState.friends;
	const requestFriends = friendsState.requestFriends;

	const fetchFriends = async () => {
		const friends = await getFriendList(user!.id);
		const requestFriends = await getFriendRequestList(user!.id);
		setFriendsState({ ...friendsState, friends, requestFriends });
	};

	const handleRequest = async (res: boolean, id: number) => {
		if (res === true) {
			await acceptFriendRequest(id);
		} else {
			await denyFriendRequest(id);
		}
		fetchFriends();
	};
	const handleUnfriend = async (friendId: number) => {
		await deleteFriend(friendId);
		fetchFriends();
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	if (friends!.length + requestFriends!.length == 0) {
		return <ProfileNoFriend />;
	}

	return (
		<div className='flex flex-col items-center h-96 overflow-y-auto'>
			{requestFriends &&
				requestFriends.map((friend: User) => (
					<ProfileFriendRequestItem
						user={friend}
						onRequest={handleRequest}
						key={friend.id}
					/>
				))}
			{friends &&
				friends.map((friend: User) => (
					<ProfileFriendItemMine
						user={friend}
						onUnfriend={handleUnfriend}
						key={friend.id}
					/>
				))}
		</div>
	);
};

export default ProfileFriendListMine;
