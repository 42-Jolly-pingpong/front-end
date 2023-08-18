import ChatroomProperty from "./chatroom-property";

const RoomNameField = (props: {roomName: string, setRoomName: React.Dispatch<React.SetStateAction<string>>} ) => {
	const {roomName, setRoomName} = props;
	const roomNameProperty = "Name";
	
	const onchangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoomName(e.target.value);
	}

	return (
		<div className="flex">
			<ChatroomProperty property={roomNameProperty} />
			<input 
					type="text"
					value={roomName}
					onChange={onchangeName} 
					className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset" >
			</input>
		</div>
	);
}

export default RoomNameField