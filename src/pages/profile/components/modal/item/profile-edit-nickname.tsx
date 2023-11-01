import { TextInput } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

interface NicknameProps {
	onChange: (nickname: string) => void;
}

const ProfileEditNickname: React.FC<NicknameProps> = ({ onChange }) => {
	const user = useRecoilValue(userState);

	return (
		<div className='flex flex-row mt-5'>
			<div className='font-bold text-sm w-16 mx-6'>닉네임 </div>
			<TextInput
				type='search'
				placeholder={user?.nickname}
				defaultValue={user?.nickname}
				className=' w-full'
			/>
		</div>
	);
};

export default ProfileEditNickname;
