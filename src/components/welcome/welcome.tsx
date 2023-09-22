import Login from './login';
import WelcomeTitle from './welcome-title';

const Welcome = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-screen'>
			<WelcomeTitle />
			<Login />
		</div>
	);
};

export default Welcome;
