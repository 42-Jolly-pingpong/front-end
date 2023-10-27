import { useRecoilValue } from 'recoil';
import { Dropdown } from 'flowbite-react';
import { BiUserMinus } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { VscDebugStart } from 'react-icons/vsc';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileSocialDropdown = () => {
	const profile = useRecoilValue(profileState);

	const handleGame = () => {
		// 여기에 게임 시작 모달?
	};

	const handleBlock = () => {
		// 여기에 block API
	};

	return (
		<Dropdown label={<BsThreeDots />} arrowIcon={false} inline>
			<Dropdown.Item className='text-gray-700' onClick={handleGame}>
				<div className='flex items-center justify-start w-24 text-sm'>
					<VscDebugStart />
					<div className='pl-1'>게임하기</div>
				</div>
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item className='text-red-500' onClick={handleBlock}>
				<div className='flex items-center justify-start w-24 text-sm'>
					<BiUserMinus />
					<div className='pl-1'>차단하기</div>
				</div>
			</Dropdown.Item>
		</Dropdown>
	);
};

export default ProfileSocialDropdown;
