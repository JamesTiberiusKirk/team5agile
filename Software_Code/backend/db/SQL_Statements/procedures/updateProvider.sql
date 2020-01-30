CREATE DEFINER=`root`@`%` PROCEDURE `updateProvider`(providIDToUpdate int, newName VARCHAR(75), newStreetAdd VARCHAR(45), newCity VARCHAR(45), newState VARCHAR(45), newRating int, newLat DECIMAL(15,10), newLong DECIMAL(15,10))
BEGIN
	UPDATE `provider` SET provider_Name=newName, provider_StreetAdd=newStreetAdd, provider_City=newCity, provider_State=newState, provider_Rating=newRating, provider_Latitude=newLat, provider_Longitude=newLong WHERE provider_ID=providIDToUpdate;
END