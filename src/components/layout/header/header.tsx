import HeaderLogo from 'components/layout/header/header-logo';
import HeaderProfileIcon from 'components/layout/header/header-profile-icon';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const Header = () => {
	const user = useRecoilValue(userState);

	return (
		<header className='flex justify-between items-center h-15 p-3'>
			{user && <HeaderLogo /> && <HeaderProfileIcon {...user} />}
		</header>
	);
};

export default Header;
