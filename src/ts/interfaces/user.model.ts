import { UserStatus } from 'ts/enums/user/user-status.enum';

interface User {
	id: number;
	intraId: string;
	email: string;
	nickname: string;
	avatarPath: string;
	status: UserStatus;
	auth: boolean;
	bio: string;
	winCount: number;
	loseCount: number;
	isLeave: boolean;
}

export default User;
