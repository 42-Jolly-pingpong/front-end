import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet } from 'react-router';
import Banner from 'components/banner/banner';
import Header from 'components/layout/header/header';
import FriendSidebar from 'components/layout/friend-sidebar/friend-sidebar';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';
import { getUserByJwt } from 'api/auth-api';
import {
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';
import { socket } from 'socket/socket';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { GameInfoType, gameInfoState } from 'ts/states/game/game-info.state';
import { gameStartState } from 'ts/states/game/game-start-state';
import { useNavigate } from 'react-router-dom';
import { clearCookies } from 'components/utils/cookie-utils';
import InviteGameModal from 'components/modal/item/game-mode-select';
import { useLocation } from 'react-router-dom';

const Layout = () => {
	const sidebarState = useRecoilValue(friendSidebarState);
	const gameSelectModal = useRecoilValue(gameModeSelectState);
	const setGameInfo = useSetRecoilState(gameInfoState);
	const setIsGame = useSetRecoilState(gameStartState);
	const navigate = useNavigate();
	const setUserFriendsState = useSetRecoilState(userFriendsState);
	const setUser = useSetRecoilState(userState);
	const [loading, setLoading] = useState(true);
	const pathname = useLocation().pathname;
	const hasLayout = pathname === '/chat' ? false : true;

	const initData = async () => {
		const newUser = await getUserByJwt();
		if (newUser) {
			if (Object.keys(newUser).length === 0) {
				clearCookies();
				return;
			}
			setUser(newUser);
			const friends = await getFriendList(newUser.id);
			const requestFriends = await getFriendRequestList(newUser.id);
			const blockedFriends = await getBlockedList(newUser.id);
			setUserFriendsState({ friends, requestFriends, blockedFriends });
			socket.emit('setClient', newUser.id);
		}
	};

	useEffect(() => {
		const initUserData = async () => {
			setLoading(true);
			await initData();
			setLoading(false);
			socket.on('getPlayerInfo', (message) => {
				const newGameInfo: GameInfoType = message;
				setGameInfo(newGameInfo);
			});
			socket.on('gameStart', () => {
				setIsGame(true);
				navigate('/game');
			});
		};

		initUserData();
	}, []);

	if (loading) return;
	return (
		<div className='flex flex-col h-screen'>
			<Banner />
			{hasLayout && <Header />}
			<Outlet />
			{hasLayout && sidebarState && <FriendSidebar />}
			{gameSelectModal && <InviteGameModal show={gameSelectModal} />}
		</div>
	);
};

export default Layout;
