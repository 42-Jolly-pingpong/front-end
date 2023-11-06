import { useRecoilState } from 'recoil';
import { Avatar, Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { userState } from 'ts/states/user-state';
import { userSignOut } from 'api/auth-api';

const HeaderProfileIcon = () => {
	const [user, setUserState] = useRecoilState(userState);
	const navigate = useNavigate();

	const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		try {
			await userSignOut();
			setUserState(null);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={
				<Avatar
					img={user?.avatarPath || ''}
					className='w-8 h-8 rounded-full overflow-hidden'
				/>
			}
		>
			<Link to={`profile/${user!.nickname}`}>
				<Dropdown.Item className='text-gray-700'>
					<FiUser />
					<div className='pl-3'>프로필 보기</div>
				</Dropdown.Item>
			</Link>
			<Link to={'/'} onClick={handleSignOut}>
				<Dropdown.Item className='text-red-500'>
					<FaArrowRightFromBracket />
					<div className='pl-3'>로그아웃</div>
				</Dropdown.Item>
			</Link>
		</Dropdown>
	);
};

export default HeaderProfileIcon;
