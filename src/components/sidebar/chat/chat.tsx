import { Dispatch, SetStateAction} from "react"

const Chat = (props : {setState: Dispatch<SetStateAction<number>>}): JSX.Element => {
	const setState = props.setState;

	const onClickButton = () => {
		setState(2);
	}

	return (
		<button onClick={onClickButton}>chat</button>
	);
}

export default Chat