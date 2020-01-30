CREATE DEFINER=`root`@`%` PROCEDURE `deleteProvider`(providIDToDelete int)
BEGIN
	DELETE FROM `provider` WHERE provider_ID=providIDToDelete;
END