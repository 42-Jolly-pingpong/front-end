import {
	deleteBlockedFriend,
	deleteFriend,
	denyFriendRequest,
	getFriendList,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';
import ProfileFriendItemNormal from 'pages/profile/components/tab/field/friend/item/profile-friend-item-normal';
import ProfileNoFriend from 'pages/profile/components/tab/field/friend/item/profile-no-friend';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import User from 'ts/interfaces/user.model';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileFriendListNormal = () => {
	const profile = useRecoilValue(profileState);
	const profileType = profile.type;
	const [friendList, setFriendList] = useState<User[]>([]);
	const [relationMap, setRelationMap] = useState<Record<number, ProfileStatus>>(
		{}
	);

	const fetchFriends = async () => {
		setFriendList(await getFriendList(profile.user!.id));

		const relationData: Record<number, ProfileStatus> = {};
		for (const friend of friendList) {
			const relation = await getFriendRelation(friend.id);
			relationData[friend.id] = relation;
		}
		setRelationMap(relationData);
	};

	const handleRelation = async (relation: ProfileStatus, otherId: number) => {
		switch (relation) {
			case ProfileStatus.REQUESTED:
				await denyFriendRequest(otherId);
				break;
			case ProfileStatus.UNDEFINED:
				await updateFriend(otherId);
				break;
			case ProfileStatus.FRIEND:
				await deleteFriend(otherId);
				break;
			case ProfileStatus.BLOCKEDBYME:
				await deleteBlockedFriend(otherId);
				break;
			default:
				console.log('여기 걸리면 뭔가 잘못된거'); // tmp
		}
		fetchFriends();
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	if (
		profileType === ProfileStatus.UNKNOWN ||
		profileType === ProfileStatus.BLOCKEDBYOTHER ||
		friendList.length === 0
	) {
		return <ProfileNoFriend />;
	}
	return (
		<div className='flex flex-col items-center'>
			{friendList.map((other: User) => (
				<ProfileFriendItemNormal
					user={other}
					relation={relationMap[other.id]}
					onChangeRelation={handleRelation}
					key={other.id}
				/>
			))}
		</div>
	);
};

export default ProfileFriendListNormal;
