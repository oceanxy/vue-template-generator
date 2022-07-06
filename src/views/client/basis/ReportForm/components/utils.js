/**
 * @description: 必填验证
 * @param {object} par 默认值
 * @return {*}
 */
export const required = (par = {}) => {
  return Object.assign({ required: true, type: 'string', message: '此项必填', trigger: 'blur' }, par)
}
export const getRules = data => {
  const rules = []
  if (data.modType === 1) {
    if (data.isRequired === 1) {
      rules.push(required({ type: data.dataType === 2 ? 'number' : 'string', trigger: 'change' }))
    }
  } else if (data.modType === 2) {
    if (data.isRequired === 1) {
      rules.push(required({ type: data.dataType === 2 ? 'number' : 'string', trigger: 'change' }))
    }
  } else if (data.modType === 3) {
    if (data.isRequired === 1) {
      rules.push(required())
    }
  } else if (data.modType === 4) {
    if (data.isRequired === 1) {
      rules.push(required())
    }
  } else if (data.modType === 5) {
    if (data.isRequired === 1) {
      rules.push(required({ type: 'array', trigger: 'change' }))
    }
  } else if (data.modType === 6) {
    if (data.isRequired === 1) {
      rules.push(required({ type: 'array', trigger: 'change' }))
    }
  }
}
