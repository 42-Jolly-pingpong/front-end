import JoinIntro from './components/join-intro';
import JoinButton from './components/join-button';

const Main = () => {
	return (
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			<JoinButton />
		</div>
	);
};

export default Main;
