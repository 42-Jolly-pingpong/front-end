import userData from '../../ts/mock/user-data';
import UserDTO from '../../ts/interfaces/userDto';

const GetUserInfo = (): UserDTO | null => {
	//return null;
	return userData[1];
};

export default GetUserInfo;
