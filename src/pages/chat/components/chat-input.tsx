import { Textarea } from 'flowbite-react';
import useFetch from 'hooks/use-fetch';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import userData from 'ts/mock/user-data';
import { chatState } from 'ts/states/chat-state';

export const ChatInput = () => {
	const [input, setInput] = useState<string>('');
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [scrollbar, setSrollbar] = useState<string>('hide-scrollbar');
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const chat = useRecoilValue(chatState).chatRoom;
	const addChats = useSetRecoilState(chatState);
	const getData = useFetch();

	const user = userData[0]; //temp

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
			setSrollbar(scrollHeight <= 88 ? 'hide-scrollbar' : '');
		}
	}, [textareaRef.current?.value]);

	const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const onClickSend = () => {
		if (chat) {
			(async () => {
				getData('POST', `/chat-rooms/${chat?.id}/chats`, {
					content: input.trim(),
				})
					.then((res) => {
						if (res.statusText === 'Unauthorized') {
							throw Error(res.statusText);
						}
						return res.json();
					})
					.then((data) => {
						addChats((pre) => ({ ...pre, chats: [...pre.chats, data] }));
						setInput('');
						if (textareaRef.current) textareaRef.current.focus();
					})
					.catch((err) => {
						if (err.message === 'Unauthorized') {
							console.log('음소거 상태');
						}
					});
			})();
		}
	};

	const sendButton = () => {
		const isDisabled = input.trim().length === 0;
		return (
			<button
				className={`mx-3 ${isDisabled ? 'text-gray-400' : 'text-primary-700'}`}
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
		<div className=''>
			<div className='flex mx-4 mb-3 bg-gray-100 border border-gray-300 rounded-lg items-center justify-stretch'>
				<Textarea
					disabled={chat === null}
					ref={textareaRef}
					placeholder={placeholder()}
					rows={1}
					className={`bg-white my-2 ml-2 resize-none rounded-lg border border-gray-300 max-h-20 overflow-y-auto ${scrollbar} focus:ring-0 focus:border focus:border-gray-400`}
					value={input}
					onChange={onChangeInput}
					onKeyDown={onDownEnter}
					maxLength={4000}
				/>
				{sendButton()}
			</div>
		</div>
	);
};
