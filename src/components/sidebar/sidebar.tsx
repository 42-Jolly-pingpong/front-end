import Chat from "./chat/chat";
import Friend from "./friend/friend";
import { SidebarProps } from "../../app";

const Sidebar = (props: SidebarProps) => {
	const { state, setState } = props;

	return (<div>
		{state === 1 ? <Chat setState={setState}/> : <Friend setState={setState}/>}
		</div>
	);

}

export default Sidebar