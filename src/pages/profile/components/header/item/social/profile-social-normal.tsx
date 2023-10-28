import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import GrayButton from 'components/button/gray-button';
import ProfileHeaderSocialButton from 'pages/profile/components/button/profile-header-social-button';
import ProfileSocialDropdown from 'pages/profile/components/header/item/social/profile-social-dropdown';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';
import {
	deleteBlockedFriend,
	deleteFriend,
	denyFriendRequest,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const ProfileSocialNormal = () => {
	const profile = useRecoilValue(profileState);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNKNOWN
	);
	const [dropdownState, setDropdownState] = useState(true);
	const [modalState, setModalState] = useState(false);
	const friendsState = useRecoilState(userFriendsState);

	const handleClick = async () => {
		if (relation === ProfileStatus.UNDEFINED) {
			await updateFriend(profile.user!.id);
			setRelation(ProfileStatus.REQUESTED);
		} else {
			setModalState(true);
		}
	};

	const handleRequest = async () => {
		switch (relation) {
			case ProfileStatus.BLOCKEDBYME:
				await deleteBlockedFriend(profile.user!.id);
				break;
			case ProfileStatus.FRIEND:
				await deleteFriend(profile.user!.id);
				break;
			case ProfileStatus.REQUESTED:
				await denyFriendRequest(profile.user!.id);
				break;
		}
		setRelation(ProfileStatus.UNDEFINED);
		setModalState(false);
		return;
	};

	const handleMessage = () => {
		console.log('메시지 보내기');
	};

	const handleClose = () => {
		setModalState(false);
	};

	useEffect(() => {
		const fetchRelation = async () => {
			const relation = await getFriendRelation(profile.user!.id);
			setRelation(relation);
			if (relation === ProfileStatus.BLOCKEDBYME) {
				setDropdownState(false);
			}
		};
		fetchRelation();
	}, [friendsState]);

	return (
		<div className='flex items-center h-9'>
			<div className='text-xl text-center pr-5'>{profile.user?.nickname}</div>
			<ProfileHeaderSocialButton relation={relation} onClick={handleClick} />
			<ProfileFriendModal
				show={modalState}
				relation={relation}
				onRequest={handleRequest}
				onClose={handleClose}
			/>
			<div className='pr-2' />
			<GrayButton size='xs' onClick={handleMessage}>
				<div>메시지</div>
			</GrayButton>
			<div className='pl-2' />
			{dropdownState && <ProfileSocialDropdown />}
		</div>
	);
};

export default ProfileSocialNormal;
