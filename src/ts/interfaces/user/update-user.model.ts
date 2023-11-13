interface UpdateUserDto {
	auth: boolean;
	avatarPath?: string;
	bio?: string;
	nickname: string;
	secret?: string;
}

export default UpdateUserDto;
