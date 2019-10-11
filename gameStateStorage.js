var dataBase;
function setupDataBase(){
    // Create a database open request, named "dataBase", version 1
    var request = indexedDB.open("dataBase", 1);
    // Database did NOT already exist, but now created
    request.onupgradeneeded = function() {
        console.log("Database needs update");
        // Save database reference
        dataBase = request.result;
        // Check database to see if objectStore exists. if not, create one
        if (!dataBase.objectStoreNames.contains("gameStateObjectStore")) {
            console.log("Creating ObjectStore")
            dataBase.createObjectStore("gameStateObjectStore",{autoIncrement:true});
        } ;
    };
    request.onsuccess = function() {
        console.log("Successfully opened database")
        // Save database reference
        dataBase = request.result;
    };
    request.onerror = function(){
        console.log("ERROR: could not open database")
    };
};

function saveGame(){
    // Make a transaction object that has "read and write" access to the gameStateObjectStore
    let transaction = dataBase.transaction("gameStateObjectStore", "readwrite");
    // Make a reference to the tokenObjectStore
    let gameStateObjectStore = transaction.objectStore("gameStateObjectStore");
    // Store the token in objectStore for long term storage, with key 1
    gameStateObjectStore.put(board, 1).onsuccess = (event) => {
        console.log("successfully saved game state");
    };
};