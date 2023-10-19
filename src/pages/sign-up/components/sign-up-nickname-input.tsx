import { getUserByNickname } from 'api/user-api';
import { Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

interface emailProps {
	onChange: (nickname: string) => void;
}

const SignUpNicknameInput: React.FC<emailProps> = ({ onChange }) => {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [nickname, setNickname] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const validateNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange('');
		const nickname = e.target.value;
		setNickname(nickname);

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(async () => {
			if (nickname.length == 0) {
				setErrorMessage('닉네임을 입력해주세요.');
			} else if (nickname.length > 20) {
				setErrorMessage('닉네임은 20글자까지 입력할 수 있습니다.');
			} else if (nickname.indexOf(' ') !== -1) {
				setErrorMessage('닉네임에는 공백이 포함될 수 없습니다.');
			} else {
				const user = await getUserByNickname(nickname);
				if (user !== undefined) {
					setErrorMessage('중복된 닉네임 입니다.');
				} else {
					setErrorMessage('');
				}
			}
			onChange(errorMessage ? '' : nickname);
		}, 500);
		setTimeoutId(newTimeoutId);
	};

	return (
		<>
			<Label htmlFor='nickname' value='닉네임' className='mt-2' />
			<TextInput
				id='nickname'
				type='search'
				color={errorMessage ? 'failure' : nickname ? 'success' : undefined}
				helperText={errorMessage}
				onChange={validateNickname}
				required
			/>
		</>
	);
};

export default SignUpNicknameInput;
