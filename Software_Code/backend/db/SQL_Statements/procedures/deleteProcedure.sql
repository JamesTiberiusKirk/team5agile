CREATE DEFINER=`root`@`%` PROCEDURE `deleteProcedure`(procedIDToDelete VARCHAR(4))
BEGIN
	DELETE FROM `procedure` WHERE procedure_ID=procedIDToDelete;
END