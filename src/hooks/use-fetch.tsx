import { getJwtValue } from 'components/utils/cookieUtils';

const useFetch = () => {
	const token = getJwtValue();

	const baseUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:3000`;
	/**
	 * api 보내기
	 * @param method
	 * @param url start with '/'
	 * @param body
	 */
	const sendMsg = (method: string, url: string, body = null) => {
		if (body === null) {
			return fetch(baseUrl + url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		return fetch(baseUrl + url, {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	};

	return sendMsg;
};

export default useFetch;
