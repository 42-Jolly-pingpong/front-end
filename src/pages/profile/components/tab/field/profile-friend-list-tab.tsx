import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import User from 'ts/interfaces/user.model';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileFriendList from 'pages/profile/components/tab/item/friend/profile-friend-list';
import ProfileNoFriendList from 'pages/profile/components/tab/item/friend/profile-no-friend-list';
import ProfileFriendRequestList from 'pages/profile/components/tab/item/friend/profile-friend-request-list';
import { getFriendList, getFriendRequestList } from 'api/friend-api';

const ProfileFriendListTab = () => {
	const profile = useRecoilValue(profileState);
	const [friendList, setFriendList] = useState<User[]>([]);
	const [friendRequestList, setFriendRequestList] = useState<User[]>([]);
	const profileType = profile.type;

	useEffect(() => {
		const fetchFriends = async () => {
			setFriendList(await getFriendList(profile.user!.id));
			setFriendRequestList(await getFriendRequestList(profile.user!.id));

			if (friendList.length === 0 && friendRequestList.length == 0) {
				return <ProfileNoFriendList />;
			}
		};
		if (profileType !== ProfileStatus.UNKNOWN) {
			fetchFriends();
		}
	}, [profile]);

	if (profileType === ProfileStatus.UNKNOWN) {
		return <ProfileNoFriendList />;
	} else if (profileType === ProfileStatus.MINE) {
		return (
			<>
				<ProfileFriendRequestList requestFriends={friendRequestList} />
				<ProfileFriendList friends={friendList} />
			</>
		);
	} else {
		<ProfileFriendList friends={friendList} />;
	}
};

export default ProfileFriendListTab;
