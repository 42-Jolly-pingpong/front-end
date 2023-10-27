import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import User from 'ts/interfaces/user.model';
import { userState } from 'ts/states/user-state';
import ProfileBlockedList from 'pages/profile/components/tab/field/blocked/list/profile-blocked-list';
import { getBlockedList } from 'api/friend-api';
import ProfileNoBlocked from 'pages/profile/components/tab/field/blocked/item/profile-no-blocked';

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
		return <ProfileNoBlocked />;
	}
	return <ProfileBlockedList blockedUsers={blockedList} />;
};

export default ProfileBlockedListTab;
