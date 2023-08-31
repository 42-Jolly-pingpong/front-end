import { useState } from 'react';
import GetUserInfo from '../../components/services/getUserInfo';
import userData from '../../ts/mock/user-data';

// back-end API : 내가 owner인지 아닌지 확인
//const getParticipantStatus = (user_idx) => {
//	return userData[user_idx];
//};

const ManageChat = () => {
	const [user, setUser] = useState(GetUserInfo()); // 이후 변경
	const [room, setRoom] = useState(Get);
	const myParticipantStatus = getParticipantStatus();

	return null;
};

export default ManageChat;
