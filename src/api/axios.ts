import axios from 'axios';
import { getJwtValue } from 'components/utils/cookieUtils';

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 15000,
});

instance.interceptors.request.use(
	async (config) => {
		const token = getJwtValue();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	(e) => {
		return Promise.reject(e);
	}
);

export default instance;
