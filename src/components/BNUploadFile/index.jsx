import { Icon, Upload, Button } from 'ant-design-vue'

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
      default: '/mgapi/system/upload/image'
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
    async handlePreview(file) {
      // if (!file.url && !file.preview) {
      //   file.preview = await utilityFunction.getBase64(file.originFileObj)
      // }
      // this.previewImage = file.url || file.preview
      // this.previewVisible = true
    },
    handleChange({ file, fileList }) {
      if (fileList.length > this.limit) {
        fileList = fileList.slice(0, this.limit)
      }

      this.fileList = fileList
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
