const program = require('commander')
const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./actions')

// 创建指令
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description(
      'add vue component, 例如: why addcpn HelloWorld [-d src/components]'
    )
    .action((componentName) => {
      addComponentAction(componentName, program.opts().dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description(
      'add vue page and router config, 例如: why addpage Home [-d src/pages]'
    )
    .action((pageName) => {
      addPageAndRouteAction(
        pageName,
        program.opts().dest || `src/pages/${pageName.toLowerCase()}`
      )
    })

  program
    .command('addstore <store>')
    .description(
      'add vue  store config, 例如: why addstore Home [-d src/store/modules]'
    )
    .action((storeName) => {
      addStoreAction(
        storeName,
        program.opts().dest || `src/store/modules/${storeName.toLowerCase()}`
      )
    })
}

module.exports = createCommands
