#!/usr/bin/env node
// 帮助我们在系统环境中找到node，再通过 npm link 链接起来

const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()

// 创建其它指令
createCommands()

program.parse(process.argv)
