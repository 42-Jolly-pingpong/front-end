const useHash = () => {
	const encryptMsg = async (password: string) => {
		const encoder = new TextEncoder();
		const dataBuffer = encoder.encode(password);
		const buffer = await crypto.subtle.digest('SHA-256', dataBuffer);

		const hashArray = Array.from(new Uint8Array(buffer));
		const hashHex = hashArray
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');

		return hashHex;
	};

	return encryptMsg;
};

export default useHash;
