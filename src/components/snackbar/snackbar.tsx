import { useRecoilValue } from "recoil";
import { snackbarSelector } from "../../ts/states/snackbar-state";

const Snackbar = () => {
	const {state, title} = useRecoilValue(snackbarSelector);
	
	return (
		<div>
		{
			state?
			<div className="toast toast-center">
				<div className="alert alert-info">
					<span>{title}</span>
				</div>
			</div>
			: null
		}
		</div>
	);
}

export default Snackbar