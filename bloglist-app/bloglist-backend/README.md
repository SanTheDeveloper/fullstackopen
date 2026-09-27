# ⚙️ Blog List - Backend API

This is the Express.js REST API that powers the Blog List application from the Full Stack Open curriculum.

It provides the backend services required by the React frontend, including user management, JWT authentication, blog CRUD operations, middleware processing, MongoDB persistence, automated testing, and support for Playwright end-to-end test initialization.

## 🧠 Architectural Concepts & Features

### 🔐 User Administration & Authentication

- Manages user creation and authentication.
- Hashes passwords securely using `bcrypt`.
- Uses `jsonwebtoken` (JWT) for stateless token-based authentication.
- Protects authenticated operations through HTTP `Authorization: Bearer <token>` headers.
- Identifies the authenticated user through custom authentication middleware.

### 🔗 User-Blog Relationships

Blogs are associated with their creators through Mongoose ObjectId references.

Mongoose `populate()` is used when related user information needs to be resolved across collections.

Blog responses expose the associated user's `username` and `name` where user information is required by the frontend.

### 🧩 Modular Routing

API functionality is separated into dedicated controller modules:

```text
controllers/
├── blogs.js
├── users.js
├── login.js
└── testing.js
```

Express Router is used to keep route definitions modular and maintain a clean root application.

### 🔄 RESTful API

The backend provides RESTful operations for blog and user resources.

The Blog List API supports:

- Retrieving blogs
- Creating blogs
- Updating blogs
- Deleting blogs

Authenticated operations are protected through the custom authentication middleware.

### 🧪 Automated Testing

The backend uses:

- `node:test`
- `supertest`

The test environment uses a dedicated MongoDB database.

Backend tests cover API behavior, response status codes, authentication, validation, and application functionality.

### 🌍 Environment Management

The application supports separate development, test, and production environments.

`cross-env` and environment variables are used to select the appropriate runtime configuration and MongoDB connection settings.

The backend can be started specifically in test mode with:

```bash
npm run start:test
```

This starts the server with:

```text
NODE_ENV=test
```

### 🌐 End-to-End Test Support

The backend provides a test-only API endpoint for initializing the database used by the Playwright end-to-end test suite.

The testing router is mounted only when the backend runs in test mode:

```js
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
```

This makes the reset endpoint available only in the test environment.

The endpoint is:

```text
POST /api/testing/reset
```

It clears the test database by removing all blogs and users.

The endpoint returns:

```text
204 No Content
```

The E2E test suite uses this endpoint to establish a predictable database state before tests are executed.

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

- JSON request body parsing
- Authentication
- Request logging
- Unknown endpoint handling
- Centralized error handling

Custom middleware includes:

- Token extraction
- User extraction
- Request logging
- Unknown endpoint handling
- Centralized error handling

### 🚨 Centralized Error Handling

The backend handles common application and database errors including:

- `CastError`
- `ValidationError`
- `MongoServerError` duplicate-key errors
- `JsonWebTokenError`
- `TokenExpiredError`

Errors are converted into standardized HTTP responses.

## 📡 Main API Endpoints

### Blogs

```text
GET     /api/blogs
POST    /api/blogs
PUT     /api/blogs/:id
DELETE  /api/blogs/:id
```

### Users

```text
GET     /api/users
POST    /api/users
```

### Authentication

```text
POST    /api/login
```

### Testing

Available only when running with `NODE_ENV=test`:

```text
POST    /api/testing/reset
```

## 📁 Directory Structure

```text
bloglist-backend/
├── controllers/
│   ├── blogs.js
│   ├── login.js
│   ├── testing.js
│   └── users.js
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
│   ├── middleware.js
│   └── ...
│
├── app.js
├── index.js
├── mongo.js
└── README.md
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
- cross-env
- dotenv

## 🛠️ How to Run Locally

### 1. Configure environment variables

Create a `.env` file in the backend root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../blogApp
TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../testBlogApp
SECRET=your_super_secret_cryptographic_key
PORT=3003
```

Keep real credentials and secrets out of version control.

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

The backend runs on port `3003`.

### 5. Start the backend in test mode

```bash
npm run start:test
```

Test mode sets:

```text
NODE_ENV=test
```

This enables the test-only API used by the Playwright end-to-end test suite.

### 6. Seed the database

Use the database utility when sample data needs to be created:

```bash
node mongo.js
```

## 🧪 Test Database Initialization

The E2E test suite resets the test database before each test through:

```text
POST /api/testing/reset
```

The reset process:

```text
POST /api/testing/reset
        ↓
Delete all blogs
        ↓
Delete all users
        ↓
204 No Content
```

The test suite can then create the specific users and blog data required for each test before interacting with the application through the browser.

The reset endpoint is intentionally available only when:

```text
NODE_ENV=test
```

so that the database-reset functionality is not exposed during normal development or production operation.
