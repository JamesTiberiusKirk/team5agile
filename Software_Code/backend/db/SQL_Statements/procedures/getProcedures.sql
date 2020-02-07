CREATE DEFINER=`root`@`%` PROCEDURE `getProcedures`(search_query VARCHAR(255),sortByCol VARCHAR(45), sortType VARCHAR(45))
BEGIN
	SET @querySQL= 	CONCAT("SELECT * FROM `options2` WHERE procedure_ID='",search_query,"' OR procedure_Def LIKE '%",search_query,"%' ORDER BY ",sortByCol," ",sortType,";");
    PREPARE query FROM @querySQL;
	EXECUTE query; 
END