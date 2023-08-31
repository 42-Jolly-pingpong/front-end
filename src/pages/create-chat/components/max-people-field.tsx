import ChatroomProperty from './chatroom-property';

const MaxPeopleField = (props: {
	maxPeople: string;
	setMaxPeople: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { maxPeople, setMaxPeople } = props;
	const maxPeopleProperty = 'Max people';

	const typeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const people = e.target.value;

		if (0 <= Number(people)) {
			setMaxPeople(people);
		}
	};

	const onClickPlus = () => {
		setMaxPeople((pre) => (Number(pre) < 30 ? String(Number(pre) + 1) : pre));
	};

	const onClickMinus = () => {
		setMaxPeople((pre) => (2 < Number(pre) ? String(Number(pre) - 1) : pre));
	};

	const onBlurInput = () => {
		const currPeople = Number(maxPeople);
		if (currPeople < 2) {
			setMaxPeople('2');
		}
		if (30 < currPeople) {
			setMaxPeople('30');
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
