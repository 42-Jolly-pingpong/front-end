import ChatElement from "./chat-element";

const OpenChatList = () => {
	return (
		<div className="collapse collapse-arrow">
			<input type="checkbox"/> 
			<div className="collapse-title text-xl">
				open chat
			</div> 
			<div className="collapse-content overflow-y-auto"> 
				<ChatElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test1"}/>
				<ChatElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test2"}/>
				<ChatElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test3"}/>
				
			</div>
		</div>
	);
}

export default OpenChatList