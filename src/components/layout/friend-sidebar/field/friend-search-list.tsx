import FriendDropdown from 'components/layout/friend-sidebar/item/friend-dropdown';
import FriendInfo from 'components/layout/friend-sidebar/item/friend-info';
import FriendListEmpty from 'components/layout/friend-sidebar/item/friend-list-empty';
import { useRecoilValue } from 'recoil';
import { friendInputChangeState } from 'ts/states/friend/friend-input-change-state';

const FriendSearchList = () => {
	const friendInputState = useRecoilValue(friendInputChangeState);
	const friends = friendInputState.friends;

	if (friends === null || friends.length === 0) {
		return <FriendListEmpty />;
	}
	return (
		<div className='flex flex-col h-full border-t pt-2 overflow-y-auto'>
			{friends.map((friend, index) => (
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

export default FriendSearchList;
