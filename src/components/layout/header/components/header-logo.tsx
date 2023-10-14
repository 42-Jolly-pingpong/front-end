import { Link } from 'react-router-dom';
import LogoImage from '/images/logo.png';

const HeaderLogo = () => {
	return (
		<Link to='/' className='flex items-center p-1'>
			<img src={LogoImage} />
			<div className='font-bold'>졸리핑퐁</div>
		</Link>
	);
};

export default HeaderLogo;
