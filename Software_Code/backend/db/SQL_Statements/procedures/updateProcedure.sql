CREATE DEFINER=`root`@`%` PROCEDURE `updateProcedure`(prodIDToUpdate VARCHAR(4), newDef VARCHAR(75))
BEGIN
	UPDATE `procedure` SET procedure_Def=newDef WHERE procedure_ID=prodIDToUpdate;
END