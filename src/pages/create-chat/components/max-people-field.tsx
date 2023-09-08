import ChatroomProperty from 'pages/create-chat/components/chatroom-property';

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
		<div className='flex'>
			<ChatroomProperty property={maxPeopleProperty} />
			<input
				type='text'
				value={maxPeople}
				onChange={typeNumber}
				onBlur={onBlurInput}
				width={3}
			></input>
			<button onClick={onClickPlus}>+</button>
			<button onClick={onClickMinus}>-</button>
		</div>
	);
};
export default MaxPeopleField;
