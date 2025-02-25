component {
    
  cfheader( name="Content-Type", value="application/json" );
  cfheader( name="Access-Control-Allow-Origin", value="*" );

    // List all contacts
    remote array function listContacts() {
        var contacts = [
            {
                "firstname": "Bob",
                "lastname": "Jacobs",
                "email": "bob.jacobs@email.com",
                "cellphone": "(555) 123-4567",
                "id": 1
              },
              {
                "firstname": "Liam",
                "lastname": "Chen",
                "email": "liam.chen@email.com",
                "cellphone": "(555) 234-5678",
                "id": 2
              },
              {
                "firstname": "Sophia",
                "lastname": "Patel",
                "email": "sophia.p@email.com",
                "cellphone": "(555) 345-6789",
                "id": 3
              },
              {
                "firstname": "Noah",
                "lastname": "Williams",
                "email": "noah.w@email.com",
                "cellphone": "(555) 456-7890",
                "id": 4
              },
              {
                "firstname": "Ava",
                "lastname": "Johnson",
                "email": "ava.j@email.com",
                "cellphone": "(555) 567-8901",
                "id": 5
              }
        ];
        return contacts;
    }

    // Add a new contact
    remote struct function addContact(required string name, required string email) {
        var newContact = {
            id: createUUID(),
            name: arguments.name,
            email: arguments.email
        };
        
        // Here you would typically insert the new contact into a database
        // For this example, we'll just return the new contact
        return newContact;
    }
}