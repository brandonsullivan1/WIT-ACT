USE WIT_ACT;
DROP TABLE Users;
CREATE TABLE Users (
    FullName varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Major varchar(255) NOT NULL,
    Minor varchar(255),
    Skill_1 varchar(255),
    Skill_2 varchar(255),
    Skill_3 varchar(255),
    Skill_4 varchar(255),
    Skill_5  varchar(255),
    Phone_Number varchar(255),
    Discord varchar(255),
    PRIMARY KEY (Email)
);
# TEST
INSERT INTO Users VALUES ('Aa', 'a@wit.edu', 'Aa12345!', 'Computer Science', null, 'A','B', null, null, null, null, null);
SELECT * FROM Users;