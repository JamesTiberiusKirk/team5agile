CREATE DEFINER=`root`@`%` PROCEDURE `addCoordsExistingProvider`(providerID INT, new_providerLatitude DECIMAL(15,10), new_providerLongitude DECIMAL(15,10))
BEGIN
	UPDATE `provider` SET provider_Latitude=new_providerLatitude, provider_Longitude=new_providerLongitude WHERE provider_ID=providerID;
END