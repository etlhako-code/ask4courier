SET XACT_ABORT ON;
BEGIN TRANSACTION
    DECLARE @cID int;
    UPDATE [dbo].[COMPANY]
    SET 
        [TradingName]=@TradingName
        ,[CompanyRegNumber]=@CompanyRegNumber
        ,[Province]=@Province
        ,[IsActive]=@IsActive
        ,[UpdatedOn]=@UpdatedOn

    WHERE [COMPANY].[ID]=@ID;
    SELECT @cID = scope_identity();
    UPDATE [dbo].[COMPANY_CONTACT]
    SET
        [FirstName]=@FirstName
        ,[LastName]=@LastName
        ,[MobileNumber]=@MobileNumber
        ,[OfficeNumber]=@OfficeNumber
        ,[Email]=@Email
        ,[UpdatedOn]=@UpdatedOn
    WHERE [CompanyID]=@cID;
    
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
    WHERE [dbo].[COMPANY].[ID]= @ID;
COMMIT