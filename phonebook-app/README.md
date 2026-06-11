# 📞 Phonebook Application (Full-Stack)

This directory contains the complete, full-stack Phonebook application built as the primary assignment track for the Fullstack Open curriculum.

## 🏗️ System Architecture

This application operates on a decoupled client-server architecture:

- **/frontend:** A React single-page application (SPA) built with Vite. It provides a responsive, dark-themed UI for managing contacts and handles client-side filtering and API communication.
- **/backend:** A Node.js and Express RESTful API. It processes incoming HTTP requests, validates data payloads, logs traffic via Morgan, and manages data persistence.

## 🚀 Quick Start (Running Full-Stack)

To run this application locally, you must boot up both the backend API and the frontend development server concurrently in two separate terminal windows.

**1. Start the Backend API:**
cd backend
npm install
npm run dev

**2. Start the Frontend UI:**
cd frontend
npm install
npm run dev

For deep-dive documentation on the specific technologies, React rendering flows, and Express routing logic used in each layer, please see the individual `README.md` files located inside the `frontend/` and `backend/` directories.
