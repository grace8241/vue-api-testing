<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" data-bs-theme="dark">
      <div class="container-fluid">
        
        <a class="navbar-brand" href="#">
          <img :src="home_url"  alt="..." style="height: 4vw;">
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a :class="['nav-link', { active: isActive('a') }]" aria-current="page" @click="navigate('a')">Home</a>
            </li>
            <li class="nav-item">
              <a :class="['nav-link', { active: isActive('b') }]" aria-current="page" @click="navigate('b')">Item 1</a>
            </li>
            <li class="nav-item">
              <a :class="['nav-link', { active: isActive('c') }]" aria-current="page" @click="navigate('c')">Item 2</a>
            </li>
            <li class="nav-item">
              <a :class="['nav-link', { active: isActive('MyTable') }]" aria-current="page" @click="navigate('MyTable')">基本資料</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useRouter, useRoute } from 'vue-router';
  import logo from '../assets/BBC-Line-Logo_Blue.png';

  const router = useRouter();
  const route = useRoute();

  const home_url = logo;
  
  const navigate = (route) => {
    router.push({ name: route });
  };

  const isActive = (routeName) => {
    return route.name === routeName; 
  }   
  </script>
  
  <style lang="scss" scoped>
  @import "../styles/variables.scss";
  .navbar {
  background: $NAVBAR_COLOR !important;
  position: fixed;
  left: 0px;
  top: 0;
  width: auto;
  height: 60px; /* Adjust height as needed */
  z-index: 1000; /* Ensure navbar is above other content */
  padding-top:0px; 
  padding-bottom:0px;
}
  
  .nav-link {
    font-size: 18px;
  }
  
  .nav-link:hover {
    color: #0000ff;
  }
  .nav-link.active {
    font-weight: bold;
    color: #8f0404; /* 可選：為 active 狀態設置不同顏色 */
  }
  
  .navbar-brand {
    margin-right: 30px; /* 間距設定 */
  }

  .nav-item {
    margin-right: 30px; /* 間距設定 */
    margin-top: 10px;   /* 上間距設定 */
  }

  .nav-item .nav-link {
    color: #0000ff
  }
  .nav-item .nav-link.active {
    color: #dc143c
  }
  </style>
  