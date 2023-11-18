import { useNavigate } from 'react-router-dom';

const Logo = () => {
	const navigate = useNavigate();

	const onClickLogo = () => {
		navigate('/');
	};

	return (
		<div className='flex h-12 border-b'>
			<button className='flex items-center gap-2 ml-3' onClick={onClickLogo}>
				<img src='/images/logo2.jpeg' className='w-6 h-6' />
				<div className='font-semibold text-lg'>죠리핑퐁</div>
			</button>
		</div>
	);
};

export default Logo;
