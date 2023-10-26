import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import User from 'ts/interfaces/user.model';
import { userState } from 'ts/states/user-state';
import ProfileBlockedList from 'pages/profile/components/tab/item/blocked/profile-blocked-list';
import ProfileNoBlockedList from 'pages/profile/components/tab/item/blocked/profile-no-blocked-list';
import { getBlockedList } from 'api/friend-api';

const ProfileBlockedListTab = () => {
	const user = useRecoilValue(userState);
	const [blockedList, setBlockedList] = useState<User[]>([]);

	useEffect(() => {
		const fetchBlocked = async () => {
			setBlockedList(await getBlockedList(user!.id));
		};
		fetchBlocked();
	}, []);

	if (blockedList.length === 0) {
		return <ProfileNoBlockedList />;
	}
	return <ProfileBlockedList blockedUsers={blockedList} />;
};

export default ProfileBlockedListTab;
