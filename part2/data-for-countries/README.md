# 🌍 Data for Countries

_Full Stack Open - Part 2 (Exercises 2.18 - 2.20)_

## 🎯 Objective

A single-page React application that acts as a country encyclopedia. It integrates multiple third-party REST APIs to allow users to search through a global database of countries and view real-time weather data for their respective capitals.

## 🧠 Architecture & Execution Flow

- **Optimized Data Fetching:** The application fetches the complete dataset from the REST Countries API exactly once during the initial component mount phase (`useEffect` with an empty dependency array). All subsequent searching and filtering are handled locally in memory, ensuring immediate UI responsiveness and minimizing redundant network requests.
- **Dynamic Component Lifecycle:** The `Weather` component utilizes a targeted `useEffect` dependency array (`[capital]`), ensuring the OpenWeatherMap API is only called when the user selects a new country with a different capital city.
- **Derived State & Conditional Rendering:** The UI dynamically shifts based on the length of the filtered results array:
  - `> 10 matches`: Prompts the user to narrow their search.
  - `2 - 10 matches`: Renders an interactive list with localized "Show" buttons.
  - `1 match`: Automatically expands to a detailed view displaying demographics, languages, the national flag, and live weather.
- **Separation of Concerns:** Network communication is entirely decoupled from the React rendering layer. All Axios HTTP requests are abstracted into independent service modules (`services/countries.js`, `services/weather.js`).

## 🛡️ Job-Ready Engineering Practices

- **API Key Security:** Sensitive credentials for the OpenWeatherMap API are secured using environment variables (`.env`) and injected via Vite's `import.meta.env`, preventing accidental exposure in version control.
- **Graceful Error Handling:** Implemented Promise `.catch()` blocks in the weather service. If the weather API fails or a city is unrecognized, the application state updates to trigger a clean fallback UI rather than crashing the component tree.
- **Modern Styling:** Utilized a custom CSS implementation featuring CSS Grid layouts, glassmorphism (`backdrop-filter`), and CSS transitions to create a polished, responsive user experience without relying on heavy external component libraries.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, raw CSS3
- **HTTP Client:** Axios
- **APIs:** [REST Countries API](https://studies.cs.helsinki.fi/restcountries/), [OpenWeatherMap API](https://openweathermap.org/)

## 🛠️ How to Run Locally

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
