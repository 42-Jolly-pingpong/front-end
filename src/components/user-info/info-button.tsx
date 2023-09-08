type InfoButtonProps = {
	label: string;
	onClick: () => void;
};

const InfoButton = (props: InfoButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			className='border border-solid border-black rounded-lg p-1 m-1'
		>
			{props.label}
		</button>
	);
};

export default InfoButton;
