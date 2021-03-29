create
database Covid_Checker;

USE
covidchecker;

CREATE TABLE `STUDENT_STAFF`
(
    `universityId`         int(6) NOT NULL,
    `today`                datetime NOT NULL,
    `selectTypeUniversity` varchar('Student', 'Faulty', 'Staff'
) NOT NULL,
    `firstName`            varchar(25)  NOT NULL,
    `lastName`             varchar(25)  NOT NULL,
    `email`                varchar(100) NOT NULL,
    `feverChills`          tinyint(1) NOT NULL,
    `cough`                tinyint(1) NOT NULL,
    `breathing`            tinyint(1) NOT NULL,
    `lossOfTasteSmell`     tinyint(1) NOT NULL,
    `bodyAches`            tinyint(1) NOT NULL,
    `exposure`             tinyint(1) NOT NULL,
    `testResult`           tinyint(1) NOT NULL,
    `quarantineStatus`     tinyint(1) NOT NULL,
    PRIMARY KEY (`universityId`),
    UNIQUE KEY `UNIVERSITY_EMAIL` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
