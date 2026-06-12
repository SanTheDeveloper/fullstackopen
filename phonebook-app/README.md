# 📞 Phonebook Application (Full-Stack)

This directory contains the complete, deployed full-stack Phonebook application built as the primary assignment track for the Fullstack Open curriculum.

## 🌐 Live Application

**Deployed on Render:** [INSERT YOUR RENDER LINK HERE]

## 🏗️ System Architecture

This application operates on a unified client-server architecture:

- **/frontend:** A React single-page application (SPA) built with Vite. It provides a responsive UI for managing contacts and routes API calls via relative paths.
- **/backend:** A Node.js and Express RESTful API. It processes incoming HTTP requests, logs traffic via Morgan, and directly serves the compiled static assets of the frontend.

## 🚀 Quick Start (Running Locally)

During development, the frontend and backend are run concurrently. The frontend utilizes a Vite proxy to forward API requests to the backend, eliminating CORS issues.

**1. Start the Backend API:**
cd backend
npm install
npm run dev

**2. Start the Frontend UI:**
cd frontend
npm install
npm run dev

For deep-dive documentation on the specific technologies, React rendering flows, and Express routing logic used in each layer, please see the individual `README.md` files located inside the `frontend/` and `backend/` directories.
