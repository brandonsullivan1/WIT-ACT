/*
 This file defines the
*/
USE WIT_ACT;
-- DROP TABLE Projects; # Cannot drop users while Projects exists
-- DROP TABLE Users;
CREATE TABLE Users (
    UserID VARCHAR(40) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    General_Skill VARCHAR(255) NOT NULL,
    Skill_Focus VARCHAR(255) NOT NULL,
    Specific_Skill_1 VARCHAR(255) NOT NULL,
    Specific_Skill_2 VARCHAR(255),
    Specific_Skill_3 VARCHAR(255),
    Tag VARCHAR(255),
    Minor VARCHAR(255),
    Phone_Number VARCHAR(255),
    Discord VARCHAR(255),
    PRIMARY KEY (UserID)
);