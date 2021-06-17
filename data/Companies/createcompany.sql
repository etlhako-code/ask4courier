SET XACT_ABORT ON;
BEGIN TRANSACTION
   DECLARE @cID int;
   IF NOT EXISTS ( SELECT * FROM [dbo].[COMPANY] WHERE [dbo].[COMPANY].[TradingName]=@TradingName AND [dbo].[COMPANY].[CompanyRegNumber]=@CompanyRegNumber )
    BEGIN
        INSERT INTO [dbo].[COMPANY]
            (
                [TradingName]
                ,[CompanyRegNumber]
                ,[Province]
                ,[CreatedOn]
            )
            VALUES 
            (
                @TradingName,
                @CompanyRegNumber,
                @Province,
                @CreatedOn
            );
        SELECT @cID = scope_identity();
        
        INSERT INTO [dbo].[COMPANY_CONTACT]
            (
                [CompanyID]
                ,[FirstName]
                ,[LastName]
                ,[MobileNumber]
                ,[OfficeNumber]
                ,[Email]
                ,[CreatedOn]

            )
        VALUES
            (
                @cID,
                @FirstName,
                @LastName,
                @MobileNumber,
                @OfficeNumber,
                @Email,
                @CreatedOn
            );
        SELECT
                
                [TradingName]
                ,[CompanyRegNumber]
                ,[Province]
                ,[IsActive]
                ,[FirstName]
                ,[LastName]
                ,[MobileNumber]
                ,[OfficeNumber]
                ,[Email]
                
        FROM [dbo].[COMPANY],[dbo].[COMPANY_CONTACT] 
        WHERE [dbo].[COMPANY].[ID]= @cID;
    END
   ELSE
    SELECT 'COMPANY EXIST' ,[dbo].[COMPANY].[ID] FROM [dbo].[COMPANY] WHERE [dbo].[COMPANY].[TradingName]=@TradingName;
COMMIT

