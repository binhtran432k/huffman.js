/** @internal */
export class HuffmanFreq {
	/**
	 * @param {number} freq
	 * @param {number} value
	 */
	constructor(freq, value) {
		this.freq = freq;
		this.value = value;
	}

	/**
	 * @param {Readonly<Uint8Array>} input
	 * @returns {HuffmanFreq[]}
	 */
	static buildFreqs(input) {
		const freqsTrack = new Uint32Array(256);
		input.forEach((c) => {
			freqsTrack[c]++;
		});
		let freqsLength = 0;
		for (let i = 0; i < freqsTrack.length; i++) {
			if (freqsTrack[i] > 0) freqsLength++;
		}
		/** @type {HuffmanFreq[]} */
		const freqs = new Array(freqsLength);
		for (let i = 0, freqSize = 0; i < freqsTrack.length; i++) {
			if (freqsTrack[i] > 0)
				freqs[freqSize++] = new HuffmanFreq(freqsTrack[i], i);
		}
		return freqs;
	}
}
