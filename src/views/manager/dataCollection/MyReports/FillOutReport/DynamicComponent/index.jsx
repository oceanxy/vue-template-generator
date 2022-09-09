import { Checkbox, DatePicker, Input, Radio } from 'ant-design-vue'
import { cloneDeep } from 'lodash'
import UploadFiles from './UploadFiles'
import BNUploadPictures from '@/components/BNUploadPictures'
import BNUploadFile from '@/components/BNUploadFile'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    dataSource: {
      type: Object,
      required: true
    }
  },
  data() {
    return {innerValue: {}}
  },
  created() {
    this.innerValue = cloneDeep(this.value)
    this.innerValue.itemId = this.dataSource.id
    this.innerValue.attachmentList = new Array(this.dataSource.itemProveList.length).fill({})

    if (this.dataSource.modType === 1) {
      this.innerValue.resultId = ''
    } else if (this.dataSource.modType === 2) {
      this.innerValue.resultIdList = []
    } else if (this.dataSource.modType === 3 || this.dataSource.modType === 4 || this.dataSource.modType === 7) {
      this.innerValue.resultContent = ''
    } else if (this.dataSource.modType === 5 || this.dataSource.modType === 6) {
      this.innerValue.resultFile = []
    }
  },
  methods: {
    onComponentChange(field, value) {
      this.innerValue[field] = value
      this.$emit('change', this.innerValue)
    },
    onUploadChange(value) {
      this.innerValue.attachmentList = value
      this.$emit('change', this.innerValue)
    },
    getComponent() {
      const { modType, fullName } = this.dataSource

      // 单选
      if (modType === 1) {
        return (
          <Radio.Group
            vModel={this.innerValue.resultId}
            onChange={e => this.onComponentChange('resultId', e.target.value)}
          >
            {
              this.dataSource.itemOptionList.map(item => (
                <Radio value={item.id}>
                  {item.optionValue}
                  {/*{item.score ? `（${item.score}分）` : ''}*/}
                </Radio>
              ))
            }
          </Radio.Group>
        )
      }

      // 多选
      if (modType === 2) {
        return (
          <Checkbox.Group
            vModel={this.innerValue.resultIdList}
            onChange={value => this.onComponentChange('resultIdList', value)}
          >
            {
              this.dataSource.itemOptionList.map(item => (
                <Checkbox value={item.id}>
                  {item.optionValue}
                  {/*{item.score ? `（${item.score}分）` : ''}*/}
                </Checkbox>
              ))
            }
          </Checkbox.Group>
        )
      }

      // 文本框
      if (modType === 3) {
        return (
          <Input
            vModel={this.innerValue.resultContent}
            placeholder={`请输入${fullName}`}
            onChange={e => this.onComponentChange('resultContent', e.target.value)}
          />
        )
      }

      // 多行文本框
      if (modType === 4) {
        return (
          <Input.TextArea
            vModel={this.innerValue.resultContent}
            placeholder={`请输入${fullName}`}
            autoSize={{ minRows: 6 }}
            onChange={e => this.onComponentChange('resultContent', e.target.value)}
          />
        )
      }

      // 图片
      if (modType === 5) {
        return (
          <BNUploadPictures
            limit={5}
            vModel={this.innerValue.resultFile}
            placeholder={`请选择${fullName}`}
            onChange={value => this.onComponentChange('resultFile', value.map(item => item.response.data[0]))}
          />
        )
      }

      // 文件
      if (modType === 6) {
        return (
          <BNUploadFile
            limit={5}
            vModel={this.innerValue.resultFile}
            placeholder={`请选择${fullName}`}
            onChange={value => this.onComponentChange('resultFile', value.map(item => item.response.data[0]))}
          />
        )
      }

      // 时间
      if (modType === 7) {
        return (
          <DatePicker
            vModel={this.innerValue.resultContent}
            style={{ width: '100%' }}
            valueFormat={'YYYYMMDD'}
            onChange={value => this.onComponentChange('resultContent', value)}
          />
        )
      }

      return null
    }
  },
  render() {
    return (
      <div>
        {this.getComponent()}
        {
          (this.dataSource.itemProveList || []).length
            ? (
              <div style={{
                background: '#fafafa', padding: '10px'
              }}>
                <div>请上传佐证材料：</div>
                <UploadFiles
                  dataSource={this.dataSource.itemProveList || []}
                  vModel={this.innerValue.attachmentList}
                  onChange={this.onUploadChange}
                />
              </div>
            )
            : null
        }
      </div>
    )
  }
}
