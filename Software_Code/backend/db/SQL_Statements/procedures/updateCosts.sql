CREATE DEFINER=`root`@`%` PROCEDURE `updateCosts`(costID int, procedID VARCHAR(4), providID int, new_Covered DECIMAL(15,2), new_Total DECIMAL(15,2), new_Medicare DECIMAL(15,2))
BEGIN
	UPDATE `costs` SET procedure_ID=procedID, provider_ID=providID, avg_Covered_Charges=new_Covered, avg_Total_Payments=new_Total, avg_Medicare_Payments=new_Medicare WHERE cost_ID=costID;
END