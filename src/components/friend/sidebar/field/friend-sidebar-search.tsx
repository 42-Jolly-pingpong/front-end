import { Label, TextInput } from 'flowbite-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HiSearch } from 'react-icons/hi';
import { userState } from 'ts/states/user-state';
import { FriendListStatus } from 'ts/enums/friend/friendlist-status.enum';
import { friendSidebarListState } from 'ts/states/friend/friend-sidebar-list-state';
import { getFriendList, getFriendListBySearch } from 'api/friend-api';

const FriendSidebarSearch = () => {
	const user = useRecoilValue(userState);
	const [, setFriendsState] = useRecoilState(friendSidebarListState);

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;

		let status = FriendListStatus.DEFAULT;
		let friends = null;

		if (keyword.length === 0) {
			friends = await getFriendList(user!.id);
		} else {
			friends = await getFriendListBySearch(user!.id, keyword);
		}

		if (friends === null || friends.length === 0) {
			status = keyword.length
				? FriendListStatus.NOT_FOUND
				: FriendListStatus.EMPTY;
		}

		setFriendsState({ status: status, friends: friends });
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
