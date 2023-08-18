import { Link } from 'react-router-dom';

const HeaderLogo = () => {
	return (
		<div className='layout-icon'>
			<Link to='/'>
				<img src='images/logo.png' className='flex max-h-full' />
			</Link>
		</div>
	);
};

export default HeaderLogo;
