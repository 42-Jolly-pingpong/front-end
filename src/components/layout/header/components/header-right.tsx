import HeaderSidebar from './header-sidebar';
import HeaderProfileIcon from './header-profile-icon';

const HeaderRight = () => {
	return (
		<div className='flex p-2'>
			<HeaderProfileIcon />
			<HeaderSidebar />
		</div>
	);
};

export default HeaderRight;
