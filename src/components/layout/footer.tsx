import { SidebarProps } from "../../app";

const Footer = (props: SidebarProps) => {
	const { state, setState } = props;

    const onClickChat = () => {
        setState((prev) => {return (prev === 1 ? 0 : 1)});
    }

    const onClickFriend = () => {
        setState((prev) => {return (prev === 2 ? 0 : 2)});
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