# 📅 Calendar App | Jobsity Challenge

This project is a single-page calendar application built using Vue.js 3 and Pinia for state management. It allows users to create, edit, and manage personalized reminders, featuring advanced UI/UX requirements like dynamic styling and integration with an external Weather API.

![calendar-animation-gif](https://github.com/KlaytonJr/calendar-app-jobsity/blob/main/doc-content/calendar-animation.gif?raw=true)

## 🎨 Design & Prototyping

The application's design structure and visual flow were planned using Figma.

![figma-cover](https://github.com/KlaytonJr/calendar-app-jobsity/blob/main/doc-content/figma-cover.jpg?raw=true)

* **Figma Prototype Link:** [Jobsity Challenge - Calendar App](https://www.figma.com/design/vtbzJ5mMkrUbI4R1ZUqwNu/Jobsity-Challenge---Calendar-App?node-id=0-1&t=zBXNparSX2FZKDdN-1)

## 🚀 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Vue.js 3** | Frontend framework (Composition API style) |
| **Pinia** | Centralized state management |
| **pinia-plugin-persistedstate** | State persistence using `localStorage` |
| **Jest & Vue Test Utils** | Unit Testing framework and utilities |
| **jest-fetch-mock** |	Mocking asynchronous API calls (fetch) in tests |
| **OpenWeatherMap** | External API for weather forecast data |
| **HTML/CSS** | Structuring and styling (CSS Scoped) |

## ✨ Advanced Techniques Demonstrated

* **State Management (Pinia):** Centralized data handling for reminders, ensuring consistency across components.
* **Persistence (`localStorage`):** Reminders are stored locally and retrieved upon application reload.
* **Component Composition:** The large calendar component was refactored into smaller, reusable pieces (`CalendarHeader`, `CalendarWeekdayw`, `CalendarDay`, `ReminderModal`, `ReminderChip`).
* **Hybrid Modal:** A single `ReminderModal.vue` is used for both **Creation** and **Editing**, simplifying maintenance and UI consistency.
* **External API Integration:** Asynchronous fetching of weather data based on the reminder's city and date.
* **Conventional Commits & Atomic Commits:** The Git history is structured using semantic prefixes (`feat`, `refactor`, `fix`, `docs`) with atomic changes (single, focused logical units) to ensure a clean and traceable development process.
* **Robust Unit Testing (Jest):** Implementation of isolated unit tests covering 100% of the core data logic (Store) and critical component interactions.
    * **Asynchronous Mocking:** Utilized `jest-fetch-mock` to isolate service layer logic from actual network dependencies, ensuring fast and reliable tests.
    * **Pinia Testing:** Mapped and injected mock store data using `@pinia/testing` for state-driven components.

## 🌧️ Weather API Notes

This application integrates with the **OpenWeatherMap 5-Day / 3-Hour Forecast API**.

* **API Key:** The API Key is currently hardcoded in the source code for immediate testing and evaluation. In a production environment, this key would be securely managed.
* **Data Limitation:** Due to the limitations of the free API plan, the forecast data is only available for the **current day and the next 4 to 5 days** (in 3-hour intervals). Reminders set far in the future may display a 'N/A' weather icon.

## 📘 Guide: How to Use the Calendar

This application offers complete CRUD (Create, Read, Update, Delete) functionality for reminders, integrated with month navigation and weather forecasting.

### 1. Navigating the Calendar

- **Change Month:** Use the left (<) and right (>) arrow buttons in the blue header to move between months.

### 2. Creating a New Reminder

1. **Select a Day:** Click on any day cell within the current month. The "Add Reminder" modal will appear.

2. **Enter Details:**

    * **Label:** Type your reminder text (maximum 30 characters).

    * **Date & Hour:** The date is pre-filled. Adjust the time as needed.

    * **City:** Enter the target city (e.g., "New York"). This is used for the weather forecast.

    * **Color:** Select a color to categorize your reminder.

3. **Save:** Click the "Add" button. The application will asynchronously fetch the weather for the specified date and city, and display the reminder chip on the calendar.

### 3. Editing and Deleting Reminders

1. **Open Edit Modal:** Click directly on the colored reminder chip displayed on the calendar day. The modal will switch to "Edit Reminder" mode, pre-populated with the reminder's current data.

2. **Modify:** Change the text, date, time, city, or color.

3. **Save Changes:** Click the "Save Edits" button to apply the updates (this also re-fetches the weather if the city or date changed).

4. **Delete:** Click the "Delete" button to permanently remove the reminder.

### 4. Viewing Reminders

- **Weather Icon:** The small icon next to the reminder label displays the fetched forecast (e.g., ☀️ for Clear, 🌧️ for Rain).

- **Scrolling:** If a day has too many reminders, a scrollbar will appear inside the day cell, keeping the calendar layout consistent.

## 🧪 Testing and Quality Assurance

Unit tests are implemented using **Jest** and **Vue Test Utils** to ensure the reliability of the core logic and component behavior.

### Running Tests and Coverage Report

To run the unit tests and generate the coverage report:

```bash
npm run test
```

### 🎯 Coverage Goal and Results
A minimum of 85% coverage was required across statements, branches, functions, and lines for this project's core logic.

![coverage-image](https://github.com/KlaytonJr/calendar-app-jobsity/blob/main/doc-content/coverage-img.png?raw=true)

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