<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <HelloWorld msg="Hello Vue 3 + Vit1e" />

</template>

<script setup>

import HelloWorld from '@/components/HelloWorld.vue'

const a = 0

console.log(import.meta.env)

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
