import { Textarea } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatState } from 'ts/states/chat-state';
import { userState } from 'ts/states/user-state';
import { chatSocket } from 'socket/chat-socket';

export const ChatInput = () => {
	const [input, setInput] = useState<string>('');
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [scrollbar, setSrollbar] = useState<string>('hide-scrollbar');
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const chat = useRecoilValue(chatState).chatRoom;
	const user = useRecoilValue(userState) as User;

	useEffect(() => {
		setIsMuted(false);
		if (chat !== null && chat.roomType !== ChatRoomType.DM) {
			const participant = (chat as ChatRoom).participants.find(
				(participant) => participant.user.id === user.id
			);
			if (participant) {
				if (
					participant.status === ChatParticipantStatus.MUTED &&
					participant.muteExpirationTime &&
					new Date() < new Date(participant.muteExpirationTime)
				) {
					setIsMuted(true);
				}
			}
		}
	}, [chat]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
	}, [chat]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.style.height = '0px';
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = scrollHeight + 'px';
			setSrollbar(scrollHeight <= 88 ? 'no-scrollbar' : '');
		}
	}, [textareaRef.current?.value]);

	const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const onClickSend = () => {
		if (chat) {
			chatSocket.emit('sendChat', { content: input.trim(), roomId: chat.id });
			setInput('');
		}
	};

	const sendButton = () => {
		const isDisabled = input.trim().length === 0 || isMuted;
		return (
			<button
				className={`ml-3 ${isDisabled ? 'text-gray-400' : 'text-primary-700'}`}
				disabled={chat === null}
				onClick={onClickSend}
			>
				<IoSend />
			</button>
		);
	};

	const onDownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (input.trim().length !== 0) {
				onClickSend();
			}
		}
	};

	const placeholder = () => {
		if (chat === null) return '';
		if (isMuted) return `${user.nickname}님은 현재 채팅이 제한되어 있습니다.`;
		switch (chat.roomType) {
			case ChatRoomType.DM:
				return `${(chat as Dm).chatMate.nickname}에게 메시지 보내기`;
			default:
				return `${(chat as ChatRoom).roomName}에 메시지 보내기`;
		}
	};
	return (
		<div className='flex flex-none mx-6 mb-6 bg-gray-50 border border-gray-300 rounded-lg items-center justify-stretch p-3'>
			<Textarea
				disabled={chat === null}
				ref={textareaRef}
				placeholder={placeholder()}
				rows={1}
				className={`bg-white resize-none rounded-lg border border-gray-300 h-[42px] max-h-20 overflow-y-auto ${scrollbar} focus:ring-0 focus:border focus:border-gray-400`}
				value={input}
				onChange={onChangeInput}
				onKeyDown={onDownEnter}
				maxLength={4000}
			/>
			{sendButton()}
		</div>
	);
};
