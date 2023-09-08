type InfoButtonProps = {
	label: string;
	onClick: () => void;
};

const InfoButton = (props: InfoButtonProps) => {
	return <button onClick={props.onClick}>{props.label}</button>;
};

export default InfoButton;
