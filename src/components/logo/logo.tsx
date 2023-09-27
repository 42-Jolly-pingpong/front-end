import { useNavigate } from 'react-router-dom';

const Logo = () => {
	const context = useNavigate();

	const onClickLogo = () => {
		context('/');
	};

	return (
		<div className='flex items-center' onClick={onClickLogo}>
			<img src='/images/logo2.jpeg' className='w-6 h-6 m-3'></img>
			<div className='font-semibold'>죠리핑퐁</div>
		</div>
	);
};

export default Logo;
