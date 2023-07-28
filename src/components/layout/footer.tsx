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
        <footer className="flex justify-between bg-red-400" style={{height: "10%"}}>
            <button onClick={onClickChat}>Chat</button>
            <button onClick={onClickFriend}>Friend</button>
        </footer>
    )
}

export default Footer