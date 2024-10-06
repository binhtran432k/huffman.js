import { describe, expect, test } from "bun:test";
import { HuffmanFreqNode } from "./HuffmanFreqNode.js";
import { HuffmanHeap } from "./HuffmanHeap.js";

describe("BsHuffmanHeap", () => {
	test("build heap", () => {
		const heap = new HuffmanHeap([
			{ value: 0, freq: 1 },
			{ value: 1, freq: 2 },
			{ value: 3, freq: 1 },
			{ value: 4, freq: 2 },
			{ value: 5, freq: 1 },
		]);
		expect(heap.freqNodes).toEqual([
			HuffmanFreqNode.buildLeaf(1, 0),
			HuffmanFreqNode.buildLeaf(1, 5),
			HuffmanFreqNode.buildLeaf(1, 3),
			HuffmanFreqNode.buildLeaf(2, 4),
			HuffmanFreqNode.buildLeaf(2, 1),
		]);
	});

	test("pop node", () => {
		const heap = new HuffmanHeap([
			{ value: 0, freq: 1 },
			{ value: 1, freq: 2 },
			{ value: 3, freq: 1 },
			{ value: 4, freq: 2 },
			{ value: 5, freq: 1 },
		]);
		expect(heap.pop()).toEqual(HuffmanFreqNode.buildLeaf(1, 0));
		expect(heap.freqNodes).toEqual([
			HuffmanFreqNode.buildLeaf(1, 5),
			HuffmanFreqNode.buildLeaf(2, 1),
			HuffmanFreqNode.buildLeaf(1, 3),
			HuffmanFreqNode.buildLeaf(2, 4),
		]);
	});

	test("pop empty", () => {
		const heap = new HuffmanHeap([]);
		expect(heap.pop()).toEqual(null);
	});

	test("pop single", () => {
		const heap = new HuffmanHeap([{ value: 0, freq: 1 }]);
		expect(heap.pop()).toEqual(HuffmanFreqNode.buildLeaf(1, 0));
		expect(heap.freqNodes).toEqual([]);
	});

	test("push node", () => {
		const heap = new HuffmanHeap([
			{ value: 0, freq: 1 },
			{ value: 1, freq: 2 },
			{ value: 3, freq: 2 },
			{ value: 4, freq: 2 },
			{ value: 5, freq: 1 },
		]);
		const newNode = HuffmanFreqNode.buildLeaf(1, 6);
		expect(heap.push(newNode)).toBe(newNode);
		expect(heap.freqNodes).toEqual([
			HuffmanFreqNode.buildLeaf(1, 0),
			HuffmanFreqNode.buildLeaf(1, 5),
			HuffmanFreqNode.buildLeaf(1, 6),
			HuffmanFreqNode.buildLeaf(2, 4),
			HuffmanFreqNode.buildLeaf(2, 1),
			HuffmanFreqNode.buildLeaf(2, 3),
		]);
	});
});
