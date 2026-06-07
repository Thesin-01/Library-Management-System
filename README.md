# 📚 Library Management System

A modern, full-stack **Library Management System** built with **Next.js 15**, **React 19**, and **TypeScript**. This application provides a comprehensive solution for managing library operations including book inventory, member registration, book issuance/returns, and fine calculation.

> **KIIT University** — School of Computer Engineering  
> DBMS Lab Assignment 12 | Academic Year 2025–2026  
> **Submitted by**: Sinjan Mishra (Roll No: 2405910, Section: CSE-33)  
> **Guide**: Dr. Priyanka Roy

---

## ✨ Features

- 📖 **Book Management** — Add, edit, delete, and search books with real-time filtering
- 👥 **Member Management** — Register, update, and manage library members
- 🔄 **Issue & Return** — Issue books to members with due-date tracking and one-click returns
- 💰 **Automatic Fine Calculation** — Computes overdue fines at ₹5/day on book return
- 📊 **Dashboard Analytics** — Live stats for total books, members, active issues & overdue items
- ⚠️ **Overdue Alerts** — Highlights overdue books with visual indicators
- 🔍 **Search & Filter** — Instant search across books and members
- 📱 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Mode Support** — Beautiful UI in both light and dark themes

---

## 🛠️ Tech Stack

| Component    | Technology                          |
| ------------ | ----------------------------------- |
| **Frontend** | Next.js 15, React 19, TypeScript    |
| **Styling**  | Tailwind CSS, Custom Components     |
| **Backend**  | Next.js API Routes (App Router)     |
| **Database** | In-Memory Data Store (demo mode)    |
| **Icons**    | Lucide React                        |
| **Deployment** | Vercel                            |

---

## 📁 Project Structure

```
library-management-system/
├── app/
│   ├── api/
│   │   ├── books/
│   │   │   └── route.ts          # Books CRUD API
│   │   ├── members/
│   │   │   └── route.ts          # Members CRUD API
│   │   ├── issues/
│   │   │   └── route.ts          # Issue & Return API
│   │   └── stats/
│   │       └── route.ts          # Dashboard Stats API
│   ├── books/
│   │   └── page.tsx              # Books management page
│   ├── members/
│   │   └── page.tsx              # Members management page
│   ├── issues/
│   │   └── page.tsx              # Issue & return page
│   ├── layout.tsx                # Root layout with sidebar
│   ├── page.tsx                  # Dashboard (home)
│   └── globals.css               # Global styles
├── components/
│   ├── dashboard.tsx             # Dashboard analytics component
│   ├── book-list.tsx             # Book management component
│   ├── member-list.tsx           # Member management component
│   ├── issue-form.tsx            # Issue & return component
│   └── sidebar.tsx               # Navigation sidebar
├── lib/
│   └── db.ts                     # In-memory database & helper functions
├── scripts/
│   └── schema.sql                # MySQL schema for production use
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/library-management-system.git

# Navigate to the project directory
cd library-management-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Create an optimised production build
npm run build

# Start the production server
npm start
```

---

## 🌐 Deployment on Vercel

Deploying to Vercel is effortless:

1. **Push** your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. **Import** your GitHub repository.
4. Click **Deploy** — no environment variables needed!

Vercel automatically detects the Next.js framework and configures the build for you.

---

## 📊 Database Schema

### 📕 Books

| Column       | Type         | Description               |
| ------------ | ------------ | ------------------------- |
| `book_id`    | INT (PK)     | Auto-incremented book ID  |
| `title`      | VARCHAR(255) | Title of the book         |
| `author`     | VARCHAR(255) | Author name               |
| `isbn`       | VARCHAR(13)  | ISBN number               |
| `quantity`   | INT          | Total copies in library   |
| `available`  | INT          | Currently available copies |

### 👥 Members

| Column            | Type         | Description                  |
| ----------------- | ------------ | ---------------------------- |
| `member_id`       | INT (PK)     | Auto-incremented member ID   |
| `name`            | VARCHAR(255) | Full name                    |
| `email`           | VARCHAR(255) | Email address                |
| `phone`           | VARCHAR(15)  | Phone number                 |
| `membership_date` | DATE         | Date of registration         |

### 🧑‍💼 Librarians

| Column         | Type         | Description                    |
| -------------- | ------------ | ------------------------------ |
| `librarian_id` | INT (PK)     | Auto-incremented librarian ID  |
| `name`         | VARCHAR(255) | Full name                      |
| `email`        | VARCHAR(255) | Email address                  |

### 📋 Issues

| Column        | Type         | Description                        |
| ------------- | ------------ | ---------------------------------- |
| `issue_id`    | INT (PK)     | Auto-incremented issue ID          |
| `book_id`     | INT (FK)     | References Books table             |
| `member_id`   | INT (FK)     | References Members table           |
| `librarian_id`| INT (FK)     | References Librarians table        |
| `issue_date`  | DATE         | Date the book was issued           |
| `due_date`    | DATE         | Expected return date               |
| `return_date` | DATE / NULL  | Actual return date (NULL if active)|
| `fine`        | DECIMAL      | Fine amount (₹5/day if overdue)    |

---

## 🔄 API Endpoints

| Method   | Endpoint         | Description                          |
| -------- | ---------------- | ------------------------------------ |
| `GET`    | `/api/books`     | List all books (optional `?search=`) |
| `POST`   | `/api/books`     | Add a new book                       |
| `PUT`    | `/api/books`     | Update an existing book              |
| `DELETE` | `/api/books`     | Delete a book by `book_id`           |
| `GET`    | `/api/members`   | List all members (optional `?search=`)|
| `POST`   | `/api/members`   | Register a new member                |
| `PUT`    | `/api/members`   | Update member details                |
| `DELETE` | `/api/members`   | Delete a member by `member_id`       |
| `GET`    | `/api/issues`    | List all issue records               |
| `POST`   | `/api/issues`    | Issue a book to a member             |
| `PUT`    | `/api/issues`    | Return a book & calculate fine       |
| `GET`    | `/api/stats`     | Get dashboard statistics             |

---

## 📝 SQL Scripts

SQL scripts for setting up a **MySQL** database in production are located in the `scripts/` directory:

```bash
scripts/
└── schema.sql    # Table creation & seed data
```

To use with MySQL:

```bash
mysql -u root -p < scripts/schema.sql
```

---

## 🎨 Screenshots

| Page                  | Description                                              |
| --------------------- | -------------------------------------------------------- |
| **Dashboard**         | Overview with live statistics and overdue alerts          |
| **Books Management**  | Full CRUD table with search and inline editing            |
| **Members Management**| Member registration and management with search            |
| **Issues & Returns**  | Issue books, process returns, and view fine calculations  |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Sinjan Mishra**  
KIIT University — School of Computer Engineering  
Roll No: 2405910 | Section: CSE-33

---

<p align="center">
  Made with ❤️ for DBMS Lab Assignment 12
</p>
