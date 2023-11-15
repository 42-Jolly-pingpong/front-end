import useChangeChat from 'hooks/use-change-chat';
import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'pages/chat/chat-socket';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';

const ChannelLeaveField = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const setChat = useChangeChat();
	const setChatList = useSetRecoilState(chatListState);
	const setAlertModal = useChatAlert();
	const setChatAlertModal = useSetRecoilState(chatAlertModalState);

	const leaveThechannel = async () => {
		chatSocket.emit(
			'participantLeave',
			{ roomId: chat.id },
			(response: { status: number; chatRoom: ChatRoom }) => {
				if (response.status === 200 && response.chatRoom) {
					setChatList((pre) => ({
						...pre,
						channelList: pre.channelList.filter(
							(channel) => channel.id !== response.chatRoom.id
						),
					}));
					setChat(null);
					setChatAlertModal((pre) => ({ ...pre, status: false }));
				} else {
					setAlertModal();
				}
			}
		);
	};

	const onClickLeave = async () => {
		setChatAlertModal({
			status: true,
			title: `${chat.roomName} 채널에서 나가시겠습니까?`,
			subText: '채널에서 나가게 돼요.',
			confirmButtonText: `나가기`,
			exitButtonText: '취소',
			onClickButton: leaveThechannel,
		});
	};
	return (
		<button onClick={onClickLeave}>
			<div className='px-5 py-4 bg-white rounded-b-xl hover:bg-gray-200 text-left'>
				<div className='text-sm font-bold text-red-500'>채널에서 나가기</div>
			</div>
		</button>
	);
};

export default ChannelLeaveField;
