<template>
  <div class="client-headbar width-full">
    <div class="content-wrap height-full">
      <div class="content-box margin-0-a flex-box flex_j_c-space-between flex_w-wrap height-full">
        <div class="logo-box flex-item_f-1 height-full flex-box">
          <el-image class="logo" src="http://oss.blog.gumingchen.icu/image/logo.png" />
          <span>Slipper</span>
        </div>
        <Menu class="menu-box flex-item_f-1" />
        <div class="icon-box flex-box flex_a_i-center cursor-pointer">
          <g-icon
            v-if="!user.id"
            class="login-icon"
            name="login"
            size="36px"
            @click="loginHandle" />
          <el-popover
            v-else
            placement="bottom"
            :width="350"
            trigger="hover">
            <template #reference>
              <el-image class="avatar" :src="user.avatar" />
            </template>
            <UserPanel />
          </el-popover>
          <g-icon
            class="menu-icon"
            :class="{'menu-icon-open' : drawerVisible}"
            name="menu"
            size="26px"
            @click="drawerHandle" />
        </div>
      </div>
    </div>
    <Login v-if="visible" ref="refLogin" />
    <MenuDrawer v-model="drawerVisible" />
  </div>
</template>

<script >
import { defineComponent, nextTick, reactive, ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

import Menu from './components/menu.vue'
import Login from './components/login.vue'
import MenuDrawer from './components/menu-drawer.vue'
import UserPanel from './components/user-panel.vue'

export default defineComponent({
  components: { Menu, Login, MenuDrawer, UserPanel },
  setup() {
    const store = useStore()

    const user = computed(() => store.state.user.user)

    const refLogin = ref()
    const data = reactive({
      visible: false,
      drawerVisible: false
    })

    const loginHandle = () => {
      data.visible = true
      nextTick(() => {
        refLogin.value.init()
      })
    }

    const drawerHandle = () => {
      data.drawerVisible = !data.drawerVisible
    }

    return {
      user,
      refLogin,
      ...toRefs(data),
      loginHandle,
      drawerHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  .menu-box, .login-icon, .avatar  {
    display: none;
  }
  .menu-icon {
    display: inline !important;
  }
}

$height: 60px;

.client-headbar {
  position: fixed;
  z-index: 100;
  height: $height;
  background-color: white;
  .content-wrap {
    position: relative;
    z-index: 100;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
    .content-box {
      max-width: 1200px;
      .logo-box {
        max-width: 400px;
        line-height: $height;
        span {
          font-family: 'AppleChancery';
          font-size: 24px;
        }
      }
      .icon-box {
        .avatar {
          height: 50px;
          width: 50px;
          border-radius: 50%;
        }
      }
    }
  }
}

.login-icon {
  color: var(--el-color-info);
}

// 顺时针选择 450
@keyframes rotateAlong450 {
  100% {
    transform: rotate(450deg);
  }
}

// 逆时针选择 450
@keyframes rotateAgainst450 {
  0% {
    transform: rotate(450deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.menu-icon {
  display: none;
  color: var(--el-color-primary);
  animation: rotateAgainst450 0.4s ease-out 0s;
  animation-fill-mode: forwards;
  &-open {
    animation: rotateAlong450 0.4s ease-out 0s;
    animation-fill-mode: forwards;
  }
}
</style>
