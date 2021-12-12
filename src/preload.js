// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var phidget22 = require('phidget22');

function runExample() {
	//Create your Phidget channels
	var digitalOutput14 = new phidget22.DigitalOutput();
	var digitalOutput15 = new phidget22.DigitalOutput();

	//Set addressing parameters to specify which channel to open (if any)
	digitalOutput14.setDeviceSerialNumber(257037);
	digitalOutput14.setChannel(14);
	digitalOutput15.setDeviceSerialNumber(257037);
	digitalOutput15.setChannel(15);


	//Open your Phidgets and wait for attachment
	var openPromiseList = [];
	openPromiseList.push(digitalOutput14.open(5000))
	openPromiseList.push(digitalOutput15.open(5000))

	Promise.all(openPromiseList).then(function(values) {

		//Do stuff with your Phidgets here or in your event handlers.
		digitalOutput14.setDutyCycle(1);
		digitalOutput15.setDutyCycle(1);

		setTimeout(function () {
			//Close your Phidgets once the program is done.
			digitalOutput14.close();
			digitalOutput15.close();
			process.exit(0);
		}, 5000);
	});
}

var conn = new phidget22.Connection(5661, 'localhost');
conn.connect();