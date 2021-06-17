
IF EXISTS ( SELECT * FROM [dbo].[COMPANY] WHERE [dbo].[COMPANY].[ID]=@ID )
    BEGIN
        UPDATE [dbo].[COMPANY]
        SET 
            [IsActive]=@IsActive
        ,[UpdatedOn]=@UpdatedOn
        ,[Rejected]=@Rejected
            
        WHERE [COMPANY].[ID]=@ID;
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
        INNER JOIN  [dbo].[COMPANY_CONTACT] ON [COMPANY_CONTACT].[CompanyID] = @ID
    END

  
