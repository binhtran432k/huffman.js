import { BitArray } from "./byte_array/BitArray.js";
import { ReadByteArray } from "./byte_array/ReadByteArray.js";
import { WriteByteArray } from "./byte_array/WriteByteArray.js";
import { HuffmanTree } from "./HuffmanTree.js";

/** @typedef {import("./HuffmanNode.js").HuffmanNode} HuffmanNode */

/**
 * @param {Readonly<Uint8Array>} input
 * @returns {Uint8Array}
 */
export function huffmanEncode(input) {
	if (input.length === 0) return input;

	/** @type {HuffmanTree} */
	// @ts-ignore tree is not null here
	const tree = HuffmanTree.build(input);

	const charSizes = getTreeCharSizes(tree.root);

	const encodedBitsSize =
		tree.getTreeBitsSize() + getInputBitsSize(input, charSizes) + 32;

	const byteArray = new WriteByteArray(
		BitArray.getByteSizeFromBitSize(encodedBitsSize),
	);

	tree.serializeToByteArray(byteArray);

	byteArray.write32Bit(input.length);

	serializeInputToByteArray(input, byteArray, tree.root, charSizes);

	return byteArray.bytes;
}

/**
 * @param {Readonly<Uint8Array>} input
 * @returns {Uint8Array}
 */
export function huffmanDecode(input) {
	if (input.length === 0) return input;

	const readByteArray = new ReadByteArray(input);

	const tree = HuffmanTree.deserializeFromByteArray(readByteArray);

	if (tree === null) return input;

	const decodedSize = readByteArray.read32Bit();

	const bytes = new Uint8Array(decodedSize);
	for (let i = 0; i < decodedSize; i++) {
		let walkNode = tree.root;
		while (!walkNode.isLeaf()) {
			// @ts-ignore walkNode.right is not null here
			if (readByteArray.readBit()) walkNode = walkNode.right;
			// @ts-ignore walkNode.left is not null here
			else walkNode = walkNode.left;
		}
		// @ts-ignore walkNode.value is not null here
		bytes[i] = walkNode.value;
	}

	return bytes;
}

/**
 * @param {Readonly<Uint8Array>} input
 * @param {Readonly<Uint8Array>} charSizes
 * @returns {number}
 */
function getInputBitsSize(input, charSizes) {
	return input.reduce((p, c) => p + charSizes[c], 0);
}

/**
 * @param {Readonly<Uint8Array>} input
 * @param {WriteByteArray} writeByteArray
 * @param {Readonly<HuffmanNode>} root
 * @param {Readonly<Uint8Array>} charSizes
 */
function serializeInputToByteArray(input, writeByteArray, root, charSizes) {
	const bitArrayIndexes = new Uint8Array(256);
	let isOneIndexSize = 0;
	for (let i = 0; i < charSizes.length; i++)
		if (charSizes[i] > 0) bitArrayIndexes[i] = isOneIndexSize++;

	const bitArrays = analyzeByteArrays(
		root,
		bitArrayIndexes,
		new Array(isOneIndexSize),
		[],
	);

	input.forEach((c) => {
		writeByteArray.writeFromByteArray(bitArrays[bitArrayIndexes[c]]);
	});
}

/**
 * @param {Readonly<HuffmanNode>} root
 * @returns {Uint8Array}
 */
function getTreeCharSizes(root) {
	return analyzeTreeCharSizes(root, new Uint8Array(256), 0);
}

/**
 * @param {Readonly<HuffmanNode>} root
 * @param {Uint8Array} sizes
 * @param {number} depth
 * @returns {Uint8Array}
 */
function analyzeTreeCharSizes(root, sizes, depth) {
	if (root.left) analyzeTreeCharSizes(root.left, sizes, depth + 1);
	if (root.right) analyzeTreeCharSizes(root.right, sizes, depth + 1);
	// @ts-ignore root.value is not null here
	if (root.isLeaf()) sizes[root.value] = depth;
	return sizes;
}

/**
 * @param {Readonly<HuffmanNode>} root
 * @param {Readonly<Uint8Array>} bitArrayIndexes
 * @param {BitArray[]} bitArrays
 * @param {boolean[]} currIsOnes
 * @returns {BitArray[]}
 */
function analyzeByteArrays(root, bitArrayIndexes, bitArrays, currIsOnes) {
	if (root.left) {
		currIsOnes.push(false);
		analyzeByteArrays(root.left, bitArrayIndexes, bitArrays, currIsOnes);
		currIsOnes.pop();
	}
	if (root.right) {
		currIsOnes.push(true);
		analyzeByteArrays(root.right, bitArrayIndexes, bitArrays, currIsOnes);
		currIsOnes.pop();
	}
	if (root.isLeaf())
		// @ts-ignore root.value is not null here
		bitArrays[bitArrayIndexes[root.value]] = BitArray.fromIsOnes(currIsOnes);

	return bitArrays;
}
