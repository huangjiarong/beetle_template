<template>
  <component :is="type" v-bind="linkProps(to)" @click="clickLink(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      // return 'router-link'
      // 修改成返回div, 为了配合 clickLink 方法使用
      return 'div'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    },
    // 点击后跳转到重定向页面, 解决左侧点击相同路由不刷新问题
    clickLink(to) {
      this.$router.replace({
        path: '/redirect' + to
      })
    }
  }
}
</script>
