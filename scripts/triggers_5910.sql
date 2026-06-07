-- Trigger 1: Update available copies after book issue
-- Automatically decrements the available copies when a book is issued.
DELIMITER //
CREATE TRIGGER after_issue_insert_5910
AFTER INSERT ON Issues_5910
FOR EACH ROW
BEGIN
    UPDATE Books_5910 
    SET available_copies = available_copies - 1 
    WHERE book_id = NEW.book_id;
END //
DELIMITER ;

-- Trigger 2: Update available copies after book return
-- Automatically increments the available copies when a book is returned.
DELIMITER //
CREATE TRIGGER after_return_update_5910
AFTER UPDATE ON Issues_5910
FOR EACH ROW
BEGIN
    IF OLD.return_date IS NULL AND NEW.return_date IS NOT NULL THEN
        UPDATE Books_5910 
        SET available_copies = available_copies + 1 
        WHERE book_id = NEW.book_id;
    END IF;
END //
DELIMITER ;

-- Trigger 3: Prevent issuing unavailable books
-- Prevents issuing a book when no copies are available.
DELIMITER //
CREATE TRIGGER before_issue_check_5910
BEFORE INSERT ON Issues_5910
FOR EACH ROW
BEGIN
    DECLARE copies INT;
    SELECT available_copies INTO copies 
    FROM Books_5910 WHERE book_id = NEW.book_id;
    IF copies <= 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No copies available for this book';
    END IF;
END //
DELIMITER ;
