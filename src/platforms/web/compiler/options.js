/* @flow */

import {
  isPreTag, // tag === 'pre'
  mustUseProp, // 类似于 input type="select/checked/text/muted/video" 的标签
  isReservedTag, // 常见的 html 元素或者 svg
  getTagNamespace // svg 或者 math 
} from '../util/index'

import modules from './modules/index'

import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'

export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,
  directives, // v-html、v-model、v-text
  isPreTag,
  isUnaryTag,  // 一些标签，有一些没见过
  mustUseProp,
  canBeLeftOpenTag, // 也是一些标签
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules) // staticClass,staticStyle
}
