import HeaderLogo from 'components/layout/header/components/header-logo';
import HeaderRight from 'components/layout/header/components/header-right';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const Header = () => {
	const user = useRecoilValue(userState);

	if (user) {
		return (
			<div className='flex justify-center'>
				<header className='flex justify-between px-20 py-6 w-full'>
					<HeaderLogo />
					<HeaderRight />
				</header>
			</div>
		);
	}
	return null;
};

export default Header;
