import DmSearchedItem from 'pages/chat/components/header/dm-searched-item';
import { useEffect, useState } from 'react';
import { User } from 'ts/interfaces/user.model';
import userData from 'ts/mock/user-data';

const ChatHeaderSearch = () => {
	const [inputContent, setInputContent] = useState<string>('');
	const [friendList, setFriendList] = useState<User[]>([]);
	const [searchedFriendList, setSearchedFriendList] = useState<User[]>([]);

	useEffect(() => {
		setFriendList(userData); //temp
	}, []);

	useEffect(() => {
		if (inputContent.length === 0) {
			setSearchedFriendList([]);
		} else {
			setSearchedFriendList(
				friendList?.filter((friend) => friend.nickname.includes(inputContent))
			);
		}
	}, [inputContent]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputContent(e.target.value);
	};

	const input = () => {
		return (
			<div className='flex items-center w-full h-12'>
				<div className='text-gray-500 ml-3'>대상:</div>
				<input
					type='text'
					className='border-0 focus:outline-none focus:ring-0 text-gray-500'
					placeholder='사용자 닉네임'
					value={inputContent}
					onChange={onChangeInput}
				/>
			</div>
		);
	};

	const searchedPad = () => {
		if (searchedFriendList.length === 0) {
			return (
				<div className='absolute p-3 m-2 -top-4 left-9 bg-white border rounded-lg chat-pad text-gray-500'>
					'{inputContent}'가 포함된 친구가 존재하지 않습니다.
				</div>
			);
		}
		return (
			<div className='absolute py-3 m-2 -top-4 left-9 bg-white border rounded-lg chat-pad overflow-y-auto'>
				{searchedFriendList.map((friend, id) => (
					<DmSearchedItem
						friend={friend}
						isTheLast={searchedFriendList.length - 1 === id}
						key={id}
					/>
				))}
			</div>
		);
	};

	return (
		<div>
			<div className='flex flex-col justify-between w-full flex items-center border-b h-24'>
				<div className='flex items-center chat-content h-12 border-b font-bold'>
					<div className='p-3 m-2 ml-1'>새 메시지</div>
				</div>
				{input()}
			</div>
			<div className='relative'>
				{inputContent.length === 0 ? null : searchedPad()}
			</div>
		</div>
	);
};

export default ChatHeaderSearch;
