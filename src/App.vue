<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="left" class="">
    <!-- <img src="./assets/images/maquette_kaal.jpg"> -->

    <div class="img-overlay-wrap">
    
      <img src="./assets/images/maquette_kaal.jpg">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 966 1070">
        <rect @click="openProject(1)" :class="(show == 1)?'active':''" class="clickable" x="704" y="258" width="56" height="64" opacity="1" />
        <polygon @click="openProject(2)" :class="(show == 2)?'active':''" class="clickable" points="766 265 818 265 818 300 796 300 796 311 766 311" />
      </svg>
    
    </div>
  </div>
  <div id="right" class="">
    <!-- v-for="(project, index) in projects" :key="project" -->
    <transition name="slide-fade" v-for="(project, index) in projects" :key="index">
      <main v-if="show == index" class="text-sm flex flex-col h-full bg-white">
        <div id="slider">
          <!-- <img src="./assets/images/projects/img_2.jpg"> -->
          <img :src="require('@/assets/images/projects/' + project.plaatjes.plaatje)" /> 
        </div>
        <div id="title" class="m-auto mt-2 mx-8 flex flex-col text-gray-700">
          <h2 class="text-3xl mx-auto">{{ project.titel }}</h2>
          <small v-if="project.subtitel" class="text-base mx-auto">{{ project.subtitel }}</small>
        </div>
        <div id="description" class="mx-8 flex-grow overflow-auto">
          <span class="block text-2xl text-gray-500">Omschrijving</span>
          <p class="text-base">{{ project.omschrijving }}</p>
          <section class="mx-4 my-2">
            <div v-for="(bullet, index) in project.bullets" :key="index" class="">
              <span class="text-gray-500">{{ index }}: </span>
              <span class="">{{ bullet }}</span>
            </div>
          </section>
         </div>
        <div id="footer" class="mx-8 mb-1">
          <img src="./assets/images/logo.png">
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    // HelloWorld
  },

  data() {
    return {
      show: 1,
      loading: false,
      projects: {
        "1": {
          "titel": "Keizersbrug",
          "subtitel": "7 markante herenhuizen",
          "omschrijving": "Woningstichting realiseerde 11 appartementen en 1 bedrijfsruimte op de begane grond.",
          "bullets": {
            "architect": "Kapitein Jacobs Kapitein te Den Helder",
            "ontwikkelaar": "Woningstichting Den Helder",
            "aannemer": "aannemingsbedrijf Dozy BV",
            "gebruiker": "n.v.t",
            "planning": "juni 2014 opgeleverd",
            "informatie": "Neem voor meer informatie contact op met Woningstichting Den Helder (0223 677677) of bekijk de website www.wsdh.nl ",
          },
          "plaatjes": {
            "plaatje": "img_2.jpg"
          },
          "phidget": {
              "312483": [
                  15,
                  6
              ]
          }
        },
      "2": {
          "titel": "School 7 bibliotheek Den Helder",
          "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
          "bullets": {
            "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
            "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
            "aannemer": "aannemingsbedrijf Dozy BV",
            "gebruiker": "Kopgroep bibliotheken Den Helder",
            "planning": "april 2016 opgeleverd",
            "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
          },
          "plaatjes": {
              "plaatje": "img_3.jpg"
          },
          "phidget": {
              "312483" : [
                  0
              ]
          }
        },
        "3": {
          "titel": "School 7 bibliotheek Den Helder",
          "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
          "bullets": {
            "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
            "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
            "aannemer": "aannemingsbedrijf Dozy BV",
            "gebruiker": "Kopgroep bibliotheken Den Helder",
            "planning": "april 2016 opgeleverd",
            "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
          },
          "plaatjes": {
              "plaatje": "img_5.jpg"
          },
          "phidget": {
              "478550" : [
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
              ]
          }
        },
        "4": {
          "titel": "School 7 bibliotheek Den Helder",
          "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
          "bullets": {
            "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
            "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
            "aannemer": "aannemingsbedrijf Dozy BV",
            "gebruiker": "Kopgroep bibliotheken Den Helder",
            "planning": "april 2016 opgeleverd",
            "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
          },
          "plaatjes": {
              "plaatje": "img_9.jpg"
          },
          "phidget": {
              "257037" : [
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
              ]
          }
        },
        "5": {
          "titel": "School 7 bibliotheek Den Helder",
          "omschrijving": "Renovatie gemeentelijk monument in combinatie met nieuwbouw. School 7 heeft de Public Library of the Year Award 2018 gewonnen.",
          "bullets": {
            "architect": "Drost en van Veen te Rotterdam i.s.m. Mars interieur te Rotterdam",
            "ontwikkelaar": "Woningstichting Den Helder i.s.m. Zeestad",
            "aannemer": "aannemingsbedrijf Dozy BV",
            "gebruiker": "Kopgroep bibliotheken Den Helder",
            "planning": "april 2016 opgeleverd",
            "informatie": "www.wsdh.nl en www.kopgroepbibliotheken.nl",
          },
          "plaatjes": {
              "plaatje": "img_12.jpg"
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
              ]
          }
        }
      }
    }
  },

  methods: {
    openProject(project) {
      if (project != this.show && this.loading == false) {
        this.loading = true

        if (this.show !== null) {
          this.closeCurrentProject()
          setTimeout(() => this.show = project, 1000);
          setTimeout(() => this.loading = false, 2000);
        } else {
          this.show = project
          setTimeout(() => this.loading = false, 1000);
        }
      }
    },
    closeCurrentProject() {
      this.show = null
    }
  },

  mounted() {
    this.$nextTick(function () {
      console.log('Application mounted and ready')
    })
  }
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 1.0s ease-out;
}

.slide-fade-leave-active {
  transition: all 1.0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}

.img-overlay-wrap {
        position: relative;
        display: inline-block; /* <= shrinks container to image size */
        transition: transform 150ms ease-in-out;
      }

      .img-overlay-wrap img { /* <= optional, for responsiveness */
        display: block;
        max-width: 100%;
      }

      .img-overlay-wrap svg {
        position: absolute;
        top: 0;
        left: 0;
        fill: #0d6f83;
        /* -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
        filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7)); */
        /* Similar syntax to box-shadow */
      }

      .img-overlay-wrap rect {
        stroke-width:1;
        stroke:rgb(0,0,0);
        cursor: pointer;
      }

      .img-overlay-wrap polygon {
        stroke-width:1;
        stroke:rgb(0,0,0);
        cursor: pointer;
        -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 56, 71, .7));
        filter: drop-shadow( 3px 3px 2px rgba(0, 56, 71, .7));
      }

      .img-overlay-wrap .active {
        fill: #32b4cf;
      }

#app {
  @apply bg-gray-300;
  height: 1080px;
  width: 1920px;
  position: relative;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

#left {
  height: 1080px;
  margin-left: 96px;
  width: 966px;
  @apply float-left;
}

#right {
  height: 1080px;
  margin-right: 100px;
  width: 662px;
  @apply float-right;
}

html {
  overflow: hidden;
}
</style>
