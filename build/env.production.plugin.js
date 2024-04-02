const {
  writeFile,
  readFileSync,
  readdirSync
} = require('fs')
const { resolve, join } = require('path')

/**
 * 生成 .env.production 文件
 */
class EnvProductionPlugin {
  /**
   * 构造函数
   * @param options
   */
  constructor(options = {}) {
    this.appName = options.appName
    this.callback = options.callback
    this.appConfig = options.appConfig
    this.subDir = options.subDir
  }

  parse(str, keepComments) {
    const obj = {}
    let comments = []
    let sort = 1
    const docComments = {
      status: true, // 当前是否处于首行到第一个非注释行之间
      content: [] // 文档注释内容
    }

    const separator = str.includes('\r\n') ? '\r\n' : '\n'

    str.toString()
      .replace(/^(\r?\n)+/, '')
      .replace(/(\r?\n)+$/, '')
      .split(separator)
      .forEach(line => {
        const keyValueArr = line.split('=')
        const key = keyValueArr[0].trim()

        // 解析空行
        if (!line) {
          // 如果注释行之后的当前行为空行，忽略该空行之前暂存的注释 comments
          // 如果非注释行之后的当前行为空行，移除该空行
          // 注意：首行到第一个非注释行之间的所有内容均保留，作为文档注释或首个非注释行的注释
          if (docComments.status) {
            if (docComments.content.at(-1) !== separator && docComments.content.at(-2) !==
              separator) {
              docComments.content.push(separator)
            }
          } else {
            // if (comments.length && comments.at(-1) !== separator) {
            //   comments.push(separator)
            // }

            comments = []
          }
        } else {
          if (docComments.status && line.trim().charAt(0) === '#') {
            docComments.content.push(line)
          } else {
            if (docComments.status) {
              docComments.status = false // 文档注释部分完毕
              obj['_docComments'] = docComments.content
              Object.freeze(docComments) // 立即冻结

              // 处理首个非注释行的注释（如果存在，则与文档注释分离）
              if (docComments.content.at(-1) !== separator &&
                docComments.content.includes(separator)) {
                const lastIndex = docComments.content.lastIndexOf(separator)

                comments.push(...docComments.content.slice(lastIndex + 1))
                obj['_docComments'] = docComments.content.slice(0, lastIndex + 1)
              }
            }

            // 解析单行注释
            if (!key.includes('#')) {
              let val
              let inlineComments

              // 解析行内注释
              if (/(^'.*'$)|(^".*"$)/.test(keyValueArr[1].trim())) {
                val = keyValueArr[1].trim()
              } else {
                const index = keyValueArr[1]?.includes('#')
                  ? keyValueArr[1].indexOf('#')
                  : undefined

                if (keyValueArr[1].includes('#')) {
                  val = keyValueArr[1].slice(0, index).trim()
                  inlineComments = keyValueArr[1].slice(index)
                } else {
                  val = keyValueArr[1]?.slice(0, index).trim() ?? ''
                }
              }

              obj[key] = {
                value: val,
                inlineComments,
                comments: [...comments],
                sort: sort++
              }

              if (comments.length) {
                comments = []
              }
            } else {
              comments.push(key)
            }
          }
        }
      })

    return { obj, separator }
  }

  _generateFile(env, fields) {
    const isCurrentEnvironment = process.env.VUE_APP_ENV === env.obj['VUE_APP_ENV'].value
    let _docComments = env.obj['_docComments'].join('')

    _docComments += fields.reduce((str, cur) => {
      let s = ''

      const { separator, obj } = env
      const field = obj[cur]

      if (field.comments.length) {
        s += field.comments.join(separator)
      }

      s += separator + (isCurrentEnvironment ? '' : '# ') + cur + '=' + field.value

      if (field.inlineComments) {
        s += ` ${field.inlineComments}${separator}`
      } else {
        s += separator
      }

      return str + s
    }, '')

    return _docComments + env.separator
  }

  getEnvVarNeedingToExposed() {
    // 检测子项目是否存在需要加载的第三方文件，如果该文件使用了环境变量，此时需要将该环境变量一并暴露出去
    const envVariables = this.appConfig.prodEnvVar?.envVars ?? []
    const regex = /^\{([A-Z0-9_]+)}$/

    // 寻找要加载的第三方文件中使用了环境变量的文件
    this.appConfig.loadFiles.forEach(item => {
      if (regex.test(item.host)) {
        // 获取需要暴露的环境变量
        envVariables.push(item.host.replace(regex, '$1'))
      }
    })

    // 去重并返回
    return [...new Set(envVariables)]
  }

  /**
   * 生成文件内容
   * @return {string}
   */
  generateFileContent() {
    let fileStr = ''

    const envVariables = this.getEnvVarNeedingToExposed()
    const envFileName = readdirSync(`./src/apps/${this.appName}/config`)
      .filter(filename => /^\.env(\.[a-zA-Z0-9]+)*$/.test(filename) && filename !== '.env.development')

    console.info('检测到可用的非开发环境的环境变量文件：', envFileName)

    envFileName.forEach(filename => {
      try {
        const file = readFileSync(`./src/apps/${this.appName}/config/${filename}`, 'utf-8')
        const envObj = this.parse(file)

        fileStr += this._generateFile(envObj, envVariables)
      } catch (error) {
        console.error(error)
      }
    })

    return fileStr
  }

  /**
   * 获取文件名
   * @return {string}
   */
  getFileName() {
    let ENV_PRODUCTION = this.appConfig.prodEnvVar?.filename

    if (ENV_PRODUCTION?.length) {
      if (!/^\.env(\.[a-zA-Z0-9]+)*$/.test(ENV_PRODUCTION)) {
        ENV_PRODUCTION = '.env.' + ENV_PRODUCTION
      }
    } else {
      ENV_PRODUCTION = '.env.production'
    }

    return ENV_PRODUCTION
  }

  /**
   * 写文件
   * @param filename
   * @param fileStr
   * @private
   */
  _writeFile(filename, fileStr) {
    // 根据条件生成文件
    writeFile(
      // 注意此处的相对路径是 /build
      resolve(join(__dirname, `../dist${this.subDir ? `/${this.subDir}` : ''}`, filename)),
      fileStr,
      error => {
        if (error) {
          console.warn(`${filename} 生成失败，错误详情：${error}`)
        } else {
          // 执行回调
          this.callback?.()
        }
      }
    )
  }

  /**
   * 插件应用
   * @param compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap('configurableGatewaysAndCreateZip', compilation => {
      const filename = this.getFileName()
      const fileStr = this.generateFileContent()

      this._writeFile(filename, fileStr)
    })
  }
}

module.exports = EnvProductionPlugin
