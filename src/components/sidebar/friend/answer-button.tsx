import { FriendElementProps } from "./friend-element";

const AnswerButton = (props: FriendElementProps) => {
	const onClickAccept = () => {
		//
	}

	const onClickUnaccept = () => {
		//
	}

	return (
		<div className="join">
			<button className="btn btn-sm join-item" onClick={onClickAccept}>Y</button>
			<button className="btn btn-sm join-item" onClick={onClickUnaccept}>N</button>
		</div>
	)

}

export default AnswerButton