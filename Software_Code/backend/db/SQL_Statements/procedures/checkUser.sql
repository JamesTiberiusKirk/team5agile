CREATE DEFINER=`root`@`%` PROCEDURE `checkUser`(userNameToSearch VARCHAR(45), passwordToCheck VARCHAR(45))
BEGIN
	SET @passwordStored = (SELECT password FROM `users` WHERE username=userNameToSearch);
    if (@passwordStored != Null)
	THEN
		if(@hashsaltStored = hashsaltToCheck)
        THEN
        	SELECT True;
		else
			SELECT False;   
		end if;
	end if;
END