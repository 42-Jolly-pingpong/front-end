import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiCheck, BiHash, BiLock } from 'react-icons/bi';
import { ListGroup, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import userData from 'ts/mock/user-data';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { BsDot } from 'react-icons/bs';
import useChangeChat from 'hooks/use-change-chat';
import { useSetRecoilState } from 'recoil';
import { chatListState } from 'ts/states/chat-list.state';
import useFetch from 'hooks/use-fetch';
import { chatModalState } from 'ts/states/chat-modal-state';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import useHash from 'hooks/use-hash';

export const SearchChannelItem = (props: { channel: ChatRoom }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [input, setInput] = useState<string>('');
	const [inputFail, setInputFail] = useState<boolean>(false);
	const [enterPassword, setEnterPassword] = useState<boolean>(false);
	const setChat = useChangeChat();
	const setChannelList = useSetRecoilState(chatListState);
	const setModalStatus = useSetRecoilState(chatModalState);
	const getData = useFetch();
	const inputRef = useRef<HTMLInputElement>(null);
	const hash = useHash();
	const owner = props.channel.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);
	const user = userData[0]; //temp
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

	const onMouseEnter = () => {
		setIsHovered(true);
	};

	const onMouseLeave = () => {
		setIsHovered(false);
	};

	const channelIcon = () => {
		switch (props.channel.roomType) {
			case ChatRoomType.PUBLIC:
				return <BiHash />;

			case ChatRoomType.PROTECTED:
				return <BiLock />;
		}
	};

	const buttonOnChannel = () => {
		if (enterPassword) {
			return (
				<div className='h-8 focus:outline-none text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 text-xs font-medium rounded-lg px-3 py-2'>
					입력
				</div>
			);
		}
		if (isUserInChannel) {
			return (
				<div className='h-8 border border-gray-200 focus:outline-none text-gray-800 bg-white hover:bg-gray-300 focus:ring-4 focus:ring-cyan-300 text-xs font-medium rounded-lg px-3 py-2'>
					이동
				</div>
			);
		}
		return (
			<div className='h-8 focus:outline-none text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 text-xs font-medium rounded-lg px-3 py-2'>
				참여
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
		(async () => {
			await getData('POST', `/chat-rooms/${props.channel.id}`, { password })
				.then((res) => {
					if (res.statusText === 'Unauthorized') {
						throw Error(res.statusText);
					}
					return res.json();
				})
				.then((data: ChatRoom) => {
					setChannelList((pre) => {
						return {
							...pre,
							channelList: [...pre.channelList, data],
						};
					});
					setChat(data);
					setModalStatus(ChatModalStatus.CLOSE);
				})
				.catch((err) => {
					if (err.message === 'Unauthorized') {
						console.log('비번 틀림');
						changeInput();
						setInput('');
					}
				});
		})();
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
			<TextInput
				color={inputFail ? 'failure' : 'gray'}
				helperText={
					inputFail ? (
						<>
							<span className='text-xs font-normal text-red-600'>
								비밀번호가 일치하지 않습니다.
							</span>
						</>
					) : null
				}
				onClick={onClickInput}
				ref={inputRef}
				name='password'
				type='password'
				className='w-60 mt-2'
				sizing='sm'
				placeholder='채널 비밀번호'
				value={input}
				onChange={onChangeInput}
			/>
		);
	};

	return (
		<ListGroup.Item
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClickItem}
		>
			<div className='flex flex-col items-start'>
				<div className='flex items-center text-sm font-bold text-gray-900'>
					<div className='mr-1'>{channelIcon()}</div>
					{props.channel.roomName}
				</div>
				{!enterPassword ? (
					<div className='flex items-center text-xm text-gray-500 font-light'>
						{isUserInChannel && badge()}
						{props.channel.currentPeople}명의 멤버
						<BsDot />
						채널 소유주 : {owner?.user.intraId}
					</div>
				) : (
					passwordInput()
				)}
			</div>
			{isHovered && buttonOnChannel()}
		</ListGroup.Item>
	);
};
