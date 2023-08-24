import { useState } from "react";
import { Chatroom } from "../../../../ts/interfaces/chatroom.model";
import PasswordUnshown from "./password-unshown";

const CheckPasswordModal = (props: {roomToEnter: Chatroom}) => {
	const [password, setPassword] = useState('');
	
	return (
		<dialog id="checkPasswordModal" className="modal">
			<form method="dialog" className="modal-box">
				<h3>Password</h3>	
				{/* <PasswordUnshown setPassword={setPassword} /> */}
			</form>
			<form method="dialog" className="modal-backdrop">
				<button></button>
			</form>
		</dialog>
	);
}

export default CheckPasswordModal

