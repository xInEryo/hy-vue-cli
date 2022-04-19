const program = require('commander')

const helpOptions = () => {
  // 增加options
  program.option('-w --why', 'a why cli')
  program.option(
    '-d, --dest <dest>',
    'a destination folder, eg: -d /src/components'
  )

  // 监听指令
  // program.on('--help', function () {
  //   console.log('')
  //   console.log('Other:')
  // })
}

module.exports = helpOptions
