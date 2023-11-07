import useChangeSidebar from 'hooks/use-change-sidebar';
import Status from 'pages/chat/components/status';
import UserImg from 'pages/chat/components/user-img';
import User from 'ts/interfaces/user.model';

const MemberItem = (props: { user: User; isMe: boolean }) => {
	const setChatSidebar = useChangeSidebar('profile');

	const onClickUserImg = () => {
		setChatSidebar(props.user as User);
	};

	return (
		<div className='flex items-center '>
			<button onClick={onClickUserImg}>
				<UserImg src={props.user.avatarPath} size={8} />
			</button>
			<div className='text-sm font-bold text-gray-900 mx-2'>
				{props.user.nickname}
				{props.isMe && ' (나)'}
			</div>
			<Status status={props.user.status} />
		</div>
	);
};

export default MemberItem;
