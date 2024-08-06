# Sound Cloud Clone

This project is a full-stack implementation of a Sound Cloud Clone, built using NestJS for the backend and Next.js for the frontend. Below are the key features and technologies used in both parts of the project.

## I. Backend

### Repository

- [https://github.com/TranDatk/SoundCloudClone/tree/main/BE-NestJS-SoundCloudClone](https://github.com/TranDatk/SoundCloudClone/tree/main/BE-NestJS-SoundCloudClone)

### Features

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

### Tech Stack
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
- **Node Mailer**: For sending email confirmations.
- **PayOS**: For payment processing integration.
- **MongoDB - Mongoose**: A library that creates a connection between MongoDB and the Node.js.
- **Swagger**: For API documentation.
- **Multer**: Middleware for handling `multipart/form-data`, used for file uploads.




## II. Frontend

### Repository
- [https://github.com/TranDatk/SoundCloudClone/tree/main/FE-NextJS-SoundCloudClone-](https://github.com/TranDatk/SoundCloudClone/tree/main/FE-NextJS-SoundCloudClone-)

### Features

1. **User Authentication and Account Management**:
   - Login, register, and email account confirmation using a code sent to the user's email (powered by NextAuth.js).
     ![image](https://github.com/user-attachments/assets/d38f8a3b-2293-4575-bd4b-165cf52441a7)


2. **Track Management**:
   - Listen to tracks.
   - Like tracks.
   - Follow track creators.
   - Comment on tracks.
    ![image](https://github.com/user-attachments/assets/6f0961a0-5838-47d1-9478-d25f23bf535e)

   - Create playlists of tracks.
     ![image](https://github.com/user-attachments/assets/e08d6d4c-5f0d-4ea7-a8a6-50734bffc152)

   - Upload new tracks.
     ![image](https://github.com/user-attachments/assets/6e6dfd87-cdbe-4199-800d-5f44cdb515f8)

   - View liked tracks and created tracks.
     ![image](https://github.com/user-attachments/assets/85f7b779-b3d8-4e42-870d-c672c908e81d)

   - Upgrade account with integrated PayOS payment processing.
      ![image](https://github.com/user-attachments/assets/e88bcf8c-9fea-4779-9a86-feea5fcd8018)
      ![image](https://github.com/user-attachments/assets/ae6f5792-ed20-4c89-9024-d9563ac72dc7)
      ![image](https://github.com/user-attachments/assets/3581574e-41e4-4d4e-b6af-42a089d86ee2)

### Tech Stack
![nextjs](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721310868/nextjs_icon_213852_moczzw.png) 
![react](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721311149/react_original_logo_icon_146374_tnrsqb.png) 
![ts](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721302534/typescript_original_logo_icon_146317_izensp.png) 
![mui](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721311323/mui_logo_icon_248416_ejcuwr.png) 
![next auth](https://res.cloudinary.com/dcyzg2k36/image/upload/v1721311479/logo-sm_1_z81qmp.png) 
- **Next.js**: A React framework for server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Material-UI (MUI)**: A popular React UI framework.
- **NextAuth.js**: Authentication for Next.js.
- **Wavesurfer.js**: Navigate and manipulate audio waveforms.
- **PayOS**: Payment processing integration.
