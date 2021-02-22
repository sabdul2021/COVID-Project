create database Covid_Checker;

USE Covid_Checker;

CREATE TABLE IF NOT EXISTS STUDENT_STAFF(
	universityId		int								NOT NULL AUTO_INCREMENT,
	firstName				char(25)					NOT NULL,
	lastName				char(25)					NOT NULL,
	email						varchar(100)			NOT NULL,
	CONSTRAINT 			UNIVERSITY_PK 		PRIMARY KEY(universityId),
	CONSTRAINT			UNIVERSITY_EMAIL	UNIQUE(email)
	);

CREATE TABLE IF NOT EXISTS COVID_SYMPTOMS(
	universityId		 int						NOT NULL AUTO_INCREMENT,
	symptoms 				 varchar(225)		NOT NULL,
  exposure				 varchar(225)		NOT NULL,
  testResults			 varchar(225)		NOT NULL,
  currentSymptoms	 varchar(225)		NOT NULL,
  quarantineStatus varchar(225)		NOT NULL,
  CONSTRAINT 			UNIVERSITY_FK 	FOREIGN KEY(universityId)
	REFERENCES 			STUDENT_STAFF(universityId)
	ON UPDATE NO ACTION
	ON DELETE CASCADE
);
