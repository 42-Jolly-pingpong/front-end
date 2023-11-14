import DmSearchedItem from 'pages/chat/components/header/dm-searched-item';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import User from 'ts/interfaces/user.model';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const ChatHeaderSearch = () => {
	const [inputContent, setInputContent] = useState<string>('');
	const friendList = useRecoilValue(userFriendsState).friends as User[];
	const [searchedFriendList, setSearchedFriendList] = useState<User[]>([]);
	const [showPad, setShowPad] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		if (inputContent.length === 0) {
			setSearchedFriendList(friendList);
		} else {
			setSearchedFriendList(
				friendList?.filter((friend) => friend.nickname.includes(inputContent))
			);
		}
	}, [inputContent]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputContent(e.target.value);
	};

	const onFocusInput = () => {
		setShowPad(true);
	};

	const onBlurInput = () => {
		setShowPad(false);
	};

	const input = () => {
		return (
			<div
				className='flex items-center w-full h-12'
				onFocus={onFocusInput}
				onBlur={onBlurInput}
			>
				<div className='text-gray-500 ml-3'>대상:</div>
				<input
					ref={inputRef}
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
		const location = 'absolute -top-4 left-9';
		const commonStyle = 'm-2 bg-white border rounded-lg chat-pad';

		if (searchedFriendList.length === 0) {
			return (
				<div className={`${location} p-3 text-gray-500 ${commonStyle}`}>
					{friendList.length === 0
						? `친구가 존재하지 않습니다.`
						: `'${inputContent}'가 포함된 친구가 존재하지 않습니다.`}
				</div>
			);
		}
		return (
			<div className={`${location} py-3 overflow-y-auto ${commonStyle}`}>
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
					<div className='p-3 m-2'>새 메시지</div>
				</div>
				{input()}
			</div>
			<div className='relative'>{showPad ? searchedPad() : null}</div>
		</div>
	);
};

export default ChatHeaderSearch;
