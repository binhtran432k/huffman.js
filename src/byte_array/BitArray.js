/** @internal */
export class BitArray {
	/**
	 * @private
	 * @param {Readonly<Uint8Array>} bytes
	 * @param {number} size
	 */
	constructor(bytes, size) {
		/** @readonly @type {Readonly<Uint8Array>} */
		this.bytes = bytes;
		/** @readonly @type {number} */
		this.size = size;
	}

	/**
	 * @param {number} maxBitSize
	 * @returns {number}
	 */
	static getByteSizeFromBitSize(maxBitSize) {
		return Math.ceil(maxBitSize / 8);
	}

	/**
	 * @param {boolean[]} isOnes
	 * @returns {BitArray}
	 */
	static fromIsOnes(isOnes) {
		const bitsSize = isOnes.length;
		const bytes = new Uint8Array(this.getByteSizeFromBitSize(bitsSize));
		let walkI = 0;
		for (; walkI < bitsSize - 8; walkI += 8) {
			let num = 0;
			for (let i = 0; i < 8; i++) if (isOnes[walkI + i]) num |= 1 << (7 - i);
			bytes[walkI >> 3] = num;
		}
		if (walkI < bitsSize) {
			const remainSize = bitsSize - walkI;
			let num = 0;
			for (let i = 0; i < remainSize; i++)
				if (isOnes[walkI + i]) num |= 1 << (7 - i);
			bytes[walkI >> 3] = num;
		}
		return new BitArray(bytes, bitsSize);
	}
}
