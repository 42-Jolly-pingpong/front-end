import { User } from '../../../ts/interfaces/userr.model';
import HeaderIcon from './header-logo';
import HeaderProfileIcon from './header-profile-icon';
import HeaderSign from './header-sign';
import HeaderTitle from './header-title';

const mockUserInfo = {
	id: 123,
	nickname: 'eunson',
	avatar: 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000',
};

const getUserInfo = (): User | null => {
	//return null;
	return mockUserInfo;
};

const Header = () => {
	const user: User | null = getUserInfo();

	return (
		<header
			className='flex justify-between items-center bg-gray-100 border-b-2 border-gray-200'
			style={{ height: '10%', padding: '1%' }}
		>
			<HeaderIcon />
			{user ? (
				<>
					<HeaderTitle />
					<HeaderProfileIcon src={user.avatar} />
				</>
			) : (
				<>
					<HeaderSign />
				</>
			)}
		</header>
	);
};

export default Header;
