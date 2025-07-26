# ReadStack 📚

**ReadStack** is a full-stack web application designed for avid readers to track their reading journey. It allows users to create a personal library of books, complete with cover art and AI-generated summaries — ensuring you never forget the key details of what you've read.

---

## 📖 About The Project

Forgetting plot twists, main characters, or the core message of a book read months ago is a common problem. **ReadStack** solves this by providing a simple and elegant platform to log your books. By just entering a book's title and author, the app generates a beautiful card containing the book's cover and a unique summary crafted by Google's **Gemini AI** — allowing you to quickly recall the essence of any book in your collection.

---

## 🚀 Key Features

- **👤 User Authentication** – Secure registration and login with password hashing using **bcrypt**
- **📚 Personalized Bookshelves** – Track the books you've read in your personal profile
- **🤖 AI-Powered Summaries** – Summaries generated via the **Google Gemini API**
- **🖼️ Automatic Cover Art** – Covers fetched from the **Open Library API**
- **⚙️ Full CRUD Functionality** – Easily **C**reate, **R**ead, **U**pdate, and **D**elete your books
- **🔐 Session Management** – Persistent login with `express-session`

---

## 🛠 Tech Stack

- **Frontend:** EJS (Embedded JavaScript templates), CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **APIs:** Google Gemini API, Open Library API
- **Authentication:** bcrypt, express-session

---

## 🧑‍💻 Getting Started

To get a local copy up and running, follow these steps:

### ✅ Prerequisites

Ensure the following are installed on your system:

- Node.js
- npm
- PostgreSQL

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARCoder181105/ReadStack
````

2. **Navigate into the project directory**

   ```bash
   cd ReadStack
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root of your project and add:

   ```env
   # PostgreSQL Configuration
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_DATABASE=your_database_name
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432

   # Session Secret
   SESSION_SECRET=a_very_strong_and_long_secret_key

   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Start the application**

   ```bash
   npm start
   ```

6. Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## ⚠️ Note on Database Hosting

The project is currently hosted using a free-tier PostgreSQL instance, which may expire after approximately 3 months.

If the live app becomes inaccessible, it likely means the hosted DB service has expired. In such cases, the data will be migrated and redeployed to a new instance manually. **All user data will be preserved**. Your patience is appreciated!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```

---

Let me know if you want to add:
- Deployment instructions (e.g., for Render, Railway, or Vercel)
- Screenshots or demo GIFs
- Contribution guidelines

Would you like this README added to your project automatically?
```
