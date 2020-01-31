CREATE DEFINER=`root`@`%` PROCEDURE `getAllOptions`()
BEGIN
	SELECT * FROM `options`;
END