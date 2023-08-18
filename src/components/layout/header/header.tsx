import { useState } from 'react';
import HeaderIcon from './header-logo';
import HeaderProfileIcon from './header-profile-icon';
import HeaderSign from './header-sign';
import HeaderTitle from './header-title';
import GetUserInfo from '../../utils/getUserInfo';

const Header = () => {
	const [user, setUser] = useState(GetUserInfo());

	return (
		<header
			className='flex justify-between items-center bg-gray-100 border-b-2 border-gray-200'
			style={{ height: '10%', padding: '1%' }}
		>
			<HeaderIcon />
			<HeaderTitle />
			{user ? <HeaderProfileIcon {...user} /> : <HeaderSign />}
		</header>
	);
};

export default Header;
