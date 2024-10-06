import { describe, expect, test } from "bun:test";
import { HuffmanNode } from "./HuffmanNode.js";

describe("HuffmanNode", () => {
	test("build leaf", () => {
		const leaf = HuffmanNode.buildLeaf(2);
		expect(leaf.value).toEqual(2);
		expect(leaf.left).toBeUndefined();
		expect(leaf.right).toBeUndefined();
	});

	test("build internal", () => {
		const internal = HuffmanNode.buildInternal(
			HuffmanNode.buildLeaf(2),
			HuffmanNode.buildLeaf(3),
		);
		expect(internal.value).toBeUndefined();
		expect(internal.left).toEqual(HuffmanNode.buildLeaf(2));
		expect(internal.right).toEqual(HuffmanNode.buildLeaf(3));
	});

	test("build internal with right is null", () => {
		const internal = HuffmanNode.buildInternal(HuffmanNode.buildLeaf(2), null);
		expect(internal.value).toBeUndefined();
		expect(internal.left).toEqual(HuffmanNode.buildLeaf(2));
		expect(internal.right).toBeUndefined();
	});
	test("is leaf true", () => {
		const leaf = HuffmanNode.buildLeaf(2);
		expect(leaf.isLeaf()).toEqual(true);
	});

	test("is leaf false", () => {
		const internal = HuffmanNode.buildInternal(
			HuffmanNode.buildLeaf(2),
			HuffmanNode.buildLeaf(3),
		);
		expect(internal.isLeaf()).toEqual(false);
	});
});
