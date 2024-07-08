# User Management API

This project is a User Management API built with NestJS. It includes user CRUD operations, user authentication using Passport JWT, file uploads for user images, and user role-based permissions.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Permissions and Roles](#permissions-and-roles)
- [File Uploads](#file-uploads)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   https://github.com/TranDatk/nestJS-UserManagement.git
   cd nestJS-UserManagement.git

2. Install the dependencies:
   ```bash
      npm install

## Environment Variables
1. Create a .env file in the root directory and add the following variables:
   ```bash
      PORT=8005
      MONGO_URL=
      NODE_ENV=dev
      
      #SET UP ACCESS TOKEN
      JWT_ACCESS_TOKEN_SECRET=
      JWT_ACCESS_TOKEN_EXPIRE=1d
      
      #SET UP REFRESH TOKEN
      JWT_REFRESH_TOKEN_SECRET=
      JWT_REFRESH_TOKEN_EXPIRE=1d
      
      #ADMIN EMAIL
      ADMIN_EMAIL=admin@gmail.com
      
      #FLAG TO AUTO GENERATE DATABASE
      SHOULD_INIT=true
      INIT_PASSWORD=

## Running the Application
1. Start the development server:
   ```bash
      npm run dev

2. The application will be running at http://localhost:8005

## Endpoints

1. User CRUD Operations
* POST api/v1/users - Create a new user
* GET api/v1/users - Get all users
* GET api/v1/users/:id - Get a user by ID
* PATCH api/v1/users/:id - Update a user by ID
* DELETE api/v1/users/:id - Delete a user by ID

2. Authentication
* POST api/v1/auth/login - Authenticate user and get a JWT token
* GET api/v1/auth/account - Get user profile
* POST api/v1/auth/register - Register a new user
* GET api/v1/auth/refresh - Get user by refresh token
* POST api/v1/auth/logout - Logout user

3. File Uploads
* POST /users/:id/upload - Upload a profile picture for a user
* GET api/v1/files - Get all files
* GET api/v1/files/:id - Get a files by ID
* PATCH api/v1/files/:id - Update a files by ID
* DELETE api/v1/files/:id - Delete a files by ID

4. Permissions
* POST api/v1/permissons - Create a new permisson
* GET api/v1/permissons - Get all permissons
* GET api/v1/permissons/:id - Get a permisson by ID
* PATCH api/v1/permissons/:id - Update a permisson by ID
* DELETE api/v1/permissons/:id - Delete a permisson by ID
  
5. Roles
* POST api/v1/roles - Create a new role
* GET api/v1/roles - Get all roles
* GET api/v1/roles/:id - Get a role by ID
* PATCH api/v1/roles/:id - Update a role by ID
* DELETE api/v1/roles/:id - Delete a role by ID

## Authentication
The application uses Passport JWT for authentication. To authenticate, send a POST request to /auth/login with the user's credentials. The response will include a JWT token which should be included in the Authorization header of subsequent requests.
1. Example request:
   ```bash
      curl -X POST http://localhost:3000/auth/login \
      -H 'Content-Type: application/json' \
      -d '{"username": "example", "password": "password"}'
2. Example response:
   ```bash
      {
        "statusCode": 201,
        "message": "User login",
        "data": {
            "access_token": "",
            "refresh_token": "",
         "user": {
                "_id": "",
                "name": "I'm user",
                "email": "user@gmail.com",
                "role": {
                    "_id": "",
                    "name": ""
                },
                "permissions": []
            }
        }
     }
3. Include the token in the Authorization header of subsequent requests:
   ```bash
      Authorization: Bearer your_jwt_token

## Permissions and Roles
Users have roles and permissions that define their access to certain resources. The roles and permissions are managed in the code and can be updated as needed.

1. Example roles:
* SUPER_ADMIN
* NORMAL_USER

2. Example permissions:
* create:user
* get:user
* update:user
* delete:user

# File Uploads
Users can upload profile pictures using the api/v1/files/upload endpoint. The files are stored in the public folder.
1. Example request
   ```bash
      curl -X POST http://localhost:3000/api/v1/files/upload \
      -H 'Authorization: Bearer your_jwt_token' \
      -F 'file=@/path/to/your/file.jpg'
