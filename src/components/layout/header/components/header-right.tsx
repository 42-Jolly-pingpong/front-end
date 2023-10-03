import HeaderNavigateBar from './header-navigation-bar';
import HeaderProfileIcon from './header-profile-icon';

const HeaderRight = () => {
	return (
		<div className='flex p-2'>
			<HeaderProfileIcon />
			<HeaderNavigateBar />
		</div>
	);
};

export default HeaderRight;
