export const getJsonValueByKey = (key: string) => {
	const cookieObject: { [key: string]: string } = {};

	document.cookie.split(';').forEach((cookie) => {
		const [key, value] = cookie.trim().split('=');
		cookieObject[key] = decodeURIComponent(value);
	});

	return JSON.parse(cookieObject[key]);
};

export const getJwtValue = () => {
	const cookieObject: { [key: string]: string } = {};

	document.cookie.split(';').forEach((cookie) => {
		const [key, value] = cookie.trim().split('=');
		cookieObject[key] = value;
	});

	return cookieObject['access-token'];
};

export const getDecodedToken = async (): Promise<string | null> => {
	const token = getJwtValue();

	if (token) {
		try {
			const response = await fetch('http://localhost:3000/auth/decoded-token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				console.log('디코딩 받아오기 성공!');
				return await response.json();
			} else {
				console.log('response 실패');
			}
		} catch (e) {
			console.log(e);
		}
	}
	return null;
};
