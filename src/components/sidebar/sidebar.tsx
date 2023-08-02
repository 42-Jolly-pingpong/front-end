import { sidebarSelector } from "../../ts/state/sidebar-state";
import Chat from "./chat/chat";
import Friend from "./friend/friend";
import { useRecoilValue } from 'recoil';

const Sidebar = () => {
	const state = useRecoilValue(sidebarSelector);

	return (<div className="w-80 h-full border border-solid border-black p-4 rounded-lg shadow-xl">
		{state === 1 ? <Chat /> : <Friend />}
		</div>
	);

}

export default Sidebar