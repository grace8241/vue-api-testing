<template>
  <div id="app">    
    <Nav />
    <div class="content">
      <router-view/>
    </div>
    <Footer />    
  </div>
</template>

<script setup>
import Nav from './views/Nav.vue';

import Footer from './views/Footer.vue';
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: hwb(241 2% 8%);
  height: 100vh;
  display: flex;
  flex-direction: column;  
}
.content { 
  /*
  overflow: auto;
  position: absolute;
  top: 60px;
  left: 0px;
  width: 100%;
  height: 100%;
  */
  
  flex: 1;
  overflow-y: auto;
  padding-top: 60px; /* Adjust for Nav height */
  padding-bottom: 60px; /* Adjust for Footer height */
  width: 100%; /* 确保内容区域的宽度与父容器一致 */
  box-sizing: border-box; /* 确保padding不会影响宽度 */
  
  position: absolute;
  left: 0px;
}
</style>