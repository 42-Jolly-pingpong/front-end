const useHash = () => {
	const sha256 = (message: string): string => {
		// Constants for SHA-256
		const K: number[] = [
			0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
			0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
			0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
			0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
			0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
			0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
			0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
			0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
			0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
			0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
			0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
		];

		// Initial hash values
		const H: number[] = [
			0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
			0x1f83d9ab, 0x5be0cd19,
		];

		// Pre-processing
		let paddedMessage: number[] = padMessage(message);

		// Process the message in successive 512-bit chunks
		for (let i = 0; i < paddedMessage.length; i += 16) {
			const chunk: number[] = paddedMessage.slice(i, i + 16);

			// Initialize working variables
			let [a, b, c, d, e, f, g, h] = H;

			// Main loop
			for (let j = 0; j < 64; j++) {
				const S0: number =
					rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
				const maj: number = (a & b) ^ (a & c) ^ (b & c);
				const t2: number = S0 + maj;
				const S1: number =
					rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
				const ch: number = (e & f) ^ (~e & g);
				const t1: number = h + S1 + ch + K[j] + chunk[j % 16];

				h = g;
				g = f;
				f = e;
				e = (d + t1) >>> 0;
				d = c;
				c = b;
				b = a;
				a = (t1 + t2) >>> 0;
			}

			// Update hash values
			H[0] = (H[0] + a) >>> 0;
			H[1] = (H[1] + b) >>> 0;
			H[2] = (H[2] + c) >>> 0;
			H[3] = (H[3] + d) >>> 0;
			H[4] = (H[4] + e) >>> 0;
			H[5] = (H[5] + f) >>> 0;
			H[6] = (H[6] + g) >>> 0;
			H[7] = (H[7] + h) >>> 0;
		}

		// Convert the hash values to hexadecimal string
		let hash: string = '';
		for (let i = 0; i < H.length; i++) {
			hash += H[i].toString(16).padStart(8, '0');
		}

		return hash;
	};

	/**
	 * Pad the message to a multiple of 512 bits as required by the SHA-256 algorithm.
	 *
	 * @param message The message to be padded.
	 * @returns The padded message as an array of 32-bit integers.
	 */
	const padMessage = (message: string): number[] => {
		const messageBits: number = message.length * 8;
		const paddingBits: number = (448 - (messageBits + 1)) % 512;

		// Convert the message to binary string
		let binaryMessage: string = '';
		for (let i = 0; i < message.length; i++) {
			binaryMessage += message.charCodeAt(i).toString(2).padStart(8, '0');
		}
		binaryMessage += '1'; // Append a single "1" bit

		// Append "0" bits for padding
		binaryMessage += '0'.repeat(paddingBits);

		// Append the length of the original message as a 64-bit big-endian integer
		binaryMessage += messageBits.toString(2).padStart(64, '0');

		// Split the binary message into 32-bit chunks
		const chunks: string[] = [];
		for (let i = 0; i < binaryMessage.length; i += 32) {
			chunks.push(binaryMessage.slice(i, i + 32));
		}

		// Convert the chunks to 32-bit integers
		const paddedMessage: number[] = chunks.map((chunk) => parseInt(chunk, 2));

		return paddedMessage;
	};

	/**
	 * Perform a right rotation on the given value.
	 *
	 * @param value The value to be rotated.
	 * @param n The number of bits to rotate.
	 * @returns The rotated value.
	 */
	const rightRotate = (value: number, n: number): number => {
		return (value >>> n) | (value << (32 - n));
	};
	const encryptMsg = (password: string) => {
		return sha256(password);
	};

	return encryptMsg;
};

export default useHash;
