SET XACT_ABORT ON;
BEGIN TRANSACTION
   DECLARE @cID int;
      BEGIN
        INSERT INTO [dbo].[QUOTE]
            (
               [Frequency]
		      ,[Commodity]
	          ,[NumberOfPackages]
              ,[CreatedOn]
            )
            VALUES 
            (
                @Frequency,
                @Commodity,
                @NumberOfPackages,
                @CreatedOn
            );
        SELECT @cID = scope_identity();

        INSERT INTO [dbo].[QUOTE_CONTACT]
            (
                [QuoteID]
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
        INSERT INTO [dbo].[DIMENSIONS]
            (
                [QuoteID]
               ,[PackageLength]
		       ,[PackageWitdth]
		       ,[PackageHeight]
		       ,[PackageWeight]
               ,[CreatedOn]

            )
        VALUES
            (
                @cID,
                @PackageLength,
		        @PackageWitdth,
		        @PackageHeight,
		        @PackageWeight,
                @CreatedOn
            );
        INSERT INTO [dbo].[DESTINATION]
            (
                [QuoteID]
               ,[DestinationLoc]
		       ,[DestinationArea]
               ,[CreatedOn]

            )
        VALUES
            (
                @cID,
                @DestinationLoc,
		        @DestinationArea,
                @CreatedOn
            );
        INSERT INTO [dbo].[PICKUP]
            (
                [QuoteID]
               ,[PickUpLoc]
		       ,[PickUpArea]
               ,[CreatedOn]

            )
        VALUES
            (
                @cID,
                @PickUpLoc,
		        @PickUpArea,
                @CreatedOn
            );
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

