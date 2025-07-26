export interface paths {
    "/pet": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update an existing pet */
        put: operations["updatePet"];
        /** Add a new pet to the store */
        post: operations["addPet"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/findByStatus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Finds Pets by status
         * @description Multiple status values can be provided with comma separated strings
         */
        get: operations["findPetsByStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/findByTags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Finds Pets by tags
         * @deprecated
         * @description Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
         */
        get: operations["findPetsByTags"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/{petId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Find pet by ID
         * @description Returns a single pet
         */
        get: operations["getPetById"];
        put?: never;
        /** Updates a pet in the store with form data */
        post: operations["updatePetWithForm"];
        /** Deletes a pet */
        delete: operations["deletePet"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/{petId}/uploadImage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** uploads an image */
        post: operations["uploadFile"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/inventory": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Returns pet inventories by status
         * @description Returns a map of status codes to quantities
         */
        get: operations["getInventory"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/order": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Place an order for a pet */
        post: operations["placeOrder"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/order/{orderId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Find purchase order by ID
         * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
         */
        get: operations["getOrderById"];
        put?: never;
        post?: never;
        /**
         * Delete purchase order by ID
         * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
         */
        delete: operations["deleteOrder"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create user
         * @description This can only be done by the logged in user.
         */
        post: operations["createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/createWithArray": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Creates list of users with given input array */
        post: operations["createUsersWithArrayInput"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/createWithList": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Creates list of users with given input array */
        post: operations["createUsersWithListInput"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Logs user into the system */
        get: operations["loginUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Logs out current logged in user session */
        get: operations["logoutUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/{username}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user by user name */
        get: operations["getUserByName"];
        /**
         * Updated user
         * @description This can only be done by the logged in user.
         */
        put: operations["updateUser"];
        post?: never;
        /**
         * Delete user
         * @description This can only be done by the logged in user.
         */
        delete: operations["deleteUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Order: {
            /** Format: int64 */
            id?: number;
            /** Format: int64 */
            petId?: number;
            /** Format: int32 */
            quantity?: number;
            /** Format: date-time */
            shipDate?: string;
            /**
             * @description Order Status
             * @enum {string}
             */
            status?: "placed" | "approved" | "delivered";
            /** @default false */
            complete: boolean;
        };
        Category: {
            /** Format: int64 */
            id?: number;
            name?: string;
        };
        User: {
            /** Format: int64 */
            id?: number;
            username?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
            phone?: string;
            /**
             * Format: int32
             * @description User Status
             */
            userStatus?: number;
        };
        Tag: {
            /** Format: int64 */
            id?: number;
            name?: string;
        };
        Pet: {
            /** Format: int64 */
            readonly id?: number;
            category?: components["schemas"]["Category"];
            /** @example doggie */
            name: string;
            photoUrls: string[];
            tags?: components["schemas"]["Tag"][];
            /**
             * @description pet status in the store
             * @enum {string}
             */
            status?: "available" | "pending" | "sold";
        };
        ApiResponse: {
            /** Format: int32 */
            code?: number;
            type?: string;
            message?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: {
        /** @description Pet object that needs to be added to the store */
        Pet: {
            content: {
                "application/json": components["schemas"]["Pet"];
                "application/xml": components["schemas"]["Pet"];
            };
        };
        /** @description List of user object */
        UserArray: {
            content: {
                "application/json": components["schemas"]["User"][];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    updatePet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["Pet"];
        responses: {
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation exception */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    addPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["Pet"];
        responses: {
            /** @description Invalid input */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    findPetsByStatus: {
        parameters: {
            query: {
                /** @description Status values that need to be considered for filter */
                status: ("available" | "pending" | "sold")[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": components["schemas"]["Pet"][];
                    "application/json": components["schemas"]["Pet"][];
                };
            };
            /** @description Invalid status value */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    findPetsByTags: {
        parameters: {
            query: {
                /** @description Tags to filter by */
                tags: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": components["schemas"]["Pet"][];
                    "application/json": components["schemas"]["Pet"][];
                };
            };
            /** @description Invalid tag value */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getPetById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet to return */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": components["schemas"]["Pet"];
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description successful response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updatePetWithForm: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet that needs to be updated */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/x-www-form-urlencoded": {
                    /** @description Updated name of the pet */
                    name?: string;
                    /** @description Updated status of the pet */
                    status?: string;
                };
            };
        };
        responses: {
            /** @description Invalid input */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deletePet: {
        parameters: {
            query?: never;
            header?: {
                api_key?: string;
            };
            path: {
                /** @description Pet id to delete */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    uploadFile: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet to update */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/octet-stream": string;
            };
        };
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
        };
    };
    getInventory: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: number;
                    };
                };
            };
        };
    };
    placeOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description order placed for purchasing the pet */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Order"];
            };
        };
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": components["schemas"]["Order"];
                    "application/json": components["schemas"]["Order"];
                };
            };
            /** @description Invalid Order */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getOrderById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet that needs to be fetched */
                orderId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": components["schemas"]["Order"];
                    "application/json": components["schemas"]["Order"];
                };
            };
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Order not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteOrder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the order that needs to be deleted */
                orderId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Order not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Created user object */
        requestBody: {
            content: {
                "application/json": components["schemas"]["User"];
            };
        };
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createUsersWithArrayInput: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UserArray"];
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createUsersWithListInput: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UserArray"];
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    loginUser: {
        parameters: {
            query: {
                /** @description The user name for login */
                username: string;
                /** @description The password for login in clear text */
                password: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    /** @description calls per hour allowed by the user */
                    "X-Rate-Limit"?: number;
                    /** @description date in UTC when token expires */
                    "X-Expires-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": string;
                    "application/json": string;
                };
            };
            /** @description Invalid username/password supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    logoutUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getUserByName: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The name that needs to be fetched. Use user1 for testing.  */
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/xml": components["schemas"]["User"];
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description Invalid username supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description name that need to be updated */
                username: string;
            };
            cookie?: never;
        };
        /** @description Updated user object */
        requestBody: {
            content: {
                "application/json": components["schemas"]["User"];
            };
        };
        responses: {
            /** @description Invalid user supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The name that needs to be deleted */
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Invalid username supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
