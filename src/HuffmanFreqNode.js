import { HuffmanNode } from "./HuffmanNode.js";

/** @internal */
export class HuffmanFreqNode {
	/**
	 * @private
	 * @param {number} freq
	 * @param {HuffmanNode} node
	 */
	constructor(freq, node) {
		/** @readonly @type {number} */
		this.freq = freq;
		/** @readonly @type {HuffmanNode} */
		this.node = node;
	}

	/**
	 * @param {number} freq
	 * @param {number} value
	 * @returns {HuffmanFreqNode}
	 */
	static buildLeaf(freq, value) {
		const node = HuffmanNode.buildLeaf(value);
		return new HuffmanFreqNode(freq, node);
	}

	/**
	 * @param {HuffmanFreqNode} left
	 * @param {?HuffmanFreqNode} right
	 * @returns {HuffmanFreqNode}
	 */
	static buildInternal(left, right) {
		const freq = right ? left.freq + right.freq : left.freq;
		return new HuffmanFreqNode(
			freq,
			HuffmanNode.buildInternal(left.node, right ? right.node : null),
		);
	}
}
