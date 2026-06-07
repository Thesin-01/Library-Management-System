-- Create Books Table
CREATE TABLE Books_5910 (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    publisher VARCHAR(100),
    year_of_publication INT,
    available_copies INT DEFAULT 0
);

-- Create Members Table
CREATE TABLE Members_5910 (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    membership_date DATE DEFAULT CURRENT_DATE
);

-- Create Librarians Table
CREATE TABLE Librarians_5910 (
    librarian_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    contact_details VARCHAR(200)
);

-- Create Issues Table
CREATE TABLE Issues_5910 (
    issue_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    librarian_id INT NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES Books_5910(book_id),
    FOREIGN KEY (member_id) REFERENCES Members_5910(member_id),
    FOREIGN KEY (librarian_id) REFERENCES Librarians_5910(librarian_id)
);
