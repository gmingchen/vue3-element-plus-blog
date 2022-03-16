<template>
  <el-container class="client-layout height-full width-full">
    <Headbar />
    <el-scrollbar class="width-full">
      <View class="margin_t-90" />
      <Footer class="margin_t-20" />
    </el-scrollbar>
  </el-container>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue'

import Headbar from './headbar/index.vue'
import View from '@/components/view/index.vue'
import Footer from './footer/index.vue'

export default defineComponent({
  components: { Headbar, View, Footer },
  setup() {
    const snow = () => {
      // 1、定义一片雪花模板
      const flake = document.createElement('div')
      // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺
      flake.innerHTML = '❆'
      flake.style.cssText = 'position:fixed;color:#fff;z-index: 1000'
      // 获取页面的高度 相当于雪花下落结束时Y轴的位置
      const documentHieght = window.innerHeight
      // 获取页面的宽度，利用这个数来算出，雪花开始时left的值
      const documentWidth = window.innerWidth
      // 定义生成一片雪花的毫秒数
      const millisec = 100
      // 2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
      setInterval(function () { // 页面加载之后，定时器就开始工作
        // 随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
        const startLeft = Math.random() * documentWidth
        // 随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
        const endLeft = Math.random() * documentWidth
        // 随机生成雪花大小
        const flakeSize = 5 + 20 * Math.random()
        // 随机生成雪花下落持续时间
        const durationTime = 4000 + 7000 * Math.random()
        // 随机生成雪花下落 开始 时的透明度
        const startOpacity = 0.7 + 0.3 * Math.random()
        // 随机生成雪花下落 结束 时的透明度
        const endOpacity = 0.2 + 0.2 * Math.random()
        // 克隆一个雪花模板
        const cloneFlake = flake.cloneNode(true)
        // 第一次修改样式，定义克隆出来的雪花的样式
        cloneFlake.style.cssText += `
                        left: ${ startLeft }px;
                        opacity: ${ startOpacity };
                        font-size:${ flakeSize }px;
                        top:-25px;
                        transition:${ durationTime }ms;
                      `
        // 拼接到页面中
        document.body.appendChild(cloneFlake)
        // 设置第二个定时器，一次性定时器，
        // 当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；
        setTimeout(function () {
          // 第二次修改样式
          cloneFlake.style.cssText += `
                            left: ${ endLeft }px;
                            top:${ documentHieght }px;
                            opacity:${ endOpacity };
                          `
          // 4、设置第三个定时器，当雪花落下后，删除雪花。
          setTimeout(function () {
            cloneFlake.remove()
          }, durationTime)
        }, 0)
      }, millisec)
    }
    onBeforeMount(() => {
      snow()
    })
    return {}
  }
})
</script>

<style lang="scss" scoped>
.client-layout {
  background-color: var(--el-text-color-secondar);
}
</style>
