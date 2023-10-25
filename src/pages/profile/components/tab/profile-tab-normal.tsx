import { Tabs } from 'flowbite-react';
import { FiUsers } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import ProfileGameHistoryTab from 'pages/profile/components/tab/field/profile-game-history-tab';
import ProfileFriendListTab from 'pages/profile/components/tab/field/profile-friend-list-tab';

const ProfileTabNormal = () => {
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
			</Tabs.Group>
		</>
	);
};

export default ProfileTabNormal;
