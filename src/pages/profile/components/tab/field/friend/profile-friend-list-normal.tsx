import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ProfileNoFriend from 'pages/profile/components/tab/field/friend/item/profile-no-friend';
import ProfileFriendItemNormal from 'pages/profile/components/tab/field/friend/item/profile-friend-item-normal';
import User from 'ts/interfaces/user.model';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import {
	deleteBlockedFriend,
	deleteFriend,
	denyFriendRequest,
	getFriendList,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';

const ProfileFriendListNormal = () => {
	const user = useRecoilValue(userState);
	const profile = useRecoilValue(profileState);
	const profileType = profile.type;
	const [friendList, setFriendList] = useState<User[]>([]);
	const [relationMap, setRelationMap] = useState<Record<number, ProfileStatus>>(
		{}
	);

	const fetchFriends = async () => {
		if (
			profileType !== ProfileStatus.BLOCKED_BY_OTHER &&
			profileType !== ProfileStatus.UNKNOWN
		) {
			const fetchedFriendList = await getFriendList(profile.user!.id);
			setFriendList(fetchedFriendList);
		}
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	useEffect(() => {
		const fetchRelations = async () => {
			const relationData: Record<number, ProfileStatus> = {};
			for (const friend of friendList) {
				if (friend.id === user!.id) {
					relationData[friend.id] = ProfileStatus.FRIEND;
				} else {
					const relation = await getFriendRelation(friend.id);
					relationData[friend.id] = relation;
				}
			}
			setRelationMap(relationData);
		};

		if (friendList.length > 0) {
			fetchRelations();
		}
	}, [friendList]);

	const handleRelation = async (relation: ProfileStatus, otherId: number) => {
		switch (relation) {
			case ProfileStatus.REQUESTED_BY_ME:
				await denyFriendRequest(otherId);
				break;
			case ProfileStatus.UNDEFINED:
				await updateFriend(otherId);
				break;
			case ProfileStatus.FRIEND:
				await deleteFriend(otherId);
				break;
			case ProfileStatus.BLOCKED_BY_ME:
				await deleteBlockedFriend(otherId);
				break;
			default:
				console.log('여기 걸리면 뭔가 잘못된거'); // tmp
		}
		fetchFriends();
	};

	if (
		profileType === ProfileStatus.UNKNOWN ||
		profileType === ProfileStatus.BLOCKED_BY_OTHER ||
		friendList.length === 0
	) {
		return <ProfileNoFriend />;
	}
	return (
		<div className='flex flex-col items-center h-96 overflow-y-auto'>
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
