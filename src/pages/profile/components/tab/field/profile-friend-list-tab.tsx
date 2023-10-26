import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import User from 'ts/interfaces/user.model';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileFriendList from 'pages/profile/components/tab/item/friend/profile-friend-list';
import ProfileNoFriendList from 'pages/profile/components/tab/item/friend/profile-no-friend-list';
import { getFriendList } from 'api/friend-api';
import ProfileFriendRequestList from 'pages/profile/components/tab/item/friend/profile-friend-request-list';

const ProfileFriendListTab = () => {
	const profile = useRecoilValue(profileState);
	const [friendList, setFriendList] = useState<User[]>([]);
	const [friendRequestList, setFriendRequestList] = useState<User[]>([]);
	const profileType = profile.type;

	useEffect(() => {
		const fetchFriends = async () => {
			setFriendList(await getFriendList(profile.user!.id));
			setFriendRequestList(await getFriendList(profile.user!.id));

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
	}

	return (
		<>
			<div className='pt-2' />
			<ProfileFriendRequestList requestFriends={friendRequestList} />
			<ProfileFriendList friends={friendList} />
		</>
	);
};

export default ProfileFriendListTab;
