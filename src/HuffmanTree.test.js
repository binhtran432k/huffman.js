import { describe, expect, test } from "bun:test";
import { HuffmanNode } from "./HuffmanNode.js";
import { HuffmanTree } from "./HuffmanTree.js";
import { WriteByteArray } from "./byte_array/WriteByteArray.js";
import { BitArray } from "./byte_array/BitArray.js";
import { ReadByteArray } from "./byte_array/ReadByteArray.js";

const encoder = new TextEncoder();

/**
 * @param {string} char
 * @returns {HuffmanNode}
 */
function buildLeaf(char) {
	return HuffmanNode.buildLeaf(char.charCodeAt(0));
}

describe("BsHuffmanTree", () => {
	test("build", () => {
		/** @type {HuffmanTree} */
		// @ts-ignore: tree is not null here
		const tree = HuffmanTree.build(encoder.encode("Hello World"));
		expect(tree.root).toEqual(
			HuffmanNode.buildInternal(
				HuffmanNode.buildInternal(
					HuffmanNode.buildInternal(
						// 000
						buildLeaf(" "),
						// 001
						buildLeaf("r"),
					),
					HuffmanNode.buildInternal(
						// 010
						buildLeaf("e"),
						// 011
						buildLeaf("W"),
					),
				),
				HuffmanNode.buildInternal(
					// 10
					buildLeaf("l"),
					HuffmanNode.buildInternal(
						// 110
						buildLeaf("o"),
						HuffmanNode.buildInternal(
							// 1110
							buildLeaf("H"),
							// 1111
							buildLeaf("d"),
						),
					),
				),
			),
		);
	});

	test("build empty", () => {
		const tree = HuffmanTree.build(new Uint8Array());
		expect(tree).toBeNull();
	});

	test("get tree bits size", () => {
		/** @type {HuffmanTree} */
		// @ts-ignore: tree is not null here
		const tree = HuffmanTree.build(encoder.encode("Hello World"));
		expect(tree.getTreeBitsSize()).toEqual(79);
	});

	test("get full case tree bits size", () => {
		/** @type {HuffmanTree} */
		// @ts-ignore: tree is not null here
		const tree = HuffmanTree.build(new Uint8Array(256).map((_, i) => i));
		expect(tree.getTreeBitsSize()).toEqual(2559);
	});

	test("serialize tree to byte array", () => {
		/** @type {HuffmanTree} */
		// @ts-ignore: tree is not null here
		const tree = HuffmanTree.build(encoder.encode("Hello World"));
		const byteArray = new WriteByteArray(
			BitArray.getByteSizeFromBitSize(tree.getTreeBitsSize()),
		);
		tree.serializeToByteArray(byteArray);
		expect(byteArray.bytes).toEqual(
			// 0001_00100000_1_01110010_01_01100101_1_01010111_01_01101100_01_01101111_01_01001000_1_01100100
			//
			// 00010010_00001011_10010010_11001011_01010111_01011011_00010110_11110101_00100010_1100100
			// 0
			new Uint8Array([18, 11, 146, 203, 87, 91, 22, 245, 34, 200]),
		);
	});

	test("deserialize tree to byte array", () => {
		const input = new Uint8Array([18, 11, 146, 203, 87, 91, 22, 245, 34, 200]);
		const byteArray = new ReadByteArray(input);
		/** @type {HuffmanTree} */
		// @ts-ignore: tree is not null here
		const tree = HuffmanTree.deserializeFromByteArray(byteArray);
		expect(tree.root).toEqual(
			HuffmanNode.buildInternal(
				HuffmanNode.buildInternal(
					HuffmanNode.buildInternal(
						// 000
						buildLeaf(" "),
						// 001
						buildLeaf("r"),
					),
					HuffmanNode.buildInternal(
						// 010
						buildLeaf("e"),
						// 011
						buildLeaf("W"),
					),
				),
				HuffmanNode.buildInternal(
					// 10
					buildLeaf("l"),
					HuffmanNode.buildInternal(
						// 110
						buildLeaf("o"),
						HuffmanNode.buildInternal(
							// 1110
							buildLeaf("H"),
							// 1111
							buildLeaf("d"),
						),
					),
				),
			),
		);
	});
});
