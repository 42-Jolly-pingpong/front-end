import HeaderLogo from 'components/layout/header/components/header-logo';
import HeaderRight from 'components/layout/header/components/header-right';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

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
