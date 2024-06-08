<template>
    <div class="layout">
      <NavBar />
      <div class="content-wrapper">
        <router-view />
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import NavBar from './Nav.vue';
  import Footer from './Footer.vue';
  
  export default {
    components: {
      NavBar,
      Footer
    }
  };
  </script>
  
  <style scoped>
  html, body{
    overflow-y: hidden;
  }

  .layout {
    height: calc(100vh - 120px);
    overflow-y: auto;   
  }
  
  .content-wrapper {
    padding-top: 60px; /* Adjust padding to account for fixed navbar */
    padding-bottom: 60px; /* Adjust padding to account for fixed footer */
  }  
  </style>
  