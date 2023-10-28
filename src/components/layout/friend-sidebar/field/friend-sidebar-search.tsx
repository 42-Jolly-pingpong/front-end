import { Label, TextInput } from 'flowbite-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HiSearch } from 'react-icons/hi';
import { userState } from 'ts/states/user-state';
import { getFriendListBySearch } from 'api/friend-api';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { friendInputChangeState } from 'ts/states/friend/friend-input-change-state';

const FriendSidebarSearch = () => {
	const user = useRecoilValue(userState);
	const userFriends = useRecoilValue(userFriendsState);
	const [friendInputState, setFrinedInputState] = useRecoilState(
		friendInputChangeState
	);

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;

		setFrinedInputState({ ...friendInputState, state: false });

		if (keyword.length === 0) {
			setFrinedInputState({ friends: userFriends.friends, state: false });
		} else {
			const friends = await getFriendListBySearch(user!.id, keyword);
			setFrinedInputState({ friends, state: true });
		}
	};

	return (
		<div className='max-w-md h-12'>
			<div className='block '>
				<Label htmlFor='search' color='white' />
			</div>
			<TextInput
				id='search'
				icon={HiSearch}
				type='search'
				placeholder='멤버 찾기'
				onChange={handleInputChange}
				required
			/>
		</div>
	);
};

export default FriendSidebarSearch;
