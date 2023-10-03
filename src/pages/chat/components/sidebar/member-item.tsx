import UserImg from 'pages/chat/components/user-img';
import { User } from 'ts/interfaces/user.model';

const MemberItem = (props: { user: User }) => {
	return (
		<div className='flex items-center '>
			<UserImg src={props.user.avatarPath} size={8} />
			<div className='text-sm font-bold text-gray-900 mx-2'>
				{props.user.nickname}
			</div>
		</div>
	);
};

export default MemberItem;
