import { Card } from 'flowbite-react';
import FriendListEmpty from 'components/layout/friend-sidebar/item/friend-list-empty';
import FriendSidebarHeader from 'components/layout/friend-sidebar/field/friend-sidebar-header';

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
