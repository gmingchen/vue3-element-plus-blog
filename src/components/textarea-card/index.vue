<template>
  <div class="message-comment-container">
    <div class="tool-box margin_b-5 flex-box">
      <el-popover
        placement="top"
        :width="400"
        trigger="click">
        <template #reference>
          <g-icon name="smile" size="20px" class="cursor-pointer" />
        </template>
        <el-scrollbar height="200px">
          <div class="flex-box flex_w-wrap">
            <div
              v-for="(emoji, index) in emojis"
              :key="index"
              class="width-34 font-size-20 cursor-pointer"
              @click="keyword += emoji">{{ emoji }}</div>
          </div>
        </el-scrollbar>
      </el-popover>
    </div>
    <el-input
      v-model="keyword"
      class="textarea"
      type="textarea"
      rows="4"
      maxlength="500"
      show-word-limit
      @keydown="listener" />
    <div class="flex-box flex_j_c-flex-end">
      <el-button type="text" @click="submit">
        <g-icon name="send" size="20px" />
      </el-button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

import useModel from '@/mixins/model'

import { UPDATE_MODEL_EVENT } from '@/utils/constant'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'submit'],
  setup(props, { emit }) {
    const store = useStore()

    const token = computed(() => store.getters['user/tokenVal'])

    const data = reactive({
      emojis: '😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 ☺️ 😚 😙 😋 😛 😜 🤪 😝 😝 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 😵 🤯 🤠 😎 🤓 🧐 😕 😟 🙁 ☹️ 😮 😯 😲 😳 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 😤 😡 😠 🤬 😈 👿 💀 ☠️ 🤡 👹 👺 👻 👽 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 💔 ❤️ 🧡 💛 💚 💙 💜 🖤 💬 🤳 👃 👅 👄 👶 🧒 👋 🤚 🖐️ ✋ 🖖 👌 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 ⬆️ ➡️ ⬇️ ⬅️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙 🔚 🔛 🔜 🔝 🔀 🔁 🔂 ▶️ ⏩ ⏭️ ⏯️ ◀️ ⏪ ⏮️ 🔼 ⏫ 🔽 ⏬'.split(' ')
    })

    const keyword = useModel(props, 'modelValue')

    const submit = () => {
      if (token.value && /\S/u.test(token.value)) {
        if (keyword.value.trim()) {
          emit('submit', keyword.value)
        }
      } else {
        store.dispatch('user/showLogin', true)
      }
    }

    /**
     * 监听textarea 键盘事件 取消回车换行 改为 shift+回车 换行
     */
    const listener = (e) => {
      if (e.keyCode === 13) {
        console.log(e.keyCode)
        if (!e.shiftKey) {
          submit()
          e.preventDefault()
          return false
        }
      }
    }

    return {
      ...toRefs(data),
      keyword,
      submit,
      listener
    }
  }
})
</script>

<style lang="scss" scoped>
.message-comment-container {
  padding: 10px 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
