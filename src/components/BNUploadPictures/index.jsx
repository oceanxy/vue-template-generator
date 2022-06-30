import { Icon, Modal, Upload } from 'ant-design-vue'
import utilityFunction from '@/utils/utilityFunction'

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
    // 最大图片数量
    limit: {
      type: Number,
      default: 5
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
        if (value.length) {
          this.fileList = value
        } else {
          this.fileList = []
        }
      }
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await utilityFunction.getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
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
          action="/mgapi/system/upload/image"
          listType="picture-card"
          name={this.name}
          fileList={this.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          headers={this.headers}
          multiple={true}
        >
          {
            this.fileList.length < this.limit ? (
              <div className={'tg-upload-pic'}>
                <Icon type={'plus'} />
                <div className="ant-upload-text">
                  上传
                </div>
              </div>
            ) : null
          }
        </Upload>
        <Modal
          visible={this.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style="width: 100%" src={this.previewImage} />
        </Modal>
      </div>
    )
  }
}
