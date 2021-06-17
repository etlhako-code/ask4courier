SELECT DISTINCT
([COMPANY].[ID])
    ,[TradingName]
    ,[CompanyRegNumber]
    ,[Province]
    ,[IsActive]
    ,[FirstName]
    ,[LastName]
    ,[MobileNumber]
    ,[OfficeNumber]
    ,[Email]
    ,[Rejected]
FROM [dbo].[COMPANY]
INNER JOIN  [dbo].[COMPANY_CONTACT] ON [COMPANY_CONTACT].[CompanyID] = [COMPANY].[ID]
WHERE [COMPANY].[IsActive]=0