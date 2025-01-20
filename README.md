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

1.  Backend: Node.js, Express.js, TypeScript
2.  DataBase: MongoDB and Mongoose
3.  Tools: cloudinary, Zod, EsLint

## Check API Endpoint

### Authentication

**Create Account: (POST)**
`/api/auth/register` <br>
**Request Body:**

```
{
    "name": "name",
    "email": "example@gmail.com",
    "password": "Example1234",
    "confirmPassword": "Example1234"
}
```

**Login Account: (POST)**
`/api/auth/login` <br>
**Request Body:**

```
{
    "email": "texample@gmail.com",
    "password": "Example1234"
}
```

**Change Password: (POST)**
`/api/auth/cnahge-password` <br>
**Request Body:**

```
{
    "oldPassword": "Shahin123",
    "newPassword": "Shahin001",
    "confirmPassword": "Shahin001"
}
```

**Delete Account: (DELETE)**
`/api/auth/delete-account` <br>

### Account

**Account Status: (GET)**
`/api/accounts/status` <br>

**Recent Added Data: (GET)**
`/api/accounts/recent-data` <br>

**Favorite Data: (GET)**
`/api/accounts/favorite` <br>

**Filter By Date: (GET)**
`/api/accounts/data?` <br>
Query Parameters Example: `/api/accounts/data?date=2025-01-18` <br>

### Folder

**Create Folder: (POST)**
`/api/folders/create-folder` <br>
**Request Body:**

```
{
    "name": "New Folder"
}
```

**Rename Folder: (POST)**
`/api/folders/:id` <br>
**Request Body:**

```
{
    "name": "My Folder"
}
```

**API For Get All(GET), Get Single(GET), Make Favorite(PATCH), Delete(DELETE), Duplicate(POST)** <br>

(GET): `/api/folders` <br>
(GET): `/api/folders/:id` <br>
(PATCH): `/api/folders/make-favorite/:id` <br>
(DELETE): `/api/folders/:id` <br>
(POST): `/api/folders/duplicate/:id` <br>

### File

**Upload Image: (POST)**
`/api/files/upload-img` <br>

<span style="color:red;">For testing purpuse send JPG/PNG file from Postman (Key: file, Type: File)</span>

**Request Body:** <span style="color:red;">(Key: data, Type: Text)</span>

```
{
    "name": "New Image",
    "folderId": "678e0a8f3cb41ed26ba26e73"
}
```

**Upload PDF: (POST)**
`/api/files/upload-pdf` <br>

<span style="color:red;">For testing purpuse send PDF file from Postman (Key: file, Type: File)</span>

**Request Body:** <span style="color:red;">(Key: data, Type: Text)</span>

```
{
    "name": "New pdf",
    "folderId": "678e0a8f3cb41ed26ba26e73"
}
```

**Upload Document: (POST)**
`/api/files/upload-doc` <br>

<span style="color:red;">For testing purpuse send docx file from Postman (Key: file, Type: File)</span>

**Request Body:** <span style="color:red;">(Key: data, Type: Text)</span>

```
{
    "name": "New pdf",
    "folderId": "678e0a8f3cb41ed26ba26e73"
}
```

**Rename File: (POST)**
`/api/files/:id` <br>
**Request Body:**

```
{
    "name": "My Image"
}
```

**Get All File By Type (img, pdf, docx): (POST)**
`/api/files?` <br>
Query Parameters Example: `/api/files?type=img` <br>

**API For Get Single(GET), Make Favorite(PATCH), Delete(DELETE), Duplicate(POST)** <br>

(GET): `/api/files/:id` <br>
(PATCH): `/api/files/make-favorite/:id` <br>
(DELETE): `/api/files/:id` <br>
(POST): `/api/files/duplicate/:id` <br>

## Project Set-Up Instructions

#### 1. Clone the Repository

```
https://github.com/shahinexy/Storage-Management-System.git
```

#### 2. Install Dependencies

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
CLOUDINARY_CLOUD_NAME=dwuq.....
CLOUDINARY_API_KEY=144732.....
CLOUDINARY_API_SECRET=l0EN5_eyA5.....
```

#### 4. Run the server in development mode

```
npm run dev
```
