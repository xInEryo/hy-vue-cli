const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  //   console.log(templatePath)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

// 递归创建文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (fs.existsSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

// 写入文件
const writeToFile = (filePath, content) => {
  return fs.promises.writeFile(filePath, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}
