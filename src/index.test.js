import { describe, expect, test } from "bun:test";
import { huffmanDecode, huffmanEncode } from "./index.js";

const encoder = new TextEncoder();

describe("index", () => {
	test("encode", () => {
		const input = encoder.encode("Hello World");
		expect(huffmanEncode(input)).toEqual(
			// 0001_00100000_1_01110010_01_01100101_1_01010111_01_01101100_01_01101111_01_01001000_1_01100100
			// 00000000_00000000_00000000_00001011
			// 1110_010_10_10_110_000_011_110_001_10_1111
			//
			// 00010010_00001011_10010010_11001011_01010111_01011011_00010110_11110101_00100010_1100100
			// 0
			// 00000000_00000000_00000000_0001011
			// 1
			// 11001010_10110000_01111000_1101111
			// 0
			new Uint8Array([
				18, 11, 146, 203, 87, 91, 22, 245, 34, 200, 0, 0, 0, 23, 202, 176, 120,
				222,
			]),
		);
	});

	test("decode", () => {
		const input = new Uint8Array([
			18, 11, 146, 203, 87, 91, 22, 245, 34, 200, 0, 0, 0, 23, 202, 176, 120,
			222,
		]);
		expect(huffmanDecode(input)).toEqual(encoder.encode("Hello World"));
	});

	test("decode full range", () => {
		const input = new Uint8Array(256).map((_, i) => i);
		const encoded = huffmanEncode(input);
		expect(huffmanDecode(encoded)).toEqual(input);
	});

	test("decode random", () => {
		const input = new Uint8Array(1000).map(() =>
			Math.random() > 0.5 ? Math.floor(Math.random() * 256) : 0,
		);
		const encoded = huffmanEncode(input);
		expect(huffmanDecode(encoded)).toEqual(input);
	});
});
