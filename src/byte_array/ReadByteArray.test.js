import { describe, test, expect } from "bun:test";
import { ReadByteArray } from "./ReadByteArray.js";

describe("ReadByteArray", () => {
	test("read 1 bit", () => {
		const byteArray = new ReadByteArray(new Uint8Array([160]));
		expect(byteArray.readBit()).toBe(true);
		expect(byteArray.readBit()).toBe(false);
		expect(byteArray.readBit()).toBe(true);
	});

	test("read 8 bit", () => {
		const byteArray = new ReadByteArray(new Uint8Array([129, 128]));
		expect(byteArray.readBit()).toBe(true);
		expect(byteArray.read8Bit()).toBe(3);
	});

	test("read 32 bit", () => {
		const byteArray = new ReadByteArray(new Uint8Array([192, 128, 0, 1, 128]));
		expect(byteArray.readBit()).toBe(true);
		expect(byteArray.read32Bit()).toBe((1 << 31) | (1 << 24) | 3);
	});
});
