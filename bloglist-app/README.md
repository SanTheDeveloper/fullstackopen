# 📚 Blog List Application (Full-Stack)

This directory contains the complete, full-stack Blog List application built during the Fullstack Open curriculum. It serves as a comprehensive sandbox for implementing modern web development architectures, secure JWT authentication, and relational NoSQL database modeling.

## 🏗️ System Architecture

This application follows a strict decoupling of the client and server:

- **/frontend:** A React single-page application (SPA) built with Vite. It handles all user interface rendering, local state management, persistent JWT session handling via `localStorage`, and HTTP communication using Axios.
- **/backend:** A Node.js and Express RESTful API. It utilizes a modular controller architecture, custom authorization middleware, automated integration testing environments, and robust data persistence via **MongoDB Atlas**.

## 🚀 Quick Start

To run this application locally, you must boot up both the backend API and the frontend development server concurrently in two separate terminal windows.

**1. Start the Backend API:**
Open your first terminal window and run:
```bash
cd backend
npm install
npm run dev
