import { Dispatch, SetStateAction} from "react"

const Friend = (props : {setState: Dispatch<SetStateAction<number>>}): JSX.Element => {
	const setState = props.setState;

	const onClickButton = () => {
		setState(1);
	}

	return (
		<button onClick={onClickButton}>Friend</button>
	);
}

export default Friend