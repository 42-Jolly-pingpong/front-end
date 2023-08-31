import { useState } from 'react';
import GetUserInfo from '../../components/services/getUserInfo';
import userData from '../../ts/mock/user-data';
import GetRoomInfo from '../../components/services/getRoomInfo';

// back-end API : 방에서의 내 권한 확인
const getRoomAuth = () => {
	return;
};

const ManageChat = () => {
	const [user, setUser] = useState(GetUserInfo()); // 이후 변경
	const [room, setRoom] = useState(GetRoomInfo()); // 이후 변경
	const myRoomAuth = getRoomAuth(user?.idx, room?.idx);

	return null;
};

export default ManageChat;
