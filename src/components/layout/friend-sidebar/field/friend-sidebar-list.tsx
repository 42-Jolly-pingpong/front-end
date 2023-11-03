import { useRecoilState, useRecoilValue } from 'recoil';
import GrayButton from 'components/button/gray-button';
import YellowButton from 'components/button/yellow-button';
import FriendInfo from 'components/layout/friend-sidebar/item/friend-info';
import FriendDropdown from 'components/layout/friend-sidebar/item/friend-dropdown';
import FriendNotFound from 'components/layout/friend-sidebar/item/friend-not-found';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import {
	acceptFriendRequest,
	denyFriendRequest,
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';

const FriendSidebarList = () => {
	const user = useRecoilValue(userState);
	const [friendsState, setFriendsState] = useRecoilState(userFriendsState);
	const friends = friendsState.friends;
	const requestFriends = friendsState.requestFriends;

	const fetchUserFriends = async () => {
		const friends = await getFriendList(user!.id);
		const requestFriends = await getFriendRequestList(user!.id);
		const blockedFriends = await getBlockedList(user!.id);
		setFriendsState({ friends, requestFriends, blockedFriends });
	};

	const handleAccept = async (id: number) => {
		await acceptFriendRequest(id);
		fetchUserFriends();
	};

	const handleDeny = async (id: number) => {
		await denyFriendRequest(id);
		fetchUserFriends();
	};

	if (friends!.length + requestFriends!.length === 0) {
		return <FriendNotFound />;
	}

	return (
		<div className='flex flex-col h-full border-t pt-2 overflow-y-auto'>
			{requestFriends &&
				requestFriends.map((requestFriend, index) => (
					<div
						className='flex justify-between h-12 items-center transition hover:bg-gray-200 mb-2 group'
						key={index}
					>
						<FriendInfo user={requestFriend} />
						<div className='flex'>
							<YellowButton
								size='xs'
								onClick={() => handleAccept(requestFriend.id)}
							>
								확인
							</YellowButton>
							<div className='px-1' />
							<GrayButton
								size='xs'
								onClick={() => handleDeny(requestFriend.id)}
							>
								삭제
							</GrayButton>
						</div>
					</div>
				))}
			{friends &&
				friends.map((friend, index) => (
					<div
						className='flex justify-between h-12 items-center transition hover:bg-gray-200 mb-2 group'
						key={index}
					>
						<FriendInfo user={friend} />
						<FriendDropdown user={friend} />
					</div>
				))}
		</div>
	);
};

export default FriendSidebarList;
