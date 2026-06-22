# 📝 Notes Application (Full-Stack)

This directory contains the complete, full-stack Notes application built throughout the Fullstack Open curriculum. It serves as the primary sandbox for learning and implementing modern web development architectures.

## 🏗️ System Architecture

This application follows a strict decoupling of the client and server:

- **/frontend:** A React single-page application (SPA) built with Vite. It handles all user interface rendering, local state management, and HTTP communication via Axios.
- **/backend:** A Node.js and Express RESTful API. It utilizes a modular controller architecture, provides endpoints for CRUD operations, and handles robust data persistence via **MongoDB Atlas**.

## 🚀 Quick Start

To run this application locally, you must boot up both the backend API and the frontend development server concurrently in two separate terminal windows.

**1. Start the Backend API:**
cd backend
npm install
npm run dev

**2. Start the Frontend UI:**
cd frontend
npm install
npm run dev

For detailed documentation on the specific technologies, architectural patterns, and execution flows used in each layer, please see the individual `README.md` files located inside the `frontend/` and `backend/` directories.
