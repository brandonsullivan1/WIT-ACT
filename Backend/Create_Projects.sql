USE WIT_ACT;
DROP TABLE Projects;
CREATE TABLE Projects (
    ProjectID VARCHAR(40) NOT NULL, # Generate with node UUID
    Title VARCHAR(255) NOT NULL,
    ShortDesc VARCHAR(512) NOT NULL,
    FullDesc VARCHAR(2048),
    LeadMaker VARCHAR(255) NOT NULL,
    LM_Email VARCHAR(255) NOT NULL,
    PRIMARY KEY(ProjectID)
);