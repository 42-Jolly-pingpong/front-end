import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import GrayButton from 'components/button/gray-button';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import ProfileHeaderSocialButton from 'pages/profile/components/button/profile-header-social-button';
import ProfileSocialDropdown from 'pages/profile/components/header/item/social/profile-social-dropdown';
import { profileState } from 'ts/states/profile/profile-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import {
	deleteBlockedFriend,
	deleteFriend,
	denyFriendRequest,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';
import useChangeChat from 'hooks/use-change-chat';
import { useNavigate } from 'react-router-dom';
import { getDM } from 'api/chat-api';

const ProfileSocialNormal = () => {
	const profile = useRecoilValue(profileState);
	const friendsState = useRecoilState(userFriendsState);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNKNOWN
	);
	const [modalState, setModalState] = useState(false);
	const [dropdownState, setDropdownState] = useState(true);
	const setChat = useChangeChat();
	const navigate = useNavigate();

	const handleClick = async () => {
		if (relation === ProfileStatus.UNDEFINED) {
			await updateFriend(profile.user!.id);
			setRelation(ProfileStatus.REQUESTEDBYME);
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
			case ProfileStatus.REQUESTEDBYME:
				await denyFriendRequest(profile.user!.id);
				break;
		}
		setRelation(ProfileStatus.UNDEFINED);
		setModalState(false);
		return;
	};

	const handleMessage = async () => {
		const dm = await getDM(profile!.user!);
		setChat(dm!);
		navigate('/chat');
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
			} else {
				setDropdownState(true);
			}
		};
		fetchRelation();
	}, [friendsState, profile.user]);

	return (
		<div className='flex items-center w-72'>
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
				메시지
			</GrayButton>
			<div className='pl-2' />
			{dropdownState && <ProfileSocialDropdown />}
		</div>
	);
};

export default ProfileSocialNormal;
