import { Tabs } from 'flowbite-react';
import { FiUsers } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import ProfileFriendList from 'pages/profile/components/tab/item/profile-friend-list';
import ProfileGameHistory from 'pages/profile/components/tab/item/profile-game-history';

const ProfileTabNormal = () => {
	return (
		<>
			<Tabs.Group
				style='underline'
				className=' justify-center items-center w-3/5'
			>
				<Tabs.Item icon={MdDashboard} title='경기 전적'>
					<ProfileGameHistory />
				</Tabs.Item>
				<Tabs.Item icon={FiUsers} title='친구 목록'>
					<ProfileFriendList />
				</Tabs.Item>
			</Tabs.Group>
		</>
	);
};

export default ProfileTabNormal;
