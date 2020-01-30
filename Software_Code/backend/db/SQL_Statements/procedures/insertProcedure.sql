CREATE DEFINER=`root`@`%` PROCEDURE `insertProcedure`(new_procedureID VARCHAR(4), new_procedureDef VARCHAR(45))
BEGIN
	INSERT INTO `procedure` (procedure_ID, procedure_Def) VALUES (new_procedureID, new_procedureDef);
END