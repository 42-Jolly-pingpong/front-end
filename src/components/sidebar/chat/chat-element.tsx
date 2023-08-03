export type ChatElementProps = {
	src: string;
	title: string;
}
// props -> chat entity로 수정

const ChatElement = (props: ChatElementProps) => {
	return (
		<div className="flex items-center m-1 justify-between">
		<div className="flex items-center justify-start">
			<img src={props.src} className="rounded-full layout-icon w-12 h-12 mr-3"/>
			{props.title}
		</div>
	</div>
	);
}

export default ChatElement