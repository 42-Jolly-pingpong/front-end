import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'socket/chat-socket';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';
import { chatState } from 'ts/states/chat-state';

const ChannelDeleteField = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const setChatAlertModal = useSetRecoilState(chatAlertModalState);
	const setAlertModal = useChatAlert();

	const deleteChannel = () => {
		chatSocket.emit('deleteChatRoom', { roomId: chat.id }, (status: number) => {
			if (status !== 200) {
				setChatAlertModal((pre) => ({ ...pre, status: false }));
				setAlertModal();
				return;
			}
			setChatAlertModal((pre) => ({ ...pre, status: false }));
		});
	};

	const onClickDelete = () => {
		setChatAlertModal({
			status: true,
			title: `${chat.roomName} 채널을 삭제하겠습니까?`,
			subText: '채널이 영구적으로 삭제돼요.',
			confirmButtonText: `삭제하기`,
			exitButtonText: '취소',
			onClickButton: deleteChannel,
		});
	};

	return (
		<button onClick={onClickDelete}>
			<div className='px-5 py-4 bg-white rounded-b-xl hover:bg-gray-200 text-left'>
				<div className='text-sm font-bold text-red-500'>채널 삭제하기</div>
			</div>
		</button>
	);
};

export default ChannelDeleteField;
