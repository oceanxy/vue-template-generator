export default {
  /**
   * 连字符转驼峰
   * 例如：my-profile -> myProfile
   * @param name
   * @returns {*}
   */
  toHump(name) {
    return name.replace(/-(\w)/g, (all, letter) => {
      console.log(all) //"_T"
      console.log(letter) //"T"
      return letter.toUpperCase()
    })
  },
  /**
   * 驼峰转连字符
   * 例如：myProfile -> my-profile
   * @param field
   * @returns {*}
   */
  toLowerCase(field) {
    return field.replace(/([A-Z])/g, '-$1').toLowerCase()
  },
  /**
   * 图片转base64
   * @param file
   * @returns {Promise<unknown>}
   */
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  },
  /**
   * 首字母大写
   * @param str {string}
   * @returns {string}
   */
  firstLetterToUppercase(str) {
    return str.replace(/^\S/, s => s.toUpperCase())
  }
}
