import { useNavigate } from 'react-router-dom';

const Logo = () => {
	const context = useNavigate();

	const onClickLogo = () => {
		context('/');
	};

	return (
		<button className='flex items-center h-12' onClick={onClickLogo}>
			<img src='/images/logo2.jpeg' className='w-6 h-6 m-3'></img>
			<div className='font-semibold text-lg'>죠리핑퐁</div>
		</button>
	);
};

export default Logo;
