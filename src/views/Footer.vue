<template>  
    <footer class="footer">
      <p>© 2024 My Vue App</p>
    </footer>  
</template>
  
<script setup>
</script>
  
  <style scoped>
  .footer {
    background-color:#faeee7;
    color: hsl(246, 71%, 46%);
    text-align: center;
    height: 60px;
    width: 100%;
    /* 确保Footer固定在底部 */
    position: fixed; /* <-- 新增 */
    bottom: 0; /* <-- 新增 */
    left: 0; /* <-- 新增 */
    z-index: 1000; /* <-- 新增 */
  }

  </style>