import { useState } from "react";
import RoomNameField from "./room-name-field";
import MaxPeopleField from "./max-people-field";
import PrivateRoomField from "./private-room-field";

const CreateChat = (): JSX.Element => {
	const [roomName, setRoomName] = useState('');
	const [maxPeople, setMaxPeople] = useState(3); //temp
	const [isPrivate, setIsPrivate] = useState(false);
	const [password, setPassword] = useState('');

	return (
		<div>
			<div>Create chat room</div>
			<RoomNameField roomName={roomName} setRoomName={setRoomName}/>
			<MaxPeopleField maxPeople={maxPeople} setMaxPeople={setMaxPeople} />
			<PrivateRoomField isPrivate={isPrivate} setIsPrivate={setIsPrivate} password={password} setPassword={setPassword} />
			<button>create</button>
		</div>
	);
}

export default CreateChat
