/**
 * 连字符转驼峰
 * @example `my-profile` => `myProfile` 或者 `my_profile` => `myProfile`
 * @param {string} name - 目标字符
 * @returns {string}
 */
export function toHump(name) {
  return name.replace(/[-_](\w)/g, (all, letter) => letter.toUpperCase())
}

/**
 * 驼峰转连字符
 * @example `myProfile` => `my-profile`
 * @param {string} field - 目标字段
 * @returns {string}
 */
export function toLowerCase(field) {
  return field.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 图片转base64
 * @param {File | Blob} file - Blob 文件或者 File 文件
 * @returns {Promise<string>}
 */
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * 首字母大写
 * @param {string} str - 目标单词
 * @returns {string}
 */
export function firstLetterToUppercase(str) {
  return str.replace(/^\S/, s => s.toUpperCase())
}

/**
 * 下载文件
 * @param {Blob | string} blobOrUrl - Blob 对象或者 文件路径
 * @param {string} fileName - 文件名称
 */
export function downloadFile(blobOrUrl, fileName) {
  if (blobOrUrl instanceof Blob && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blobOrUrl, fileName)
  } else {
    const urlObj = blobOrUrl instanceof Blob ? URL.createObjectURL(blobOrUrl) : blobOrUrl
    const tmp = document.createElement('a')
    const body = document.querySelector('body')

    tmp.style.display = 'none'
    tmp.download = fileName
    tmp.href = urlObj
    body.appendChild(tmp)

    tmp.click() // 模拟点击实现下载
    body.removeChild(tmp)

    setTimeout(function() {
      // 延时释放
      URL.revokeObjectURL(urlObj)
    }, 1000)
  }
}

/**
 * 获取应用名称每个单词的首字母组成的字符串
 * @example 'create-a-new-projects' => 'canp'
 * @param {string} [appName] - 默认当前项目名：PROJ_APP_NAME（src/apps 下的文件夹名），由 webpack 的 DefinePlugin 插件注入
 * @returns {string}
 */
export function getFirstLetterOfEachWordOfAppName(appName = PROJ_APP_NAME) {
  return appName
    .split('-')
    .map(i => i[0])
    .join('')
}

/**
 * 生成 UUID
 * @param {number} [len=16] - 长度。默认16个字符
 * @param {number} [radix=16] - 基数。默认16，即16进制数
 * @returns {string}
 */
export function uuid(len = 16, radix = 16) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i

  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 删除 route.path 最后的 “/”（如果有）
 * @param {string} path - 需要处理的 path
 * @return {string}
 */
export function replacePath(path) {
  return path.replace(/([a-zA-Z0-9\-\/]+)(\/)$/g, '$1')
}

/**
 * 显示 APP 级别的 loading 状态图标
 * @param {boolean} activelyHide - 是否主动隐藏 loading 图标
 * @param {() => Promise} callback - loading状态下需要做的事情
 * @return {Promise<void>}
 */
export async function showAppLoading(activelyHide, callback) {
  if (document.querySelector('#tg-responsive-layout')) {
    document.querySelector('#tg-responsive-layout').style.display = 'none'
    await callback()

    if (activelyHide) {
      document.querySelector('#tg-responsive-layout').style.display = 'unset'
    }
  }
}

/**
 * 睡眠函数
 * @param {number} [time=200] - 睡眠时间，默认200毫秒
 * @return {Promise<unknown>}
 */
export function sleep(time = 200) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * 在一个对象中，用字符串形式的 key 来取值
 * @example `object['a.b.c']`解析为`object[a][b][c]`或者`object.a.b.c`
 * @param {string} stringKey - key
 * @param {Object} obj - 取值对象
 * @return {*}
 */
export function getValueFromStringKey(stringKey, obj) {
  if (stringKey.includes('.')) {
    return stringKey.split('.').reduce((prev, curr) => prev[curr], obj)
  } else {
    return obj[stringKey]
  }
}
