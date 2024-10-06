/** @internal */
export class HuffmanNode {
	/** @private */
	constructor() {
		/** @type {HuffmanNode=} */
		this.left;
		/** @type {HuffmanNode=} */
		this.right;
		/** @type {number=} */
		this.value;
	}

	/**
	 * @param {number} value
	 * @returns {HuffmanNode}
	 */
	static buildLeaf(value) {
		const node = new HuffmanNode();
		node.value = value;
		return node;
	}

	/**
	 * @param {HuffmanNode} left
	 * @param {?HuffmanNode} right
	 * @returns {HuffmanNode}
	 */
	static buildInternal(left, right) {
		const node = new HuffmanNode();
		node.left = left;
		if (right) node.right = right;
		return node;
	}

	/** @returns {boolean} */
	isLeaf() {
		return this.value !== undefined;
	}
}
