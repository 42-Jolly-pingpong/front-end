import ChatroomProperty from 'pages/create-chat/components/chatroom-property';
import { useRef } from 'react';

type PrivateRoomFieldType = {
	isPrivate: boolean;
	setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const PrivateRoomField = (props: PrivateRoomFieldType) => {
	const passwordRef = useRef<HTMLInputElement>(null);

	const { isPrivate, setIsPrivate, password, setPassword } = props;
	const privateProperty = 'Private only';
	const passwordProperty = 'Password';

	const onChangePrivate = () => {
		setIsPrivate((pre) => !pre);
		if (passwordRef.current != null) {
			passwordRef.current.focus();
		}
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
			<div className='flex p-1 items-center'>
				<ChatroomProperty property={privateProperty} />
				<input
					className='checkbox'
					type='checkbox'
					checked={isPrivate}
					onChange={onChangePrivate}
				/>
				<div className='absolute top-0 left-0'>P</div>
			</div>
			<div className='flex p-1 items-center'>
				<ChatroomProperty property={passwordProperty} />
				<input
					className='create-chatroom-form w-16'
					type='text'
					ref={passwordRef}
					onChange={onChangePassword}
					value={password}
					disabled={!isPrivate}
				/>
			</div>
		</div>
	);
};

export default PrivateRoomField;
