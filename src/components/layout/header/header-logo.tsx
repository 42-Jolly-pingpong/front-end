import { Link } from 'react-router-dom';

const HeaderLogo = () => {
	return (
		<div className='w-16 rounded-full'>
			<Link to='/'>
				<img src='images/logo.png' className='flex max-h-full' />
			</Link>
		</div>
	);
};

export default HeaderLogo;
