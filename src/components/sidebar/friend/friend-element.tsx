import AnswerButton from "./answer-button";

export type FriendElementProps = {
	src: string;
	title: string;
	request: boolean;
} // 임시! 엔티티로 수정해야 함


const FriendElement = (props: FriendElementProps) => {
	return (
		<div>
			<img src={props.src} className="rounded-full"/>
			{props.title}
			{props.request? <AnswerButton {... props} />: null}
		</div>
	);
}

export default FriendElement