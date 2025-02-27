<cfquery name="drop" datasource="contactmgr">
    DROP TABLE IF EXISTS contacts
</cfquery>

<cfquery name="create" datasource="contactmgr">
    CREATE TABLE contacts (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        firstname VARCHAR(50),
        lastname VARCHAR(50),
        email VARCHAR(100),
        cellphone VARCHAR(15)

    )
</cfquery>

<cfquery name="insert" datasource="contactmgr">
    INSERT INTO contacts (firstname, lastname, email, cellphone) 
    VALUES('Bob', 'Jacobs', 'bob.jacobs@gmail.com','555-555-5511')
</cfquery>
