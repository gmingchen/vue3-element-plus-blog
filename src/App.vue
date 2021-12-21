<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import i18n from './i18n'

export default defineComponent({
  setup() {
    const store = useStore()
    const language = computed(() => store.getters['setting/language'])
    const locale = computed(() => i18n.global.messages[language.value].el)

    return {
      locale
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
