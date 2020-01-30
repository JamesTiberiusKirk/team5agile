CREATE DEFINER=`root`@`%` PROCEDURE `addNewUser`(newUsername VARCHAR(45), newPassword VARCHAR(45))
BEGIN
	INSERT INTO users (username, password) VALUES (newUsername, newPassword);
END