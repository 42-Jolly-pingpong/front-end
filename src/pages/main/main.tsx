import JoinButton from './components/join-button';
import JoinIntro from './components/join-intro';
//import JoinAnimation from './components/join-animation';

const Main = () => {
	return (
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			{/*<JoinAnimation />*/}
			<JoinButton />
		</div>
	);
};

export default Main;
