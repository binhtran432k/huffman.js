import { describe, test, expect } from "bun:test";
import { BitArray } from "./BitArray.js";

describe("BitArray", () => {
	test("get byte size from bit size", () => {
		expect(BitArray.getByteSizeFromBitSize(9)).toEqual(2);
		expect(BitArray.getByteSizeFromBitSize(16)).toEqual(2);
	});

	test("from 1 bit is ones", () => {
		const byteArray = BitArray.fromIsOnes([true]);
		expect(byteArray.bytes).toEqual(new Uint8Array([128]));
		expect(byteArray.size).toEqual(1);
	});

	test("from 9 bit is ones", () => {
		const byteArray = BitArray.fromIsOnes([
			true,
			false,
			false,
			false,
			true,
			false,
			false,
			true,
			true,
		]);
		expect(byteArray.bytes).toEqual(new Uint8Array([137, 128]));
		expect(byteArray.size).toEqual(9);
	});
});
