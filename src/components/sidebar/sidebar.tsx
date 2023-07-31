import Chat from "./chat/chat";
import Friend from "./friend/friend";
import { SidebarProps } from "../../app";

const Sidebar = (props: SidebarProps) => {
	const { state, setState } = props;

	return (<div className="w-80 h-full border border-solid border-black p-4 rounded-lg">
		{state === 1 ? <Chat /> : <Friend />}
		</div>
	);

}

export default Sidebar