import { Button, TextInput } from 'flowbite-react';
import { BiHash } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import { CreateChatRoomDto } from 'ts/interfaces/create-chat-room.dto';

interface FormElements extends HTMLFormControlsCollection {
	roomName: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const SetChatRoomName = (props: {
	setPhase: React.Dispatch<React.SetStateAction<number>>;
	chatRoomInfo: CreateChatRoomDto;
	setChatRoomInfo: React.Dispatch<React.SetStateAction<CreateChatRoomDto>>;
}) => {
	const { setPhase, chatRoomInfo, setChatRoomInfo } = props;
	const [nameLength, setNameLength] = useState<number>(80);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const onSubmitName = (e: React.FormEvent<FormElement>) => {
		e.preventDefault();

		const roomName = e.currentTarget.elements.roomName.value;

		setChatRoomInfo((pre) => {
			return { ...pre, roomName };
		});

		setPhase(2);
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const currLength = 80 - e.target.value.length;
		setNameLength(currLength < 0 ? 0 : currLength);
	};

	return (
		<div className='relative'>
			<form onSubmit={onSubmitName} name='chat-name'>
				<h3>이름</h3>
				<TextInput
					ref={inputRef}
					id='roomName'
					icon={BiHash}
					className='mt-3 mb-3'
					required
					defaultValue={chatRoomInfo.roomName}
					placeholder='예: 게임 고수만'
					maxLength={80}
					onChange={onChangeName}
				/>
				<div className='ml-1 text-xs font-normal text-gray-500'>
					채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기 쉬운
					이름을 사용하세요.
				</div>
				<div className='ml-1 flex justify-between items-center mt-5'>
					<div className='text-sm font-light text-gray-900'>1/2단계</div>
					<Button
						type='submit'
						className='bg-primary-700 enabled:hover:bg-primary-800'
					>
						다음
					</Button>
				</div>
			</form>
			<div className='absolute top-12 right-4 text-sm font-normal text-gray-500 bg-gray-50'>
				{nameLength}
			</div>
		</div>
	);
};

export default SetChatRoomName;
