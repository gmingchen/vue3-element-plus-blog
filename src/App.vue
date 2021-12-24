<template>
  <el-config-provider :locale="locale">
    <router-view v-if="!reload" />
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
    const reload = computed(() => store.state.setting.reload)

    return {
      locale,
      reload
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
