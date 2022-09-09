/**
 * @description: 必填验证
 * @param {object} par 默认值
 * @return {*}
 */
export const required = (par = {}) => {
  return Object.assign(
    {
      required: true,
      type: 'string',
      message: '此项必填',
      trigger: 'blur'
    },
    par
  )
}

/**
 * @description: 获取验证规则
 * @param {*} data 字段数据
 * @return {*}
 */
export const getRules = data => {
  const rules = []

  if (data.modType === 1) {
    if (data.isRequired === 1) {
      rules.push(
        required({
          type: 'string',
          trigger: 'change'
        })
      )
    }
  } else if (data.modType === 2) {
    if (data.isRequired === 1) {
      rules.push(
        required({
          type: 'array',
          trigger: 'change'
        })
      )
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
      rules.push(
        required({
          type: 'array',
          trigger: 'change'
        })
      )
    }
  } else if (data.modType === 6) {
    if (data.isRequired === 1) {
      rules.push(
        required({
          type: 'array',
          trigger: 'change'
        })
      )
    }
  } else if (data.modType === 7) {
    if (data.isRequired === 1) {
      rules.push(
        required({
          type: 'object',
          trigger: 'change'
        })
      )
    }
  }

  return rules
}

/**
 * @description: 读取对应类型的字段值
 * @param {Object} data 字段数据
 * @param {any} value
 * @return {Object} {resultId,resultContent}
 */
export const getFieldItemValue = (data, value) => {
  const result = {
    resultId: '',
    resultContent: value,
    resultFile: []
  }

  if (data.modType === 1) {
    result.resultId = value
    result.resultContent = findFieldValueAndText(data, [value]).join(',')
  } else if (data.modType === 2) {
    result.resultId = value.join(',')
    result.resultContent = findFieldValueAndText(data, value).join(',')
  } else if (data.modType === 5 || data.modType === 6) {
    const file = value.map(item => item?.response?.data[0] ?? '')

    if (file.length > 0) {
      result.resultFile = file
    }

    result.resultContent = ''
  } else if (data.modType === 7) {
    result.resultContent = value ? value.format('YYYYMMDD') : ''
  }

  return result
}

/**
 * @description: 读取id选项对应的名称
 * @param {*} data 字段对象
 * @param {Array} values
 * @return {Array}
 */
export const findFieldValueAndText = (data, values) => {
  return values.map(item => {
    const findItemOpt = data.itemOptionList.find(item2 => item2.id === item)

    return findItemOpt.optionValue
  })
}

/**
 * @description: 读取字段提交数据
 * @param {Array} source 表单数据
 * @param {Object} values 用户提交字段
 * @return {Array}
 */
export const getFieldValue = (source, values) => {
  const form = source.map(item => {
    const formItemValue = values[item.id]

    return {
      ...getFieldItemValue(item, formItemValue),
      itemId: item.id,
      attachmentList: getProofValue(item, values)
    }
  })

  return form
}

/**
 * @description: 读取佐证材料
 * @param {*} data
 * @param {*} values
 * @return {*}
 */
export const getProofValue = (data, values) => {
  let attachmentList = []

  if (data.itemProveList.length === 0) return attachmentList

  attachmentList = data.itemProveList.map(item => {
    const data = values[`${item.id}_proof`]

    return {
      ...data[0].response.data[0],
      proveId: item.id
    }
  })

  return attachmentList
}
