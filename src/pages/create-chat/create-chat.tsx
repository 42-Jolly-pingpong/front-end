import { useState } from 'react';
import MaxPeopleField from 'pages/create-chat/components/max-people-field';
import RoomNameField from 'pages/create-chat/components/room-name-field';
import PrivateRoomField from 'pages/create-chat/components/private-room-field';

const CreateChat = (): JSX.Element => {
	const [roomName, setRoomName] = useState('');
	const [maxPeople, setMaxPeople] = useState(3);
	const [isPrivate, setIsPrivate] = useState(false);
	const [password, setPassword] = useState('');

	return (
		<div className='w-full h-full'>
			<div className='flex flex-col justify-center items-center h-full'>
				<h3>Create chat room</h3>
				<div className='flex flex-col justify-start pt-8 pb-8'>
					<RoomNameField roomName={roomName} setRoomName={setRoomName} />
					<MaxPeopleField maxPeople={maxPeople} setMaxPeople={setMaxPeople} />
					<PrivateRoomField
						isPrivate={isPrivate}
						setIsPrivate={setIsPrivate}
						password={password}
						setPassword={setPassword}
					/>
				</div>
				<button>create</button>
			</div>
		</div>
	);
};

export default CreateChat;
