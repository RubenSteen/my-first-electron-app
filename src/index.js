const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config({ path: '.env' })

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Creating app window
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    //frame: false, // Makes the application fullscreen without close buttons
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Hide the menubar
  //mainWindow.setAutoHideMenuBar(true)

  // Maximize the window
  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



// Require phidget (https://www.phidgets.com/)
// Using the module : https://www.phidgets.com/?tier=3&catid=2&pcid=1&prodid=1019 (1202_2 - PhidgetInterfaceKit 0/16/16)
var phidget22 = require('phidget22');

// Create connection to Phidget
var conn = new phidget22.Connection(parseInt(process.env.PHIDGET_PORT), process.env.PHIDGET_HOST);
conn.connect().then(function(data) {
  console.log(`Phidget connection succesfull at ${process.env.PHIDGET_HOST}:${process.env.PHIDGET_PORT}`);
}).catch(function (err) {
	console.error(`Error during connecting to phidget at ${process.env.PHIDGET_HOST}:${process.env.PHIDGET_PORT}`, err);
});

var registeredPhidgets = {};

// Register the whitelisted phidgets that are passed from the renderer process
ipcMain.on('register-phidgets', (event, phidgets) => {

  //Do something with the phidget API so it can detect if the phidgets are connected to the PC

  console.log(phidgets)

  // Register the phidget to variable registeredPhidgets if it has detected it

  // Return some data to the renderer process with the mainprocess-response ID
  event.sender.send('register-phidgets-response', registeredPhidgets);
});


// Function is getting called from renderer.js
ipcMain.on('turn-on-lights', (event, data) => {

  console.info(data)

  var openPromiseList = [];

  var digitalOutputs = [];

  // Looping over the phidget data that is being send by the renderer process
  for (const property in data.phidget) {

    // Getting the serials of the phidget so I know what phidget to control
    // Example: 257037
    var serial = property;

    for (const key in data.phidget[property]) {

      // Setting the channels of the specified module by serial
      // Example: 15
      var channel = data.phidget[property][key];

      // Setting the dynamic variable name i want to create so I can interact with the Phidget API
      // Example: digitalOutput$257037_15
      var variableName = `digitalOutput$${serial}_${channel}`;

      // Remember which variables were created so I can loop over them later and turn the on/off
      digitalOutputs.push(variableName)

      // Creating the actual variable name
      //eval('var ' + variableName + '= new phidget22.DigitalOutput();');
      eval(`var ${variableName} = new phidget22.DigitalOutput();`);

      // Setting the serials of the module I want to communicate with
      //eval(variableName + '.setDeviceSerialNumber(serial);');
      eval(`${variableName}.setDeviceSerialNumber(${serial});`);

      // Setting the channels I want to turn on/off
      //eval(variableName + '.setChannel(channel);');
      eval(`${variableName}.setChannel(${channel});`);

      // Pushing the to the openPromiseList which i don't really understand what for purpose it server, also not sure about the open function.
      openPromiseList.push(eval(variableName).open(5000))
    }
  }


  Promise.all(openPromiseList).then(function(values) {

    // This is how I currently turn the channels on the phidgets to the 'on' state
    for (const arrayKey in digitalOutputs) {
      var digitalOutput = digitalOutputs[arrayKey];
      eval(digitalOutput + '.setDutyCycle(1);');
    }

    //Close your Phidgets once the program is done.
    setTimeout(function () {

      for (const arrayKey in digitalOutputs) {
        var digitalOutput = digitalOutputs[arrayKey];
        eval(digitalOutput + '.close();');
      }

      // Some function that can be used to call the function below
      // ipcMain.emit('turn-off-lights');
    }, 5000);
      
  });

  // Return some data to the renderer process with the mainprocess-response ID
  event.sender.send('mainprocess-response', data);

  console.log("lights turned on.")
});

ipcMain.on('turn-off-lights', (event, data) => {

  // Finally I want this function to turn off all the active channels.

});