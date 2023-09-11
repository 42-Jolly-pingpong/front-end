import ChatroomProperty from 'pages/create-chat/components/chatroom-property';

const Button = (props: { label: string; onClick: () => void }) => {
	return (
		<button
			className='bg-black rounded-md text-white ml-1 w-7'
			onClick={props.onClick}
		>
			{props.label}
		</button>
	);
};

const MaxPeopleField = (props: {
	maxPeople: number;
	setMaxPeople: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const { maxPeople, setMaxPeople } = props;
	const maxPeopleProperty = 'Max people';

	const typeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const people = Number(e.target.value);

		if (0 <= Number(people)) {
			setMaxPeople(people);
		}
	};

	const onClickPlus = () => {
		setMaxPeople((pre) => (pre < 30 ? pre + 1 : pre));
	};

	const onClickMinus = () => {
		setMaxPeople((pre) => (2 < pre ? pre - 1 : pre));
	};

	const onBlurInput = () => {
		if (maxPeople < 2) {
			setMaxPeople(2);
		}
		if (30 < maxPeople) {
			setMaxPeople(30);
		}
	};

	return (
		<div className='create-chatroom-field'>
			<ChatroomProperty property={maxPeopleProperty} />
			<input
				className='create-chatroom-form w-10'
				type='text'
				value={maxPeople}
				onChange={typeNumber}
				onBlur={onBlurInput}
				width={3}
			/>
			<Button label='+' onClick={onClickPlus} />
			<Button label='-' onClick={onClickMinus} />
		</div>
	);
};
export default MaxPeopleField;
