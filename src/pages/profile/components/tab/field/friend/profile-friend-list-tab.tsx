import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import User from 'ts/interfaces/user.model';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';
import { getFriendList, getFriendRequestList } from 'api/friend-api';
import ProfileNoFriend from 'pages/profile/components/tab/field/friend/item/profile-no-friend';
import ProfileFriendRequestList from 'pages/profile/components/tab/field/friend/list/profile-friend-request-list';

// 내가 누구인지만 판단.
const ProfileFriendList = () => {
	const profile = useRecoilValue(profileState);
	const profileType = profile.type;
	const [friendList, setFriendList] = useState<User[]>([]);
	const [friendRequestList, setFriendRequestList] = useState<User[]>([]);

	useEffect(() => {
		const fetchFriends = async () => {
			setFriendList(await getFriendList(profile.user!.id));
			setFriendRequestList(await getFriendRequestList(profile.user!.id));
		};
		if (profileType !== ProfileStatus.UNKNOWN) {
			fetchFriends();
		}
	}, [profile, profileType]);

	switch (profileType) {
		case ProfileStatus.UNKNOWN:
			break;
		case ProfileStatus.MINE:
			if (friendList.length + friendRequestList.length > 0) {
				return (
					<>
						<ProfileFriendRequestList requestFriends={friendRequestList} />
						<ProfileFriendList friends={friendList} />
					</>
				);
			}
			break;
		default:
			if (friendList.length > 0) {
				return <ProfileFriendList friends={friendList} />;
			}
	}
	return <ProfileNoFriend />;
};

export default ProfileFriendList;
