import { getJwtValue } from 'components/utils/cookie-utils';

interface ApiOptions {
	method: string;
	url: string;
	headers?: Record<string, string>;
	body?: any;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const sendAPI = async ({ method, url, headers, body }: ApiOptions) => {
	const token = getJwtValue();

	if (token) {
		headers = {
			...headers,
			Authorization: `Bearer ${token}`,
		};
	}

	const response = await fetch(`${BASE_URL}${url}`, {
		method,
		credentials: 'include',
		headers: {
			...headers,
			'Content-Type': 'application/json;charset=UTF-8',
			origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:5173',
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	if (response.ok) {
		const data = await response.text();

		try {
			return data ? JSON.parse(data) : {};
		} catch (e) {
			return data;
		}
	} else {
		console.log('response 실패');
		return null;
	}
};

export default sendAPI;
