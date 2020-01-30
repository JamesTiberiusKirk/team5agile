CREATE TABLE `procedure` (
    `procedure_ID` VARCHAR(3) NOT NULL,
    `procedure_Def` VARCHAR(75) NOT NULL,
    PRIMARY KEY (`procedure_ID`),
    UNIQUE KEY `procedure_ID_UNIQUE` (`procedure_ID`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI