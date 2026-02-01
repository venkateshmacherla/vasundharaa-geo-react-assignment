# React Developer Intern Assignment - Vasundharaa Geo Technologies

This project is a Single Page Application (SPA) built to demonstrate proficiency in React, State Management, LocalStorage persistence, and Dynamic UI interactions. It fulfills all 5 tasks outlined in the internship assignment.

## 🚀 How to Run the Project

1.  **Clone the repository** (or download source files):
    ```bash
    git clone <your-repo-link>
    cd vasundharaa-assignment
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    The app will typically run at `http://localhost:5173`.

---

## 📋 Features Implemented

### **Task 1: Todo Task Manager**
* **State Management:** Add, delete, and toggle task completion.
* **Persistence:** Tasks are saved to `LocalStorage`, so data remains after a refresh.
* **Filtering:** Filter tasks by 'All', 'Active', or 'Completed'.

### **Task 2: User Registration & Validation**
* **Regex Validation:** Validates email format and password length (min 6 chars).
* **Error Handling:** Displays inline error messages for invalid fields.
* **UX:** Includes a "Show/Hide Password" toggle.

### **Task 3: Skill Progress Overview**
* **Logic:** The main progress bar dynamically calculates the average of all sub-inputs.
* **Dynamic Styling:** The bar changes color based on the value:
    * < 40%: Red
    * 40% - 69%: Yellow
    * 70%+: Green

### **Task 4: Persistent Countdown Timer**
* **Persistence:** The timer continues correctly even if the page is refreshed or closed.
* **Logic:** Uses `Date.now()` timestamps stored in LocalStorage instead of relying solely on `setInterval` ticks.
* **Controls:** Start, Pause, and Reset functionality.

### **Task 5: Live Search & Highlight**
* **Filtering:** Filters a list of names in real-time.
* **Highlighting:** Uses Regex to split strings and wrap the matching search term in a highlighted `<span>` tag while preserving case.

---

## 🛠️ Tech Stack & Structure

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React
* **Language:** JavaScript (ES6+)

### **Project Structure (Modularity)**
The project follows a clean, component-based directory structure:

```text
src/
├── components/
│   ├── Todo/         # Task 1 Components
│   ├── Forms/        # Task 2 Components
│   ├── Progress/     # Task 3 Components
│   ├── Timer/        # Task 4 Components
│   └── Search/       # Task 5 Components
├── hooks/            # Custom Hooks (useLocalStorage)
├── App.jsx           # Main Layout
└── main.jsx          # Entry Point
