<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="left" class="">

    <div class="img-overlay-wrap">
    
      <img src="./assets/images/maquette_kaal.jpg">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 966 1070">

        <!-- Polygon points are ALWAYS x then y
        Example :
        556 900 576 898
        The x556 draws to y900 and then draws x576 to y898 -->

        <!-- 
        Examples

          <polygon @click="openProject(25)" :class="(show == 25)?'active':''" class="clickable" points="618 396 619 306 643 306 643 396" />

          <rect @click="openProject(23)" :class="(show == 23)?'active':''" x="154" y="942" width="13" height="13" rx="15" /> 
        -->

        <!-- Looping through all the projects and displaying them on screen -->
        <polygon v-for="(project, index) in polygonProjects" :key="index" @click="openProject(index)" :class="(show == index)?'active':''" class="clickable" :points="project.polygon" />

        <rect v-for="(project, index) in rectProjects" :key="index" @click="openProject(index)" :class="(show == index)?'active':''" :x="project.rect.x" :y="project.rect.y" :width="project.rect.width" :height="project.rect.height" :rx="project.rect.rx" />

      </svg>
    
    </div>
  </div>
  <div id="right" class="">
    <!-- v-for="(project, index) in projects" :key="project" -->
    <transition name="slide-fade" v-for="(project, index) in projects" :key="index">
      <main v-if="show == index" class="text-sm flex flex-col h-full bg-white">
        <div id="slider">
          <img v-if="project.plaatjes !== null && project.plaatjes !== undefined" :src="require('@/assets/images/projects/' + project.plaatjes)" /> 
          <img v-else :src="require('@/assets/images/projects/no-image.png')" /> 
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

  computed: {
    // a computed getter
    polygonProjects: function () {
      let projects = this.projects;
      let polygonProjects = {};

      for (const property in projects) {
        if ('polygon' in projects[property]) {
          polygonProjects[property] = projects[property]
        }
      }

      return polygonProjects;
    },

    rectProjects: function () {
      let projects = this.projects;
      let rectProjects = {};

      for (const property in projects) {
        if ('rect' in projects[property]) {
          rectProjects[property] = projects[property]
        }
      }

      return rectProjects;
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

        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
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
