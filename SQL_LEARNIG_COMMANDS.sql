SELECT* FROM users;

INSERT INTO  users (ID,Name, age) VALUES ( 88,"Akbar", 22);

ALTER TABLE users MODIFY Email INT Default 10;

TRUNCATE TABLE users;

DROP DATABASE college;

CREATE TABLE IF NOT EXISTS Teachers(
id INT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
subject VARCHAR(50) UNIQUE,
salery INT DEFAULT 50000
);

INSERT INTO Teachers (id,name,subject,salery) VALUES
(1,"Ajay", "Math",50000),
(2,"Bharat", "English",60000),
(3,"Chetan", "Chemistry",45000),
(4,"Divya", "Physics",75000);

SELECT * FROM teachers;

SELECT * FROM teachers WHERE salery > 55000;

ALTER TABLE teachers CHANGE COLUMN salery ctc INT DEFAULT 50000; -- change column name

UPDATE teachers SET ctc = ctc + ( ctc *0.25); -- increment in salery


ALTER TABLE teachers ADD COLUMN city VARCHAR(40) DEFAULT "Gurgaon"; -- add new column

ALTER TABLE teachers DROP ctc;

SET SQL_SAFE_UPDATES =0;

