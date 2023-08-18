import { booleanStateType } from "../../../ts/types/stateType";
import SearchModal from "./search-modal";

const AddFriendModal = (props: booleanStateType) => {
	const {state, setState} = props;

	return (
		<dialog
			id="addFriend"
			className="modal"
			open={state}
		>
		<form method="dialog" className="modal-box w-100 h-80 p-3">
			<SearchModal setState={setState}/>
		</form>
		</dialog>
	);
  };
  
export default AddFriendModal