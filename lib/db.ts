import { calculateDaysOverdue, calculateFine } from './utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Book {
  book_id: number
  title: string
  author: string
  publisher: string
  year_of_publication: number
  available_copies: number
}

export interface Member {
  member_id: number
  name: string
  email: string
  phone_number: string
  membership_date: string
}

export interface Librarian {
  librarian_id: number
  name: string
  contact_details: string
}

export interface Issue {
  issue_id: number
  book_id: number
  member_id: number
  librarian_id: number
  issue_date: string
  due_date: string
  return_date: string | null
}

export interface IssueWithDetails extends Issue {
  book_title: string
  member_name: string
  librarian_name: string
  days_overdue: number
  fine_amount: number
}

export interface Stats {
  totalBooks: number
  totalCopies: number
  totalMembers: number
  currentIssues: number
  overdueBooks: number
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const books: Book[] = [
  { book_id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', publisher: 'MIT Press', year_of_publication: 2009, available_copies: 5 },
  { book_id: 2, title: 'Clean Code', author: 'Robert C. Martin', publisher: 'Prentice Hall', year_of_publication: 2008, available_copies: 3 },
  { book_id: 3, title: 'Design Patterns', author: 'Erich Gamma', publisher: 'Addison-Wesley', year_of_publication: 1994, available_copies: 2 },
  { book_id: 4, title: 'The Pragmatic Programmer', author: 'David Thomas', publisher: 'Addison-Wesley', year_of_publication: 2019, available_copies: 4 },
  { book_id: 5, title: 'Data Structures and Algorithms', author: 'Alfred V. Aho', publisher: 'Pearson', year_of_publication: 1983, available_copies: 6 },
  { book_id: 6, title: 'Database System Concepts', author: 'Abraham Silberschatz', publisher: 'McGraw-Hill', year_of_publication: 2019, available_copies: 3 },
  { book_id: 7, title: 'Computer Networks', author: 'Andrew S. Tanenbaum', publisher: 'Pearson', year_of_publication: 2021, available_copies: 4 },
  { book_id: 8, title: 'Operating System Concepts', author: 'Abraham Silberschatz', publisher: 'Wiley', year_of_publication: 2018, available_copies: 5 },
]

const members: Member[] = [
  { member_id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone_number: '9876543210', membership_date: '2024-01-15' },
  { member_id: 2, name: 'Priya Patel', email: 'priya.patel@email.com', phone_number: '9876543211', membership_date: '2024-03-22' },
  { member_id: 3, name: 'Rohan Mehta', email: 'rohan.mehta@email.com', phone_number: '9876543212', membership_date: '2024-06-10' },
  { member_id: 4, name: 'Sneha Gupta', email: 'sneha.gupta@email.com', phone_number: '9876543213', membership_date: '2024-09-05' },
  { member_id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone_number: '9876543214', membership_date: '2025-01-12' },
  { member_id: 6, name: 'Ananya Das', email: 'ananya.das@email.com', phone_number: '9876543215', membership_date: '2025-02-28' },
]

const librarians: Librarian[] = [
  { librarian_id: 1, name: 'Rajesh Kumar', contact_details: 'rajesh.kumar@library.edu' },
  { librarian_id: 2, name: 'Meera Iyer', contact_details: 'meera.iyer@library.edu' },
  { librarian_id: 3, name: 'Amit Deshmukh', contact_details: 'amit.deshmukh@library.edu' },
]

const issues: Issue[] = [
  { issue_id: 1, book_id: 1, member_id: 1, librarian_id: 1, issue_date: '2025-04-01', due_date: '2025-04-15', return_date: '2025-04-14' },
  { issue_id: 2, book_id: 2, member_id: 2, librarian_id: 1, issue_date: '2025-04-10', due_date: '2025-04-24', return_date: '2025-04-20' },
  { issue_id: 3, book_id: 3, member_id: 3, librarian_id: 2, issue_date: '2025-05-01', due_date: '2025-05-15', return_date: null },
  { issue_id: 4, book_id: 4, member_id: 1, librarian_id: 2, issue_date: '2025-05-05', due_date: '2025-05-19', return_date: null },
  { issue_id: 5, book_id: 5, member_id: 4, librarian_id: 3, issue_date: '2025-05-10', due_date: '2025-05-24', return_date: '2025-05-22' },
  { issue_id: 6, book_id: 6, member_id: 5, librarian_id: 1, issue_date: '2025-05-15', due_date: '2025-05-29', return_date: null },
  { issue_id: 7, book_id: 7, member_id: 2, librarian_id: 3, issue_date: '2025-05-20', due_date: '2025-06-03', return_date: null },
  { issue_id: 8, book_id: 8, member_id: 6, librarian_id: 2, issue_date: '2025-05-25', due_date: '2025-06-08', return_date: null },
]

// ─── Auto-increment counters ──────────────────────────────────────────────────

let nextBookId = 9
let nextMemberId = 7
let nextIssueId = 9

// ─── Book Functions ───────────────────────────────────────────────────────────

export function getBooks(search?: string): Book[] {
  if (!search) return [...books]
  const q = search.toLowerCase()
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
  )
}

export function getBookById(id: number): Book | undefined {
  return books.find((b) => b.book_id === id)
}

export function addBook(book: Omit<Book, 'book_id'>): Book {
  const newBook: Book = { ...book, book_id: nextBookId++ }
  books.push(newBook)
  return newBook
}

export function updateBook(id: number, data: Partial<Omit<Book, 'book_id'>>): Book | null {
  const index = books.findIndex((b) => b.book_id === id)
  if (index === -1) return null
  books[index] = { ...books[index], ...data }
  return books[index]
}

export function deleteBook(id: number): boolean {
  const index = books.findIndex((b) => b.book_id === id)
  if (index === -1) return false
  books.splice(index, 1)
  return true
}

// ─── Member Functions ─────────────────────────────────────────────────────────

export function getMembers(search?: string): Member[] {
  if (!search) return [...members]
  const q = search.toLowerCase()
  return members.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
  )
}

export function getMemberById(id: number): Member | undefined {
  return members.find((m) => m.member_id === id)
}

export function addMember(member: Omit<Member, 'member_id' | 'membership_date'>): Member {
  const newMember: Member = {
    ...member,
    member_id: nextMemberId++,
    membership_date: new Date().toISOString().split('T')[0],
  }
  members.push(newMember)
  return newMember
}

export function updateMember(id: number, data: Partial<Omit<Member, 'member_id'>>): Member | null {
  const index = members.findIndex((m) => m.member_id === id)
  if (index === -1) return null
  members[index] = { ...members[index], ...data }
  return members[index]
}

export function deleteMember(id: number): boolean {
  const index = members.findIndex((m) => m.member_id === id)
  if (index === -1) return false
  members.splice(index, 1)
  return true
}

// ─── Librarian Functions ──────────────────────────────────────────────────────

export function getLibrarians(): Librarian[] {
  return [...librarians]
}

// ─── Issue Functions ──────────────────────────────────────────────────────────

function enrichIssue(issue: Issue): IssueWithDetails {
  const book = books.find((b) => b.book_id === issue.book_id)
  const member = members.find((m) => m.member_id === issue.member_id)
  const librarian = librarians.find((l) => l.librarian_id === issue.librarian_id)

  const daysOverdue =
    issue.return_date === null ? calculateDaysOverdue(issue.due_date) : 0
  const fineAmount = calculateFine(daysOverdue)

  return {
    ...issue,
    book_title: book?.title ?? 'Unknown',
    member_name: member?.name ?? 'Unknown',
    librarian_name: librarian?.name ?? 'Unknown',
    days_overdue: daysOverdue,
    fine_amount: fineAmount,
  }
}

export function getIssues(): IssueWithDetails[] {
  return issues.map(enrichIssue)
}

export function issueBook(data: {
  book_id: number
  member_id: number
  librarian_id: number
  due_date: string
}): Issue | { error: string } {
  const book = books.find((b) => b.book_id === data.book_id)
  if (!book) return { error: 'Book not found' }
  if (book.available_copies <= 0) return { error: 'No copies available for this book' }

  const member = members.find((m) => m.member_id === data.member_id)
  if (!member) return { error: 'Member not found' }

  const librarian = librarians.find((l) => l.librarian_id === data.librarian_id)
  if (!librarian) return { error: 'Librarian not found' }

  // Decrement available copies (simulates trigger after_issue_insert_5910)
  book.available_copies -= 1

  const newIssue: Issue = {
    issue_id: nextIssueId++,
    book_id: data.book_id,
    member_id: data.member_id,
    librarian_id: data.librarian_id,
    issue_date: new Date().toISOString().split('T')[0],
    due_date: data.due_date,
    return_date: null,
  }

  issues.push(newIssue)
  return newIssue
}

export function returnBook(
  issue_id: number
): { fine: number; days_overdue: number } | { error: string } {
  const issue = issues.find((i) => i.issue_id === issue_id)
  if (!issue) return { error: 'Issue record not found' }
  if (issue.return_date !== null) return { error: 'Book has already been returned' }

  const today = new Date().toISOString().split('T')[0]
  issue.return_date = today

  // Increment available copies (simulates trigger after_return_update_5910)
  const book = books.find((b) => b.book_id === issue.book_id)
  if (book) {
    book.available_copies += 1
  }

  const daysOverdue = calculateDaysOverdue(issue.due_date)
  const fine = calculateFine(daysOverdue)

  return { fine, days_overdue: daysOverdue }
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export function getStats(): Stats {
  const totalBooks = books.length
  const totalCopies = books.reduce((sum, b) => sum + b.available_copies, 0)
  const totalMembers = members.length
  const currentIssues = issues.filter((i) => i.return_date === null).length
  const today = new Date()
  const overdueBooks = issues.filter(
    (i) => i.return_date === null && new Date(i.due_date) < today
  ).length

  return { totalBooks, totalCopies, totalMembers, currentIssues, overdueBooks }
}

export function getOverdueBooks(): IssueWithDetails[] {
  const today = new Date()
  return issues
    .filter((i) => i.return_date === null && new Date(i.due_date) < today)
    .map(enrichIssue)
}
