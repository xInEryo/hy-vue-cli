const { promisify } = require('util')
const path = require('path')

// 通过promisify工具函数将 callback -> promise
const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

const createProjectAction = async (project) => {
  console.log('----------- Creating project -----------')

  // 1.clone项目（使用download-git-repo从仓库下载模板）
  await download(vueRepo, project, { clone: true })

  // 2.执行npm install
  console.log('开始安装依赖')

  await commandSpawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['install'],
    { cwd: `./${project}` }
  )

  console.log('依赖安装完成')

  // 3.运行npm run serve

  commandSpawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'serve'],
    { cwd: `./${project}` }
  )

  // 4.打开浏览器
  // open('http://localhost:8080/')
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.有对应的ejs模板
  // 2.编译ejs模板
  const result = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase()
  })
  // 3.将编译好的ejs模板写入文件中
  // 4.放到对应的文件夹
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {
    name,
    lowerName: name.toLowerCase()
  }
  // 2.拿到编译后的数据
  const pageResult = await compile('vue-component.ejs', data)
  const routeResult = await compile('vue-router.ejs', data)
  // 3.判断路径文件夹是否存在，不存在就创建，然后写入文件
  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `${name}.vue`)
    const targetRoutePath = path.resolve(dest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

const addStoreAction = async (name, dest) => {
  // 1.编译ejs模板
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})

  // 2.创建文件并写入
  if (createDirSync(dest)) {
    const targetStorePath = path.resolve(dest, 'index.js')
    const targetTypesPath = path.resolve(dest, 'types.js')
    writeToFile(targetStorePath, storeResult)
    writeToFile(targetTypesPath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}
