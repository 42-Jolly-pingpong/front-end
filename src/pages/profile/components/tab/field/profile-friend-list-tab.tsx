import { getFriendList } from 'api/friend-api';
import ProfileFriendList from 'pages/profile/components/tab/item/profile-friend-list';
import ProfileNoFriendList from 'pages/profile/components/tab/item/profile-no-friend-list';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import User from 'ts/interfaces/user.model';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileFriendListTab = () => {
	const profile = useRecoilValue(profileState);
	const [friendList, setFriendList] = useState<User[]>([]);
	const [friendRequestList, setFriendRequestList] = useState<User[]>([]);
	const profileType = profile.type;

	useEffect(() => {
		const fetchFriends = async () => {
			const friends = await getFriendList(profile.user!.id);
			// 요청된 친구 리스트
			//const friendRequests = await get
			if (friends.length === 0) {
				return <ProfileNoFriendList />;
			} else {
				setFriendList(friends);
			}
		};
		if (profileType !== ProfileStatus.UNKNOWN) {
			fetchFriends();
		}
	}, [profile]);

	if (profileType !== ProfileStatus.UNKNOWN) {
		return <ProfileNoFriendList />;
	}

	return <ProfileFriendList requests={friendList} friends={friendList} />;
};

export default ProfileFriendListTab;
