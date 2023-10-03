import { Button, Label, Radio, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { CreateChatRoom } from 'ts/interfaces/create-chat-room.model';
import { chatModalState } from 'ts/states/chat-modal-state';

interface FormElements extends HTMLFormControlsCollection {
	roomType: HTMLInputElement;
	password: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const SetChatRoomType = (props: {
	setPhase: React.Dispatch<React.SetStateAction<number>>;
	setChatRoomInfo: React.Dispatch<React.SetStateAction<CreateChatRoom>>;
}) => {
	const [passwordField, setPasswordField] = useState<boolean>(false);
	const setModalStatus = useSetRecoilState(chatModalState);

	const { setPhase, setChatRoomInfo } = props;

	const onSubmitName = (e: React.FormEvent<FormElement>) => {
		e.preventDefault();

		const roomTypeString = e.currentTarget.elements.roomType.value;
		const roomType: ChatRoomType =
			ChatRoomType[roomTypeString as keyof typeof ChatRoomType];

		const passwordValue = e.currentTarget.elements.password;
		const password =
			passwordValue === undefined ? null : Number(passwordValue.value);

		setChatRoomInfo((pre) => {
			return { ...pre, roomType, password };
		});

		//create channel

		setModalStatus(ChatModalStatus.CLOSE);
	};

	const handleLabelClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const radioId = e.currentTarget.getAttribute('for');
		if (radioId !== null) {
			const radioElement = document.getElementById(radioId) as HTMLInputElement;
			if (radioElement) {
				radioElement.checked = true;
			}
		}
	};

	const onClickPreButton = () => {
		setPhase(1);
	};

	const onChangeButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'PROTECTED') {
			setPasswordField(true);
			return;
		}
		setPasswordField(false);
	};

	const radioButton = (
		id: string,
		value: string,
		label: string,
		subLabel: string
	) => {
		return (
			<div className='flex items-start gap-2' onClick={handleLabelClick}>
				<Radio
					defaultChecked={id === 'public'}
					id={id}
					name='roomType'
					value={value}
					onChange={onChangeButtons}
					className='mt-0.5'
				/>
				<Label htmlFor={id}>
					<div>
						{label}
						<div className='text-xs font-normal text-gray-500'>{subLabel}</div>
					</div>
				</Label>
			</div>
		);
	};

	const passwordInput = () => {
		return (
			<div className='ml-6'>
				<TextInput
					name='password'
					type='password'
					className='w-60'
					sizing='sm'
					required={passwordField}
					placeholder='채널 비밀번호'
				/>
			</div>
		);
	};

	return (
		<form onSubmit={onSubmitName}>
			<h3 className='mb-4'>채널 타입</h3>
			<fieldset className='flex max-w-md flex-col gap-4' id='radio'>
				{radioButton('public', 'PUBLIC', '공개 - 누구나', '')}
				{radioButton(
					'protected',
					'PROTECTED',
					'비밀번호 요구 - 암호를 공유받은 사람만',
					'비밀번호 입력을 통해서만 가입할 수 있음'
				)}
				{passwordField && passwordInput()}
				{radioButton(
					'private',
					'PRIVATE',
					'비공개 - 일부 사람만',
					'초대를 통해서만 가입할 수 있음'
				)}
			</fieldset>
			<div className='flex justify-between items-center mt-5'>
				<div className='text-sm font-light text-gray-900'>2/2단계</div>
				<div className='flex'>
					<Button color='light' onClick={onClickPreButton} className='mr-2'>
						이전
					</Button>
					<Button type='submit'>생성</Button>
				</div>
			</div>
		</form>
	);
};

export default SetChatRoomType;
