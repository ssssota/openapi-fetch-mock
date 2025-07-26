# openapi-fetch-mock

Type-safe mocking middleware for [openapi-fetch](https://github.com/openapi-ts/openapi-typescript/tree/main/packages/openapi-fetch). Mock your OpenAPI-based API responses with full TypeScript type inference and auto-completion.

## Features

- 🚀 Full TypeScript support with type inference from your OpenAPI schema
- 🔒 Type-safe request parameters and response bodies
- 🎯 Seamless integration with openapi-fetch middleware system
- 🧪 Perfect for testing and development environments
- 💡 IntelliSense auto-completion for paths, methods, and response shapes

## Installation

```bash
npm install openapi-fetch-mock --save-dev
# or
pnpm add -D openapi-fetch-mock
# or
yarn add -D openapi-fetch-mock
```

## Prerequisites

This library requires:
- [openapi-fetch](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-fetch) ^0.14.0
- [openapi-typescript](https://github.com/drwpow/openapi-typescript) to generate TypeScript types from your OpenAPI schema

## Quick Start

First, generate TypeScript types from your OpenAPI schema:

```bash
npx openapi-typescript https://api.example.com/openapi.json -o ./src/api/types.ts
```

Then use the mock middleware:

```typescript
import createClient from 'openapi-fetch';
import { createMockMiddleware } from 'openapi-fetch-mock';
import type { paths } from './api/types';

// Create your openapi-fetch client
const client = createClient<paths>({ baseUrl: 'https://api.example.com' });

// Create and use the mock middleware
const mockMiddleware = createMockMiddleware<typeof client>((mock) => [
  // Mock a GET request
  mock.get('/users/{userId}', (request, ctx) => {
    return ctx.jsonResponse(200, {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com'
    });
  }),
  
  // Mock a POST request
  mock.post('/users', async (request, ctx) => {
    const body = await request.json();
    return ctx.jsonResponse(201, {
      id: '456',
      ...body
    });
  }),
  
  // Mock with request parameter access
  mock.get('/posts/{postId}', (request, ctx) => {
    const { postId } = ctx.params.path;
    return ctx.jsonResponse(200, {
      id: postId,
      title: `Post ${postId}`,
      content: 'Lorem ipsum...'
    });
  })
]);

// Apply the middleware
client.use(mockMiddleware);

// Now all matching requests will return mocked responses
const user = await client.GET('/users/{userId}', {
  params: { path: { userId: '123' } }
});
console.log(user.data); // { id: '123', name: 'John Doe', email: 'john@example.com' }

// Remove mocks when done
client.eject(mockMiddleware);
```

## API Reference

### `createMockMiddleware(mockGenerator)`

Creates a middleware for mocking API responses.

#### Parameters

- `mockGenerator`: A function that receives a `mock` object with methods for each HTTP method (get, post, put, delete, patch, head, options, trace)

#### Returns

An openapi-fetch middleware object that can be used with `client.use()` and `client.eject()`.

### Mock Handler Function

Each mock handler receives:

1. `request`: A typed Request object with a `json()` method that returns the typed request body
2. `context`: An object containing:
   - `params`: The typed parameters (path, query, header) passed to the request
   - `jsonResponse(status, data)`: A helper to create a JSON response with the correct content-type header
   - `delay(ms)`: A helper function that returns a promise that resolves after the specified milliseconds

### Type Safety

The library provides full type safety:

- Path parameters are type-checked and auto-completed
- Request bodies are typed based on your OpenAPI schema  
- Response bodies must match the schema for the given status code
- All available paths and methods are auto-completed

## Examples

### Conditional Mocking

```typescript
mock.get('/users/{userId}', (request, ctx) => {
  const { userId } = ctx.params.path;
  
  if (userId === 'not-found') {
    return ctx.jsonResponse(404, {
      error: 'User not found'
    });
  }
  
  return ctx.jsonResponse(200, {
    id: userId,
    name: 'Test User'
  });
})
```

### Async Handlers

```typescript
mock.post('/upload', async (request, ctx) => {
  // Simulate processing delay
  await ctx.delay(1000);
  
  const formData = await request.formData();
  const file = formData.get('file');
  
  return ctx.jsonResponse(200, {
    filename: file?.name,
    size: file?.size
  });
})
```

### Testing Example

```typescript
import { describe, it, expect } from 'vitest';
import createClient from 'openapi-fetch';
import { createMockMiddleware } from 'openapi-fetch-mock';

describe('User API', () => {
  it('should create a user', async () => {
    const client = createClient<paths>({ baseUrl: 'https://api.example.com' });
    
    const middleware = createMockMiddleware<typeof client>((mock) => [
      mock.post('/users', async (request) => {
        const body = await request.json();
        return new Response(JSON.stringify({
          id: '123',
          ...body,
          createdAt: new Date().toISOString()
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    ]);
    
    client.use(middleware);
    
    const result = await client.POST('/users', {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com'
      }
    });
    
    expect(result.response.status).toBe(201);
    expect(result.data?.name).toBe('Jane Doe');
  });
});
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the library
pnpm build

# Type check
pnpm check

# Format code
pnpm fmt
```

## License

MIT © TOMIKAWA Sotaro
