/** @typedef {import("./BitArray.js").BitArray} BitArray */

/** @internal */
export class WriteByteArray {
	/**
	 * @param {number} size
	 */
	constructor(size) {
		/** @readonly @type {Uint8Array} */
		this.bytes = new Uint8Array(size);
		/** @private @type {number} */
		this.offset = 0;
	}

	/** @param {boolean} isOne */
	writeBit(isOne) {
		const bufferI = this.offset >> 3;
		const bufferSize = this.offset % 8;

		if (isOne) this.bytes[bufferI] |= 1 << (7 - bufferSize);

		this.offset++;
	}

	/** @param {number} value */
	write8Bit(value) {
		const bufferI = this.offset >> 3;
		const bufferSize = this.offset % 8;

		this.bytes[bufferI] |= value >> bufferSize;
		this.bytes[bufferI + 1] = (value % (1 << bufferSize)) << (8 - bufferSize);

		this.offset += 8;
	}

	/** @param {number} value */
	write32Bit(value) {
		const bufferI = this.offset >> 3;
		const bufferSize = this.offset % 8;

		this.bytes[bufferI] |= value >> (24 + bufferSize);
		this.bytes[bufferI + 1] = (value >> (16 + bufferSize)) % (1 << 8);
		this.bytes[bufferI + 2] = (value >> (8 + bufferSize)) % (1 << 8);
		this.bytes[bufferI + 3] = (value >> bufferSize) % (1 << 8);
		this.bytes[bufferI + 4] = (value % (1 << bufferSize)) << (8 - bufferSize);

		this.offset += 32;
	}

	/** @param {BitArray} bitArray */
	writeFromByteArray(bitArray) {
		const lastByteI = bitArray.bytes.length - 1;
		for (let i = 0; i < lastByteI; i++) {
			this.write8Bit(bitArray.bytes[i]);
		}

		const value = bitArray.bytes[lastByteI];
		const bufferI = this.offset >> 3;
		const bufferSize = this.offset % 8;

		this.bytes[bufferI] |= value >> bufferSize;
		this.bytes[bufferI + 1] = (value % (1 << bufferSize)) << (8 - bufferSize);

		this.offset += ((bitArray.size + 7) % 8) + 1;
	}
}
