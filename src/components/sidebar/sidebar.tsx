import { SidebarStatus } from '../../ts/enums/sidebar-status.enum';
import { sidebarSelector } from '../../ts/states/sidebar-state';
import Chat from './chat/chat';
import Friend from './friend/friend';
import { useRecoilValue } from 'recoil';

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
