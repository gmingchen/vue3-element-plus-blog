import { computed, getCurrentInstance } from 'vue'

export default function (props, key) {
  const vm = getCurrentInstance().proxy
  return computed({
    get() {
      return props[key]
    },
    set(value) {
      vm.$emit(`update:${ key }`, value)
    }
  })
}
