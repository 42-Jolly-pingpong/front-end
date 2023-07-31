import { FriendElementProps } from "./friend-element";

const AnswerButton = (props: FriendElementProps) => {
	const onClickAccept = () => {
		//
	}

	const onClickUnaccept = () => {
		//
	}

	return (
		<div>
			<button onClick={onClickAccept}>Y</button>
			<button onClick={onClickUnaccept}>N</button>
		</div>
	)

}

export default AnswerButton