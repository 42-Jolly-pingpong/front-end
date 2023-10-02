import { Avatar } from 'flowbite-react';
import changeChat from 'hooks/change-chat';
import { dmList } from 'pages/chat/mock';
import { User } from 'ts/interfaces/user.model';

const DmSearchedItem = (props: { friend: User; isTheLast: boolean }) => {
	const { friend } = props;
	const setChat = changeChat();
	const margin = props.isTheLast ? '' : 'mb-1';

	const onClickFriend = () => {
		const dm = dmList[0]; //temp
		setChat(dm);
	};

	return (
		<div className={`w-full ${margin}`}>
			<button
				className='flex px-3 py-1 w-full hover:bg-gray-200 text-left'
				onClick={onClickFriend}
			>
				<Avatar img={friend.avatarPath} size='xs' className='mr-2' />
				{friend.nickname}
			</button>
		</div>
	);
};

export default DmSearchedItem;
