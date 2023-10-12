import HeaderNavigateBar from 'components/layout/header/components/header-navigation-bar';
import HeaderProfileIcon from 'components/layout/header/components/header-profile-icon';

const HeaderRight = () => {
	return (
		<div className='flex p-2'>
			<HeaderProfileIcon />
			<HeaderNavigateBar />
		</div>
	);
};

export default HeaderRight;
