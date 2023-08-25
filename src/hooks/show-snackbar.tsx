import { useRecoilState } from "recoil";
import { snackbarState } from "../ts/states/snackbar-state";

const useSnackbar = () => {
	const [snackbarInfo, setSnackbarInfo] = useRecoilState(snackbarState);
	
	const showSnackbar = (title: string) => {
		setSnackbarInfo({ state: true, title });
	
		setTimeout(() => {
		setSnackbarInfo({ state: false, title: '' });
		}, 1500);
	};
	
	return showSnackbar;
};

export default useSnackbar
