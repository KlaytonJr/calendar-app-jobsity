# 📅 Calendar App | Jobsity Challenge

This project is a single-page calendar application built using Vue.js 3 and Pinia for state management. It allows users to create, edit, and manage personalized reminders, featuring advanced UI/UX requirements like dynamic styling and integration with an external Weather API.

![calendar-animation-gif](https://github.com/KlaytonJr/calendar-app-jobsity/blob/main/doc-content/calendar-animation.gif?raw=true)

## 🚀 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Vue.js 3** | Frontend framework (Composition API style) |
| **Pinia** | Centralized state management |
| **pinia-plugin-persistedstate** | State persistence using `localStorage` |
| **OpenWeatherMap** | External API for weather forecast data |
| **HTML/CSS** | Structuring and styling (CSS Scoped) |

## ✨ Advanced Techniques Demonstrated

* **State Management (Pinia):** Centralized data handling for reminders, ensuring consistency across components.
* **Persistence (`localStorage`):** Reminders are stored locally and retrieved upon application reload.
* **Component Composition:** The large calendar component was refactored into smaller, reusable pieces (`CalendarHeader`, `CalendarWeekdayw`, `CalendarDay`, `ReminderModal`, `ReminderChip`).
* **Hybrid Modal:** A single `ReminderModal.vue` is used for both **Creation** and **Editing**, simplifying maintenance and UI consistency.
* **External API Integration:** Asynchronous fetching of weather data based on the reminder's city and date.
* **Conventional Commits & Atomic Commits:** The Git history is structured using semantic prefixes (`feat`, `refactor`, `fix`, `docs`) with atomic changes (single, focused logical units) to ensure a clean and traceable development process.

## 🌧️ Weather API Notes

This application integrates with the **OpenWeatherMap 5-Day / 3-Hour Forecast API**.

* **API Key:** The API Key is currently hardcoded in the source code for immediate testing and evaluation. In a production environment, this key would be securely managed.
* **Data Limitation:** Due to the limitations of the free API plan, the forecast data is only available for the **current day and the next 4 to 5 days** (in 3-hour intervals). Reminders set far in the future may display a 'N/A' weather icon.

## ⚙️ Project Setup and Running

Follow these steps to get the project running locally:

### Prerequisites

You need to have **Node.js** and **npm** (or yarn/pnpm) installed on your machine.

### 🖥️ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KlaytonJr/calendar-app-jobsity.git
    cd calendar-app-jobsity
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

### 🚀 Running the Application

1.  **Start the development server:**
    ```bash
    npm run serve
    # or yarn serve
    ```

2.  **Access the application:**
    The application will automatically open or be available at:
    **`http://localhost:8081/`**