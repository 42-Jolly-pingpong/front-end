import { Button, TextInput } from 'flowbite-react';
import { CreateChatRoom } from 'ts/interfaces/create-chat-room.model';
import { BiHash } from 'react-icons/bi';

interface FormElements extends HTMLFormControlsCollection {
	roomName: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const SetChatRoomName = (props: {
	setPhase: React.Dispatch<React.SetStateAction<number>>;
	chatRoomInfo: CreateChatRoom;
	setChatRoomInfo: React.Dispatch<React.SetStateAction<CreateChatRoom>>;
}) => {
	const { setPhase, setChatRoomInfo } = props;

	const onSubmitName = (e: React.FormEvent<FormElement>) => {
		e.preventDefault();

		const roomName = e.currentTarget.elements.roomName.value;

		setChatRoomInfo((pre) => {
			return { ...pre, roomName };
		});

		setPhase(2);
	};

	return (
		<form onSubmit={onSubmitName}>
			<h3>이름</h3>
			<TextInput
				id='roomName'
				icon={BiHash}
				className='mt-3 mb-3'
				required
				defaultValue={props.chatRoomInfo.roomName}
				placeholder='예: 게임 고수만'
			/>
			<div className='ml-1 text-xs font-normal text-gray-500'>
				채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기 쉬운
				이름을 사용하세요.
			</div>
			<div className='ml-1 flex justify-between items-center mt-5'>
				<div className='text-sm font-light text-gray-900'>1/2단계</div>
				<Button type='submit'>다음</Button>
			</div>
		</form>
	);
};

export default SetChatRoomName;
