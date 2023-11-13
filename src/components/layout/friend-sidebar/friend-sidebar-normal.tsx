import { useRecoilValue } from 'recoil';
import FriendModal from 'components/layout/friend-sidebar/modal/friend-modal';
import FriendSearchList from 'components/layout/friend-sidebar/field/friend-search-list';
import { friendInputChangeState } from 'ts/states/friend/friend-input-change-state';
import FriendSidebarList from 'components/layout/friend-sidebar/field/friend-sidebar-list';
import FriendSidebarSearch from 'components/layout/friend-sidebar/field/friend-sidebar-search';

const FriendSidebarNormal = () => {
	const friendInputState = useRecoilValue(friendInputChangeState);

	return (
		<>
			<FriendSidebarSearch />
			{friendInputState.state ? <FriendSearchList /> : <FriendSidebarList />}
			<FriendModal />
		</>
	);
};

export default FriendSidebarNormal;
