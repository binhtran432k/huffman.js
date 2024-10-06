import { huffmanDecode, huffmanEncode } from "../src/index.js";

console.log("Encode and Decode random 10mb")
const input = new Uint8Array(10_000_000).map(() =>
	Math.random() > 0.6 ? Math.floor(Math.random() * 256) : 0,
);
const t0 = performance.now();
const encoded = huffmanEncode(input);
const t1 = performance.now();
console.log("Encode Time: " + (t1 - t0) + "ms");
console.log("Ratio: ", encoded.length / input.length);
const t2 = performance.now();
huffmanDecode(encoded);
const t3 = performance.now();
console.log("Decode Time: " + (t3 - t2) + "ms");
