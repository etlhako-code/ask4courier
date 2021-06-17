BEGIN
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
    WHERE  [QUOTE].[ID]=@ID AND  [PICKUP].[QuoteID] = @ID AND  [DESTINATION].[QuoteID] = @ID AND  [QUOTE_CONTACT].[QuoteID] = @ID
END