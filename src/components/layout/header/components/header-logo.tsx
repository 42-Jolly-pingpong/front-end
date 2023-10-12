import { Link } from 'react-router-dom';

const HeaderLogo = () => {
	return (
		<Link to='/' className='flex items-center p-1'>
			<img src='images/logo.png' />
			<div className='font-bold'>졸리핑퐁</div>
		</Link>
	);
};

export default HeaderLogo;
