# Sound Cloud Clone Frontend

This project is a frontend implementation for a Sound Cloud Clone, built using Next.js. The frontend provides a range of functionalities, including user authentication, track listening, playlist creation, track uploads, likes, follows, comments, and payment integration for account upgrades.  
You can visit the website here: [https://fe-next-js-sound-cloud-clone.vercel.app/](https://fe-next-js-sound-cloud-clone.vercel.app/) 

## Tech Stack
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

## Features

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



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/sound-cloud-clone-fe.git
   cd sound-cloud-clone-fe
   npm install

2. Set up environment variables:
Create a .env file in the root directory.
Add the necessary environment variables as shown in the .env.development file.
    ```bash
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8005/api/v1/
    NEXT_PUBLIC_BACKEND_PUBLIC=http://localhost:8005/images/
    GITHUB_ID=
    GITHUB_SECRET=
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=
    MY_SECRET_TOKEN=
    GOOGLE_ID=
    GOOGLE_SECRET=
    TOKEN_EXPIRE_NUMBER=86000
    TOKEN_EXPIRE_UNIT=seconds
    NEXT_PUBLIC_FRONTEND_PUBLIC=http://localhost:3000/

## Usage

1. Start the development server:
   ```bash
   npm run dev

2. Build the project:
   ```bash
   npm run build

3. Start the production server:
   ```bash
   npm start

## Dependencies
   ```bash
   @emotion/cache: 11.11.0  
   @emotion/react: 11.11.1  
   @emotion/styled: 11.11.0  
   @mui/icons-material: 5.14.7  
   @mui/material: 5.14.7  
   @wavesurfer/react: 1.0.5  
   axios: 1.5.0  
   dayjs: 1.11.10  
   lottie-react: 2.4.0  
   next: 13.4.19  
   next-auth: 4.23.1  
   next-nprogress-bar: 2.1.2  
   npm-check-updates: 16.14.20  
   payos-checkout: 1.0.7  
   query-string: 8.1.0  
   react: 18.2.0  
   react-dom: 18.2.0  
   react-dropzone: 14.2.3  
   react-h5-audio-player: 3.8.6  
   react-slick: 0.29.0  
   sass: 1.67.0  
   sharp: 0.33.3  
   slick-carousel: 1.8.1  
   slugify: 1.6.6  
   wavesurfer.js: 7.3.1  
