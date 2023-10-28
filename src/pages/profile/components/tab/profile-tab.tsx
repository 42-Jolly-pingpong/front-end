import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { Tabs } from 'flowbite-react';
import { MdDashboard } from 'react-icons/md';
import { FiUser, FiUsers } from 'react-icons/fi';
import ProfileBlockedList from 'pages/profile/components/tab/field/blocked/profile-blocked-list';
import ProfileFriendListNormal from 'pages/profile/components/tab/field/friend/profile-friend-list-normal';
import ProfileFriendListMine from 'pages/profile/components/tab/field/friend/profile-friend-list-mine';
import ProfileGameHistoryList from 'pages/profile/components/tab/field/game-history/profile-game-history-list';

const ProfileTab = () => {
	// 이 프로필 상태
	const profile = useRecoilValue(profileState);
	const myProfile: boolean = profile.type === ProfileStatus.MINE;

	return (
		<>
			<Tabs.Group
				style='underline'
				className=' justify-center items-center w-3/5'
			>
				<Tabs.Item icon={MdDashboard} title='경기 전적'>
					<ProfileGameHistoryList />
				</Tabs.Item>
				<Tabs.Item icon={FiUsers} title='친구 목록'>
					{myProfile ? <ProfileFriendListMine /> : <ProfileFriendListNormal />}
				</Tabs.Item>
				{myProfile && (
					<Tabs.Item icon={FiUser} title='차단 목록'>
						<ProfileBlockedList />
					</Tabs.Item>
				)}
			</Tabs.Group>
		</>
	);
};

export default ProfileTab;
