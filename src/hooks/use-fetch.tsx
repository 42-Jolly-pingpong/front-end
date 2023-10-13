const useFetch = () => {
	//토큰 꺼내오기

	const baseUrl = process.env.REACT_APP_BASE_URL;
	/**
	 * api 보내기
	 * @param method
	 * @param url start with '/'
	 * @param body
	 */
	const sendMsg = (method: string, url: string, body: any = null) => {
		if (body === null) {
			return fetch(baseUrl + url, {
				method,
			});
		}
		return fetch(baseUrl + url, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	};

	return sendMsg;
};

export default useFetch;
