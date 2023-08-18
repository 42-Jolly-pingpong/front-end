import { User } from '../../ts/interfaces/user.model';
import userData from '../../ts/mock/user-data';

const GetUserInfo = (): User | null => {
	//return null;
	return userData[1];
};

export default GetUserInfo;
