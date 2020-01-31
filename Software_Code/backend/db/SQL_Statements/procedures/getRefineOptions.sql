CREATE DEFINER=`root`@`%` PROCEDURE `getRefineOptions`(byProcID VARCHAR(4), byProcName VARCHAR(75), byProvidName VARCHAR(75), byProvidState VARCHAR(45))
BEGIN
	SELECT * FROM `options` WHERE (INSTR(procedure_ID,byProcID)) OR INSTR(procedure_Def,byProcName) OR INSTR(provider_Name,byProvidName) AND INSTR(provider_State,byProvidState);
END