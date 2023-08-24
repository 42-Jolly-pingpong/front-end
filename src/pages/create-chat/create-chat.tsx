import { useState } from "react";
import MaxPeopleField from "./components/max-people-field";
import RoomNameField from "./components/room-name-field";
import PrivateRoomField from "./components/private-room-field";

const CreateChat = (): JSX.Element => {
	const [roomName, setRoomName] = useState('');
	const [maxPeople, setMaxPeople] = useState('3');
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
