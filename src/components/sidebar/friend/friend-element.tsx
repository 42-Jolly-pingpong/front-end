import AnswerButton from "./answer-button";

export type FriendElementProps = {
	src: string;
	title: string;
	request?: boolean;
} // 임시! 엔티티로 수정해야 함


const FriendElement = (props: FriendElementProps) => {
	return (
		<div className="flex items-center m-1 justify-between">
			<div className="flex items-center justify-start">
				<img src={props.src} className="rounded-full layout-icon w-12 h-12 mr-3"/>
				{props.title}
			</div>
			{props.request? <AnswerButton {... props} />: null}
		</div>
	);
}

export default FriendElement