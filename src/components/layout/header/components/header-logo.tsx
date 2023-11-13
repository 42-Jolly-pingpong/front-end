import { Link } from 'react-router-dom';
import LogoImage from '/images/logo.png';

const HeaderLogo = () => {
	return (
		<Link to='/' className='flex items-center gap-3'>
			<img src={LogoImage} className='w-8 h-8' />
			<span className='font-bold text-2xl'>죠리핑퐁</span>
		</Link>
	);
};

export default HeaderLogo;
