import { Button, Label, Radio, TextInput } from 'flowbite-react';
import useChatAlert from 'hooks/use-chat-alert';
import useHash from 'hooks/use-hash';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatState } from 'ts/states/chat-state';

const ChatSettingTap = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [settingPassword, setSettingPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);
	const hash = useHash();
	const setAlertModal = useChatAlert();

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

	const onClickChangeRoomType = (roomType: ChatRoomType) => {
		chatSocket.emit(
			'setChatRoom',
			{
				...chat,
				roomId: chat.id,
				roomType,
				password: null,
			},
			(status: number) => {
				if (status !== 200) {
					setAlertModal();
				}
			}
		);
	};

	const roomTypeField = () => {
		return (
			<div className='mt-4 px-5 py-4 bg-white rounded-t-xl border-b text-left'>
				{title('가시성')}
				<fieldset className='flex mt-3 gap-4' id='radio'>
					<div
						className='flex items-center gap-2'
						onClick={() => onClickChangeRoomType(ChatRoomType.PUBLIC)}
					>
						<Radio
							defaultChecked={
								chat.roomType !== ChatRoomType.PRIVATE ? true : false
							}
							id='public'
							name='roomType'
							value='public'
							className='checked:bg-primary-700'
						/>
						<Label htmlFor='public'>공개 - 누구나</Label>
					</div>
					<div
						className='flex items-center gap-2'
						onClick={() => onClickChangeRoomType(ChatRoomType.PRIVATE)}
					>
						<Radio
							defaultChecked={
								chat.roomType !== ChatRoomType.PRIVATE ? false : true
							}
							id='private'
							name='roomType'
							value='private'
							className='checked:bg-primary-700'
						/>
						<Label htmlFor='private'>비공개 - 일부 사람만</Label>
					</div>
				</fieldset>
			</div>
		);
	};

	const onClickPassword = () => {
		setPassword('');
		setSettingPassword(true);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const onClickDeletePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		chatSocket.emit(
			'setChatRoom',
			{
				...chat,
				roomId: chat.id,
				roomType: ChatRoomType.PUBLIC,
				password: null,
			},
			(status: number) => {
				if (status !== 200) {
					setAlertModal();
				}
			}
		);
	};

	const passwordField = () => {
		return (
			<button onClick={onClickPassword}>
				<div className='flex justify-between px-5 py-4 bg-white hover:bg-gray-200 border-b text-left'>
					{title('비밀번호 변경')}
					{chat.roomType === ChatRoomType.PROTECTED && (
						<button
							className='text-sm font-normal hover:underline'
							onClick={onClickDeletePassword}
						>
							삭제
						</button>
					)}
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
		const roomType =
			password.length === 0 ? ChatRoomType.PUBLIC : ChatRoomType.PROTECTED;

		chatSocket.emit(
			'setChatRoom',
			{
				...chat,
				roomId: chat.id,
				roomType,
				password: encryptedPassword,
			},
			(status: number) => {
				if (status === 200) {
					setPassword('');
					setSettingPassword(false);
					return;
				}
				setAlertModal();
			}
		);
	};

	const setPasswordField = () => {
		return (
			<div className='px-5 py-4 bg-white border-b text-left'>
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
		chatSocket.emit('deleteChatRoom', { roomId: chat.id }, (status: number) => {
			if (status !== 200) {
				setAlertModal();
			}
		});
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
			{roomTypeField()}
			{settingPassword ? setPasswordField() : passwordField()}
			{deleteField()}
		</div>
	);
};

export default ChatSettingTap;
