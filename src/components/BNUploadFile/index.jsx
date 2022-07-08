import { Icon, Upload, Button, message } from 'ant-design-vue'

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
    // 最大数量
    limit: {
      type: Number,
      default: 5
    },
    action: {
      type: String,
      default: '/mgapi/system/upload/file'
    },
    accept: {
      type: String,
      default: '*'
    }
  },
  data() {
    return {
      fileList: [],
      previewImage: '',
      previewVisible: false,
      name: 'files',
      headers: {
        token: sessionStorage.getItem('token')
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value && value.length) {
          this.fileList = value
        } else {
          this.fileList = []
        }
      }
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      if (this.fileList.length >= this.limit) {
        message.warning(`上传数量限制为${this.limit}个`)
        return false
      }
    },
    async handlePreview(file) {
      // if (!file.url && !file.preview) {
      //   file.preview = await utilityFunction.getBase64(file.originFileObj)
      // }
      // this.previewImage = file.url || file.preview
      // this.previewVisible = true
    },
    handleChange({ file, fileList }) {
      // if (file.response) {
      //   this.fileList = fileList
      // }
      this.fileList = fileList
      if (this.fileList.length >= this.limit) {
        this.fileList = this.fileList.slice(0, this.limit)
      }
      this.$emit('change', this.fileList)
    }
  },
  render() {
    return (
      <div style={{ lineHeight: 0 }}>
        <Upload
          accept={this.accept}
          action={this.action}
          listType="text"
          name={this.name}
          fileList={this.fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          headers={this.headers}
          multiple={true}>
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
      </div>
    )
  }
}
