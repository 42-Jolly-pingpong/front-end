import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { CustomFlowbiteTheme, Tabs } from 'flowbite-react';
import { FiUser, FiUsers } from 'react-icons/fi';
import ProfileBlockedList from 'pages/profile/components/tab/field/blocked/profile-blocked-list';
import ProfileFriendListNormal from 'pages/profile/components/tab/field/friend/profile-friend-list-normal';
import ProfileFriendListMine from 'pages/profile/components/tab/field/friend/profile-friend-list-mine';
import ProfileGameHistoryList from 'pages/profile/components/tab/field/game-history/profile-game-history-list';
import { IoGridOutline } from 'react-icons/io5';

const ProfileTab = () => {
	const profile = useRecoilValue(profileState);
	const myProfile: boolean = profile.type === ProfileStatus.MINE;

	const theme: CustomFlowbiteTheme['tab'] = {
		tablist: {
			tabitem: {
				base: 'flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-yellow-300 focus:outline-none',
				styles: {
					underline: {
						active: {
							on: 'text-yellow-300 rounded-t-lg border-b-2 border-yellow-300 active dark:text-yellow-500 dark:border-yellow-500',
						},
					},
				},
			},
		},
	};

	return (
		<Tabs.Group
			style='underline'
			className='w-[672px] items-center justify-center'
			theme={theme}
		>
			<Tabs.Item icon={IoGridOutline} title='경기 전적'>
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
	);
};

export default ProfileTab;
