<template>
  <el-dropdown trigger="click" @command="commandHandle">
    <span class="link cursor-pointer">
      <g-icon name="language" />{{ languages.getLabel(language) }}<g-svg name="arrow-down" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languages"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value">
          {{ item[`label_${language}`] }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { LANGUAGE } from '@/utils/dictionary.js'

export default defineComponent({
  setup() {
    const { t, locale } = useI18n()
    const store = useStore()
    const route = useRoute()

    const data = reactive({
      languages: LANGUAGE
    })

    const language = computed(() => store.getters['setting/language'])

    const commandHandle = (command) => {
      locale.value = command
      store.dispatch('setting/setLanguage', command)
      document.title = route.meta[`title_${ command }`]
    }

    return {
      t,
      ...toRefs(data),
      language,
      commandHandle
    }
  }
})
</script>
