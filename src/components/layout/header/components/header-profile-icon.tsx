import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const HeaderProfileIcon = () => {
	const user = useRecoilValue(userState)!;

	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={<Avatar img='images/jollypong2.jpeg' rounded className='mr-3' />}
		>
			<Dropdown.Header>
				<span className='block text-sm'>{user.nickname}</span>
			</Dropdown.Header>
			<Link to='profile/{user.nickname}'>
				<Dropdown.Item>Profile</Dropdown.Item>
			</Link>
			<Dropdown.Item>Sign out</Dropdown.Item>
		</Dropdown>
	);
};

export default HeaderProfileIcon;
