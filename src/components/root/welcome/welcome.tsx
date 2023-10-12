import LoginButton from './components/login-button';
import WelcomeTitle from './components/welcome-title';

const Welcome = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-screen'>
			<WelcomeTitle />
			<LoginButton />
		</div>
	);
};

export default Welcome;
