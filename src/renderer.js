const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

let projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json')));  

var elements = document.getElementsByClassName("clickable");

var myFunction = function() {
    var project = this.getAttribute("data-project");
    ipcRenderer.send('turn-on-lights', projects[project]['phidget']);
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', myFunction, false);
}