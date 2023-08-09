interface UserDTO {
  user_idx: string;
  intra_id: string;
  e_mail: string;
	nickname: string;
	avatar_path: string;
	status: boolean;
	auth: boolean;
	win_rate: number;
	is_leave: boolean;
}

export default UserDTO;
