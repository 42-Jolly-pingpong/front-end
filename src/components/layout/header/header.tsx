import { useState } from 'react';
import HeaderLogo from 'components/layout/header/header-logo';
import HeaderTitle from 'components/layout/header/header-title';
import HeaderProfileIcon from 'components/layout/header/header-profile-icon';
import HeaderSign from 'components/layout/header/header-sign';
import GetUserInfo from 'components/services/getUserInfo';

const Header = () => {
	const [user, setUser] = useState(GetUserInfo());

	return (
		<header
			className='flex justify-between items-center bg-gray-100 border-b-2 border-gray-200'
			style={{ height: '10%', padding: '1%' }}
		>
			<HeaderLogo />
			<HeaderTitle />
			{user ? <HeaderProfileIcon {...user} /> : <HeaderSign />}
		</header>
	);
};

export default Header;
