import HeaderLogo from 'components/layout/header/components/header-logo';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';
import HeaderRight from './components/header-right';

const Header = () => {
	const user = useRecoilValue(userState);

	if (user) {
		return (
			<header className='flex justify-between'>
				<HeaderLogo />
				<HeaderRight />
			</header>
		);
	}
	return null;
};

export default Header;
