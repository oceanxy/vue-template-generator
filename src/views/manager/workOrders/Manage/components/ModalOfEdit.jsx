import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapState } from '@/utils/store'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-workorder-manage-form'
      }
    }
  },
  computed: { ...mapState(['businessSelect']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          if (this.currentItem.id) {
            await this.getBusinesses(this.currentItem.companyName)
          } else {
            await this.getBusinesses()
          }
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      data.imgs = data.imgs
        .map(item => {
          return item?.response?.data[0]?.key ?? item.key
        })
        .join(',')

      return data
    },
    async getDetail() {
      if (!this.currentItem.id) return

      await this.$store.dispatch('getDetails', {
        moduleName: this.moduleName, payload: { id: this.currentItem.id }
      })
    },
    async getBusinesses(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'businessSelect',
        customApiName: 'getBusinessesForSelect',
        payload: { companyName: keyword }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }
    const getImgs = () => {
      return (this.currentItem.imgList || []).map((item, index) => {
        return {
          uid: index,
          name: item.path?.substring(item.path?.lastIndexOf('/')),
          url: item.path,
          key: item.key,
          status: 'done'
        }
      })
    }

    return (
      <DragModal {...attributes}>
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="报修企业">
                {this.form.getFieldDecorator('companyId', {
                  initialValue: this.currentItem.companyId ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择企业!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Select
                    placeholder={'输入企业名称搜索'}
                    showSearch
                    filterOption={false}
                    onSearch={debounce(this.getBusinesses, 300)}
                    notFoundContent={this.businessSelect.loading ? <Spin /> : undefined}
                  >
                    {this.businessSelect.list.map(item => (
                      <Select.Option value={item.companyId} title={item.companyName}>
                        {item.companyName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="报修项">
                {this.form.getFieldDecorator('repairItem', {
                  initialValue: this.currentItem.repairItem ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入报修项!',
                      trigger: 'blur'
                    }
                  ]
                })(<Input placeholder="请输入" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="报修内容">
                {
                  this.form.getFieldDecorator('description', {
                    initialValue: this.currentItem.description ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入报修内容!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input.TextArea placeholder="请输入" autoSize={{ minRows: 6 }} allowClear />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="现场图片">
                {this.form.getFieldDecorator('imgs', { initialValue: getImgs() })(
                  <BNUploadPictures />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
