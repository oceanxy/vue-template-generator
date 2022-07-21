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
      // 为受控属性fileList赋值
      this.fileList.splice(index, 1, [
        {
          ...file,
          url: file.status === 'done' ? file.response.data?.[0].path : (file.url || file.thumbUrl)
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
    }
  },
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            >
              {
                !this.fileList[index].length
                  ? (
                    <Button>
                      <Icon type="upload" />
                      选择{[' PDF 文件', ' JPG/JPEG/PNG 图片', ''][this.dataSource[index].fileType - 1]}
                    </Button>
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
