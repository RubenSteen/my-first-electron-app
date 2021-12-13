const { ipcRenderer } = require('electron');

 let data = {
    "loading": false,
    "projecten": {
      1: {
        "titel": "Keizersbrug",
        "omschrijving": "Woningstichting realiseerde 11 appartementen en 1 bedrijfsruimte op de begane grond.",
        "architect": "Kapitein Jacobs Kapitein te Den Helder",
        "ontwikkelaar": "Woningstichting Den Helder",
        "aannemer": "aannemingsbedrijf Dozy BV",
        "gebruiker": "n.v.t",
        "planning": "juni 2014 opgeleverd",
        "informatie": "Neem voor meer informatie contact op met Woningstichting Den Helder (0223 677677) of bekijk de website www.wsdh.nl ",
        "plaatjes": {
            "plaatje": "img_1.jpg",
            "plaatje": "img_1.jpg",
        },
        "phidget": {
            "257037" : [
                15
            ],
        },
      },
      2: {
        "titel": "School 7 bibliotheek Den Helder",
        "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
        "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
        "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
        "aannemer": "aannemingsbedrijf Dozy BV",
        "gebruiker": "Kopgroep bibliotheken Den Helder",
        "planning": "april 2016 opgeleverd",
        "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
        "plaatjes": {
            "plaatje": "img_2.jpg"
        },
        "phidget": {
            "312483" : [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
            ],
        },
      },
      3: {
        "titel": "School 7 bibliotheek Den Helder",
        "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
        "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
        "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
        "aannemer": "aannemingsbedrijf Dozy BV",
        "gebruiker": "Kopgroep bibliotheken Den Helder",
        "planning": "april 2016 opgeleverd",
        "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
        "plaatjes": {
            "plaatje": "img_2.jpg"
        },
        "phidget": {
            "478550" : [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
            ],
        },
      },
      4: {
        "titel": "School 7 bibliotheek Den Helder",
        "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
        "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
        "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
        "aannemer": "aannemingsbedrijf Dozy BV",
        "gebruiker": "Kopgroep bibliotheken Den Helder",
        "planning": "april 2016 opgeleverd",
        "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
        "plaatjes": {
            "plaatje": "img_2.jpg"
        },
        "phidget": {
            "257037" : [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
            ],
        },
      },
      5: {
        "titel": "School 7 bibliotheek Den Helder",
        "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
        "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
        "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
        "aannemer": "aannemingsbedrijf Dozy BV",
        "gebruiker": "Kopgroep bibliotheken Den Helder",
        "planning": "april 2016 opgeleverd",
        "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
        "plaatjes": {
            "plaatje": "img_2.jpg"
        },
        "phidget": {
            "312483" : [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
            ],
            "478550" : [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
            ],
            "257037" : [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
            ],
        },
      },
    }
  }

// // // Add the event listener for the response from the main process
// ipcRenderer.on('mainprocess-response', (event, data) => {
//     console.log(data); // prints "Hello World!"
// });

// // // Send information to the main process
// // // if a listener has been set, then the main process
// // // will react to the request !
// ipcRenderer.send('turn-on-lights', data);


document.getElementById('button1').addEventListener('click', function(){
    ipcRenderer.send('turn-on-lights', data.projecten[this.dataset.project]);
});

document.getElementById('button2').addEventListener('click', function(){
    ipcRenderer.send('turn-on-lights', data.projecten[this.dataset.project]);
});

document.getElementById('button3').addEventListener('click', function(){
    ipcRenderer.send('turn-on-lights', data.projecten[this.dataset.project]);
});

document.getElementById('button4').addEventListener('click', function(){
    ipcRenderer.send('turn-on-lights', data.projecten[this.dataset.project]);
});

document.getElementById('button5').addEventListener('click', function(){
    ipcRenderer.send('turn-on-lights', data.projecten[this.dataset.project]);
});