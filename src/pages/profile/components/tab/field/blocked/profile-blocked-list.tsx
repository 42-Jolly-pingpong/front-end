import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import User from 'ts/interfaces/user.model';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import ProfileNoBlocked from 'pages/profile/components/tab/field/blocked/item/profile-no-blocked';
import ProfileBlockedItem from 'pages/profile/components/tab/field/blocked/item/profile-blocked-item';
import { deleteBlockedFriend, getBlockedList } from 'api/friend-api';

const ProfileBlockedList = () => {
	const user = useRecoilValue(userState);
	const friendsList = useRecoilValue(userFriendsState);
	const [blockedList, setBlockedList] = useState<User[]>([]);

	const fetchBlocked = async () => {
		setBlockedList(await getBlockedList(user!.id));
	};

	const handleUnblock = async (blockedId: number) => {
		await deleteBlockedFriend(blockedId);
		fetchBlocked();
	};

	useEffect(() => {
		fetchBlocked();
	}, [friendsList]);

	if (blockedList.length === 0) {
		return <ProfileNoBlocked />;
	}

	return (
		<div className='flex flex-col items-center h-96 overflow-y-auto'>
			{blockedList.map((blocked: User) => (
				<ProfileBlockedItem
					friend={blocked}
					onUnblock={handleUnblock}
					key={blocked.id}
				/>
			))}
		</div>
	);
};

export default ProfileBlockedList;
