var dataBase;
var gameState;
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
    if(confirm("Any previous game saves will be overwritten")){
        // Make a transaction object that has "read and write" access to the gameStateObjectStore
        let transaction = dataBase.transaction("gameStateObjectStore", "readwrite");
        // Make a reference to the gameStateObjectStore
        let gameStateObjectStore = transaction.objectStore("gameStateObjectStore");
        // Store the board in gameStateObjectStore for long term storage, with key 1
        gameStateObjectStore.put(board, 1).onsuccess = (event) => {
            console.log("successfully saved game state");
        };
    }
};

function loadGame(){
    // Make a transaction object that has "read" access to the gameStateObjectStore
    let transaction = dataBase.transaction("gameStateObjectStore", "readonly");
    // Make a reference to the gameStateObjectStore
    let gameStateObjectStore = transaction.objectStore("gameStateObjectStore");
    // Make a get request to the objectStore, to get the gameState using key 1
    gameStateObjectStore.get(1).onsuccess = (event) => {
        if(event.target.result){
            gameState = event.target.result;
            draw();
        }else{
            alert("No game saves were found")
        }
    }
    gameStateObjectStore.onerror = (event) => {
        console.log("ERROR: Unable to load game");
    }
}