interface User {
	id: number;
	intraId: string;
	email: string;
	nickname: string;
	avatarPath: string;
	status: boolean;
	auth: boolean;
	bio: string;
	winCount: number;
	loseCount: number;
	isLeave: boolean;
}

export default User;
