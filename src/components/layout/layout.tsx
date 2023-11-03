import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
import InviteGameModal from 'components/modal/gameInvite.tsx/game-mode-Select';
import { GameInfoType, gameInfoState } from 'ts/states/game/game-info.state';
import { gameStartState } from 'ts/states/game/game-start-state';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
	const sidebarState = useRecoilValue(friendSidebarState);
	const [, setUserFriendsState] = useRecoilState(userFriendsState);
	const gameSelectModal = useRecoilValue(gameModeSelectState);
	const setGameInfo = useSetRecoilState(gameInfoState)
	const setIsGame = useSetRecoilState(gameStartState)
	const navigate = useNavigate()
	const setUserFriendsState = useSetRecoilState(userFriendsState);
	const [loading, setLoading] = useState(true);

	const updateFriendList = async () => {
		if (user) {
			const friends = await getFriendList(user.id);
			const requestFriends = await getFriendRequestList(user.id);
			const blockedFriends = await getBlockedList(user.id);
			setUserFriendsState({ friends, requestFriends, blockedFriends });
		}
	};

	const updateUser = async () => {
		const newUser = await getUserByJwt();
		console.log('new user = ', newUser)
		if (newUser) {
			socket.emit('setClient', newUser.id);
			setUserState(newUser);
		}
	};

	useEffect(() => {
		if (socket.connected) {
			socket.on('getPlayerInfo', (message) => {
				const newGameInfo: GameInfoType = message;
				setGameInfo(newGameInfo);
			});
			socket.on('gameStart', () => {
				console.log('게임 시작해요')
				setIsGame(true);
				navigate('/game');
			});
		}
	})
	
	useEffect(() => {
		updateUser();
		
		return () => {
			socket.off('reload');
		};
	}, []);
	
	useEffect(() => {
		socket.on('reload', updateFriendList);
		updateFriendList();
	}, [user]);

	return (
		<div className='flex flex-col h-screen'>
			<Banner />
			<Header />
			<Outlet />
			{sidebarState && <FriendSidebar />}
			{gameSelectModal && <InviteGameModal show={gameSelectModal} />}
		</div>
	);
};

export default Layout;
