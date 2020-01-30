CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`%` 
    SQL SECURITY DEFINER
VIEW `options` AS
    SELECT 
        `procedure`.`procedure_ID` AS `procedure_ID`,
        `procedure`.`procedure_Def` AS `procedure_Def`,
        `provider`.`provider_Name` AS `provider_Name`,
        `provider`.`provider_StreetAdd` AS `provider_StreetAdd`,
        `provider`.`provider_City` AS `provider_City`,
        `provider`.`provider_State` AS `provider_State`,
        `provider`.`provider_Zip` AS `provider_Zip`,
        `costs`.`avg_Covered_Charges` AS `avg_Covered_Charges`,
        `costs`.`avg_Total_Payments` AS `avg_Total_Payments`,
        `costs`.`avg_Medicare_Payments` AS `avg_Medicare_Payments`,
        `provider`.`provider_referral` AS `provider_referral`,
        `provider`.`provider_Latitude` AS `provider_Latitude`,
        `provider`.`provider_Longitude` AS `provider_Longitude`
    FROM
        ((`costs`
        JOIN `procedure` ON ((`costs`.`procedure_ID` = `procedure`.`procedure_ID`)))
        JOIN `provider` ON ((`costs`.`provider_ID` = `provider`.`provider_ID`)))