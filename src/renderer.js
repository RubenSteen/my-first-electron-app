const { ipcRenderer } = require('electron');

// Some data that will be sent to the main process
let data = {
    "project": "Het stadhuis",
    "description": "Een beschrijving over het stadhuis",
    "images": {
        "image1": "limousine",
        "image2": "ktm-duke",
     },
    "phidget": {
        "257037" : [
            15, 6
        ],
        // "696969" : [
        //     0,8,15
        // ],
    }
 };

// Add the event listener for the response from the main process
ipcRenderer.on('mainprocess-response', (event, arg) => {
    console.log(arg); // prints "Hello World!"
});

// Send information to the main process
// if a listener has been set, then the main process
// will react to the request !
ipcRenderer.send('request-mainprocess-action', data);