# Store Management System

It's a backend for a file management platform where users can upload, organize, and manage their files. It allows users to create folders, mark files as favorites, and filter or sort them based on various criteria. The system includes secure authentication and handles file storage in Cloudinary. The backend offers endpoints for interacting with files and folders, and supports actions like duplicating, deleting, and filtering files.

**Live Server Link:** https://storage-management-system-rose.vercel.app/

## Key Features

- **Authentication/Authorization:**
  - Secure login and authentication using JWT tokens.
  - Only logged-in users can perform write, update, and delete operations.
  - Authorization mechanisms ensure users can only modify their own content.

- **Folder/File Operations:**
  - Users can create, update, and delete their own folders/Files.
  - Files can be organized into specific folders, and each file is linked to a folder. 
  - Each file is associated with metadata such as name, type (e.g., image, PDF), path, and favorite status. This metadata is accessible for sorting, filtering, and retrieving files.
  - Users can duplicate their own files while maintaining the original file's metadata, ensuring users have backup copies if needed.
  - All file operations are subject to role-based access control, ensuring that users can only perform actions on their own files or folders.

- **Account Operations:**
  - Users can register and log in securely, with role-based access ensuring only authorized users can perform actions on their accounts.
  - Users can create, update, delete, and organize their files and folders, with options to mark favorites and filter content by date.

- **Security:**
  - Sensitive data (e.g., passwords) is securely stored with encryption.
  - Validation checks prevent unauthorized or malicious actions.

## Technology used
 1. Backend: Node.js, Express.js, TypeScript
 2. DataBase: MongoDB and Mongoose
 3. Tools: cloudinary, Zod, EsLint

## Project Set-Up Instructions 

#### 1. Clone the Repository
```
https://github.com/shahinexy/Storage-Management-System.git
```

#### 2.  Install Dependencies
```
npm install 
```
#### 3. Set up Environment variables create an .env file in the root directory and include the following
```
NODE_ENV= development
PORT=3000
DATABASE_URL=mongodb://localhost:27017
BCRYPT_SALT_ROUND=10
JWT_ACCESS_SECRET=d2831ef014e61bc2b2dff99......
JWT_REFRESH_SECRET=2fd0502b8531b16f74be87......
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
```
#### 4. Run the server in development mode
```
npm run dev 
```
