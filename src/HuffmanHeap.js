import { HuffmanFreqNode } from "./HuffmanFreqNode.js";

/** @typedef {import("./HuffmanFreq.js").HuffmanFreq} HuffmanFreq  */

/** @internal */
export class HuffmanHeap {
	/** @param {Readonly<HuffmanFreq[]>} freqs */
	constructor(freqs) {
		/** @readonly @type {HuffmanFreqNode[]} */
		this.freqNodes = freqs.map((f) =>
			HuffmanFreqNode.buildLeaf(f.freq, f.value),
		);

		const lastNonLeafIdx = Math.floor(this.freqNodes.length / 2 - 1);
		for (let i = lastNonLeafIdx; i >= 0; i--) this.heapifyDown(i);
	}

	/** @returns {?HuffmanFreqNode} */
	pop() {
		if (this.freqNodes.length === 0) return null;

		const node = this.freqNodes[0];

		if (this.freqNodes.length === 1) this.freqNodes.pop();
		// @ts-ignore: pop must have value
		else this.freqNodes[0] = this.freqNodes.pop();

		this.heapifyDown(0);

		return node;
	}

	/**
	 * @param {Readonly<HuffmanFreqNode>} node
	 * @returns {HuffmanFreqNode}
	 */
	push(node) {
		this.freqNodes.push(node);
		this.heapifyUp(this.freqNodes.length - 1);
		return node;
	}

	/**
	 * @private
	 * @param {number} idx
	 */
	heapifyUp(idx) {
		if (idx == 0) return;

		let smallestIdx = idx;
		const parentIdx = Math.floor((idx - 1) / 2);

		if (this.freqNodes[parentIdx].freq > this.freqNodes[smallestIdx].freq)
			smallestIdx = parentIdx;

		if (smallestIdx != idx) {
			[this.freqNodes[smallestIdx], this.freqNodes[idx]] = [
				this.freqNodes[idx],
				this.freqNodes[smallestIdx],
			];
			this.heapifyUp(smallestIdx);
		}
	}

	/**
	 * @private
	 * @param {number} parentIdx
	 */
	heapifyDown(parentIdx) {
		let smallestIdx = parentIdx;
		const leftIdx = 2 * parentIdx + 1;
		const rightIdx = 2 * parentIdx + 2;

		if (
			leftIdx < this.freqNodes.length &&
			this.freqNodes[leftIdx].freq < this.freqNodes[smallestIdx].freq
		)
			smallestIdx = leftIdx;

		if (
			rightIdx < this.freqNodes.length &&
			this.freqNodes[rightIdx].freq < this.freqNodes[smallestIdx].freq
		)
			smallestIdx = rightIdx;

		if (smallestIdx != parentIdx) {
			[this.freqNodes[smallestIdx], this.freqNodes[parentIdx]] = [
				this.freqNodes[parentIdx],
				this.freqNodes[smallestIdx],
			];
			this.heapifyDown(smallestIdx);
		}
	}
}
