/*
 This file creates the table for storing user projects, assuming that the WIT_ACT database exists.
 Projects are referenced by ProjectID and belong to a User matching UserID
*/
USE WIT_ACT;
-- DROP TABLE Projects;
CREATE TABLE Projects (
    ProjectID VARCHAR(40) NOT NULL, -- Generate with node UUID
    UserID VARCHAR(40) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    ShortDesc VARCHAR(255) NOT NULL,
    FullDesc VARCHAR(2048) NOT NULL,
    General_Skill VARCHAR(255) NOT NULL,
    Skill_Focus VARCHAR(255) NOT NULL,
    Specific_Skill_1 VARCHAR(255) NOT NULL,
    Specific_Skill_2 VARCHAR(255),
    Specific_Skill_3 VARCHAR(255),
    Tag_1 VARCHAR(255),
    Tag_2 VARCHAR(255),
    Lead_Maker VARCHAR(255) NOT NULL,
    LM_Email VARCHAR(255) NOT NULL,
    PRIMARY KEY (ProjectID),
    FOREIGN KEY (UserID)
        REFERENCES wit_act.Users(UserID)
        ON UPDATE RESTRICT ON DELETE CASCADE
);