--AUTHOR :
--CREATED:

--DROP AND/OR CREATE DATABASE
DROP DATABASE  IF EXISTS   ASK_FOR_COURIER
CREATE DATABASE ASK_FOR_COURIER

USE ASK_FOR_COURIER

	BEGIN TRANSACTION
		-- attempt to run DROP TABLE only if it exists
		GO  --Drop Tables for Quote And related
			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'DIMENSIONS')
				DROP TABLE [dbo].[DIMENSIONS];
		
			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'PICKUP') 
				DROP TABLE IF EXISTS [dbo].[PICKUP];
			
			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'DESTINATION') 
				DROP TABLE IF EXISTS [dbo].[DESTINATION];
	
			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'QUOTE_CONTACT')  
				DROP TABLE IF EXISTS [dbo].[QUOTE_CONTACT];

			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'QUOTE')  
				DROP TABLE IF EXISTS [dbo].[QUOTE];

		GO  --DROP Tables For Company and Contact
			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'COMPANY_CONTACT')  
			DROP TABLE [dbo].[COMPANY_CONTACT];  

			IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'COMPANY')  
			DROP TABLE [dbo].[COMPANY];  
    -- CREATE DATABASE TABLES
		--create tables for company
		GO  --create Company
			CREATE TABLE COMPANY  
			(  
			ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,  
			TradingName NvarChar(100) NOT NULL UNIQUE,  
			CompanyRegNumber NvarChar(100) NOT NULL UNIQUE,
			Province NvarChar(50) NOT NULL,
			IsActive BIT NOT NULL DEFAULT 0,
			Rejected BIT NOT NULL DEFAULT 1,
			CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
			UpdatedOn DATETIME
			);
		
		GO  --create company contact
			CREATE TABLE COMPANY_CONTACT
			(
				ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
				FirstName  NvarChar(50) NOT NULL,
				LastName  NvarChar(50) NOT NULL,
				MobileNumber  NvarChar(20) NOT NULL UNIQUE,
				OfficeNumber  NvarChar(20) UNIQUE,
				Email  NvarChar(100) NOT NULL UNIQUE,
				CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
				UpdatedOn DATETIME,
				CompanyID int  NOT NULL,
				CONSTRAINT FK_COMPANY_CONTACT FOREIGN KEY (CompanyID)
					REFERENCES COMPANY (ID)
					ON DELETE CASCADE
					ON UPDATE CASCADE
			);

		--create tables for Quotes
		GO  --create Qoute
			CREATE TABLE QUOTE
			(
				ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
				Frequency  NvarChar(10) NOT NULL,
				Commodity  NvarChar(50) NOT NULL,
				NumberOfPackages Decimal(5,2) NOT NULL,
				CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
				UpdatedOn DATETIME

			);

		GO  --create dimensions
			CREATE TABLE DIMENSIONS
			(
				ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
				PackageLength DECIMAL(5,2) NOT NULL,
				PackageWitdth DECIMAL(5,2) NOT NULL,
				PackageHeight DECIMAL(5,2) NOT NULL,
				PackageWeight DECIMAL(5,2) NOT NULL,
				CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
				UpdatedOn DATETIME,
				QuoteID int  NOT NULL,
				CONSTRAINT FK_QUOTE_DIMENSIONS FOREIGN KEY (QuoteID)
				REFERENCES QUOTE(ID)
				ON DELETE CASCADE
				ON UPDATE CASCADE
			);
		GO  --create quote contact
			CREATE TABLE QUOTE_CONTACT
			(  
				ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
				FirstName  NvarChar(50) NOT NULL,
				LastName  NvarChar(50) NOT NULL,
				MobileNumber  NvarChar(20) NOT NULL,
				OfficeNumber  NvarChar(20),
				Email  NvarChar(100) NOT NULL,
				CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
				UpdatedOn DATETIME,
				QuoteID int  NOT NULL,
				CONSTRAINT FK_QOUTE_CONTACT FOREIGN KEY (QuoteID)
					REFERENCES QUOTE(ID)
					ON DELETE CASCADE
					ON UPDATE CASCADE
			);
		GO  --create pickup
			CREATE TABLE PICKUP   
			(  
				ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,  
				PickUpLoc  NvarChar(100) NOT NULL,
				PickUpArea  NvarChar(100) NOT NULL,
				CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
				UpdatedOn DATETIME,
				QuoteID int  NOT NULL,
				CONSTRAINT FK_QOUTE_PICKUP FOREIGN KEY (QuoteID)
					REFERENCES QUOTE(ID)
					ON DELETE CASCADE
					ON UPDATE CASCADE	 
			);
		GO  --create destination
			CREATE TABLE DESTINATION
			(  
				ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,  
				DestinationLoc  NvarChar(100) NOT NULL,
				DestinationArea  NvarChar(100) NOT NULL,
				CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
				UpdatedOn DATETIME,
				QuoteID int  NOT NULL,
				CONSTRAINT FK_QOUTE_DESTINATION FOREIGN KEY (QuoteID)
					REFERENCES QUOTE(ID)
					ON DELETE CASCADE
					ON UPDATE CASCADE	 
			);


	COMMIT

--BACK UP NEW CHANGES OF DATABASE TO FILE
BACKUP DATABASE databasename
TO DISK = 'filepath'
WITH DIFFERENTIAL;



--INSERT QUOTE IF NOT PRESENT
IF NOT EXISTS ( SELECT 1 FROM [QUOTE] WHERE TradingName = 'testcompany1' AND CompanyRegNumber = '445gh66723hnb' )
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
	END
--ELSE

----------------------------------RESEARCH-----------------------------------
--CONVERT (date, GETDATE())
--ALTER TABLE [dbo].[COMPANY] ADD CONSTRAINT DF_IsActive DEFAULT 0 FOR IsActive
--ADD Rejected BIT NOT NULL DEFAULT 1,
--DROP DATABASE  IF EXISTS   AskforCourier
--BEGIN
--RAISEERROR ('EmployeeID does not exist.', 11, 1)
--END
