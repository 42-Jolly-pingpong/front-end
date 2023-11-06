import HeaderMenu from 'components/layout/header/components/header-menu';
import HeaderProfileIcon from 'components/layout/header/components/header-profile-icon';

const HeaderRight = () => {
	return (
		<div className='flex gap-4'>
			<HeaderProfileIcon />
			<div className='h-8 border border-gray-200' />
			<HeaderMenu />
		</div>
	);
};

export default HeaderRight;
