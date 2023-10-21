import { getFriendList, getFriendListBySearch } from 'api/friend-api';
import { Label, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FriendListStatus } from 'ts/enums/friend/friendlist-status.enum';
import User from 'ts/interfaces/user.model';
import { friendSidebarListState } from 'ts/states/friend/friend-sidebar-list-state';
import { userState } from 'ts/states/user-state';

const FriendSidebarSearch = () => {
	const user = useRecoilValue(userState);
	const [friendsState, setFriendsState] = useRecoilState(
		friendSidebarListState
	);

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;

		if (keyword.length === 0) {
			const friends: User[] | null = await getFriendList(user!.id);

			setFriendsState({
				status: FriendListStatus.DEFAULT,
				friends: friends as any,
			});
		} else {
			const friends: User[] | null = await getFriendListBySearch(keyword);

			if (friends === null || friends.length === 0) {
				setFriendsState({
					status: FriendListStatus.NOT_FOUND,
					friends: null,
				});
			} else {
				setFriendsState({
					status: FriendListStatus.DEFAULT,
					friends: friends as any,
				});
			}
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
