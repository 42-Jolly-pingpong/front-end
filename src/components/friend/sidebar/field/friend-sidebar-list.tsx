import FriendDropdown from 'components/friend/sidebar/item/friend-dropdown';
import FriendNotFound from 'components/friend/sidebar/item/friend-not-found';
import FriendInfo from 'components/friend/sidebar/item/friend-info';
import { useRecoilValue } from 'recoil';
import { friendSidebarListState } from 'ts/states/friend/friend-sidebar-list-state';

const FriendSidebarList = () => {
	const friendsState = useRecoilValue(friendSidebarListState);

	if (friendsState.friends === null || friendsState.friends.length === 0) {
		return <FriendNotFound />;
	} else {
		return (
			<div className='flex flex-col h-full border-t pt-2 overflow-y-auto'>
				{friendsState.friends.map((friend, index) => (
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
	}
};

export default FriendSidebarList;
