import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dropdown } from 'flowbite-react';
import { BiUserMinus } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { VscDebugStart } from 'react-icons/vsc';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import {
	addBlockedFriend,
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';

const ProfileSocialDropdown = () => {
	const user = useRecoilValue(userState);
	const profile = useRecoilValue(profileState);
	const setFriendsList = useSetRecoilState(userFriendsState);
	const setGameModeSelect = useSetRecoilState(gameModeSelectState);
	const setOpponentUserInfo = useSetRecoilState(opponentInfoState);

	const handleGame = () => {
		setOpponentUserInfo(profile.user);
		setGameModeSelect(true);
	};

	const handleBlock = async () => {
		await addBlockedFriend(profile.user!.id);
		const friends = await getFriendList(user!.id);
		const requestFriends = await getFriendRequestList(user!.id);
		const blockedFriends = await getBlockedList(user!.id);
		setFriendsList({ friends, requestFriends, blockedFriends });
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
