import { HiMail } from 'react-icons/hi';
import { useRecoilValue } from 'recoil';
import { TextInput } from 'flowbite-react';
import { userState } from 'ts/states/user-state';

const ProfileEditEmail = () => {
	const user = useRecoilValue(userState);

	return (
		<div className='flex gap-6'>
			<div className='font-bold text-sm w-16'>이메일</div>
			<TextInput
				icon={HiMail}
				id='email'
				type='email'
				placeholder={user?.email}
				readOnly
				className='w-full'
			/>
		</div>
	);
};

export default ProfileEditEmail;
