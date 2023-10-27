import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import useRedirectHome from 'hooks/use-redirect-home';
import { getFriendState } from 'api/friend-api';
import { getUserByNickname } from 'api/user-api';
import ProfileHeader from 'pages/profile/components/header/profile-header';
import ProfileTab from 'pages/profile/components/tab/profile-tab';

const Profile = () => {
	const { nickname } = useParams();
	const user = useRecoilValue(userState);
	const [loading, setLoading] = useState(true);
	const [profile, setProfileState] = useRecoilState(profileState);

	useRedirectHome();

	useEffect(() => {
		const getProfileState = async () => {
			setProfileState({ type: ProfileStatus.UNKNOWN, user: null });
			if (user && user.nickname === nickname && user.isLeave === false) {
				setProfileState({ type: ProfileStatus.MINE, user });
			} else {
				const profileUser = await getUserByNickname(nickname);
				if (profileUser && profileUser.isLeave === false) {
					setProfileState({
						type: await getFriendState(profileUser.id),
						user: profileUser,
					});
				}
			}
			setLoading(false);
		};

		getProfileState();
	}, [nickname]);

	if (loading) {
		return;
	}

	console.log('현재 보고 있는 페이지: ', profile.type);
	return (
		<div className='flex flex-col justify-center items-center'>
			<ProfileHeader />
			<ProfileTab />
		</div>
	);
};

export default Profile;
