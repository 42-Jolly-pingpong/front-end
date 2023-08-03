import { useRecoilState } from 'recoil';
import { sidebarState } from '../../ts/state/sidebar-state';
import { SidebarStatus } from '../../ts/enum/sidebar-state.enum';

const Footer = () => {
	const [state, setState] = useRecoilState(sidebarState);

    const onClickChat = () => {
        setState((prev) => {return (prev === SidebarStatus.CHAT ? SidebarStatus.NONE : SidebarStatus.CHAT)});
    }

    const onClickFriend = () => {
        setState((prev) => {return (prev === SidebarStatus.FRIEND ? SidebarStatus.NONE : SidebarStatus.FRIEND)});
    }

    return (
		<footer className="flex justify-between items-center bg-gray-100 border-t-2 border-gray-200" style={{height: "10%", padding: "1%"}}>
			<div className="flex justify-between">
				<button className="mr-4" onClick={onClickChat}>Chat</button>
				<button className="mr-4" onClick={onClickFriend}>Friend</button>
			</div>	
        </footer>
    )
}

export default Footer