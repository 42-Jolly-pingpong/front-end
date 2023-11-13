import { useRecoilState } from 'recoil';
import { Avatar, Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { userState } from 'ts/states/user-state';
import { userSignOut } from 'api/auth-api';

const HeaderProfileIcon = () => {
	const [user, setUser] = useRecoilState(userState);
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await userSignOut();
			setUser(null);
			navigate('/', { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={<Avatar img={user?.avatarPath || ''} size='sm' rounded />}
			className='w-40'
		>
			<Dropdown.Item
				icon={FiUser}
				as={Link}
				to={`profile/${user!.nickname}`}
				className='text-gray-700'
			>
				프로필 보기
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item
				icon={FaArrowRightFromBracket}
				onClick={() => handleSignOut()}
				className='text-red-500'
			>
				로그아웃
			</Dropdown.Item>
		</Dropdown>
	);
};

export default HeaderProfileIcon;
