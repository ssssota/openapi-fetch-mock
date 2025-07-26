import petstore from "@readme/oas-examples/3.1/json/petstore.json";
import createClient from "openapi-fetch";
import { beforeAll, expect, it } from "vitest";
import { createMockMiddleware } from "../dist";
import type { paths } from "./petstore.gen";
import { baseUrl, compile, createFetch } from "./utils";

beforeAll(async () => {
	await compile(petstore, "./petstore.gen.ts");
});

it("mock", async () => {
	const fetch = createFetch([
		"GET",
		"/pet/1",
		() =>
			new Response(JSON.stringify({ id: 1, name: "Fluffy" }), { status: 200 }),
	]);
	const client = createClient<paths>({ fetch, baseUrl });
	const res = await client.GET("/pet/{petId}", {
		params: { path: { petId: 1 } },
	});
	expect(res.data).toStrictEqual({ id: 1, name: "Fluffy" });
	expect(fetch).toHaveBeenCalledOnce();
	const middleware = createMockMiddleware<typeof client>((mock) => [
		mock.get("/pet/{petId}", (_, ctx) => {
			return ctx.jsonResponse(200, {
				id: 2,
				name: "Mocked Fluffy",
				photoUrls: [],
			});
		}),
	]);
	client.use(middleware);
	const res2 = await client.GET("/pet/{petId}", {
		params: { path: { petId: 1 } },
	});
	expect(res2.data).toStrictEqual({
		id: 2,
		name: "Mocked Fluffy",
		photoUrls: [],
	});
	expect(fetch).toHaveBeenCalledTimes(1); // fetch should not be called again
	client.eject(middleware);
	const res3 = await client.GET("/pet/{petId}", {
		params: { path: { petId: 1 } },
	});
	expect(res3.data).toStrictEqual({ id: 1, name: "Fluffy" });
	expect(fetch).toHaveBeenCalledTimes(2); // fetch should be called again
});
