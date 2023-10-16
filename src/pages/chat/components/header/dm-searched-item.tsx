import { Avatar } from 'flowbite-react';
import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'pages/chat/chat-socket';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatListSelector, chatListState } from 'ts/states/chat-list.state';

const DmSearchedItem = (props: { friend: User; isTheLast: boolean }) => {
	const { friend } = props;
	const setChat = useChangeChat();
	const setDmList = useSetRecoilState(chatListState);
	const dmList = useRecoilValue(chatListSelector).dmList;

	const createNewDm = async () => {
		chatSocket.emit('createNewDm', { chatMate: friend }, (newDm: Dm) => {
			setDmList((pre) => ({
				...pre,
				dmList: [...pre.dmList, newDm],
			}));
			setChat(newDm);
		});
	};

	const onClickFriend = () => {
		const dm = dmList.find((dm) => dm.chatMate.id === friend.id);
		if (dm) {
			setChat(dm);
			return;
		}
		createNewDm();
	};

	return (
		<div className={`w-full ${props.isTheLast ? '' : 'mb-1'}`}>
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
