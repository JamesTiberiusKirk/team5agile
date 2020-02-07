CREATE TABLE `provider` (
    `provider_ID` INT NOT NULL,
    `provider_Name` VARCHAR(75) NOT NULL,
    `provider_StreetAdd` VARCHAR(45) NOT NULL,
    `provider_City` VARCHAR(45) NOT NULL,
    `provider_State` VARCHAR(45) NOT NULL,
    `provider_Zip` VARCHAR(45) NOT NULL,
    `provider_referral` VARCHAR(45) NOT NULL,
    `provider_rating` INT DEFAULT NULL,
    PRIMARY KEY (`provider_ID`),
    UNIQUE KEY `provider_ID_UNIQUE` (`provider_ID`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI