# 📚 Blog List - Backend API

This is the Express.js REST API for the Blog List application. It provides the backend services required by the React frontend, including user management, JWT authentication, blog CRUD operations, authorization, MongoDB persistence, and automated testing.

## 🧠 Architectural Concepts & Features

### 🔐 Authentication & Authorization

- Creates and manages users.
- Hashes passwords securely using `bcrypt`.
- Uses `jsonwebtoken` for stateless JWT authentication.
- Extracts and verifies bearer tokens through custom middleware.
- Associates newly created blogs with the authenticated user.
- Protects blog deletion so that only the creator can delete their blog.

Protected requests use:

```text
Authorization: Bearer <token>
```

### 🔗 User-Blog Relationships

Blogs store a reference to the user who created them using a MongoDB ObjectId.

Mongoose `populate()` is used to resolve the referenced user when returning blog data.

For example:

```js
Blog.find({}).populate("user", {
  username: 1,
  name: 1,
});
```

The `PUT` operation also populates the user information before returning the updated blog to the frontend.

### 🧩 Modular Routing

The API is divided into dedicated controller modules:

```text
controllers/
├── blogs.js
├── users.js
└── login.js
```

Each controller contains its related Express Router definitions.

### 🔄 Blog CRUD Operations

The backend provides:

- `GET /api/blogs`
- `POST /api/blogs`
- `PUT /api/blogs/:id`
- `DELETE /api/blogs/:id`

Blog creation requires authentication.

Blog deletion requires authentication and verifies that the authenticated user is the creator of the blog.

The `PUT` endpoint is used by the frontend for blog updates such as increasing likes and returns the updated blog with its populated user information.

### 🧪 Automated Testing

The backend uses:

- Native `node:test`
- `supertest`

The test suite includes:

- Blog array calculation tests
- API integration tests
- HTTP status code verification
- Response body validation
- User administration tests
- Authentication and authorization checks
- CRUD endpoint testing
- Database cleanup and test data initialization

The tests run against a dedicated test database.

### 🗄️ MongoDB & Mongoose

MongoDB Atlas is used for persistent application data.

Mongoose provides:

- Schema definitions
- Validation
- Default values
- Unique constraints
- ObjectId references
- Document population

The database contains related `User` and `Blog` documents connected through Mongoose references.

### ⚙️ Environment Management

Environment variables are used to configure:

- Development MongoDB URI
- Test MongoDB URI
- JWT secret
- Server port

Sensitive configuration is stored in `.env`.

### 🚨 Error Handling

The backend contains centralized handling for common application and database errors, including:

- `CastError`
- `ValidationError`
- MongoDB duplicate-key errors
- `JsonWebTokenError`
- `TokenExpiredError`

Unknown routes are handled by a dedicated `unknownEndpoint` middleware.

### 🪵 Logging

Application logging is centralized through:

```text
utils/logger.js
```

This keeps logging behavior consistent across the application.

## 🛡️ Middleware Pipeline

The backend uses middleware for:

- JSON body parsing
- CORS handling
- Token extraction
- User extraction
- Request logging
- Unknown endpoint handling
- Centralized error handling

Authentication middleware identifies the currently authenticated user from the JWT and makes that user available to protected route handlers.

## 📁 Directory Structure

```text
backend/
├── controllers/
│   ├── blogs.js
│   ├── users.js
│   └── login.js
│
├── models/
│   ├── blog.js
│   └── user.js
│
├── tests/
│   └── ...
│
├── utils/
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
│
├── app.js
├── index.js
└── mongo.js
```

## 🚀 Tech Stack

- Node.js
- Express.js 5
- MongoDB Atlas
- Mongoose
- bcrypt
- jsonwebtoken
- node:test
- supertest
- ESLint
- dotenv

## 🛠️ How to Run Locally

### 1. Configure environment variables

Create a `.env` file in the backend root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../bloglistApp
TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../testBloglistApp
SECRET=your_super_secret_cryptographic_key
PORT=3003
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Run the automated test suite

```bash
npm run test
```

### 5. Seed the database

```bash
node mongo.js
```
