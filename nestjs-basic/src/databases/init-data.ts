export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";

export const INIT_PERMISSIONS = [
    {
        "_id": "648ab6d3fa16b294212e4033",
        "name": "Create User",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "_id": "648ab6e7fa16b294212e4038",
        "name": "Get User by Id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:51.041Z",
        "updatedAt": "2023-06-15T06:59:51.041Z",
        "__v": 0
    },
    {
        "_id": "648ab6fdfa16b294212e403d",
        "name": "Get User with paginate",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:13.364Z",
        "updatedAt": "2023-06-15T07:00:13.364Z",
        "__v": 0
    },
    {
        "_id": "648ab719fa16b294212e4042",
        "name": "Update User",
        "apiPath": "/api/v1/users/:id",
        "method": "PATCH",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:41.934Z",
        "updatedAt": "2023-06-15T07:00:41.934Z",
        "__v": 0
    },
    {
        "_id": "648ab728fa16b294212e4047",
        "name": "Delete User",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:56.274Z",
        "updatedAt": "2023-06-15T07:00:56.274Z",
        "__v": 0
    },
    {
        "_id": "648ab750fa16b294212e404c",
        "name": "Upload Single File",
        "apiPath": "/api/v1/files/upload",
        "method": "POST",
        "module": "FILES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:01:36.923Z",
        "updatedAt": "2023-06-15T07:01:36.923Z",
        "__v": 0
    },
    {
        "_id": "648ad59adafdb9754f40b881",
        "name": "Create a permission",
        "apiPath": "/api/v1/permissions",
        "method": "POST",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "648ad5aedafdb9754f40b886",
        "name": "Fetch Permission with paginate",
        "apiPath": "/api/v1/permissions",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:10.914Z",
        "updatedAt": "2023-06-15T09:11:10.914Z",
        "__v": 0
    },
    {
        "_id": "648ad5c5dafdb9754f40b88b",
        "name": "Fetch permission by id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:33.234Z",
        "updatedAt": "2023-06-15T09:11:33.234Z",
        "__v": 0
    },
    {
        "_id": "648ad5d4dafdb9754f40b890",
        "name": "Update a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "PATCH",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:48.081Z",
        "updatedAt": "2023-06-15T09:11:48.081Z",
        "__v": 0
    },
    {
        "_id": "648ad5ebdafdb9754f40b895",
        "name": "Delete a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "DELETE",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:11.323Z",
        "updatedAt": "2023-06-15T09:12:11.323Z",
        "__v": 0
    },
    {
        "_id": "648ad613dafdb9754f40b89a",
        "name": "Create Role",
        "apiPath": "/api/v1/roles",
        "method": "POST",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "648ad622dafdb9754f40b89f",
        "name": "Fetch roles with paginate",
        "apiPath": "/api/v1/roles",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:06.618Z",
        "updatedAt": "2023-06-15T09:13:06.618Z",
        "__v": 0
    },
    {
        "_id": "648ad630dafdb9754f40b8a6",
        "name": "Fetch role by id",
        "apiPath": "/api/v1/roles/:id",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:20.853Z",
        "updatedAt": "2023-06-15T09:13:20.853Z",
        "__v": 0
    },
    {
        "_id": "648ad640dafdb9754f40b8ab",
        "name": "Update Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "PATCH",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:36.836Z",
        "updatedAt": "2023-06-15T09:13:36.836Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b0",
        "name": "Delete a Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "DELETE",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    },
    {
        "_id": "617d5e06e1e9ff3e92b6e91a",
        "name": "Get Genre",
        "apiPath": "/api/v1/genres",
        "method": "GET",
        "module": "GENRES",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "617d5e06e1e9ff3e92b6e91b",
        "name": "Create Genre",
        "apiPath": "/api/v1/genres",
        "method": "POST",
        "module": "GENRES",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "617d5e06e1e9ff3e92b6e91c",
        "name": "Fetch genre by id",
        "apiPath": "/api/v1/genres/:id",
        "method": "GET",
        "module": "GENRES",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "617d5e06e1e9ff3e92b6e91d",
        "name": "Update a Genre by id",
        "apiPath": "/api/v1/genres/:id",
        "method": "PATCH",
        "module": "GENRES",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "617d5e06e1e9ff3e92b6e91e",
        "name": "Delete Genre by id",
        "apiPath": "/api/v1/genres/:id",
        "method": "DELETE",
        "module": "GENRES",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "60f7b3f9ef283300155ae090",
        "name": "Get Track",
        "apiPath": "/api/v1/tracks",
        "method": "GET",
        "module": "TRACKS",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "5fa1c9648c4852001561d7a3",
        "name": "Create Track",
        "apiPath": "/api/v1/tracks",
        "method": "POST",
        "module": "TRACKS",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "5fb365344eeebf0015a3e13b",
        "name": "Fetch track by id",
        "apiPath": "/api/v1/tracks/:id",
        "method": "GET",
        "module": "TRACKS",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "60c3c02bcfe9860015bf1d5f",
        "name": "Update track by id",
        "apiPath": "/api/v1/tracks/:id",
        "method": "PATCH",
        "module": "TRACKS",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "5fe3f79b2852390015d04d67",
        "name": "Delete track by id",
        "apiPath": "/api/v1/tracks/:id",
        "method": "DELETE",
        "module": "TRACKS",
        "createdBy": {
            "_id": "6683b041ead26dd9855eb53a",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    }
]

export const INIT_GENRES = [
    {
        "_id": "66840a59602571c17bbb2f6d",
        "name": "Ballad",
        "description": "It is a genre of music with gentle, deep melodies and lyrics that often carry content about love, life and human thoughts and feelings. Ballad music is often expressed through the singer's inspiring and emotional singing.",
        "createdBy": {
            "_id": "6684016906966664a9bca198",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-02T14:10:33.701Z",
        "updatedAt": "2024-07-02T14:10:33.701Z",
        "__v": 0
    },
    {
        "_id": "66840a64602571c17bbb2f74",
        "name": "POP",
        "description": "It is the most popular music genre today, with catchy melodies and lyrics that are easy to understand and memorize. Pop singers often have a youthful, dynamic style and use a lot of choreography in their MVs.",
        "createdBy": {
            "_id": "6684016906966664a9bca198",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-02T14:10:44.978Z",
        "updatedAt": "2024-07-02T14:10:44.978Z",
        "__v": 0
    }
]
