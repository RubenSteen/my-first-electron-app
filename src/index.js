const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env' })

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json')));

// Creating app window
const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 2401,
    height: 1140,
    //show: false,
    //frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Hide the menubar
  //mainWindow.setAutoHideMenuBar(true)

  // Maximize the window
  //mainWindow.maximize()

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

function deactivateLights() {
  // Filter out the activated PhidgetLight instances

    registeredPhidgets
      .filter(value => value.isActivated())
      // and deactivate
      .forEach(phidgetLight => phidgetLight.deactivate());
  
}

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

let registeredPhidgets = [];

// Require phidget (https://www.phidgets.com/)
// Using the module : https://www.phidgets.com/?tier=3&catid=2&pcid=1&prodid=1019 (1202_2 - PhidgetInterfaceKit 0/16/16)
// Code example : https://www.phidgets.com/?tier=3&catid=2&pcid=1&prodid=1019
var phidget22 = require('phidget22');

// Create connection to Phidget
var conn = new phidget22.Connection(5661, 'localhost');
conn.connect().then(initializePhidgets(projects))

function initializePhidgets(projects) {

  for (projectKey in projects) {
    projectPhidget = projects[projectKey]['phidget'];
    for (phidgetSerial in projectPhidget) {
      for (phidgetChannel in projectPhidget[phidgetSerial]) {
        let channel = projectPhidget[phidgetSerial][phidgetChannel];

        // If the phidget channel has not been registered before for that phidgetSerial then attach to it.
        if (registeredPhidgets.filter(value => value.getSerial() == phidgetSerial && value.getChannel() == channel).length === 0) {
          registeredPhidgets.push(new PhidgetLight(phidgetSerial, channel));
        }
        
      }
    }
  }
  
}

// Function is getting called from renderer.js
ipcMain.on('turn-on-lights', (event, data) => {

  // Since we only want the new lights to be lit, we deactivate the other lights first
  deactivateLights();

  activateLights(data);
});