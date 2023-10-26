import { getFriendRelation } from 'api/friend-api';
import GrayButton from 'components/button/gray-button';
import ProfileHeaderSocialButton from 'pages/profile/components/button/profile-header-social-button';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileSocialNormal = () => {
	const profile = useRecoilValue(profileState);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNKNOWN
	);
	const handleClick = () => {
		console.log('이벤트');
	};

	const handleMessage = () => {
		console.log('메시지 보내기');
	};

	useEffect(() => {
		const fetchRelation = async () => {
			setRelation(await getFriendRelation(profile.user!.id));
		};
		fetchRelation();
	}, []);

	return (
		<div className='flex items-center h-9'>
			<div className='text-xl text-center pr-5'>{profile.user?.nickname}</div>
			<ProfileHeaderSocialButton relation={relation} onClick={handleClick} />
			<div className='pr-2' />
			<GrayButton size='xs' onClick={handleMessage}>
				메시지
			</GrayButton>
		</div>
	);
};

export default ProfileSocialNormal;
