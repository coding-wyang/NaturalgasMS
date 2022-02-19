<script setup>

</script>

<template>
<router-view></router-view>
</template>

<style >
* {
    margin: 0;
    padding: 0;
}
body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
body::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
body::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
