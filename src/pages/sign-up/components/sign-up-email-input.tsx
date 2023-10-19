import { Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { getJsonValueByKey } from 'components/utils/cookieUtils';

const SignUpEmailInput = () => {
	const cookies = getJsonValueByKey('user-data');
	return (
		<>
			<Label htmlFor='email' value='이메일' className='mt-2' />
			<TextInput
				icon={HiMail}
				id='email'
				type='email'
				placeholder={cookies.email}
				readOnly
			/>
		</>
	);
};

export default SignUpEmailInput;
