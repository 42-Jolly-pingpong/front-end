import User from 'ts/interfaces/user.model';
import ProfileFriendItem from 'pages/profile/components/tab/field/friend/item/profile-friend-item-mine';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileFriendItemMine from 'pages/profile/components/tab/field/friend/item/profile-friend-item-mine';

interface FriendListProps {
	friends: User[];
}

const ProfileFriendList: React.FC<FriendListProps> = ({ friends }) => {
	const profile = useRecoilValue(profileState);
	// 이것도 각각 아이템 안에서
	// 1. 여기서 들어오자마자, 친구목록 불러오고.(남의꺼);
	// 2. 내 친구 요청 목록
	// 3. recoil에 있는 내 친구목록. (하나하나씩...?)

	// 이거가지고 렌더링을 해.
	// 여기 컴포넌트 분리
	if (profile.type === ProfileStatus.MINE) {
		return (
			<div className='flex flex-col items-center'>
				{friends.map((friend: User) => (
					<ProfileFriendItemMine user={friend} key={friend.id} />
				))}
			</div>
		);
	}

	return (
		<div className='flex flex-col items-center'>
			{friends.map((friend: User) => (
				<ProfileFriendItem user={friend} key={friend.id} />
			))}
		</div>
	);
};

export default ProfileFriendList;
