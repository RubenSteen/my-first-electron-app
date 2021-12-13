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

//  let data2 = {
//     "projecten": {
//       0: {
//         "titel": "Keizersbrug",
//         "omschrijving": "Woningstichting realiseerde 11 appartementen en 1 bedrijfsruimte op de begane grond.",
//         "architect": "Kapitein Jacobs Kapitein te Den Helder",
//         "ontwikkelaar": "Woningstichting Den Helder",
//         "aannemer": "aannemingsbedrijf Dozy BV",
//         "gebruiker": "n.v.t",
//         "planning": "juni 2014 opgeleverd",
//         "informatie": "Neem voor meer informatie contact op met Woningstichting Den Helder (0223 677677) of bekijk de website www.wsdh.nl ",
//         "plaatjes": {
//             "plaatje": "img_1.jpg",
//             "plaatje": "img_1.jpg",
//         },
//         "phidget": {
//             "257037" : [
//                 15, 6
//             ],
//             // "696969" : [
//             //     0,8,15
//             // ],
//         },
//       },
//       1: {
//         "titel": "School 7 bibliotheek Den Helder",
//         "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
//         "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
//         "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
//         "aannemer": "aannemingsbedrijf Dozy BV",
//         "gebruiker": "Kopgroep bibliotheken Den Helder",
//         "planning": "april 2016 opgeleverd",
//         "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
//         "plaatjes": {
//             "plaatje": "img_2.jpg"
//         },
//         "phidget": {
//             "257037" : [
//                 15, 6
//             ],
//             // "696969" : [
//             //     0,8,15
//             // ],
//         },
//       }
//     }
//   }

// // Add the event listener for the response from the main process
// ipcRenderer.on('mainprocess-response', (event, arg) => {
//     console.log(arg); // prints "Hello World!"
// });

// // Send information to the main process
// // if a listener has been set, then the main process
// // will react to the request !
// ipcRenderer.send('request-mainprocess-action', data);


document.getElementById('button1').addEventListener('click', function(){
    console.log(`project: ${this.dataset.project}`)
});

document.getElementById('button2').addEventListener('click', function(){
    console.log(`project: ${this.dataset.project}`)
});

document.getElementById('button3').addEventListener('click', function(){
    console.log(`project: ${this.dataset.project}`)
});

document.getElementById('button4').addEventListener('click', function(){
    console.log(`project: ${this.dataset.project}`)
});

document.getElementById('button5').addEventListener('click', function(){
    console.log(`project: ${this.dataset.project}`)
});