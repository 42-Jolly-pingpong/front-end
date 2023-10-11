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