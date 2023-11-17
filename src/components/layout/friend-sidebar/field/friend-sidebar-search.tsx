import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { TextInput } from 'flowbite-react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { friendInputChangeState } from 'ts/states/friend/friend-input-change-state';
import { getFriendListBySearch } from 'api/friend-api';

const FriendSidebarSearch = () => {
	const user = useRecoilValue(userState);
	const userFriends = useRecoilValue(userFriendsState);
	const setFrinedInputState = useSetRecoilState(friendInputChangeState);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(async () => {
			if (keyword.length === 0) {
				setFrinedInputState({ friends: userFriends.friends, state: false });
			} else {
				const friends = await getFriendListBySearch(user!.id, keyword);
				setFrinedInputState({ friends, state: true });
			}
		}, 300);
		setTimeoutId(newTimeoutId);
	};

	return (
		<TextInput
			id='search'
			icon={HiSearch}
			type='search'
			placeholder='멤버 찾기'
			onChange={handleInputChange}
			required
			className='m-4'
		/>
	);
};

export default FriendSidebarSearch;
