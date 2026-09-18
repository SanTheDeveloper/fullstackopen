# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It provides the backend services required by the React frontend, including user management, JWT authentication, note CRUD operations, middleware processing, MongoDB persistence, and automated testing.

## 🧠 Architectural Concepts & Features

### 🔐 User Administration & Authentication

- Manages user creation and authentication.
- Hashes passwords securely using `bcrypt`.
- Uses `jsonwebtoken` (JWT) for stateless token-based authentication.
- Protects authenticated operations through HTTP `Authorization: Bearer <token>` headers.
- Identifies the authenticated user through custom authentication middleware.

### 🔗 User-Note Relationships

Notes are associated with their creators through Mongoose ObjectId references.

Mongoose `populate()` is used when related user information needs to be resolved across collections.

### 🧩 Modular Routing

API functionality is separated into dedicated controller modules:

```text
controllers/
├── notes.js
├── users.js
└── login.js
````

Express Router is used to keep route definitions modular and maintain a clean root application.

### 🔄 RESTful API

The backend provides RESTful operations for note and user resources.

The Notes API supports:

* Retrieving notes
* Creating notes
* Updating note importance
* Deleting notes

Authenticated requests are protected through the custom authentication middleware.

### 🧪 Automated Testing

The backend uses:

* `node:test`
* `supertest`

The test environment uses a dedicated MongoDB database.

Tests cover API behavior, response status codes, authentication, validation, and application functionality.

### 🌍 Environment Management

The application supports separate development, test, and production environments.

`cross-env` and environment variables are used to select the appropriate runtime configuration and MongoDB connection settings.

### ⚡ Async/Await & Express 5

Route controllers use `async/await` syntax.

The application takes advantage of Express 5's automatic propagation of rejected promises to the centralized error-handling middleware.

### 🧱 Separation of Concerns

The Express application configuration is separated from the network listener:

```text
app.js    → application configuration
index.js  → server startup
```

This allows the application to be imported independently for testing.

## 🛡️ Middleware Pipeline

The backend uses middleware for:

* JSON request body parsing
* Authentication
* Request logging
* Unknown endpoint handling
* Centralized error handling

Custom middleware includes:

* Token extraction
* User extraction
* Request logging
* Unknown endpoint handling
* Centralized error handling

### 🚨 Centralized Error Handling

The backend handles common application and database errors including:

* `CastError`
* `ValidationError`
* `MongoServerError` duplicate-key errors
* `JsonWebTokenError`
* `TokenExpiredError`

Errors are converted into standardized HTTP responses.

## 📁 Directory Structure

```text
backend/
├── controllers/
│   ├── login.js
│   ├── notes.js
│   └── users.js
│
├── models/
│   ├── note.js
│   └── user.js
│
├── tests/
│   └── ...
│
├── utils/
│   ├── config.js
│   ├── logger.js
│   ├── middleware.js
│   └── ...
│
├── app.js
├── index.js
└── mongo.js
```

## 🚀 Tech Stack

* Node.js
* Express.js 5
* MongoDB Atlas
* Mongoose
* bcrypt
* jsonwebtoken
* node:test
* supertest
* ESLint
* cross-env
* dotenv

## 🛠️ How to Run Locally

### 1. Configure environment variables

Create a `.env` file in the backend root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../noteApp
TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../testNoteApp
SECRET=your_super_secret_cryptographic_key
PORT=3001
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the automated test suite

```bash
npm run test
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Seed the database

Use the database utility when sample data needs to be created:

```bash
node mongo.js
```
