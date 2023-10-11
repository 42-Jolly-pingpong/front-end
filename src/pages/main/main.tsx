import JoinButton from './components/join-button';
import JoinIntro from './components/join-intro';
import JoinVideo from './components/join-video';

const Main = () => {
	return (
		<div className='flex flex-col justify-center items-center text-center mt-15'>
			<JoinIntro />
			<JoinVideo />
			<JoinButton />
		</div>
	);
};

export default Main;
