import { Link } from 'react-router-dom';

interface UserInfoProps {
	nickname: string;
	email: string;
}

const ProfileUserInfo: React.FC<UserInfoProps> = ({ nickname, email }) => {
	return (
		<div className={`flex flex-col w-48 pl-2`}>
			<Link to={`/profile/${nickname}`}>
				<div className='text-base font-semibold'>{nickname}</div>
			</Link>
			<div className='text-xs text-gray-500'>{email}</div>
		</div>
	);
};

export default ProfileUserInfo;
