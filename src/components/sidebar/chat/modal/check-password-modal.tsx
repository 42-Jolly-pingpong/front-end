import { useEffect, useState } from "react";
import { Chatroom } from "../../../../ts/interfaces/chatroom.model";
import { useRecoilState } from "recoil";
import { ChatStatus } from "../../../../ts/enums/chat-status.enum";
import { chatState, chatroomState } from "../../../../ts/states/chat-state";
import useSnackbar from "../../../../hooks/show-snackbar";

const CheckPasswordModal = (props: {roomToEnter: Chatroom}) => {
	const [password, setPassword] = useState('');

	const [currChatroom, setCurrChatroom] = useRecoilState(chatroomState);
	const [currChat, setCurrChat] = useRecoilState(chatState);
	
	const showSnackbar = useSnackbar();

	const title = "비밀번호 입력";

	useEffect(() => {
		if (password.length == 4){
			console.log("pwasss" + password);
				checkPassword();
		}
	}, [password]);

	const clearPassword = () => {
		setPassword('');
	}

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		if (0 <= Number(newPassword) || newPassword.length == 0){
			setPassword(newPassword);
		}
	}

	const enterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter"){
			checkPassword();
			return ;
		}
	}

	const checkPassword = () => {
		const tempPassw = "3433";
		if (tempPassw == password){
			setCurrChatroom(props.roomToEnter);
			setCurrChat(ChatStatus.INCHAT);
			console.log("success!");
			return ;
		}
		showSnackbar("틀린 비밀번호!");
		console.log(password);
		setTimeout(() => {
			clearPassword();
		}, 500);
	}

	return (
		<dialog id="checkPasswordModal" className="modal">
			<form method="dialog" className="modal-box">
				<h3>{title}</h3>
				<div className="flex">
					<input type="password" value={password} maxLength={4} onChange={onChangePassword} onKeyDown={enterKeyDown} onBlur={clearPassword}/>
					<kbd className="kbd kbd-sm">Enter</kbd>
				</div>
			</form>
			<form method="dialog" className="modal-backdrop">
				<button></button>
			</form>
		</dialog>
	);
}

export default CheckPasswordModal

