import { Card } from 'flowbite-react';
import FriendSidebarHeader from 'components/friend/sidebar/field/friend-sidebar-header';
import FriendSidebarSearch from 'components/friend/sidebar/field/friend-sidebar-search';
import FriendSidebarList from 'components/friend/sidebar/field/friend-sidebar-list';
import FriendModal from 'components/friend/sidebar/modal/friend-modal';

const FriendSidebarNormal = () => {
	return (
		<>
			<Card className='fixed flex flex-col right-0 friend-sidebar'>
				<FriendSidebarHeader />
				<FriendSidebarSearch />
				<FriendSidebarList />
				<FriendModal />
			</Card>
		</>
	);
};

export default FriendSidebarNormal;
