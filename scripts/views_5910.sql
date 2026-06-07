-- View 1: Book Issue Details
-- Displays book title, member name, and issue date using JOIN.
CREATE VIEW BookIssueDetails_5910 AS
SELECT b.title AS book_title,
       m.name AS member_name,
       i.issue_date,
       i.due_date,
       i.return_date
FROM Issues_5910 i
JOIN Books_5910 b ON i.book_id = b.book_id
JOIN Members_5910 m ON i.member_id = m.member_id;

-- View 2: Members without any issues
-- Find members who have not issued any books.
CREATE VIEW InactiveMembers_5910 AS
SELECT m.*
FROM Members_5910 m
LEFT JOIN Issues_5910 i ON m.member_id = i.member_id
WHERE i.issue_id IS NULL;

-- View 3: Overdue Books with Fine
-- Shows all overdue books along with calculated fine amount.
CREATE VIEW OverdueBooks_5910 AS
SELECT m.name AS member_name,
       b.title AS book_title,
       i.due_date,
       DATEDIFF(CURDATE(), i.due_date) AS days_overdue,
       DATEDIFF(CURDATE(), i.due_date) * 5 AS fine_amount
FROM Issues_5910 i
JOIN Books_5910 b ON i.book_id = b.book_id
JOIN Members_5910 m ON i.member_id = m.member_id
WHERE i.return_date IS NULL AND i.due_date < CURDATE();

-- View 4: Library Statistics
-- Provides a summary of library statistics.
CREATE VIEW LibraryStats_5910 AS
SELECT 
    (SELECT COUNT(*) FROM Books_5910) AS total_books,
    (SELECT SUM(available_copies) FROM Books_5910) AS available_copies,
    (SELECT COUNT(*) FROM Members_5910) AS total_members,
    (SELECT COUNT(*) FROM Issues_5910 WHERE return_date IS NULL) AS current_issues,
    (SELECT COUNT(*) FROM Issues_5910 WHERE return_date IS NULL 
     AND due_date < CURDATE()) AS overdue_books;
