import { Avatar } from 'flowbite-react';
import useChangeSidebar from 'hooks/use-change-sidebar';
import Status from 'pages/chat/components/status';
import User from 'ts/interfaces/user.model';

const MemberItem = (props: { user: User; isMe: boolean }) => {
	const setChatSidebar = useChangeSidebar('profile');

	const onClickUser = () => {
		setChatSidebar(props.user as User);
	};

	return (
		<div className='flex items-center '>
			<button onClick={onClickUser}>
				<Avatar img={props.user.avatarPath} size='sm' />
			</button>
			<button onClick={onClickUser}>
				<div className='text-sm font-bold text-gray-900 mx-2 truncate'>
					{props.user.nickname}
					{props.isMe && ' (나)'}
				</div>
			</button>
			<Status status={props.user.status} />
		</div>
	);
};

export default MemberItem;
