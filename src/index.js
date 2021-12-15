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
  var frame = false

  if (process.env.APP_ENV === 'local') {
    frame = true
  }

  const mainWindow = new BrowserWindow({
    show: false,
    frame: frame, // Makes the application fullscreen without close buttons
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  if (process.env.APP_ENV === 'local') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // Hide the menubar
    mainWindow.setAutoHideMenuBar(true)
  }

  

  // Maximize the window
  mainWindow.maximize()

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
var phidget22 = require('phidget22');
const { exit } = require('process');

// Create connection to Phidget
var conn = new phidget22.Connection(parseInt(process.env.PHIDGET_PORT), process.env.PHIDGET_HOST);
conn.connect().then(function(data) {
  console.log(`Phidget connection succesfull at ${process.env.PHIDGET_HOST}:${process.env.PHIDGET_PORT}`);
}).catch(function (err) {
	console.error(`Error during connecting to phidget at ${process.env.PHIDGET_HOST}:${process.env.PHIDGET_PORT}`, err);
});

let registeredPhidgets = [];


// Register the whitelisted phidgets that are passed from the renderer process
ipcMain.on('register-phidgets', (event, projects) => {


  // Register the phidget to variable registeredPhidgets if it has detected it
  for (projectKey in projects) {
    projectPhidget = projects[projectKey]['phidget'];
    for (phidgetSerial in projectPhidget) {
      for (phidgetChannel in projectPhidget[phidgetSerial]) {
        let channel = projectPhidget[phidgetSerial][phidgetChannel];


        // This is still creating duplicates, which bring some errors.
        /*  
          name: 'PhidgetError',
          errorCode: 3,
          message: 'Open timed out'
        */
        registeredPhidgets.push(new PhidgetLight(phidgetSerial, channel));

        
      }
    }
  } 
  
  // Return some data to the renderer process with the mainprocess-response ID
  // event.sender.send('register-phidgets-response', registeredPhidgets);
});


// Function is getting called from renderer.js
ipcMain.on('turn-on-lights', (event, data) => {

  // Since we only want the new lights to be lit, we deactivate the other lights first
  deactivateLights();

  activateLights(data.phidget);

  // Return some data to the renderer process with the mainprocess-response ID
  event.sender.send('mainprocess-response', data);
});

ipcMain.on('turn-off-lights', (event, data) => {

  // Finally I want this function to turn off all the active channels.
  registeredPhidgets
      .filter(value => value.isActivated())
      .forEach(phidgetLight => phidgetLight.deactivate());

});

function activateLights(data) {
  // Filter out the PhidgetLight instances that now should be activated by serial and channel

  // // Looping over the phidget data that is being send by the renderer process
  for (const serial in data) {

    for (const key in data[serial]) {

      let channel = data[serial][key];

      registeredPhidgets
      .filter(value => value.getSerial() === serial && value.getChannel() === channel)
      // and activate each
      .forEach(phidgetLight => phidgetLight.activate());
      
      
      
    }
  }
}

function deactivateLights() {
  // Filter out the activated PhidgetLight instances
  registeredPhidgets
      .filter(value => value.isActivated())
      // and deactivate
      .forEach(phidgetLight => phidgetLight.deactivate());
}

class PhidgetLight {
  constructor(serial, channel) {
    this.serial = serial;
    this.channel = channel;
    this.digitalOutput = new phidget22.DigitalOutput();
    this.digitalOutput.setDeviceSerialNumber(this.serial);
    this.digitalOutput.setChannel(this.channel);
    this.digitalOutput.open(5000).catch(function (err) {
      console.error("Error during open:", err);
    });
    this.open = true;
    this.activated = false;
  }

  activate() {
    if (this.open) {
      this.digitalOutput.setDutyCycle(1).catch(function (err) {
        console.error("Error during open:", err);
      });
      this.activated = true;
      return true;
    }
    return false;
  }

  deactivate() {
    if (this.open) {
      this.digitalOutput.setDutyCycle(0).catch(function (err) {
        console.error("Error during open:", err);
      });
      this.activated = false;
      return true;
    }
    return false;
  }

  close() {
    this.digitalOutput.close();
    this.open = false;
    return true;
  }

  getSerial() {
    return this.serial;
  }

  getChannel() {
    return this.channel;
  }

  isActivated() {
    return this.activated;
  }

  isOpen() {
    return this.open;
  }
}