import FriendList from 'components/sidebar/friend/friend-list';
import FriendMenu from 'components/sidebar/friend/friend-menu';
import FriendRequested from 'components/sidebar/friend/friend-requested';
import { User } from 'ts/interfaces/user.model';
import { tempUser1 } from '../temp-chat-user'; //임시

const Friend = (): JSX.Element => {
	// 친구 신청있는 지 알아오기
	const requestList: User[] = [tempUser1, tempUser1, tempUser1];

	return (
		<div className='flex flex-col h-full justify-between'>
			<div>
				{requestList.length === 0 ? null : (
					<FriendRequested requestList={requestList} />
				)}
				<FriendList />
			</div>
			<FriendMenu />
		</div>
	);
};

export default Friend;
