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
	const invalidCharactersRegex = /[^a-zA-Z0-9가-힣]/;

	const validateNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange('');
		const nickname = e.target.value;
		setNickname(nickname);

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(async () => {
			let newErrorMessage = '';
			if (nickname.length == 0) {
				newErrorMessage = '닉네임을 입력해주세요';
			} else if (nickname.length > 20) {
				newErrorMessage = '닉네임은 20글자까지 입력할 수 있습니다';
			} else if (nickname.indexOf(' ') !== -1) {
				newErrorMessage = '닉네임에는 공백이 포함될 수 없습니다';
			} else if (invalidCharactersRegex.test(nickname)) {
				newErrorMessage = '숫자, 영어, 한글 이외의 문자는 사용할 수 없습니다';
			} else {
				const user = await getUserByNickname(nickname);
				if (user !== undefined) {
					newErrorMessage = '중복된 닉네임 입니다';
				} else {
					newErrorMessage = '';
				}
			}
			setErrorMessage(newErrorMessage);
			onChange(newErrorMessage ? '' : nickname);
		}, 500);
		setTimeoutId(newTimeoutId);
	};

	return (
		<div className='flex flex-col gap-y-2'>
			<Label htmlFor='nickname' value='닉네임' />
			<TextInput
				id='nickname'
				type='text'
				color={errorMessage ? 'failure' : nickname ? 'success' : undefined}
				helperText={errorMessage}
				onChange={validateNickname}
				required
			/>
		</div>
	);
};

export default SignUpNicknameInput;
