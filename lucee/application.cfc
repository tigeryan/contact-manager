component {
    this.name = "ContactManager";
    this.applicationTimeout = createTimeSpan(0, 1, 0, 0);
    this.sessionManagement = true;
    this.sessionTimeout = createTimeSpan(0, 0, 30, 0);
    this.setClientCookies = true;
    this.serialization.preserveCaseForQueryColumn = true;

    this.datasources.contactmgr = {
    class: "org.h2.Driver",
    connectionString: "jdbc:h2:#ExpandPath("./contactmgr")#;MODE=MSSQLServer",
    username: "sa",
    password: ""
    }

    function onApplicationStart() {
        application.datasource = "your_datasource_name";
        return true;
    }

    function onSessionStart() {
        // Code to run when a session starts
    }

    function onRequestStart(string targetPage) {
        // Code to run at the start of each request
    }

    function onRequest(string targetPage) {
        include targetPage;
    }

    function onRequestEnd() {
        // Code to run at the end of each request
    }

    function onApplicationEnd() {
        // Code to run when the application ends
    }

    function onSessionEnd(struct sessionScope, struct applicationScope) {
        // Code to run when a session ends
    }
}