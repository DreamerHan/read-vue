import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  
  // _init 方法来源于下面的 initMixin(Vue) 方法
  this._init(options)
}

// 1. Vue.prototype._init，new Vue() 时执行的第一个方法
initMixin(Vue)

// 2. Vue.prototype上的 $data 和 $props 做响应式数据拦截
// 设置 $set、$delete 和 $watch
stateMixin(Vue)

// 3. Vue.prototype 上定义 $on、$off、$emit 和 $once
eventsMixin(Vue)

// 4. Vue.prototype._update、$forceUpdate、$destroy
lifecycleMixin(Vue)

// 5. Vue.prototype 添加运行时辅助函数、$nextTick和 获取虚拟 dom 的_render 函数
renderMixin(Vue)

export default Vue
