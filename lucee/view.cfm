<cfquery name="getData" datasource="contactmgr">
    SELECT * 
    FROM contacts
    ORDER BY ID
</cfquery>

<cfdump var="#getData#" />


<cfscript>
    myQuery = queryExecute("SELECT id, firstname, lastname, email, cellphone FROM contacts ORDER BY lastname ASC", {}, {datasource="contactmgr",returntype="array"} );
</cfscript>