USE WIT_ACT;
DROP TABLE Users;
CREATE TABLE Users (
    UserID int NOT NULL AUTO_INCREMENT,
    FullName varchar(255) NOT NULL,
    Email varchar(24) NOT NULL,
    Password varchar(24) NOT NULL,
    Major varchar(255) NOT NULL,
    Minor varchar(255),
    Skill_1 varchar(255),
    Skill_2 varchar(255),
    Skill_3 varchar(255),
    Skill_4 varchar(255),
    Skill_5  varchar(255),
    Phone_Number varchar(255),
    Discord varchar(255),
    PRIMARY KEY (UserID)
);
# TEST
INSERT INTO Users (FullName, Email, Password, Major, Minor, Skill_1, Skill_2, Skill_3, Skill_4, Skill_5, Phone_Number, Discord) VALUES ('Joshua Polischuk', 'polischukj@wit.edu', 'fakepassword', 'Computer Science', null, 'Node','Express', null, null, null,'555-555-555', 'discordname');
SELECT * FROM Users;