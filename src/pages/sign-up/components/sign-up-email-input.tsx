import { Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { getJsonValueByKey } from 'components/utils/cookie-utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignUpEmailInput = () => {
	const navigate = useNavigate();
	const cookies = getJsonValueByKey('user-data');

	useEffect(() => {
		if (cookies && Object.keys(cookies).length === 0) {
			navigate('/', { replace: true });
			return;
		}
	}, [cookies]);

	return (
		<div className='flex flex-col gap-y-2'>
			<Label htmlFor='email' value='이메일' />
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
