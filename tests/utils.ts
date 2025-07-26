import { writeFile } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import openapi, { astToString } from "openapi-typescript";
import { vi } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const baseUrl = "https://example.com/";

export async function compile(schema: any, output: string) {
	const source = typeof schema === "string" ? schema : JSON.stringify(schema);
	const ast = await openapi(source);
	const code = astToString(ast);
	await writeFile(path.join(__dirname, output), code);
}

export function createFetch(
	...mocks: [
		method: Uppercase<string>,
		path: string,
		response: () => Response,
	][]
) {
	return vi
		.fn<typeof fetch>(async (input, init) => {
			const url: URL =
				input instanceof URL
					? input
					: new URL(typeof input === "string" ? input : input.url);
			const method =
				input instanceof Request ? input.method : init?.method || "GET";

			const mock = mocks.find(([m, p]) => m === method && url.pathname === p);
			if (mock) return mock[2]();
			return new Response(null, { status: 500 });
		})
		.mockName("fetch");
}
