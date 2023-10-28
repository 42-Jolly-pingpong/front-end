import HeaderMenu from 'components/layout/header/components/header-menu';
import HeaderProfileIcon from 'components/layout/header/components/header-profile-icon';

const HeaderRight = () => {
	return (
		<div className='flex p-2'>
			<HeaderProfileIcon />
			<HeaderMenu />
		</div>
	);
};

export default HeaderRight;
