/** @internal */
export class ReadByteArray {
	/**
	 * @param {Readonly<Uint8Array>} bytes
	 */
	constructor(bytes) {
		/** @private @readonly @type {Readonly<Uint8Array>} */
		this.bytes = bytes;

		/** @private @type {number} */
		this.offset = 0;
	}

	/** @returns {boolean} */
	readBit() {
		const byteI = this.offset >> 3;
		const bitI = this.offset % 8;
		this.offset++;
		return (this.bytes[byteI] & (1 << (7 - bitI))) !== 0;
	}

	/** @returns {number} */
	read8Bit() {
		const byteI = this.offset >> 3;
		const bitSize = this.offset % 8;
		this.offset += 8;
		return (
			((this.bytes[byteI] % (1 << (8 - bitSize))) << bitSize) |
			(this.bytes[byteI + 1] >> (8 - bitSize))
		);
	}

	/** @returns {number} */
	read32Bit() {
		const byteI = this.offset >> 3;
		const bitSize = this.offset % 8;
		this.offset += 32;
		return (
			((this.bytes[byteI] % (1 << (8 - bitSize))) << (24 + bitSize)) |
			(this.bytes[byteI + 1] << (16 + bitSize)) |
			(this.bytes[byteI + 2] << (8 + bitSize)) |
			(this.bytes[byteI + 3] << bitSize) |
			(this.bytes[byteI + 4] >> (8 - bitSize))
		);
	}
}
