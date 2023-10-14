import { Button, TextInput } from 'flowbite-react';
import useChangeChat from 'hooks/use-change-chat';
import useFetch from 'hooks/use-fetch';
import useHash from 'hooks/use-hash';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';

const ChatSettingTap = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [settingPassword, setSettingPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);
	const getData = useFetch();
	const setChat = useChangeChat();
	const setChatList = useSetRecoilState(chatListState);
	const hash = useHash();

	useEffect(() => {
		if (inputRef.current && settingPassword) {
			inputRef.current.focus();
		}
	}, [settingPassword]);

	const owner = chat.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

	const title = (label: string) => {
		return <div className='text-sm font-bold'>{label}</div>;
	};

	const content = (label: string) => {
		return <div className='text-sm font-normal gray-900'>{label}</div>;
	};

	const ownerField = () => {
		if (owner) {
			return (
				<div className='px-5 py-4 bg-white rounded-xl'>
					{title('채널 소유주')}
					<div className='mt-1 flex items-center gray-900'>
						{content(owner.user.nickname)}
					</div>
				</div>
			);
		}
	};

	const onClickPassword = () => {
		setPassword('');
		setSettingPassword(true);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const passwordField = () => {
		return (
			<button onClick={onClickPassword}>
				<div className='mt-4 px-5 py-4 bg-white rounded-t-xl hover:bg-gray-200 border-b text-left'>
					{title('비밀번호 변경')}
				</div>
			</button>
		);
	};

	const onchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onClickClear = () => {
		setSettingPassword(false);
	};

	const onClickChange = async () => {
		const encryptedPassword = await hash(password);
		await getData('PUT', `/chat-rooms/${chat.id}`, {
			...chat,
			password: encryptedPassword,
		})
			.then((res) => {
				if (!res.ok) {
					throw Error('비밀번호 변경 실패');
				}
				setSettingPassword(false);
			})
			.catch((err) => console.log(err.message));
	};

	const setPasswordField = () => {
		return (
			<div className='mt-4 px-5 py-4 bg-white rounded-t-xl border-b text-left'>
				{title('비밀번호 변경')}
				<TextInput
					ref={inputRef}
					type='password'
					value={password}
					onChange={onchangePassword}
					className='mt-2'
					placeholder='채널 비밀번호'
				/>
				<div className='flex justify-end mt-2'>
					<Button color='light' size='sm' onClick={onClickClear}>
						취소
					</Button>
					<Button
						color='warning'
						size='sm'
						className='bg-primary-700 enabled:hover:bg-primary-800 ml-2'
						onClick={onClickChange}
					>
						변경
					</Button>
				</div>
			</div>
		);
	};

	const onClickDelete = () => {
		(async () => {
			getData('DELETE', `/chat-rooms/${chat.id}`)
				.then((res) => {
					if (!res.ok) {
						throw Error('삭제 불가');
					}
					setChatList((pre) => ({
						...pre,
						channelList: pre.channelList.filter(
							(channel) => channel.id !== chat.id
						),
					}));
					setChat(null);
				})
				.catch(() => console.log('삭제 불가'));
		})();
	};

	const deleteField = () => {
		return (
			<button onClick={onClickDelete}>
				<div className='px-5 py-4 bg-white rounded-b-xl hover:bg-gray-200 text-left'>
					<div className='text-sm font-bold text-red-500'>채널 삭제하기</div>
				</div>
			</button>
		);
	};

	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap bg-gray-100 p-4'>
			{ownerField()}
			{settingPassword ? setPasswordField() : passwordField()}
			{deleteField()}
		</div>
	);
};

export default ChatSettingTap;
