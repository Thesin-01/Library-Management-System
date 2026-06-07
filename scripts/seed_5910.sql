-- Seed Data for Library Management System
-- Roll No: 2405910

-- Books
INSERT INTO Books_5910 (book_id, title, author, publisher, year_of_publication, available_copies) VALUES
(1, 'Introduction to Algorithms', 'Thomas H. Cormen', 'MIT Press', 2009, 5),
(2, 'Clean Code', 'Robert C. Martin', 'Prentice Hall', 2008, 3),
(3, 'Design Patterns', 'Erich Gamma', 'Addison-Wesley', 1994, 2),
(4, 'The Pragmatic Programmer', 'David Thomas', 'Addison-Wesley', 2019, 4),
(5, 'Data Structures and Algorithms', 'Alfred V. Aho', 'Pearson', 1983, 6),
(6, 'Database System Concepts', 'Abraham Silberschatz', 'McGraw-Hill', 2019, 3),
(7, 'Computer Networks', 'Andrew S. Tanenbaum', 'Pearson', 2021, 4),
(8, 'Operating System Concepts', 'Abraham Silberschatz', 'Wiley', 2018, 5);

-- Members
INSERT INTO Members_5910 (member_id, name, email, phone_number, membership_date) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@email.com', '9876543210', '2024-01-15'),
(2, 'Priya Patel', 'priya.patel@email.com', '9876543211', '2024-03-22'),
(3, 'Rohan Mehta', 'rohan.mehta@email.com', '9876543212', '2024-06-10'),
(4, 'Sneha Gupta', 'sneha.gupta@email.com', '9876543213', '2024-09-05'),
(5, 'Vikram Singh', 'vikram.singh@email.com', '9876543214', '2025-01-12'),
(6, 'Ananya Das', 'ananya.das@email.com', '9876543215', '2025-02-28');

-- Librarians
INSERT INTO Librarians_5910 (librarian_id, name, contact_details) VALUES
(1, 'Rajesh Kumar', 'rajesh.kumar@library.edu'),
(2, 'Meera Iyer', 'meera.iyer@library.edu'),
(3, 'Amit Deshmukh', 'amit.deshmukh@library.edu');

-- Issues (some returned, some overdue, some currently issued)
INSERT INTO Issues_5910 (issue_id, book_id, member_id, librarian_id, issue_date, due_date, return_date) VALUES
(1, 1, 1, 1, '2025-04-01', '2025-04-15', '2025-04-14'),
(2, 2, 2, 1, '2025-04-10', '2025-04-24', '2025-04-20'),
(3, 3, 3, 2, '2025-05-01', '2025-05-15', NULL),
(4, 4, 1, 2, '2025-05-05', '2025-05-19', NULL),
(5, 5, 4, 3, '2025-05-10', '2025-05-24', '2025-05-22'),
(6, 6, 5, 1, '2025-05-15', '2025-05-29', NULL),
(7, 7, 2, 3, '2025-05-20', '2025-06-03', NULL),
(8, 8, 6, 2, '2025-05-25', '2025-06-08', NULL);
