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
  }
}
