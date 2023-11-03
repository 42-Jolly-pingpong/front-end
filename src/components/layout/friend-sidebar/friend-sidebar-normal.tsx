import { Card } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import FriendModal from 'components/layout/friend-sidebar/modal/friend-modal';
import FriendSearchList from 'components/layout/friend-sidebar/field/friend-search-list';
import FriendSidebarList from 'components/layout/friend-sidebar/field/friend-sidebar-list';
import FriendSidebarHeader from 'components/layout/friend-sidebar/field/friend-sidebar-header';
import FriendSidebarSearch from 'components/layout/friend-sidebar/field/friend-sidebar-search';
import { friendInputChangeState } from 'ts/states/friend/friend-input-change-state';

const FriendSidebarNormal = () => {
	const friendInputState = useRecoilValue(friendInputChangeState);

	return (
		<>
			<Card className='fixed flex flex-col right-0 friend-sidebar'>
				<FriendSidebarHeader />
				<FriendSidebarSearch />
				{friendInputState.state ? <FriendSearchList /> : <FriendSidebarList />}
				<FriendModal />
			</Card>
		</>
	);
};

export default FriendSidebarNormal;
