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
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Hide the menubar
  mainWindow.setAutoHideMenuBar(true)

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
  conn.connect();

// Attach listener in the main process with the given ID
ipcMain.on('request-mainprocess-action', (event, data) => {

  // let data = {
  //   "project": "Het stadhuis",
  //   "description": "Een beschrijving over het stadhuis",
  //   "images": {
  //       "image1": "limousine",
  //       "image2": "ktm-duke",
  //    },
  //   "phidget": {
  //       "257037" : [
  //           0,8,15
  //       ],
  //       "696969" : [
  //           0,8,15
  //       ]
  //   }
  // };

    // console.log(data.phidget);

    // for (const property in data.phidget) {
    //   //console.log(`${property}: ${data.phidget[property]}`);

    //   var digitalOutput = new phidget22.DigitalOutput();
    //   digitalOutput.setDeviceSerialNumber(data.phidget[property]);

    //   for (const key in data.phidget[property]) {
    //     //console.log(`${property}: ${data.phidget[property][key]}`);

    //     digitalOutput.setChannel(data.phidget[property][key]);
    //   }
    // }

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

    

      // //Create your Phidget channels
      // var digitalOutput = new phidget22.DigitalOutput();
    
      // //Set addressing parameters to specify which channel to open (if any)
      // digitalOutput.setDeviceSerialNumber(257037);
      // digitalOutput.setChannel(15);
    
      // //Assign any event handlers you need before calling open so that no events are missed.
    
      // //Open your Phidgets and wait for attachment
      // digitalOutput.open(5000).then(function() {
    
      //   //Do stuff with your Phidgets here or in your event handlers.
      //   digitalOutput.setDutyCycle(1);
    
      //   setTimeout(function () {
      //     //Close your Phidgets once the program is done.
      //     digitalOutput.close();
      //   }, 5000);
      // });



  

	// //Create your Phidget channels
	// var digitalOutput14 = new phidget22.DigitalOutput();
	// var digitalOutput15 = new phidget22.DigitalOutput();

	// //Set addressing parameters to specify which channel to open (if any)
	// digitalOutput14.setDeviceSerialNumber(257037);
	// digitalOutput14.setChannel(14);
	// digitalOutput15.setDeviceSerialNumber(257037);
	// digitalOutput15.setChannel(15);


	// //Open your Phidgets and wait for attachment
	// var openPromiseList = [];
	// openPromiseList.push(digitalOutput14.open(5000))
	// openPromiseList.push(digitalOutput15.open(5000))

	// Promise.all(openPromiseList).then(function(values) {

	// 	//Do stuff with your Phidgets here or in your event handlers.
	// 	digitalOutput14.setDutyCycle(1);
	// 	digitalOutput15.setDutyCycle(1);

	// 	setTimeout(function () {
	// 		//Close your Phidgets once the program is done.
	// 		digitalOutput14.close();
	// 		digitalOutput15.close();

  //     // Closes the application
	// 		// process.exit(0);
	// 	}, 5000);
    
	// });

  // Return some data to the renderer process with the mainprocess-response ID
  event.sender.send('mainprocess-response', data);
});