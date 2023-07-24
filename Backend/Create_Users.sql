USE WIT_ACT;
DROP TABLE Users;
CREATE TABLE Users (
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Major VARCHAR(255) NOT NULL,
    Minor VARCHAR(255),
    Skill_1 VARCHAR(255),
    Skill_2 VARCHAR(255),
    Skill_3 VARCHAR(255),
    Skill_4 VARCHAR(255),
    Skill_5  VARCHAR(255),
    Phone_Number VARCHAR(255),
    Discord VARCHAR(255),
    PRIMARY KEY (Email)
);
# TEST
INSERT INTO Users VALUES ('Aa', 'a@wit.edu', 'Aa12345!', 'Computer Science', null, 'A','B', null, null, null, null, null);
SELECT * FROM Users;