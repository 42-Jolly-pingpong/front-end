export const getJsonValueByKey = (key: string) => {
	const cookieObject: { [key: string]: string } = {};

	document.cookie.split(';').forEach((cookie) => {
		const [key, value] = cookie.trim().split('=');
		cookieObject[key] = decodeURIComponent(value);
	});

	return cookieObject[key] ? JSON.parse(cookieObject[key]) : {};
};

export const getJwtValue = () => {
	const cookieObject: { [key: string]: string } = {};

	document.cookie.split(';').forEach((cookie) => {
		const [key, value] = cookie.trim().split('=');
		cookieObject[key] = value;
	});

	return cookieObject['access-token'] || undefined;
};

export const clearCookies = () => {
	document.cookie.split(';').forEach((cookie) => {
		const [key] = cookie.trim().split('=');
		document.cookie = `${key}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
	});
};
