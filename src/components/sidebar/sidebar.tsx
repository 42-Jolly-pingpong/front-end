import { useRecoilValue } from 'recoil';
import { SidebarStatus } from 'ts/enums/sidebar-status.enum';
import { sidebarSelector } from 'ts/states/sidebar-state';
import Friend from 'components/sidebar/friend/friend';
import Chat from 'components/sidebar/chat/chat';

const SidebarContent = () => {
	const state = useRecoilValue(sidebarSelector);

	switch (state) {
		case SidebarStatus.CHAT:
			return <Chat />;
		case SidebarStatus.FRIEND:
			return <Friend />;
	}
	return null;
};

const Sidebar = () => {
	return (
		<div className='w-80 h-full border border-solid border-black p-4 rounded-lg shadow-xl'>
			<SidebarContent />
		</div>
	);
};

export default Sidebar;
