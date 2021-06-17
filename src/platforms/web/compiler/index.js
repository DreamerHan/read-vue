/* @flow */
// 一些标签分类、三个自定义指令、modules(未知功能)
import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
