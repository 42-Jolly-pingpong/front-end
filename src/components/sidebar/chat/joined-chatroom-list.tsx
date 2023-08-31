import { useState } from 'react';
import ChatElement from './chatroom-element';
import { tempChatroom1, tempChatroom2 } from '../temp-chat-user';

const JoinedChatroomList = () => {
	//챗 리스트 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => !prev);
	};

	return (
		<div className='collapse'>
			<input type='checkbox' checked={isChecked} onChange={onClickCheckbox} />
			<div className='collapse-title text-xl'>chat</div>
			<div className='collapse-content overflow-y-auto'>
				<ChatElement {...tempChatroom1} />
				<ChatElement {...tempChatroom1} />
				<ChatElement {...tempChatroom2} />
			</div>
		</div>
	);
};

export default JoinedChatroomList;
