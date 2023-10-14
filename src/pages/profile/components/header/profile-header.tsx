import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { profileState } from 'ts/states/profile-state';
import { useEffect, useState } from 'react';
import { getUserByNickname } from 'api/user-api';
import ProfileBadge from './profile-badge';
import ProfileData from './profile-data';

const ProfileHeader = () => {
	const { user_idx } = useParams();
	const nickname = user_idx!;
	const [loading, setLoading] = useState(true);
	const setProfileState = useSetRecoilState(profileState);

	useEffect(() => {
		const findProfile = async () => {
			const user = await getUserByNickname(nickname);
			await setProfileState(user);
			setLoading(false);
		};
		findProfile();
	}, []);

	if (loading) {
		return;
	}

	return (
		<div className='flex justify-center items-center text-center'>
			<ProfileBadge />
			<ProfileData />
		</div>
	);
};

export default ProfileHeader;
