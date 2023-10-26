import ProfileNoBlockedList from 'pages/profile/components/tab/item/blocked/profile-no-blocked-list';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileBlockedListTab = () => {
	const profile = useRecoilValue(profileState);

	// [api] 블락 리스트 받아오기
	// if(블락 리스트가 없으면)
	return <ProfileNoBlockedList />;
};

export default ProfileBlockedListTab;
