import ChatroomProperty from "./chatroom-property";

const MaxPeopleField = (props: {maxPeople: number, setMaxPeople: React.Dispatch<React.SetStateAction<number>>} ) => {
	const {maxPeople, setMaxPeople} = props;
	const maxPeopleProperty = "Max people";

	const typeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const people = Number(e.target.value);

		if (2 <= people){
			setMaxPeople(people);
		}
	}

	const onClickPlus = () => {
		setMaxPeople((pre)=> pre + 1); //방 최대인원 규칙이 있는지?
	}

	const onClickMinus = () => {
		setMaxPeople((pre)=> 2 < pre? pre - 1 : pre);
	}

	return (
		<div className="flex">
			<ChatroomProperty property={maxPeopleProperty} />
			<input type="number" value={maxPeople} onChange={typeNumber} width={3}></input>
			<button onClick={onClickPlus}>+</button>
			<button onClick={onClickMinus}>-</button>
		</div>
	);
}
export default MaxPeopleField