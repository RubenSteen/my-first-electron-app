<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="left" class="">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa deleniti ullam harum minima temporibus non reiciendis earum, sequi ipsa rerum deserunt quae eius placeat unde cumque voluptatum rem delectus.
  </div>
  <div id="right" class="">
    <div id="slider">
      <img alt="Project picture" src="./assets/images/img_2.jpg">
    </div>
    <main class="bg-blue-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus repudiandae laboriosam nesciunt impedit perferendis inventore omnis provident quia sit? Inventore fuga unde similique quae ea nulla animi nostrum molestias.
    </main>
    <footer class="bg-red-500">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quia deserunt neque, eius rem dicta molestiae tempore quo, ad ipsa reprehenderit quis. Nam quam nemo est facere reiciendis quis atque.
    </footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  @apply bg-gray-300;
  height: 1080px;
  width: 1920px;
  position: relative;
}

#left {
  height: 1080px;
  margin-left: 96px;
  width: 966px;
  @apply float-left bg-red-500;
}

#right {
  height: 1080px;
  margin-right: 100px;
  width: 662px;
  @apply float-right bg-white flex flex-col;
}
</style>
