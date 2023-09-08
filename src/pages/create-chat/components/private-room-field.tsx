import ChatroomProperty from 'pages/create-chat/components/chatroom-property';

const PrivateRoomField = (props: {
	isPrivate: boolean;
	setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { isPrivate, setIsPrivate, password, setPassword } = props;
	const privateProperty = 'Private only';
	const passwordProperty = 'Password';

	const onChangePrivate = () => {
		setIsPrivate((pre) => !pre);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length === 0) {
			setPassword('');
		}
		if (0 <= Number(e.target.value) && e.target.value.length <= 4) {
			setPassword(e.target.value);
		}
	};

	return (
		<div>
			<div className='flex'>
				<ChatroomProperty property={privateProperty} />
				<input
					type='checkbox'
					checked={isPrivate}
					onChange={onChangePrivate}
				></input>
			</div>
			<div className='flex'>
				<ChatroomProperty property={passwordProperty} />
				<input
					type='text'
					onChange={onChangePassword}
					value={password}
					disabled={!isPrivate}
				></input>
			</div>
		</div>
	);
};

export default PrivateRoomField;
