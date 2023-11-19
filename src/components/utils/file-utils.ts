export const readFileAsBase64 = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result) {
				resolve(reader.result.toString());
			} else {
				reject('');
			}
		};
		reader.onerror = (e) => reject(e);
		reader.readAsDataURL(file);
	});
};

export const uploadFile = async (file: File): Promise<string> => {
	if (file) {
		const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
		const maxSizeInBytes = 5 * 1024 * 1024;

		if (allowedExtensions.test(file.name) && file.size <= maxSizeInBytes) {
			const base64String = await readFileAsBase64(file);
			return base64String;
		} else {
			return '';
		}
	}
	return '';
};
