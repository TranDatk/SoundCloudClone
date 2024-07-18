# SOUND CLOUD CLONE

This project is a backend implementation for a Sound Cloud Clone, built using NestJS. The backend provides a range of functionalities, including authentication, user registration, email confirmation, payment integration, role-based access control, file uploads, and various APIs for Sound Cloud functionalities.
You can use my Backend here: [https://soundcloudclone-nest.onrender.com/](https://soundcloudclone-nest.onrender.com/swagger)

## Tech Stack
![nest](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721302282/nestjs_logo_icon_168087_wkjoa8.png) 
![ts](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721302534/typescript_original_logo_icon_146317_izensp.png) 
![passport](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721306764/passport_logo_icon_248891_spnxpl.png) 
![node mailer](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721306991/16486629_1_ltkprh.png)
![mongoDB](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721307166/file_type_mongo_icon_130383_txrpvl.png)
![swagger](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721307250/file_type_swagger_icon_130134_pupiea.png) 

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **JWT (JSON Web Tokens)**: For stateless authentication.
- **Passport**: Authentication middleware for Node.js.
  - **Passport-GitHub**: For GitHub login.
  - **Passport-Google-OAuth20**: For Google login.
- **Node Mailer**: For sending email confirmations.
- **PayOS**: For payment processing integration.
- **MongoDB - Mongoose**: A library that creates a connection between MongoDB and the Node.js.
- **Swagger**: For API documentation.
- **Multer**: Middleware for handling `multipart/form-data`, used for file uploads.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Permissions and Roles](#permissions-and-roles)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TranDatk/BE-NestJS-SoundCloudClone.git
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
      ADMIN_EMAIL=
      
      #FLAG TO AUTO GENERATE DATABASE
      SHOULD_INIT=true
      INIT_PASSWORD=
      
      #CONFIG EMAIL
      SENDER_EMAIL=
      PASSWORD_EMAIL=
      HOST_EMAIL=smtp.gmail.com
      EMAIL_PREVIEW=false
      
      RENDER_BE=
      
      GITHUB_CLIENT_ID=
      GITHUB_CLIENT_SECRET=
      
      GITHUB_URL_CALLBACK=
      
      #PAYMENT
      PAYOS_CLIENT_ID=
      PAYOS_API_KEY=
      PAYOS_CHECKSUM_KEY=

## Features

1. **User Authentication**:
   - Login using credentials (JWT - stateless)
   - Login with GitHub and Google (Powered by Passport)

2. **User Registration and Email Confirmation**:
   - User registration
   - Send email confirmation (Powered by Node Mailer)

3. **Logout**:
   - Stateless logout functionality

4. **Payment Integration**:
   - Integration with PayOS for payment processing

5. **Role-based Access Control**:
   - Implement user roles and permissions

6. **File Upload**:
   - File upload functionality

7. **Cron job**:
   - Automatically email tracks that users have followed

8. **Sound Cloud APIs**:
   - Provide various APIs for Sound Cloud functionalities: Auth, User, Track, Like, Comment, Follow, Genre, Payment, Role, Permission, File. 

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
* POST api/v1/auth/social-media - Login with third party
* POST api/v1/auth/verify - Check is verify user
* POST api/v1/auth/verify/code - Check verification code
* GET api/v1/auth/resend - Resend the verification code

3. Payment
* POST api/v1/payment/create - Create a payment
* GET api/v1/payment/:orderId - Get a order
* PUT api/v1/payment/:orderId - Cancel a order
* POST api/v1/payment/receive-webhook - Receive webhook
* GET api/v1/payment/check/:orderId - Check is prenium

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

6. Tracks
* POST api/v1/tracks - Create a new track
* GET api/v1/tracks - Get all tracks with paginate
* GET api/v1/tracks/user-track - Fetch list user track with paginate
* POST api/v1/tracks/top - Fetch top track by genre
* GET api/v1/tracks/:id - Fetch track by ID
* PATCH api/v1/tracks/:id - Update track by ID
* DELETE api/v1/tracks/:id - Remove track by ID
* GET api/v1/tracks/audio/:id - Get audio from track ID
* POST api/v1/tracks/search - Fetch tracks by search
* POST api/v1/tracks/increase-view - Increase view for track

7. Playlists
* POST api/v1/playlists - Create a playlist
* GET api/v1/playlists - Fetch list playlist with paginate
* PATCH api/v1/playlists/:id - Update playlist by ID

8. Likes
* POST api/v1/likes - Create a new like or negate the one is existed
* GET api/v1/likes - Fetch list like of user with paginate
* GET api/v1/likes/check/:id - Check if the user liked the track

9. Followers
* POST api/v1/followers - Create a new follower
* GET api/v1/followers - Fetch list follower with paginate
* GET api/v1/followers/:id - Check if the user is followed

10. Files
* POST api/v1/files/upload - Upload single file

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
               "avatar": "avatar.png",
               "type": "CREDENTIAL",
               "isVerify": true
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

