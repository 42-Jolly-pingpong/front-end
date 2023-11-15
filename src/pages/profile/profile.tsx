import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileTab from 'pages/profile/components/tab/profile-tab';
import ProfileHeader from 'pages/profile/components/header/profile-header';
import useRedirectHome from 'hooks/use-redirect-home';
import { getFriendState } from 'api/friend-api';
import { getUserByNickname } from 'api/user-api';

const Profile = () => {
	const { nickname } = useParams();
	const user = useRecoilValue(userState);
	const [loading, setLoading] = useState(true);
	const setProfileState = useSetRecoilState(profileState);

	useRedirectHome();

	useEffect(() => {
		const getProfileState = async () => {
			setLoading(true);
			const profileUser = await getUserByNickname(nickname);
			if (user) {
				if (user!.nickname === nickname) {
					setProfileState({ type: ProfileStatus.MINE, user });
				} else if (profileUser && profileUser.isLeave === false) {
					setProfileState({
						type: await getFriendState(profileUser.id),
						user: profileUser,
					});
				} else {
					setProfileState({ type: ProfileStatus.UNKNOWN, user: null });
				}
			}
			setLoading(false);
		};
		getProfileState();
	}, [nickname, user, setProfileState]);

	if (loading) {
		return;
	}
	return (
		<div className='flex flex-col items-center gap-y-11'>
			<ProfileHeader />
			<ProfileTab />
		</div>
	);
};

export default Profile;
