import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TextInput } from 'flowbite-react';
import { userState } from 'ts/states/user-state';
import { getUserByNickname } from 'api/user-api';

interface NicknameProps {
	onChange: (nickname: string) => void;
}

const ProfileEditNickname: React.FC<NicknameProps> = ({ onChange }) => {
	const user = useRecoilValue(userState);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [nickname, setNickname] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const validateNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const invalidCharactersRegex = /[^a-zA-Z0-9가-힣]/;
		onChange('');
		const nickname = e.target.value;
		if (nickname === '') setNickname(nickname);

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(async () => {
			let newErrorMessage = '';
			if (nickname.length == 0) {
				newErrorMessage = '닉네임을 입력해주세요.';
			} else if (nickname.length > 20) {
				newErrorMessage = '닉네임은 20글자까지 입력할 수 있습니다.';
			} else if (nickname.indexOf(' ') !== -1) {
				newErrorMessage = '닉네임에는 공백이 포함될 수 없습니다.';
			} else if (invalidCharactersRegex.test(nickname)) {
				newErrorMessage = '숫자, 영어, 한글 이외의 문자는 사용할 수 없습니다';
			} else {
				const findUser = await getUserByNickname(nickname);
				if (findUser !== undefined && user!.nickname !== findUser.nickname) {
					newErrorMessage = '중복된 닉네임 입니다.';
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
		<div className='flex gap-6'>
			<div className='font-bold text-sm w-16'>닉네임</div>
			<div className='flex flex-col w-full'>
				<TextInput
					type='search'
					defaultValue={user?.nickname}
					color={errorMessage ? 'failure' : nickname ? 'success' : undefined}
					onChange={validateNickname}
					helperText={errorMessage}
					required
				/>
			</div>
		</div>
	);
};

export default ProfileEditNickname;
