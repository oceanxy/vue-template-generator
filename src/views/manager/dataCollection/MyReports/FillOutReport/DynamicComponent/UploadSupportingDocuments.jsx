import { Button, Icon, message, Upload } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      innerValue: []
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(value) {
        this.innerValue = value
        this.fileList = new Array(value.length).fill([])
      }
    }
  },
  methods: {
    accept(item) {
      if (item.fileType === 1) {
        return '.pdf'
      }

      if (item.fileType === 2) {
        return '.png, .jpg, .jpeg'
      }

      return '*'
    },
    onChange(index, file, fileList, id) {
      // fileList数组内存在元素，则为上传，否则为删除
      if (fileList.length) {
        // 为受控属性fileList赋值
        this.fileList.splice(index, 1, [
          {
            ...file,
            url: file.status === 'done'
              ? file.response.data?.[0].path
              : (file.url || file.thumbUrl)
          }
        ])

        // 上传完成以后根据状态处理返回值
        if (file.status === 'done') {
          if (file.response?.status) {
            this.innerValue[index] = file.response.data[0]
            this.innerValue[index].proveId = id

            this.$emit('change', this.innerValue)
          } else {
            message.error(file.response.message)
            this.fileList.splice(index, 1, [])
          }
        }
      } else {
        // 删除文件后，清空组件内对应的值
        this.fileList.splice(index, 1, [])
        this.innerValue.splice(index, 1, [])

        this.$emit('change', this.innerValue)
      }
    }
  },
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {
          // 循环上传组件，且每个上传组件只能上传一个文件
          this.innerValue.map((item, index) => (
            <Upload
              fileList={this.fileList[index]}
              accept={this.accept(this.dataSource[index])}
              action={'/mgapi/system/upload/file'}
              listType={this.dataSource[index].fileType === 2 ? 'picture' : 'text'}
              name={'files'}
              onChange={({ file, fileList }) => this.onChange(index, file, fileList, this.dataSource[index].id)}
              headers={{ token: sessionStorage.getItem('token') }}
              disabled={this.disabled}
            >
              {
                !this.fileList[index].length
                  ? (
                    <div class={this.dataSource[index].isMust ? 'ant-form-item-required' : ''}>
                      <Button disabled={this.disabled}>
                        <Icon type="upload" />
                        选择 {this.dataSource[index].fullName}
                        {[' PDF 文件', ' JPG/PNG 图片', ''][this.dataSource[index].fileType - 1]}
                      </Button>
                    </div>
                  )
                  : null
              }
            </Upload>
          ))
        }
      </div>
    )
  }
}
