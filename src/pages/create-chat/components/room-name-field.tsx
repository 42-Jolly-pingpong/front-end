import ChatroomProperty from 'pages/create-chat/components/chatroom-property';

const RoomNameField = (props: {
	roomName: string;
	setRoomName: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { roomName, setRoomName } = props;
	const roomNameProperty = 'Name';

	const onchangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoomName(e.target.value);
	};

	return (
		<div className='create-chatroom-field'>
			<ChatroomProperty property={roomNameProperty} />
			<input
				type='text'
				value={roomName}
				onChange={onchangeName}
				className='create-chatroom-form'
			/>
		</div>
	);
};

export default RoomNameField;
