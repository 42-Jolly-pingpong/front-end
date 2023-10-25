import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const useRedirectHome = () => {
	const user = useRecoilValue(userState);

	const navigate = useNavigate();

	if (!user) {
		navigate('/');
	}
};

export default useRedirectHome;
