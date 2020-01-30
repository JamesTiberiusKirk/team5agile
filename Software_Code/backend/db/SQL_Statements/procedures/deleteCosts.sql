CREATE DEFINER=`root`@`%` PROCEDURE `deleteCosts`(costIDToDelete int)
BEGIN
	DELETE FROM `costs` WHERE cost_ID=costIDToDelete;
END