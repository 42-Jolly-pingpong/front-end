import { getUserByNickname } from 'api/user-api';
import { Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

interface emailProps {
	onChange: (nickname: string) => void;
}

const SignUpNicknameInput: React.FC<emailProps> = ({ onChange }) => {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>();

	const validateNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const nickname = e.target.value;

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(async () => {
			if (nickname.length === 0) {
				setErrorMessage('닉네임을 입력해주세요.');
				onChange('');
			} else if (nickname.length > 20) {
				setErrorMessage('닉네임은 20글자까지 입력할 수 있습니다.');
				onChange('');
			} else if (nickname.indexOf(' ') !== -1) {
				setErrorMessage('닉네임에는 공백이 포함될 수 없습니다.');
				onChange('');
			} else if ((await getUserByNickname(nickname)) !== undefined) {
				setErrorMessage('중복된 닉네임 입니다.');
				onChange('');
			} else {
				onChange(nickname);
				setErrorMessage('');
			}
		}, 500);
		setTimeoutId(newTimeoutId);
	};

	if (errorMessage) {
		return (
			<>
				<Label htmlFor='nickname' value='닉네임' className='mt-2' />
				<TextInput
					id='nickname'
					type='search'
					required
					color='failure'
					helperText={errorMessage}
					onChange={validateNickname}
				/>
			</>
		);
	} else {
		return (
			<>
				<Label htmlFor='nickname' value='닉네임' className='mt-2' />
				<TextInput
					id='nickname'
					type='search'
					required
					onChange={validateNickname}
				/>
			</>
		);
	}
};

export default SignUpNicknameInput;
