import type {
	Client,
	DefaultParamsOption,
	Middleware,
	ParamsOption,
} from "openapi-fetch";
import type {
	HttpMethod,
	JSONLike,
	OperationObject,
	PathItemObject,
	PathsWithMethod,
	RequestBodyJSON,
	ResponseContent,
	ResponseObjectMap,
} from "openapi-typescript-helpers";

type PromiseOr<T> = T | Promise<T>;
type ResponseBodyJson<
	Operation extends OperationObject,
	Status extends StatusForOperation<Operation>,
> = JSONLike<ResponseContent<ResponseObjectMap<Operation>[Status]>>;
type StatusForOperation<Operation extends OperationObject> =
	keyof ResponseObjectMap<Operation>;
type HandlerContext<Operation extends OperationObject> = {
	params: ParamsOption<Operation>;
	delay: (ms: number) => Promise<void>;
	jsonResponse: <Status extends StatusForOperation<Operation> & number>(
		status: Status,
		data: ResponseBodyJson<Operation, Status> extends infer T
			? T extends Record<string, any>
				? T
				: null
			: null,
	) => Response;
};
type TypedJsonRequest<Operation extends OperationObject> = Omit<
	Request,
	"json"
> & { json: () => Promise<RequestBodyJSON<Operation>> };
type Handler<Operation extends OperationObject> = (
	request: TypedJsonRequest<Operation>,
	context: HandlerContext<Operation>,
) => PromiseOr<Response>;
type Mock<
	Path,
	Method extends HttpMethod,
	Operation extends OperationObject,
> = [schemaPath: Path, method: Method, handler: Handler<Operation>];
type OperationForPath<
	Paths extends PathItemObject,
	Method extends HttpMethod,
	Path extends PathsWithMethod<Paths, Method>,
> = Paths[Path] extends Record<Method, any> ? Paths[Path][Method] : never;
type MockCreator<Paths extends PathItemObject, Method extends HttpMethod> = <
	Path extends PathsWithMethod<Paths, Method>,
>(
	path: Path,
	handler: Handler<OperationForPath<Paths, Method, Path>>,
) => Mock<Path, Method, OperationForPath<Paths, Method, Path>>;
type MockCreators<Paths extends PathItemObject> = {
	[Method in HttpMethod]: MockCreator<Paths, Method>;
};
type MockList = Mock<any, any, any>[];
type MockGenerator<Paths extends PathItemObject> = (
	mock: MockCreators<Paths>,
) => MockList;
type PathsForClient<T extends Client<any>> = T extends Client<infer Paths>
	? Paths
	: never;
export function createMockMiddleware<T extends Client<any>>(
	mocks: MockGenerator<PathsForClient<T>>,
): Middleware {
	const findMock = createMockFinder(
		mocks(createMockCreators<PathsForClient<T>>()),
	);
	return {
		onRequest(options) {
			const mock = findMock(
				options.schemaPath,
				options.request.method.toLowerCase(),
			);
			if (!mock) return;
			return mock[2](options.request, {
				params: options.params as DefaultParamsOption,
				delay,
				jsonResponse,
			});
		},
	};
}
function createMockFinder(mockList: MockList) {
	return (path: string, method: string) =>
		mockList.find(([p, m]) => p === path && m === method);
}
function createMockCreators<
	Paths extends PathItemObject,
>(): MockCreators<Paths> {
	return {
		get: createMockCreator("get"),
		post: createMockCreator("post"),
		put: createMockCreator("put"),
		delete: createMockCreator("delete"),
		patch: createMockCreator("patch"),
		head: createMockCreator("head"),
		options: createMockCreator("options"),
		trace: createMockCreator("trace"),
	};
}
function createMockCreator<
	Paths extends PathItemObject,
	Method extends HttpMethod,
>(method: Method): MockCreator<Paths, Method> {
	return ((path, handler) => [path, method, handler]) as MockCreator<
		Paths,
		Method
	>;
}
function jsonResponse<T>(status: number, data: T): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
