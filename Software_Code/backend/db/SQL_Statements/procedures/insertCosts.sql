CREATE DEFINER=`root`@`%` PROCEDURE `insertCosts`(new_procedureID VARCHAR(4), new_providerID INT, new_avgCoveredCharges DECIMAL(15,2), new_TotalPayments DECIMAL(15,2), new_MedicarePayments DECIMAL(15,2))
BEGIN
	INSERT INTO costs (procedure_ID, provider_ID, avg_Covered_Charges, avg_Total_Payments, avg_Medicare_Payments) VALUES (new_procedureID, new_providerID, new_avgCoveredCharges, new_TotalPayments, new_MedicarePayments);
END