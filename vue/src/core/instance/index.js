import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 通过 initMixin 方法添加 _init 函数
  this._init(options)
}
// Vue 实例中一些实例方法的初始化
initMixin(Vue)
stateMixin(Vue) // $set $watch $delete 方法
eventsMixin(Vue) // $on $off $emit $once
lifecycleMixin(Vue) // $forceUpdate $destroy _update 
renderMixin(Vue) // $nextTick _render

export default Vue
