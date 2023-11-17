import LoginButton from 'components/root/welcome/components/login-button';
import WelcomeTitle from 'components/root/welcome/components/welcome-title';

const Welcome = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen'>
			<WelcomeTitle />
			<LoginButton />
		</div>
	);
};

export default Welcome;
