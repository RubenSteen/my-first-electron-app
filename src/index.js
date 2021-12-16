const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config({ path: '.env' })

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Creating app window
const createWindow = () => {

  const mainWindow = new BrowserWindow({
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
    }
  });

  mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

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
// Code example : https://www.phidgets.com/?tier=3&catid=2&pcid=1&prodid=1019
var phidget22 = require('phidget22');

// Create connection to Phidget
var conn = new phidget22.Connection(parseInt(process.env.PHIDGET_PORT), process.env.PHIDGET_HOST);
conn.connect().then(function(data) {
  console.log(`Phidget connection succesfull at ${process.env.PHIDGET_HOST}:${process.env.PHIDGET_PORT}`);
}).catch(function (err) {
	console.error(`Error during connecting to phidget at ${process.env.PHIDGET_HOST}:${process.env.PHIDGET_PORT}`, err);
});

 //Create your Phidget channels
 var digitalOutput15 = new phidget22.DigitalOutput();

 //Set addressing parameters to specify which channel to open (if any)
 digitalOutput15.setDeviceSerialNumber(312483);
 digitalOutput15.setChannel(15);

 //Assign any event handlers you need before calling open so that no events are missed.

 //Open your Phidgets and wait for attachment
 digitalOutput15.open(5000).then(function() {

   //Do stuff with your Phidgets here or in your event handlers.
   digitalOutput15.setDutyCycle(1);

   setTimeout(function () {
     //Close your Phidgets once the program is done.
     digitalOutput15.close();
     process.exit(0);
   }, 5000);
 });