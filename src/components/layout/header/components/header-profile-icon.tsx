import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const HeaderProfileIcon = () => {
	const user = useRecoilValue(userState)!;

	console.log(user);
	console.log(user.nickname);
	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={<Avatar img='images/jollypong2.jpeg' rounded className='mr-3' />}
		>
			<Link to={`profile/${user.nickname}`}>
				<Dropdown.Item className='text-gray-700'>프로필 보기</Dropdown.Item>
			</Link>
			<Dropdown.Item className='text-red-500'>로그아웃</Dropdown.Item>
		</Dropdown>
	);
};

export default HeaderProfileIcon;
