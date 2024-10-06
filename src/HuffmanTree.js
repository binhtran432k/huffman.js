import { HuffmanFreq } from "./HuffmanFreq.js";
import { HuffmanFreqNode } from "./HuffmanFreqNode.js";
import { HuffmanHeap } from "./HuffmanHeap.js";
import { HuffmanNode } from "./HuffmanNode.js";

/** @typedef {import("./byte_array/ReadByteArray.js").ReadByteArray} ReadByteArray */
/** @typedef {import("./byte_array/WriteByteArray.js").WriteByteArray} WriteByteArray */

/** @internal */
export class HuffmanTree {
	/**
	 * @private
	 * @param {HuffmanNode} root
	 */
	constructor(root) {
		/** @readonly @type {HuffmanNode} */
		this.root = root;
	}

	/**
	 * @param {Readonly<Uint8Array>} input
	 * @returns {?HuffmanTree}
	 */
	static build(input) {
		if (input.length === 0) return null;

		const heap = new HuffmanHeap(HuffmanFreq.buildFreqs(input));

		while (true) {
			/** @type {HuffmanFreqNode} */
			// @ts-ignore leftNode is not null here
			const leftNode = heap.pop();
			const rightNode = heap.pop();
			const newFreqNode = HuffmanFreqNode.buildInternal(leftNode, rightNode);

			if (heap.freqNodes.length === 0) {
				return new HuffmanTree(newFreqNode.node);
			}

			heap.push(newFreqNode);
		}
	}

	/**
	 * @param {ReadByteArray} byteArray
	 * @returns {?HuffmanTree}
	 */
	static deserializeFromByteArray(byteArray) {
		const root = analyzeRootFromByteArray(byteArray);
		if (!root) return null;

		return new HuffmanTree(root);
	}

	/** @returns {number} */
	getTreeBitsSize() {
		/** @type { Readonly<HuffmanNode>[]} */
		const stack = [this.root];
		let size = 0;
		while (stack.length > 0) {
			/** @type {HuffmanNode} */
			// @ts-ignore: node is not null here
			const node = stack.pop();
			if (node.isLeaf()) {
				size += 9;
			} else {
				size += 1;
			}
			if (node.right) stack.push(node.right);
			if (node.left) stack.push(node.left);
		}
		return size;
	}

	/**
	 * @param {WriteByteArray} byteArray
	 */
	serializeToByteArray(byteArray) {
		/** @type { Readonly<HuffmanNode>[]} */
		const stack = [this.root];
		while (stack.length > 0) {
			/** @type {HuffmanNode} */
			// @ts-ignore: node is not null here
			const node = stack.pop();
			if (node.isLeaf()) {
				byteArray.writeBit(true);
				// @ts-ignore: leaf node must have value
				byteArray.write8Bit(node.value);
			} else {
				byteArray.writeBit(false);
			}
			if (node.right) stack.push(node.right);
			if (node.left) stack.push(node.left);
		}
	}
}

/**
 * @param {ReadByteArray} byteArray
 * @returns {HuffmanNode}
 */
function analyzeRootFromByteArray(byteArray) {
	if (byteArray.readBit()) return HuffmanNode.buildLeaf(byteArray.read8Bit());

	const left = analyzeRootFromByteArray(byteArray);
	const right = analyzeRootFromByteArray(byteArray);
	return HuffmanNode.buildInternal(left, right);
}
