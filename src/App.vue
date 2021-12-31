<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="left" class="">
    <!-- <img src="./assets/images/maquette_kaal.jpg"> -->

    <div class="img-overlay-wrap">
    
      <img src="./assets/images/maquette_kaal.jpg">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 966 1070">
        <!-- Polygon points are ALWAYS x then y
        Example :
        556 900 576 898
        The x556 draws to y900 and then draws x576 to y898 -->

        <!-- Molenplein fase 2 -->
        <rect @click="openProject(25)" :class="(show == 25)?'active':''" class="clickable" x="618" y="305" width="27" height="90" opacity="1" />

        <!-- Molenplein fase 1 -->
        <rect @click="openProject(11)" :class="(show == 11)?'active':''" class="clickable" x="618" y="400" width="27" height="105" opacity="1" />

        <!-- Over het Wad -->
        <polygon @click="openProject(24)" :class="(show == 24)?'active':''" class="clickable" points="644 299 617 299 605 283 587 268 564 261 545 262 543 257 605 235 618 232 637 231 637 237 644 254 " />

        <!-- School 7 bibliotheek Den Helder -->
        <polygon @click="openProject(2)" :class="(show == 2)?'active':''" class="clickable" points="616 845 618 885 640 880 640 845" />

        <!-- Keizersbrug -->
        <polygon @click="openProject(1)" :class="(show == 1)?'active':''" class="clickable" points="624 904 660 904 660 917 655 917 655 925 645 925 632 915" />

        <!-- De Kamerheer -->
        <polygon @click="openProject(26)" :class="(show == 26)?'active':''" class="clickable" points="556 900 576 896 589 896 589 924 558 924" />

        <!-- Kop Beatrixstraat -->
        <polygon @click="openProject(3)" :class="(show == 3)?'active':''" class="clickable" points="558 856 582 856 582 884 558 890" />

        <!-- De Hoed -->
        <polygon @click="openProject(6)" :class="(show == 6)?'active':''" class="clickable" points="558 808 558 775 581 775 581 797 570 797 570 808" />

        <!-- Boedel Staete -->
        <polygon @click="openProject(7)" :class="(show == 7)?'active':''" class="clickable" points="558 706 581 706 581 720 558 720" />

        <!-- De Melkfabriek -->
        <polygon @click="openProject(9)" :class="(show == 9)?'active':''" class="clickable" points="558 636 583 636 583 662 558 662" />

        <!-- De Hofdame -->
        <polygon @click="openProject(5)" :class="(show == 5)?'active':''" class="clickable" points="476 917 538 909 540 932 478 941" />

        <!-- Gevels Beatrixstraat -->
        <polygon @click="openProject(4)" :class="(show == 4)?'active':''" class="clickable" points="499 868 512 872 512 868 531 867 531 855 551 855 551 887 504 893" />

        <!-- De Werviaan -->
        <polygon @click="openProject(8)" :class="(show == 8)?'active':''" class="clickable" points="538 722 552 722 552 777 538 777 528 768 540 753 491 707 449 751 440 740 495 682" />

        <!-- Zoetelief -->
        <polygon @click="openProject(15)" :class="(show == 15)?'active':''" class="clickable" points="445 895 445 901 413 903 413 890 416 890 415 887 409 882 421 869" />

        <!-- Casino Flamingo Beatrixstraat -->
        <polygon @click="openProject(27)" :class="(show == 27)?'active':''" class="clickable" points="391 907 389 889 402 877 408 884 410 905" />

        <!-- V&D -->
        <!-- <polygon @click="openProject(1)" :class="(show == 1)?'active':''" class="clickable" points="307 917 383 909 382 894 372 883 304 890" />
        <rect @click="openProject(1)" :class="(show == 1)?'active':''" x="363" y="910" width="10" height="10" rx="15" /> -->

        <!-- Hotel Wienerhof -->
        <polygon @click="openProject(28)" :class="(show == 28)?'active':''" class="clickable" points="309 966 306 938 330 936 332 965" />

        <!-- Ontwikkeling Stadsgebied -->
        <polygon @click="openProject(14)" :class="(show == 14)?'active':''" class="clickable" points="243 1003 239 984 255 973 274 977 276 970 275 964 270 958 268 956 251 955 170 986 234 1050 245 1050" />

        <!-- De Vijfsprong -->
        <polygon @click="openProject(19)" :class="(show == 19)?'active':''" class="clickable" points="70 1010 54 1026 35 1008 47 1000 59 1000 59 988 48 988 48 980 61 978 61 974 74 973 79 1008" />

        <!-- Watertoren -->
        <rect @click="openProject(23)" :class="(show == 23)?'active':''" x="154" y="942" width="13" height="13" rx="15" />

        <!-- De Zusters -->
        <polygon @click="openProject(12)" :class="(show == 12)?'active':''" class="clickable" points="153 848 200 848 200 875 153 875" />

        <!-- Bellevue -->
        <polygon @click="openProject(13)" :class="(show == 13)?'active':''" class="clickable" points="264 824 248 809 244 754 310 684 328 706 320 716 318 722 309 733 299 724 286 737 298 748 290 754 311 775" />

        <!-- Spuisstraat -->
        <polygon @click="openProject(16)" :class="(show == 16)?'active':''" class="clickable" points="339 705 313 676 342 647 371 676" />

        <!-- Spoorstraat oude casino locatie -->
        <polygon @click="openProject(30)" :class="(show == 30)?'active':''" class="clickable" points="472 616 490 597 474 582 456 599" />

        <!-- Rozenhout -->
        <polygon @click="openProject(10)" :class="(show == 10)?'active':''" class="clickable" points="519 568 494 593 468 567 480 555 489 564 502 551" />

        <!-- Prins Hendrik Kwatier -->
        <polygon @click="openProject(18)" :class="(show == 18)?'active':''" class="clickable" points="288 669 276 681 272 678 270 679 270 689 257 689 252 662 258 662 260 653 266 647" />

        <!-- Konikngsdriehoek -->
        <polygon @click="openProject(29)" :class="(show == 29)?'active':''" class="clickable" points="255 640 317 577 270 530 238 545" />

        <!-- Konings- en Spoorstraat -->
        <polygon @click="openProject(32)" :class="(show == 32)?'active':''" class="clickable" points="416 672 326 578 219 470 209 456 202 438 222 434 226 448 232 457 335 561 429 659" />


      </svg>
    
    </div>
  </div>
  <div id="right" class="">
    <!-- v-for="(project, index) in projects" :key="project" -->
    <transition name="slide-fade" v-for="(project, index) in projects" :key="index">
      <main v-if="show == index" class="text-sm flex flex-col h-full bg-white">
        <div id="slider">
          <img :src="require('@/assets/images/projects/' + project.plaatjes)" /> 
        </div>
        <div id="title" class="m-auto mt-2 mx-8 flex flex-col text-gray-700">
          <h2 class="text-3xl mx-auto">{{ project.titel }}</h2>
          <small v-if="project.subtitel" class="text-base mx-auto">{{ project.subtitel }}</small>
        </div>
        <div id="description" class="mx-8 flex-grow overflow-auto">
          <span class="block text-2xl text-gray-500">Omschrijving</span>
          <p class="text-base">{{ project.omschrijving }}</p>
          <section class="mx-4 my-2">
            <div v-for="(punt, index) in project.punten" :key="index" class="">
              <span class="text-gray-500">{{ index }}: </span>
              <span class="">{{ punt }}</span>
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
import projectJson from './assets/projects.json'

export default {
  name: 'App',

  components: {
    // HelloWorld
  },

  data() {
    return {
      show: null,
      loading: false,
      testRunning: false,
      keepOpen: 60, // In seconds
      openedAt: null,
      projects: projectJson,
      cordinates: [] // In development add cordinates so you can add projects more quickly
    }
  },

  methods: {
    openProject(project) {
      let phidgets = this.projects[project]['phidget'];

      if (this.show == project) {
        this.closeCurrentProject()
      } else {
        if (project != this.show && this.loading == false) {
          this.loading = true

          if (this.show !== null) {
            this.closeCurrentProject()
            setTimeout(() => {
              this.show = project
              this.setOpenedAt()
              window.ipcRenderer.send('turn-on-lights', JSON.parse(JSON.stringify(phidgets)))
            }, 1000);
            setTimeout(() => this.loading = false, 2000);
          } else {
            this.show = project
            this.setOpenedAt()
            window.ipcRenderer.send('turn-on-lights', JSON.parse(JSON.stringify(phidgets)))
            setTimeout(() => this.loading = false, 1000);
          }
        }
      }
    },

    closeCurrentProject() {
      this.show = null
      this.openedAt = null
      window.ipcRenderer.send('turn-off-lights')
    },

    getCordinates(event) {
      var x = (event.clientX - 96);
      var y = event.clientY;

      this.cordinates.push(x + ' ' + y)
      
      console.log("Adding cordinates", x, y)

      console.log(this.cordinates.join(' '))
    },

    setOpenedAt() {
      this.openedAt = Math.floor(Date.now() / 1000);
    },

    keepAlive() {
      if (this.show !== null) {
        if (this.loading == false) {
          if (this.openedAt != null) {
            this.setOpenedAt()
          }
        }
      }
    }
  },

  mounted() {
    this.$nextTick(function () {
      window.setInterval(() => {
        if (this.show !== null) {
          if (this.loading == false) {
            if (this.openedAt != null) {
              let closeAt = (this.openedAt + this.keepOpen);
              if (Math.floor(Date.now() / 1000) >= closeAt) {
                this.closeCurrentProject()
              }
            }
          }
        }
      },2000);
    })

    document.addEventListener('click', this.keepAlive)

    document.addEventListener('contextmenu', this.getCordinates)

    window.addEventListener("keypress", e => {
      if(String.fromCharCode(e.keyCode) == 't') {
        console.log('run some test')
      }

      // Resets cordinates when you hit R
      if(String.fromCharCode(e.keyCode) == 'r') {
        this.cordinates = [];
        console.log('Cordinates reset')
      }
    });
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
