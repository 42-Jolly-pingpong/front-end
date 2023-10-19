import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { userSignOut } from 'api/auth-api';

const HeaderProfileIcon = () => {
	const [user, setUserState] = useRecoilState(userState);

	const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		try {
			await userSignOut();
			setUserState(null);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={<Avatar img='images/jollypong2.jpeg' rounded className='mr-3' />}
		>
			<Link to={`profile/${user!.nickname}`}>
				<Dropdown.Item className='text-gray-700'>프로필 보기</Dropdown.Item>
			</Link>
			<Link to={'/'} onClick={handleSignOut}>
				<Dropdown.Item className='text-red-500'>로그아웃</Dropdown.Item>
			</Link>
		</Dropdown>
	);
};

export default HeaderProfileIcon;
