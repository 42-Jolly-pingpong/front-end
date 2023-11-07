interface ApiOptions {
	method: string;
	url: string;
	headers?: Record<string, string>;
	body?: any;
}

const BASE_URL = 'http://localhost:3000';

const sendAPI = async ({
	method,
	url,
	headers,
	body,
}: ApiOptions): Promise<any> => {
	const response = await fetch(`${BASE_URL}${url}`, {
		method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			origin: 'http://localhost:5173',
			...headers,
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
