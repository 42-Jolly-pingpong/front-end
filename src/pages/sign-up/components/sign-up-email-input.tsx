import { Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { getJsonValueByKey } from 'components/utils/cookieUtils';

const SignUpEmailInput = () => {
	const cookies = getJsonValueByKey('user-data');
	return (
		<div className="flex flex-col gap-y-2">
			<Label htmlFor='email' value='이메일'/>
			<TextInput
				icon={HiMail}
				id='email'
				type='email'
				placeholder={cookies.email}
				readOnly
			/>
		</div>
	);
};

export default SignUpEmailInput;
