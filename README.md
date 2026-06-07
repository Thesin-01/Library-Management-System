<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

# 📚 Library Management System

A modern, full-stack **Library Management System** built with **Next.js 15**, **React 19**, and **TypeScript**. Features a stunning dark-mode glassmorphism UI, complete CRUD operations, automated fine calculation, and real-time dashboard analytics — all deployable to **Vercel** with zero configuration.

<p align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="100%" />
</p>

> **KIIT University** — School of Computer Engineering  
> **Course**: Database Management System (DBMS) Laboratory  
> **Assignment**: Lab Assignment 12 — Library Management System  
> **Academic Year**: 2025–2026  
> **Submitted by**: Sinjan Mishra (Roll No: 2405910 | Section: CSE-33)  
> **Guide Teacher**: Dr. Priyanka Roy

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📖 **Book Management** | Add, edit, delete, and search books with real-time filtering |
| 👥 **Member Management** | Register, update, and manage library members with avatar initials |
| 🔄 **Issue & Return** | Issue books to members with due-date tracking and one-click returns |
| 💰 **Fine Calculation** | Automatic overdue fine computation at ₹5 per day |
| 📊 **Dashboard Analytics** | Live statistics — total books, members, active issues & overdue count |
| ⚠️ **Overdue Alerts** | Visual warnings for overdue books with fine amounts |
| 🔍 **Search & Filter** | Instant client-side search across books and members |
| 🎨 **Glassmorphism UI** | Premium dark-mode design with gradients, blur effects & micro-animations |
| 📱 **Responsive Design** | Fully responsive across desktop, tablet, and mobile |
| 🚀 **Zero-Config Deploy** | Deploy to Vercel in one click — no database setup needed |

---

## 🖼️ Screenshots

### 📊 Dashboard
> Overview with live statistics, recent activity feed, and overdue alerts with fine amounts

<p align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard - Statistics, Recent Activity & Overdue Alerts" width="100%" />
</p>

---

### 📖 Books Management
> Full CRUD table with search, color-coded availability badges, and inline edit/delete actions

<p align="center">
  <img src="screenshots/books.png" alt="Books Management - CRUD Operations" width="100%" />
</p>

---

### 👥 Members Management
> Member registration with avatar initials, email, phone, and formatted join dates

<p align="center">
  <img src="screenshots/members.png" alt="Members Management - Registration & Search" width="100%" />
</p>

---

### 🔄 Issue & Return — All Issues
> Track all book issues with status badges (Returned/Overdue), fine calculation, and return actions

<p align="center">
  <img src="screenshots/issues.png" alt="Issues Management - All Issues View" width="100%" />
</p>

---

### 📝 Issue Book Form
> Issue new books with dropdown selects for book & member, librarian ID, and due date picker

<p align="center">
  <img src="screenshots/issue-form.png" alt="Issue Book Form" width="100%" />
</p>

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Next.js 15, React 19 | Server-side rendering & App Router |
| **Language** | TypeScript 5.7 | Type safety & developer experience |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS framework |
| **UI Components** | Custom (shadcn-style) | Card, Button, Dialog, Table, Badge, etc. |
| **Icons** | Lucide React | Beautiful open-source icons |
| **Backend** | Next.js API Routes | RESTful API endpoints |
| **Database** | In-Memory Data Store | Pre-seeded demo data (no external DB) |
| **Deployment** | Vercel | Serverless hosting platform |

---

## 📁 Project Structure

```
library-management-system/
├── 📂 app/
│   ├── 📂 api/
│   │   ├── 📂 books/
│   │   │   └── route.ts              # Books CRUD operations
│   │   ├── 📂 members/
│   │   │   └── route.ts              # Members CRUD operations
│   │   ├── 📂 issues/
│   │   │   └── route.ts              # Issue & Return operations
│   │   └── 📂 stats/
│   │       └── route.ts              # Dashboard statistics
│   ├── 📂 books/
│   │   └── page.tsx                  # Books management page
│   ├── 📂 members/
│   │   └── page.tsx                  # Members management page
│   ├── 📂 issues/
│   │   └── page.tsx                  # Issue & return page
│   ├── globals.css                   # Global styles & animations
│   ├── layout.tsx                    # Root layout with Inter font
│   └── page.tsx                      # Dashboard (home page)
│
├── 📂 components/
│   ├── 📂 ui/                        # Reusable UI primitives
│   │   ├── badge.tsx                 # Status badges (success/warning/danger)
│   │   ├── button.tsx                # Button with variants & sizes
│   │   ├── card.tsx                  # Glassmorphism card component
│   │   ├── dialog.tsx                # Modal dialog component
│   │   ├── input.tsx                 # Styled input field
│   │   ├── label.tsx                 # Form label component
│   │   ├── select.tsx                # Styled select dropdown
│   │   └── table.tsx                 # Table with header, body, rows
│   ├── dashboard.tsx                 # Dashboard analytics component
│   ├── book-list.tsx                 # Book management with CRUD
│   ├── member-list.tsx               # Member management with CRUD
│   ├── issue-form.tsx                # Issue/return with tabs
│   └── navbar.tsx                    # Fixed navigation bar
│
├── 📂 lib/
│   ├── db.ts                         # In-memory database & CRUD functions
│   └── utils.ts                      # Utility functions (cn, formatDate, etc.)
│
├── 📂 scripts/                       # SQL scripts (MySQL documentation)
│   ├── schema_5910.sql               # CREATE TABLE statements
│   ├── triggers_5910.sql             # Database triggers
│   ├── views_5910.sql                # Database views
│   └── seed_5910.sql                 # Sample seed data
│
├── 📂 screenshots/                   # Application screenshots
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── next.config.mjs                   # Next.js configuration
├── vercel.json                       # Vercel deployment config
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **npm** (included with Node.js) or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Thesin-01/Library-Management-System.git

# 2. Navigate to the project directory
cd Library-Management-System

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

---

## 🌐 Deployment on Vercel

Deploying to **Vercel** requires zero configuration:

1. **Push** your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **"Add New Project"**
3. **Import** your GitHub repository
4. Set the project name to `library-management-system` (all lowercase)
5. Click **Deploy** — no environment variables needed! 🎉

> **Note**: The app uses an in-memory data store, so demo data is automatically loaded on each cold start. No external database setup is required.

---

## 📊 Database Schema (ER Diagram)

```
┌──────────────────────┐          ┌──────────────────────┐
│    BOOKS_5910        │          │    MEMBERS_5910      │
├──────────────────────┤          ├──────────────────────┤
│ • book_id (PK)       │          │ • member_id (PK)     │
│ • title              │          │ • name               │
│ • author             │          │ • email (UNIQUE)     │
│ • publisher          │          │ • phone_number       │
│ • year_of_publication│          │ • membership_date    │
│ • available_copies   │          │                      │
└──────────┬───────────┘          └──────────┬───────────┘
           │ 1:N                             │ 1:N
           │                                 │
           ▼                                 ▼
┌──────────────────────────────────────────────────────────┐
│                     ISSUES_5910                          │
├──────────────────────────────────────────────────────────┤
│ • issue_id (PK)                                          │
│ • book_id (FK) ──────────── References BOOKS_5910        │
│ • member_id (FK) ────────── References MEMBERS_5910      │
│ • librarian_id (FK) ─────── References LIBRARIANS_5910   │
│ • issue_date                                             │
│ • due_date                                               │
│ • return_date (NULL if active)                           │
└──────────────────────────────────────────────────────────┘
           ▲
           │ 1:N
           │
┌──────────┴───────────┐
│  LIBRARIANS_5910     │
├──────────────────────┤
│ • librarian_id (PK)  │
│ • name               │
│ • contact_details    │
└──────────────────────┘
```

### Table Details

#### 📕 Books_5910

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `book_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique book identifier |
| `title` | VARCHAR(255) | NOT NULL | Book title |
| `author` | VARCHAR(100) | NOT NULL | Author name |
| `publisher` | VARCHAR(100) | — | Publisher name |
| `year_of_publication` | INT | — | Publication year |
| `available_copies` | INT | DEFAULT 0 | Currently available copies |

#### 👥 Members_5910

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `member_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique member identifier |
| `name` | VARCHAR(100) | NOT NULL | Full name |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Email address |
| `phone_number` | VARCHAR(15) | — | Contact number |
| `membership_date` | DATE | DEFAULT CURRENT_DATE | Registration date |

#### 🧑‍💼 Librarians_5910

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `librarian_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique librarian identifier |
| `name` | VARCHAR(100) | NOT NULL | Full name |
| `contact_details` | VARCHAR(200) | — | Contact information |

#### 📋 Issues_5910

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `issue_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique issue identifier |
| `book_id` | INT | FOREIGN KEY → Books_5910 | Issued book reference |
| `member_id` | INT | FOREIGN KEY → Members_5910 | Borrowing member reference |
| `librarian_id` | INT | FOREIGN KEY → Librarians_5910 | Processing librarian reference |
| `issue_date` | DATE | DEFAULT CURRENT_DATE | Date of issue |
| `due_date` | DATE | NOT NULL | Expected return date |
| `return_date` | DATE | NULL | Actual return date (NULL = active) |

---

## ⚙️ Database Triggers

| Trigger | Event | Description |
|---------|-------|-------------|
| `after_issue_insert_5910` | AFTER INSERT on Issues | Decrements `available_copies` when a book is issued |
| `after_return_update_5910` | AFTER UPDATE on Issues | Increments `available_copies` when a book is returned |
| `before_issue_check_5910` | BEFORE INSERT on Issues | Prevents issuing if no copies available |

## 👁️ Database Views

| View | Description |
|------|-------------|
| `BookIssueDetails_5910` | Join of issues with book titles and member names |
| `InactiveMembers_5910` | Members who have never issued a book |
| `OverdueBooks_5910` | Currently overdue books with fine calculation |
| `LibraryStats_5910` | Aggregate library statistics |

---

## 🔄 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/books` | List all books | `?search=` (optional) |
| `POST` | `/api/books` | Add a new book | `{ title, author, publisher, year_of_publication, available_copies }` |
| `PUT` | `/api/books` | Update a book | `{ book_id, ...fields }` |
| `DELETE` | `/api/books` | Delete a book | `{ book_id }` |
| `GET` | `/api/members` | List all members | `?search=` (optional) |
| `POST` | `/api/members` | Register a member | `{ name, email, phone_number }` |
| `PUT` | `/api/members` | Update a member | `{ member_id, ...fields }` |
| `DELETE` | `/api/members` | Delete a member | `{ member_id }` |
| `GET` | `/api/issues` | List all issues | — |
| `POST` | `/api/issues` | Issue a book | `{ book_id, member_id, librarian_id, due_date }` |
| `PUT` | `/api/issues` | Return a book | `{ issue_id }` |
| `GET` | `/api/stats` | Dashboard statistics | — |

---

## 📝 SQL Scripts

MySQL/PostgreSQL scripts for production database setup are in the `scripts/` directory:

```bash
scripts/
├── schema_5910.sql       # Table creation (Books, Members, Librarians, Issues)
├── triggers_5910.sql     # 3 triggers for automated inventory management
├── views_5910.sql        # 4 views for reporting & analytics
└── seed_5910.sql         # Sample data for testing
```

**Usage with MySQL:**
```bash
mysql -u root -p < scripts/schema_5910.sql
mysql -u root -p < scripts/triggers_5910.sql
mysql -u root -p < scripts/views_5910.sql
mysql -u root -p < scripts/seed_5910.sql
```

---

## 🎯 Key SQL Queries Implemented

| # | Query | Description |
|---|-------|-------------|
| Q2 | `SELECT * FROM Books_5910` | Display all books |
| Q3 | Members joined after a date | Date-based member filtering |
| Q4 | Books by a particular author | Author search |
| Q5 | Currently issued books | Active issues with JOIN |
| Q6 | Overdue books | Past-due with days calculation |
| Q7 | Total available books | Aggregate SUM |
| Q8 | Books issued by a member | Member-specific history |
| Q9 | Issue count per member | GROUP BY with COUNT |
| Q10 | Most issued book | ORDER BY with LIMIT |
| Q11 | Fine calculation | ₹5/day overdue computation |
| Q12 | Book issue details (VIEW) | Multi-table JOIN view |
| Q13 | Inactive members (VIEW) | LEFT JOIN with NULL check |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<table>
  <tr>
    <td align="center">
      <strong>Sinjan Mishra</strong><br/>
      B.Tech Computer Science & Engineering<br/>
      Roll No: 2405910 | Section: CSE-33<br/>
      4th Semester | Academic Year 2025–2026<br/><br/>
      <strong>KIIT University</strong><br/>
      School of Computer Engineering<br/>
      Bhubaneswar, Odisha, India<br/><br/>
      <em>Under the guidance of</em><br/>
      <strong>Dr. Priyanka Roy</strong><br/>
      Faculty, School of Computer Engineering
    </td>
  </tr>
</table>

---

<p align="center">
  <strong>DBMS Lab Assignment 12 — Library Management System</strong><br/>
  Made with ❤️ at KIIT University
</p>
