import { Card } from 'flowbite-react';
import FriendSidebarHeader from 'components/friend/sidebar/field/friend-sidebar-header';
import FriendListEmpty from 'components/friend/sidebar/item/friend-list-empty';

const FriendSidebarEmpty = () => {
	return (
		<>
			<Card className='fixed flex flex-col right-0 friend-sidebar'>
				<FriendSidebarHeader />
				<FriendListEmpty />
			</Card>
		</>
	);
};

export default FriendSidebarEmpty;
