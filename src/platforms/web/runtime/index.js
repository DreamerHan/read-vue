/* @flow */

import Vue from 'core/index'
// 一些列规定好的配置及 类型声明
import config from 'core/config'

// extend：A的属性绑定到 B 对象上、noop 什么都不做
import { extend, noop } from 'shared/util'

// 组件的挂载方法，$mount 就仅仅调用了它
import { mountComponent } from 'core/instance/lifecycle'

// 浏览器下检测开发工具功能 和 判断是否是浏览器环境方法
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'

// v-model、v-show
import platformDirectives from './directives/index'

// transition、transition-group
import platformComponents from './components/index'

// install platform specific utils -- 安装特定于平台的实用程序
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
// 安装平台运行时指令和组件
// Vue.options.directives 上有了 v-model 和 v-show
extend(Vue.options.directives, platformDirectives)
// Vue.options.components 上有了 transition和 transition-group
extend(Vue.options.components, platformComponents)

// install platform patch function
// 1. 设置了 patch 函数
// 该函数：在初始化时将 vdom -> dom，update 阶段获取到 dom 的一些更新操作
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method -- 公共挂载方法
// 2. 实现了 $mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  // 2.1 $dom 方法只是在获取宿主之后执行了挂载操作
  return mountComponent(this, el, hydrating)
}

// devtools global hook -- devtools 全局钩子
/* istanbul ignore next */

// 浏览器环境，会做一些 console.log 打印
if (inBrowser) {
  setTimeout(() => {
    // config.devtools: process.env.NODE_ENV !== 'production'
    // 只是判断是否是 生产环境
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue)
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        )
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        `You are running Vue in development mode.\n` +
        `Make sure to turn on production mode when deploying for production.\n` +
        `See more tips at https://vuejs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default Vue
