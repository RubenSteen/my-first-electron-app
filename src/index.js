const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    //frame: false,
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

// All of the Node.js APIs are available in the preload process.
  // It has the same sandbox as a Chrome extension.
  var phidget22 = require('phidget22');
  var conn = new phidget22.Connection(5661, 'localhost');
  //conn.connect();

// Attach listener in the main process with the given ID
ipcMain.on('request-mainprocess-action', (event, data) => {

    var openPromiseList = [];
    var createdDigitalOutputs = [];

    for (const property in data.phidget) {

      var serial = property;

      for (const key in data.phidget[property]) {

        var channel = data.phidget[property][key];
        var variableName = 'digitalOutput' + serial+channel;

        createdDigitalOutputs.push(variableName)


        eval('var ' + variableName + '= new phidget22.DigitalOutput();');

        eval(variableName + '.setDeviceSerialNumber(serial);');

        eval(variableName + '.setChannel(channel);');

        openPromiseList.push(eval(variableName).open(5000))
      }
    }

    	Promise.all(openPromiseList).then(function(values) {

      //Do stuff with your Phidgets here or in your event handlers.
      for (const property in createdDigitalOutputs) {
        var digitalOutput = createdDigitalOutputs[property];
        eval(digitalOutput + '.setDutyCycle(1);');
      }

      //Close your Phidgets once the program is done.
      setTimeout(function () {
        for (const property in createdDigitalOutputs) {
          var digitalOutput = createdDigitalOutputs[property];
          eval(digitalOutput + '.close();');
        }
      }, 5000);
      
    });

  // Return some data to the renderer process with the mainprocess-response ID
  event.sender.send('mainprocess-response', data);
});