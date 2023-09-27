import { Link } from 'react-router-dom';

const HeaderLogo = () => {
	return (
		<Link to='/' className='flex items-center'>
			<img src='images/header-icon2.png' />
			<div>졸리핑퐁</div>
		</Link>
	);
};

export default HeaderLogo;
