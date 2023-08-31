import FriendList from 'components/sidebar/friend/friend-list';
import FriendMenu from 'components/sidebar/friend/friend-menu';
import FriendRequested from 'components/sidebar/friend/friend-requested';

const Friend = (): JSX.Element => {
	// 친구 신청있는 지 알아오기
	const newFriendRequested = 10;

	return (
		<div className='flex flex-col h-full justify-between'>
			<div>
				{newFriendRequested ? null : <FriendRequested />}
				<FriendList />
			</div>
			<FriendMenu />
		</div>
	);
};

export default Friend;
