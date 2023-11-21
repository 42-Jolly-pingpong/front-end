import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiCheck, BiHash, BiLock } from 'react-icons/bi';
import { ListGroup, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { BsDot } from 'react-icons/bs';
import useChangeChat from 'hooks/use-change-chat';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatListState } from 'ts/states/chat-list.state';
import { chatModalState } from 'ts/states/chat-modal-state';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import useHash from 'hooks/use-hash';
import { chatSocket } from 'socket/chat-socket';
import useChatAlert from 'hooks/use-chat-alert';
import { userState } from 'ts/states/user-state';
import User from 'ts/interfaces/user.model';

export const SearchChannelItem = (props: { channel: ChatRoom }) => {
	const [input, setInput] = useState<string>('');
	const [inputFail, setInputFail] = useState<boolean>(false);
	const [enterPassword, setEnterPassword] = useState<boolean>(false);
	const setChat = useChangeChat();
	const setChannelList = useSetRecoilState(chatListState);
	const setModalStatus = useSetRecoilState(chatModalState);
	const inputRef = useRef<HTMLInputElement>(null);
	const hash = useHash();
	const setAlertModal = useChatAlert();
	const user = useRecoilValue(userState) as User;

	const owner = props.channel.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);
	const isUserInChannel =
		props.channel.participants.filter(
			(participant) =>
				participant.user.id == user.id &&
				!(
					participant.status === ChatParticipantStatus.KICKED ||
					participant.status === ChatParticipantStatus.LEFT
				)
		).length !== 0;

	useEffect(() => {
		if (inputRef.current && enterPassword) {
			inputRef.current.focus();
		}
	}, [enterPassword]);

	const channelIcon = () => {
		switch (props.channel.roomType) {
			case ChatRoomType.PUBLIC:
				return <BiHash />;

			case ChatRoomType.PROTECTED:
				return <BiLock />;
		}
	};

	const buttonOnChannel = () => {
		const base =
			'w-[47px] h-8 focus:outline-none focus:ring-4 text-xs font-medium rounded-lg px-3 py-2';
		const whiteButtonStyle = `${base} border border-gray-200 text-gray-800 bg-white hover:bg-gray-300 focus:ring-cyan-300`;
		const yellowButtonStyle = `${base} text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 text-xs`;

		if (isUserInChannel) {
			return (
				<div onClick={onClickItem} className={whiteButtonStyle}>
					{'이동'}
				</div>
			);
		}
		return (
			<div onClick={onClickItem} className={yellowButtonStyle}>
				{enterPassword ? '입력' : '참여'}
			</div>
		);
	};

	const badge = () => {
		return (
			<div className='flex items-center text-green-500 text-sm font-bold mr-1'>
				<BiCheck />
				<div>참여함</div>
			</div>
		);
	};

	const changeInput = () => {
		setInputFail(true);

		setTimeout(() => {
			setInputFail(false);
		}, 1000);
	};

	const onClickItem = async () => {
		if (isUserInChannel) {
			setChat(props.channel);
			setModalStatus(ChatModalStatus.CLOSE);
			return;
		}
		if (props.channel.roomType === ChatRoomType.PROTECTED && !enterPassword) {
			setEnterPassword(true);
			return;
		}
		var password = null;
		if (enterPassword) {
			password = await hash(input);
		}

		chatSocket.emit(
			'enterChatRoom',
			{ roomId: props.channel.id, password },
			(response: { status: number; chatRoom: ChatRoom }) => {
				if (response.status === 401) {
					changeInput();
					setInput('');
					return;
				}
				if (response.status !== 200) {
					setAlertModal();
					setModalStatus(ChatModalStatus.CLOSE);
					return;
				}
				setChannelList((pre) => {
					return {
						...pre,
						channelList: [...pre.channelList, response.chatRoom],
					};
				});
				setChat(response.chatRoom);
				setModalStatus(ChatModalStatus.CLOSE);
				return;
			}
		);
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const onClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setInputFail(false);
	};

	const passwordInput = () => {
		return (
			<form>
				<TextInput
					color={inputFail ? 'failure' : 'gray'}
					helperText={
						inputFail ? (
							<span className='text-xs font-normal text-red-600'>
								비밀번호가 일치하지 않습니다.
							</span>
						) : null
					}
					onClick={onClickInput}
					ref={inputRef}
					name='password'
					type='password'
					className='w-[236px] mt-2'
					sizing='sm'
					placeholder='채널 비밀번호'
					value={input}
					onChange={onChangeInput}
					autoComplete='off'
				/>
			</form>
		);
	};

	const channelInfo = () => {
		return (
			<div className='flex items-center text-xm text-gray-500 font-light'>
				{isUserInChannel && badge()}
				{props.channel.currentPeople}명의 멤버
				<BsDot />
				채널 소유주 : {owner?.user.intraId}
			</div>
		);
	};

	return (
		<ListGroup.Item>
			<div className='flex flex-col items-start'>
				<div className='flex items-start text-sm font-bold text-gray-900'>
					<div className='mt-1 mr-1'>{channelIcon()}</div>
					<div className='text-start break-all'>{props.channel.roomName}</div>
				</div>
				{!enterPassword ? channelInfo() : passwordInput()}
			</div>
			<div>{buttonOnChannel()}</div>
		</ListGroup.Item>
	);
};
