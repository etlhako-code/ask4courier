SET XACT_ABORT ON;
BEGIN TRANSACTION
    DECLARE @cID int;
    BEGIN
        UPDATE [dbo].[QUOTE]
        SET
            [Frequency]= @Frequency
		   ,[Commodity]= @Commodity
	       ,[NumberOfPackages]=@NumberOfPackages
           ,[UpatedOn]= @CreatedOn
        WHERE [dbo].[QUOTE]=@ID
        SELECT @cID = scope_identity();

        UPDATE [dbo].[COMPANY_CONTACT]
        SET
             [FirstName]=@FirstName
            ,[LastName]=@LastName
            ,[MobileNumber]=@MobileNumber
            ,[OfficeNumber]=@OfficeNumber
            ,[Email]=@Email
            ,[UpdatedOn]=@UpdatedOn

        WHERE [QuoteID]=@cID;
        UPDATE [dbo].[DIMENSIONS]
        SET

            [PackageLength]=@PackageLength
		    ,[PackageWitdth]=@PackageWitdth
		    ,[PackageHeight]=@PackageHeight
		    ,[PackageWeight]=@PackageWeight
            ,[UpdatedOn]=@UpdatedOn

        WHERE [QuoteID]=@cID;

        UPDATE [dbo].[DESTINATION]
        SET

            [DestinationLoc]=@DestinationLoc
		    ,[DestinationArea]=@DestinationArea
            ,[CreatedOn]=@CreatedOn

        WHERE [QuoteID]=@cID;
        UPDATE [dbo].[PICKUP]
        SET

            [PickUpLoc]=@PickUpLoc
		   ,[PickUpArea]=@PickUpArea
           ,[CreatedOn]=@CreatedOn

        WHERE [QuoteID]=@cID;

        SELECT DISTINCT
            ([QUOTE].[ID])
            ,[Frequency]
            ,[Commodity]
            ,[NumberOfPackages]

            ,[PackageLength]
            ,[PackageWitdth]
            ,[PackageHeight]
            ,[PackageWeight]

            ,[FirstName]
            ,[LastName]
            ,[MobileNumber]
            ,[OfficeNumber]
            ,[Email]

            ,[PickUpLoc]
            ,[PickUpArea]

            ,[DestinationLoc]
            ,[DestinationArea]
            ,[QUOTE].[CreatedOn]
            ,[QUOTE].[UpdatedOn]
        FROM [dbo].[QUOTE]
        INNER JOIN  [dbo].[QUOTE_CONTACT] ON [QUOTE_CONTACT].[QuoteID] = [QUOTE].[ID]
        INNER JOIN  [dbo].[DESTINATION] ON [DESTINATION].[QuoteID] = [QUOTE].[ID]
        INNER JOIN  [dbo].[PICKUP] ON [PICKUP].[QuoteID] = [QUOTE].[ID]

    END
COMMIT

