import { useRecoilState } from 'recoil';
import { sidebarState } from '../../ts/state/sidebar-state';
import { SidebarStatus } from '../../ts/enum/sidebar-state.enum';
import WinRateModal from '../modal/win-rate-modal';
import { useState } from 'react';

import GetUserInfo from '../utils/getUserInfo';

const Footer = () => {
	const [user, setUser] = useState(GetUserInfo());
	const [state, setState] = useRecoilState(sidebarState);

	const onClickChat = () => {
		setState((prev) => {
			return prev === SidebarStatus.Chat
				? SidebarStatus.None
				: SidebarStatus.Chat;
		});
	};

	const onClickFriend = () => {
		setState((prev) => {
			return prev === SidebarStatus.Friend
				? SidebarStatus.None
				: SidebarStatus.Friend;
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
