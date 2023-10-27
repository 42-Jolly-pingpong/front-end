import { Tabs } from 'flowbite-react';
import { MdDashboard } from 'react-icons/md';
import { FiUser, FiUsers } from 'react-icons/fi';
import ProfileFriendListTab from 'pages/profile/components/tab/field/friend/profile-friend-list-tab';
import ProfileGameHistoryTab from 'pages/profile/components/tab/field/game-history/profile-game-history-tab';
import ProfileBlockedListTab from 'pages/profile/components/tab/field/blocked/profile-blocked-list-tab';

const ProfileTabMine = () => {
	return (
		<>
			<Tabs.Group
				style='underline'
				className=' justify-center items-center w-3/5'
			>
				<Tabs.Item icon={MdDashboard} title='경기 전적'>
					<ProfileGameHistoryTab />
				</Tabs.Item>
				<Tabs.Item icon={FiUsers} title='친구 목록'>
					<ProfileFriendListTab />
				</Tabs.Item>
				<Tabs.Item icon={FiUser} title='차단 목록'>
					<ProfileBlockedListTab />
				</Tabs.Item>
			</Tabs.Group>
		</>
	);
};

export default ProfileTabMine;
