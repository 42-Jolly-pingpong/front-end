import FriendDropdown from 'components/friend/sidebar/item/friend-dropdown';
import FriendNotFound from 'components/friend/sidebar/item/friend-not-found';
import FriendInfo from 'components/friend/sidebar/item/friend-info';

// todo : 스크롤

const FriendSidebarList = () => {
	const friendList = [];
	if (friendList.length === 0) {
		return <FriendNotFound />;
	} else {
		return (
			<div className='flex flex-col h-full border-t pt-2 group'>
				<div className='flex justify-between h-12 group-hover:bg-gray-200 items-center'>
					<FriendInfo />
					<FriendDropdown />
				</div>
			</div>
		);
	}
};

export default FriendSidebarList;
