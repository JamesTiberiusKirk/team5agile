CREATE DEFINER=`root`@`%` PROCEDURE `sortOptionsPages`(byProcedCode VARCHAR(75), byProcedName VARCHAR(75), byProvidName VARCHAR(75), byProvidState VARCHAR(45), sortByCol VARCHAR(45), sortType VARCHAR(45), rowStart int, numRows int)
BEGIN
	SET @queryText = CONCAT("SELECT * FROM `options` WHERE INSTR(procedure_ID,'", byProcedCode, "') OR INSTR(procedure_Def,'", byProcedName, "') AND INSTR(provider_Name,'", byProvidName, "') AND INSTR(provider_State,'", byProvidState, "')", "ORDER BY ", sortByCol, " LIMIT ", numRows," OFFSET ", rowStart);
    PREPARE query FROM @queryText;
    EXECUTE query;
END