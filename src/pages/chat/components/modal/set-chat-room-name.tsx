import { Button, TextInput } from 'flowbite-react';
import { CreateChatRoom } from 'ts/interfaces/create-chat-room.model';

interface FormElements extends HTMLFormControlsCollection {
	roomName: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const SetChatRoomName = (props: {
	setPhase: React.Dispatch<React.SetStateAction<number>>;
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
			<h3>채널 이름</h3>
			<TextInput id='roomName' className='mt-3 mb-3' required />
			<div className='flex justify-end'>
				<Button type='submit'>다음</Button>
			</div>
		</form>
	);
};

export default SetChatRoomName;
