import { describe, expect, test } from "bun:test";
import { HuffmanFreqNode } from "./HuffmanFreqNode.js";
import { HuffmanNode } from "./HuffmanNode.js";

describe("HuffmanFreqNode", () => {
	test("build leaf", () => {
		const leaf = HuffmanFreqNode.buildLeaf(1, 2);
		expect(leaf).toEqual({ freq: 1, node: HuffmanNode.buildLeaf(2) });
	});

	test("build internal", () => {
		const internal = HuffmanFreqNode.buildInternal(
			HuffmanFreqNode.buildLeaf(1, 2),
			HuffmanFreqNode.buildLeaf(1, 3),
		);
		expect(internal).toEqual({
			freq: 2,
			node: HuffmanNode.buildInternal(
				HuffmanNode.buildLeaf(2),
				HuffmanNode.buildLeaf(3),
			),
		});
	});

	test("build internal with right is null", () => {
		const internal = HuffmanFreqNode.buildInternal(
			HuffmanFreqNode.buildLeaf(1, 2),
			null,
		);
		expect(internal).toEqual({
			freq: 1,
			node: HuffmanNode.buildInternal(HuffmanNode.buildLeaf(2), null),
		});
	});
});
