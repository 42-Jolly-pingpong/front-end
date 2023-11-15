import { useRecoilValue } from 'recoil';
import FriendInfo from 'components/layout/friend-sidebar/item/friend-info';
import FriendDropdown from 'components/layout/friend-sidebar/item/friend-dropdown';
import FriendListEmpty from 'components/layout/friend-sidebar/item/friend-list-empty';
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
				<div className='hover:bg-gray-200 group' key={index}>
					<div className='flex justify-between items-center mx-4 my-3'>
						<FriendInfo user={friend} />
						<FriendDropdown user={friend} />
					</div>
				</div>
			))}
		</div>
	);
};

export default FriendSearchList;
