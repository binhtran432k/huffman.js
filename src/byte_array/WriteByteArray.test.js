import { describe, expect, test } from "bun:test";
import { BitArray } from "./BitArray.js";
import { WriteByteArray } from "./WriteByteArray.js";

describe("WriteByteArray", () => {
	test("new 1 byte", () => {
		const byteArray = new WriteByteArray(1);
		expect(byteArray.bytes).toEqual(new Uint8Array([0]));
	});

	test("new multiple bytes", () => {
		const byteArray = new WriteByteArray(3);
		expect(byteArray.bytes).toEqual(new Uint8Array([0, 0, 0]));
	});

	test("write bit", () => {
		const byteArray = new WriteByteArray(1);
		byteArray.writeBit(true);
		byteArray.writeBit(false);
		byteArray.writeBit(true);
		expect(byteArray.bytes).toEqual(new Uint8Array([160]));
	});

	test("write 8 bit", () => {
		const byteArray = new WriteByteArray(2);
		byteArray.writeBit(true);
		byteArray.write8Bit(3);
		expect(byteArray.bytes).toEqual(new Uint8Array([129, 128]));
	});

	test("write 32 bit", () => {
		const byteArray = new WriteByteArray(5);
		byteArray.writeBit(true);
		byteArray.write32Bit((1 << 31) | (1 << 24) | 3);
		expect(byteArray.bytes).toEqual(new Uint8Array([192, 128, 0, 1, 128]));
	});

	test("write from byte array", () => {
		const byteArray = new WriteByteArray(2);
		byteArray.writeFromByteArray(
			BitArray.fromIsOnes([
				true,
				false,
				true,
				false,
				false,
				true,
				false,
				false,
				true,
			]),
		);
		expect(byteArray.bytes).toEqual(new Uint8Array([164, 128]));
	});
});
