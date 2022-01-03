'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
const fs = require('fs');
const projectsJson = require("./assets/projects.json")

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

//let projects = JSON.parse(fs.readFileSync(projectsJson));
let projects = projectsJson;

let phidgets = {
  "A": 312483,
  "B": 478550,
  "C": 257037
};

function getPhidghetSerial(phidget) {
  return phidgets[phidget]
}

async function createWindow() {
  // Create the browser window.

  if (!isDevelopment) {
    var frame = false;
  } else {
    var frame = true;
  }

  const win = new BrowserWindow({
    width: 2492,
    height: 1139,
    frame: frame,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (!isDevelopment) {
    // Hide the menubar
    win.setAutoHideMenuBar(true)

    // Maximize the window
    win.maximize()

    win.setAlwaysOnTop(true, 'screen');

    win.resizable = false;
  }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
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
  for (const phidgetLetter in data) {
    let serial = getPhidghetSerial(phidgetLetter);

    for (const key in data[phidgetLetter]) {

      let channel = data[phidgetLetter][key];

      

      registeredPhidgets
        .filter(value => value.getSerial() == serial && value.getChannel() === channel)
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
//var conn = new phidget22.Connection(5661, 'localhost');
//conn.connect().then(initializePhidgets(projects))

var conn = new phidget22.Connection({
	hostname: "localhost",
	port: 5661,
	name: "Phidget Server Connection",
	passwd: "",
	onAuthenticationNeeded: function() { return "password"; },
	onError: function(code, msg) { console.error("Connection Error:", msg); },
	onConnect: function() { console.log("Connected"); },
	onDisconnect: function() { console.log("Disconnected"); }
});

conn.connect().catch(function(err) {
	console.error("Error during connecting to phidget:", err);
}).then(initializePhidgets(projects));

async function initializePhidgets(projects) {

  for (var projectKey in projects) {
    var projectPhidget = projects[projectKey]['phidget'];

    for (var phidgetLetter in projectPhidget) {

      let phidgetSerial = getPhidghetSerial(phidgetLetter);

      for (var phidgetChannel in projectPhidget[phidgetLetter]) {
        let channel = projectPhidget[phidgetLetter][phidgetChannel];

        setTimeout(function() {
          if (registeredPhidgets.filter(value => value.getSerial() == phidgetSerial && value.getChannel() == channel).length === 0) {
            registeredPhidgets.push(new PhidgetLight(phidgetSerial, channel));
          }
        }, 150)
        
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

ipcMain.on('turn-off-lights', (event, data) => {
  deactivateLights();
});