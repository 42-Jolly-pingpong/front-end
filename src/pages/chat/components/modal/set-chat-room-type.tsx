import { Button, Label, Radio, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { CreateChatRoom } from 'ts/interfaces/create-chat-room.model';

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

		setPhase(3);
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

	const radioButton = (id: string, value: string, label: string) => {
		return (
			<div className='flex items-center gap-2' onClick={handleLabelClick}>
				<Radio
					defaultChecked={id === 'public'}
					id={id}
					name='roomType'
					value={value}
					onChange={onChangeButtons}
				/>
				<Label htmlFor={id}>{label}</Label>
			</div>
		);
	};

	const passwordInput = () => {
		return (
			<div className='ml-6'>
				<div className='text-sm mb-2'>비밀번호를 입력하세요.</div>
				<TextInput name='password' type='password' className='w-60' />
			</div>
		);
	};

	return (
		<form onSubmit={onSubmitName}>
			<h3 className='mb-4'>채널 타입</h3>
			<fieldset className='flex max-w-md flex-col gap-4' id='radio'>
				{radioButton('public', 'PUBLIC', '공개 채널')}
				{radioButton('protected', 'PROTECTED', '보호되는 채널')}
				{passwordField && passwordInput()}
				{radioButton('private', 'PRIVATE', '비밀 채널')}
			</fieldset>
			<div className='flex justify-end'>
				<Button color='light' onClick={onClickPreButton} className='mr-2'>
					이전
				</Button>
				<Button type='submit'>다음</Button>
			</div>
		</form>
	);
};

export default SetChatRoomType;
