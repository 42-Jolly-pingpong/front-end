import { useRecoilState } from 'recoil';
import { useState } from 'react';
import GetUserInfo from 'components/services/getUserInfo';
import { sidebarState } from 'ts/states/sidebar-state';
import { SidebarStatus } from 'ts/enums/sidebar-status.enum';
import WinRateModal from 'components/modal/win-rate-modal';

const Footer = () => {
	const [user, setUser] = useState(GetUserInfo(1));
	const [state, setState] = useRecoilState(sidebarState);

	const onClickChat = () => {
		setState((prev) => {
			return prev === SidebarStatus.CHAT
				? SidebarStatus.NONE
				: SidebarStatus.CHAT;
		});
	};

	const onClickFriend = () => {
		setState((prev) => {
			return prev === SidebarStatus.FRIEND
				? SidebarStatus.NONE
				: SidebarStatus.FRIEND;
		});
	};

	return (
		<footer
			className='flex justify-between items-center bg-gray-100 border-t-2 border-gray-200'
			style={{ height: '10%', padding: '1%' }}
		>
			{user && (
				<>
					<div>
						<button
							className='btn'
							onClick={() => window.winRateModal.showModal()}
						>
							Win-Rate
						</button>
						<WinRateModal />
					</div>
					<div className='flex justify-between'>
						<button className='btn mr-4' onClick={onClickChat}>
							Chat
						</button>
						<button className='btn mr-4' onClick={onClickFriend}>
							Friend
						</button>
					</div>
				</>
			)}
		</footer>
	);
};

export default Footer;
