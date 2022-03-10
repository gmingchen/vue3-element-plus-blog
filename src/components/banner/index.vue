<template>
  <el-carousel
    v-if="list.length"
    :interval="5000"
    class="carousel-box">
    <el-carousel-item
      v-for="item in list"
      :key="item.id"
      :label="item.title">
      <img
        class="image"
        :src="item.image"
        :alt="item.title"
        @click="clickHandle(item)">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { listApi } from '@/api/client/banner'

export default defineComponent({
  setup() {
    const router = useRouter()

    const data = reactive({
      list: []
    })

    const getList = () => {
      listApi().then(r => {
        if (r) {
          data.list = r.data
        }
      })
    }

    const clickHandle = (banner) => {
      switch (banner.type) {
        case 0:
          window.open(banner.url)
          break
        case 1:
          router.push({ name: banner.url })
          break
      }
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      ...toRefs(data),
      clickHandle
    }
  }
})
</script>

<style lang="scss">
.carousel-box {
  .el-carousel__item {
    text-align: center;
    .image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-height: 100%;
      max-width: 100%;
    }
    .el-carousel__mask {
      background-color: transparent!important;
    }
  }
}
</style>

