CREATE TABLE `costs` (
    `cost_ID` INT NOT NULL AUTO_INCREMENT,
    `procedure_ID` VARCHAR(3) NOT NULL,
    `provider_ID` INT NOT NULL,
    `avg_Covered_Charges` DECIMAL(15 , 2 ) NOT NULL,
    `avg_Total_Payments` DECIMAL(15 , 2 ) NOT NULL,
    `avg_Medicare_Payments` DECIMAL(15 , 2 ) NOT NULL,
    PRIMARY KEY (`cost_ID`),
    UNIQUE KEY `cost_ID_UNIQUE` (`cost_ID`),
    KEY `provider_IDs_idx` (`provider_ID`),
    KEY `procedure_IDs_idx` (`procedure_ID`),
    CONSTRAINT `procedure_IDs` FOREIGN KEY (`procedure_ID`)
        REFERENCES `procedure` (`procedure_ID`),
    CONSTRAINT `provider_IDs` FOREIGN KEY (`provider_ID`)
        REFERENCES `provider` (`provider_ID`)
)  ENGINE=INNODB AUTO_INCREMENT=200001 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI