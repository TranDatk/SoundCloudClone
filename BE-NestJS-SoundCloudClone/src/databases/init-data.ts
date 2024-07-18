export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";

export const enum USER_TYPE {
    CREDENTIAL = "CREDENTIAL",
    GITHUB = "GITHUB",
    GOOGLE = 'GOOGLE'
}

export const enum STATUS {
    PENDING = "PENDING",
    CANCELED = "CANCELLED",
    PAID = "PAID",
}

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
    },
    {
        "name": "Fetch user track",
        "apiPath": "/api/v1/tracks/user-track",
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
        "name": "Check like",
        "apiPath": "/api/v1/likes/check/:id",
        "method": "GET",
        "module": "LIKES",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Fetch like by id",
        "apiPath": "/api/v1/likes/:id",
        "method": "GET",
        "module": "LIKES",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Update like by id",
        "apiPath": "/api/v1/likes/:id",
        "method": "PATCH",
        "module": "LIKES",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Create a like",
        "apiPath": "/api/v1/likes",
        "method": "POST",
        "module": "LIKES",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "_id": "60f7b3f9ef283300155ae099",
        "name": "Get list liked track of user",
        "apiPath": "/api/v1/likes",
        "method": "GET",
        "module": "LIKES",
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
        "name": "Create a comment",
        "apiPath": "/api/v1/comments",
        "method": "POST",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Create a playlist",
        "apiPath": "/api/v1/playlists",
        "method": "POST",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Fetch list playlist",
        "apiPath": "/api/v1/playlists",
        "method": "GET",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Update a playlist",
        "apiPath": "/api/v1/playlists/:id",
        "method": "PATCH",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "create a follower",
        "apiPath": "/api/v1/followers",
        "method": "POST",
        "module": "FOLLOWERS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Ferch all authors was followed",
        "apiPath": "/api/v1/followers",
        "method": "GET",
        "module": "FOLLOWERS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Ferch authors that user was followed",
        "apiPath": "/api/v1/followers/:id",
        "method": "GET",
        "module": "FOLLOWERS",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "name": "Create a payment",
        "apiPath": "/api/v1/payment/create",
        "method": "POST",
        "module": "PAYMENT",
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
        "name": "Get a order",
        "apiPath": "/api/v1/payment/:orderId",
        "method": "GET",
        "module": "PAYMENT",
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
        "name": "Cancel a order",
        "apiPath": "/api/v1/payment/:orderId",
        "method": "PUT",
        "module": "PAYMENT",
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
        "name": "Confirm webhook",
        "apiPath": "/api/v1/payment/confirm-webhook",
        "method": "POST",
        "module": "PAYMENT",
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
        "name": "Receive webhook",
        "apiPath": "/api/v1/payment/receive-webhook",
        "method": "POST",
        "module": "PAYMENT",
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
        "name": "Check is prenium",
        "apiPath": "/api/v1/payment/check/:orderId",
        "method": "GET",
        "module": "PAYMENT",
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
        "name": "Logout User",
        "apiPath": "/api/v1/auth/logout",
        "method": "POST",
        "module": "AUTH",
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
        "name": "Check code verify user",
        "apiPath": "/api/v1/auth/verify/code",
        "method": "POST",
        "module": "AUTH",
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
        "name": "Resend the verification code",
        "apiPath": "/api/v1/auth/resend",
        "method": "GET",
        "module": "AUTH",
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
]

export const INIT_GENRES = [
    {
        "_id": "66840a59602571c17bbb2f6d",
        "name": "Ballad",
        "description": "It is a genre of music with gentle, deep melodies and lyrics that often carry content about love, life and human thoughts and feelings. Ballad music is often expressed through the singer's inspiring and emotional singing.",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
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
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-02T14:10:44.978Z",
        "updatedAt": "2024-07-02T14:10:44.978Z",
        "__v": 0
    },
    {
        "_id": "668d4767aac7e1fbdc5b0fc9",
        "name": "Electronic",
        "description": "The tag 'electronic' is a broad term that can be used to describe a wide variety of music that is produced using electronic instruments and technology. ",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T14:21:27.090Z",
        "updatedAt": "2024-07-09T14:21:27.090Z",
        "__v": 0
    }
]

export const INIT_TRACKS = [
    {
        "_id": "6684189971843975cf6b45df",
        "title": "Chạm Khẽ Tim Anh Một Chút Thôi",
        "description": "...",
        "photo": "ChạmKhẽTimAnhMộtChútThôi-NooPhướcThịnh-1719931876123.jpg",
        "url": "ChạmKhẽTimAnhMộtChútThôi-NooPhướcThịnh-1719932984950.mp3",
        "user": "6684c50ca995464eae29594b",
        "genre": "66840a64602571c17bbb2f74",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "view": 6,
        "like": 0,
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-02T15:11:21.511Z",
        "updatedAt": "2024-07-02T15:11:21.511Z",
        "__v": 0
    },
    {
        "_id": "6684fe9ac52d5614696bd9ab",
        "title": "Chiec Khan Gio Am - Tien Cookie",
        "description": "...",
        "photo": "chieckhangioam-1719991828905.jpg",
        "url": "ChiecKhanGioAm-TienCookie-1719991622856.mp3",
        "user": "6684c50ca995464eae29594b",
        "genre": "66840a64602571c17bbb2f74",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-03T07:32:42.415Z",
        "updatedAt": "2024-07-03T07:32:42.415Z",
        "__v": 0,
        "view": 5,
        "like": 0
    },
    {
        "_id": "66850079c52d5614696bd9ba",
        "title": "Nắm Đôi Bàn Tay - Kay Trần",
        "description": "...",
        "photo": "namlaydoibantay-1719992176783.jpg",
        "url": "NắmĐôiBànTay-KayTrần-1719992143451.mp3",
        "user": "6684c50ca995464eae29594b",
        "genre": "66840a64602571c17bbb2f74",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-03T07:40:41.968Z",
        "updatedAt": "2024-07-03T07:40:41.968Z",
        "__v": 0,
        "like": 0,
        "view": 4
    },
    {
        "_id": "6685026ec52d5614696bd9c9",
        "title": "Khi Người Mình Yêu Khóc - Phan Mạnh Quỳnh",
        "description": "...",
        "photo": "KhiNguoiYeuMinhKhoc-1719992815618.jpg",
        "url": "KhiNgườiMìnhYêuKhóc-PhanMạnhQuỳnh-1719992745413.mp3",
        "user": "6684c50ca995464eae29594b",
        "genre": "66840a64602571c17bbb2f74",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-03T07:49:02.644Z",
        "updatedAt": "2024-07-03T07:49:02.644Z",
        "__v": 0,
        "like": 0,
        "view": 3
    },
    {
        "_id": "66850447c52d5614696bd9d8",
        "title": "Chạm Làn Môi Em - Andree, Hoàng Tôn, Tinle",
        "description": "...",
        "photo": "ChạmLànMôiEm-1719993221829.jpg",
        "url": "ChạmLànMôiEm-Andree,HoàngTôn,Tinle-1719993154066.mp3",
        "user": "6684c50ca995464eae29594b",
        "genre": "66840a64602571c17bbb2f74",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-03T07:56:55.757Z",
        "updatedAt": "2024-07-03T07:56:55.757Z",
        "__v": 0,
        "like": 0,
        "view": 2
    },
    {
        "_id": "66850559c52d5614696bd9e7",
        "title": "Happy Ending - ERIK",
        "description": "...",
        "photo": "HappyEnding-1719993576124.jpg",
        "url": "HappyEnding-ERIK-1719993592546.mp3",
        "user": "6684c50ca995464eae29594b",
        "genre": "66840a64602571c17bbb2f74",
        "createdBy": {
            "_id": "6684c50ca995464eae29594b",
            "email": "admin@gmail.com",
            "name": "I'm admin"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-03T08:01:29.493Z",
        "updatedAt": "2024-07-03T08:01:29.493Z",
        "__v": 0,
        "like": 0,
        "view": 1
    },
    {
        "title": "BRODYAGA FUNK",
        "description": "...",
        "photo": "car-1720536809245.jpg",
        "like": 0,
        "view": 0,
        "url": "BRODYAGAFUNK-1720536791202.mp3",
        "user": "668cf8ff5e7d98319807efcf",
        "genre": "668d4767aac7e1fbdc5b0fc9",
        "createdBy": {
            "_id": "668cf8ff5e7d98319807efcf",
            "email": "user1@gmail.com",
            "name": "I'm user 1"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T14:53:32.907Z",
        "updatedAt": "2024-07-09T14:53:32.907Z",
        "__v": 0
    },
    {
        "_id": "668d503ff2d0996a1de5198c",
        "title": "Artemas I Like The Way You Kiss Me",
        "description": "...",
        "photo": "kiss-1720537137548.jpg",
        "like": 0,
        "view": 0,
        "url": "ArtemasILikeTheWayYouKissMe-1720537131658.mp3",
        "user": "668cf8ff5e7d98319807efcf",
        "genre": "668d4767aac7e1fbdc5b0fc9",
        "createdBy": {
            "_id": "668cf8ff5e7d98319807efcf",
            "email": "user1@gmail.com",
            "name": "I'm user 1"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T14:59:11.150Z",
        "updatedAt": "2024-07-09T14:59:11.150Z",
        "__v": 0
    },
    {
        "_id": "668d5b24fec3c90e0cce16e0",
        "title": "Kill Eva, ENCASSATOR - Psycho Dreams",
        "description": "...",
        "photo": "sexxy-1720539926472.jpg",
        "like": 1,
        "view": 1,
        "url": "KillEva,ENCASSATOR-PsychoDreams-1720539920155.mp3",
        "user": "668cf8ff5e7d98319807efcf",
        "genre": "668d4767aac7e1fbdc5b0fc9",
        "createdBy": {
            "_id": "668cf8ff5e7d98319807efcf",
            "email": "user1@gmail.com",
            "name": "I'm user 1"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T15:45:40.635Z",
        "updatedAt": "2024-07-09T15:56:42.252Z",
        "__v": 0
    },
    {
        "_id": "668d5c48fec3c90e0cce172c",
        "title": "FLOKI, ЭВСЭ - Ворую",
        "description": "...",
        "photo": "flo-1720540203162.jpg",
        "like": 0,
        "view": 0,
        "url": "FLOKI-1720540182288.mp3",
        "user": "668cf8ff5e7d98319807efcf",
        "genre": "668d4767aac7e1fbdc5b0fc9",
        "createdBy": {
            "_id": "668cf8ff5e7d98319807efcf",
            "email": "user1@gmail.com",
            "name": "I'm user 1"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T15:50:32.507Z",
        "updatedAt": "2024-07-09T15:50:32.507Z",
        "__v": 0
    },
    {
        "_id": "668d5ceffec3c90e0cce1743",
        "title": "Shugz - King Of My Castle",
        "description": "...",
        "photo": "cass-1720540398125.jpg",
        "like": 0,
        "view": 0,
        "url": "Shugz-KingOfMyCastle-1720540374793.mp3",
        "user": "668cf8ff5e7d98319807efcf",
        "genre": "668d4767aac7e1fbdc5b0fc9",
        "createdBy": {
            "_id": "668cf8ff5e7d98319807efcf",
            "email": "user1@gmail.com",
            "name": "I'm user 1"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T15:53:19.554Z",
        "updatedAt": "2024-07-09T15:53:19.554Z",
        "__v": 0
    },
    {
        "_id": "668d5d4ffec3c90e0cce175a",
        "title": "The Living Tombstone - My Ordinary Life",
        "description": "...",
        "photo": "bear-1720540481962.jpg",
        "like": 0,
        "view": 0,
        "url": "TheLivingTombstone-MyOrdinaryLife-1720540476126.mp3",
        "user": "668cf8ff5e7d98319807efcf",
        "genre": "668d4767aac7e1fbdc5b0fc9",
        "createdBy": {
            "_id": "668cf8ff5e7d98319807efcf",
            "email": "user1@gmail.com",
            "name": "I'm user 1"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2024-07-09T15:54:55.801Z",
        "updatedAt": "2024-07-09T15:54:55.801Z",
        "__v": 0
    }
]
