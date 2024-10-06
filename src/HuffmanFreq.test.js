import { describe, expect, test } from "bun:test";
import { HuffmanFreq } from "./HuffmanFreq.js";

const encoder = new TextEncoder();

/**
 * @param {number} freq
 * @param {string} char
 * @returns {HuffmanFreq}
 */
function toLeaf(freq, char) {
	return new HuffmanFreq(freq, char.charCodeAt(0));
}

describe("HuffmanFreq", () => {
	test("build freqs", () => {
		const freqs = HuffmanFreq.buildFreqs(encoder.encode("Hello World"));
		expect(freqs).toEqual([
			toLeaf(1, " "),
			toLeaf(1, "H"),
			toLeaf(1, "W"),
			toLeaf(1, "d"),
			toLeaf(1, "e"),
			toLeaf(3, "l"),
			toLeaf(2, "o"),
			toLeaf(1, "r"),
		]);
	});

	test("build freqs with full case input", () => {
		const fullCaseInput = new Uint8Array(256).map((_, i) => i);
		const freqs = HuffmanFreq.buildFreqs(fullCaseInput);
		expect(freqs.length).toBe(256);
		expect(freqs.every((f) => f.freq == 1)).toBeTrue();
	});
});
